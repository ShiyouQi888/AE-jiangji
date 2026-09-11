/**
 * 站内跳转后 reveal 元素必须重新点亮。
 *
 * App Router 会复用 app/[lang]/layout.jsx；如果 RevealScript 只在首次挂载时扫描，
 * 新路由里的 .reveal 会被 .js-reveal 隐藏，用户就会看到“点开没加载，刷新才出现”。
 */

import { launch, sleep } from './cdp.js';

const SITE = process.env.SITE || 'http://127.0.0.1:3100';
const PORT = Number(process.env.CDP_PORT || 9336);

const ROUTES = [
  {
    href: '/zh/premiere-pro-downgrader',
  },
  {
    href: '/zh/after-effects-downgrader',
  },
  {
    href: '/zh/how-it-works',
  },
  {
    href: '/zh/contact',
  },
];

let pass = 0;
let fail = 0;
const log = (ok, name, detail = '') => {
  if (ok) pass += 1;
  else fail += 1;
  console.log(`  ${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

let cdp;
let close;
try {
  ({ cdp, close } = await launch({ port: PORT, width: 1365, height: 900 }));
} catch (e) {
  console.error(`浏览器启动失败：${e.message}`);
  process.exit(2);
}

try {
  for (const route of ROUTES) {
    await cdp.send('Page.navigate', { url: `${SITE}/zh` });
    log(await cdp.waitFor('document.readyState === "complete"'), '首页加载完成');
    log(
      await cdp.waitFor(`!!document.querySelector('a[href="${route.href}"]')`),
      `找到入口 ${route.href}`
    );

    const clicked = await cdp.eval(`
      (() => {
        const link = document.querySelector('a[href="${route.href}"]');
        if (!link) return false;
        link.click();
        return true;
      })()
    `);
    log(clicked, `点击入口 ${route.href}`);
    log(
      await cdp.waitFor(`location.pathname === "${route.href}"`),
      `站内跳转到 ${route.href}`
    );

    await sleep(700);

    const hidden = await cdp.eval(`
      (() => [...document.querySelectorAll('.reveal')]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          const inViewport = rect.bottom > 0 && rect.top < innerHeight;
          const style = getComputedStyle(el);
          return inViewport && Number(style.opacity) < 0.95;
        })
        .map((el) => el.className)
      )()
    `);

    log(hidden.length === 0, `首屏 reveal 已显示 ${route.href}`, hidden.join(' | '));
  }
} catch (err) {
  log(false, '站内跳转 reveal 测试', String(err.message || err));
} finally {
  await close();
}

console.log(`\n${'─'.repeat(52)}`);
console.log(`  通过 ${pass}　失败 ${fail}`);
console.log(`${'─'.repeat(52)}\n`);
process.exit(fail ? 1 : 0);
