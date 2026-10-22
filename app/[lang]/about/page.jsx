import Link from 'next/link';

import JsonLd from '@/components/JsonLd';
import { ABOUT_COPY } from '@/lib/about';
import { getContent } from '@/lib/content';
import { ldCrumbs, ldWebPage, pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMeta(lang, 'about');
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const c = getContent(lang);
  const copy = ABOUT_COPY[lang];
  const base = `/${lang}`;

  return (
    <>
      <JsonLd
        data={[
          ldCrumbs(lang, [
            { name: c.nav.home, path: '' },
            { name: copy.kicker, path: '/about' },
          ]),
          ldWebPage(lang, 'about'),
        ]}
      />
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ position: 'relative', maxWidth: 820 }}>
          <span className="kicker">{copy.kicker}</span>
          <h1 className="h2" style={{ fontSize: 'clamp(30px, 4.6vw, 52px)' }}>
            {copy.title}
          </h1>
          <p className="lede">{copy.lede}</p>
        </div>
      </section>

      <section style={{ paddingBottom: 56 }}>
        <div className="wrap">
          <article className="prose" style={{ maxWidth: 820, marginInline: 'auto' }}>
            {copy.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.links?.length ? (
                  <p>
                    {section.links.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ' · ' : null}
                        <Link href={base + link.href}>{link.label}</Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </section>
            ))}
          </article>
          <div className="legal-actions">
            <Link className="btn btn--primary" href={`${base}/premiere-pro-downgrader`}>
              {copy.ctaTool}
            </Link>
            <Link className="btn" href={`${base}/contact`}>
              {copy.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
