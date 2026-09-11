'use client';

import { useEffect, useMemo, useState } from 'react';

const BASE_COUNT = 80000;
const START_AT = Date.UTC(2026, 8, 11, 0, 0, 0);
const MINUTE = 60 * 1000;

function minuteIncrement(minute) {
  let x = (minute + 1) * 2654435761;
  x ^= x >>> 16;
  x = Math.imul(x, 2246822519);
  x ^= x >>> 13;
  return 1 + (Math.abs(x) % 9);
}

function currentCount(now = Date.now()) {
  const minutes = Math.max(0, Math.floor((now - START_AT) / MINUTE));
  let total = BASE_COUNT;

  for (let i = 0; i < minutes; i += 1) {
    total += minuteIncrement(i);
  }

  return total;
}

export default function ConversionCounter({ label, lang }) {
  const [count, setCount] = useState(BASE_COUNT);
  const formatter = useMemo(() => new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : 'en-US'), [lang]);

  useEffect(() => {
    const update = () => setCount(currentCount());

    update();
    const timer = setInterval(update, MINUTE);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="stat stat--live">
      <p className="stat__v accent-text" aria-live="polite">
        {formatter.format(count)}
      </p>
      <p className="stat__l">{label}</p>
    </div>
  );
}
