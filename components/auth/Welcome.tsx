import { useEffect } from 'react';
import { Brand, Icon } from './Icon';

const WELCOME_DURATION_MS = 3000;

export function Welcome({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, WELCOME_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return <div className="welcome-content">
    <div className="welcome-orbit"><span /><span /><div className="welcome-brand"><Brand compact /></div></div>
    <span className="welcome-check"><Icon name="check" size={20} /></span>
    <p className="eyebrow">خوش آمدید، همراهِ درمان</p>
    <h2 id="welcome-title">شما مراقبِ درمان؛<br /><span>ما همراهِ سؤال‌های شما.</span></h2>
    <p id="welcome-description" className="dialog-description" role="status">تا سه ثانیهٔ دیگر، فضای گفت‌وگوی نمایشی باز می‌شود.</p>
    <div className="welcome-progress" aria-hidden="true"><span style={{ animationDuration: `${WELCOME_DURATION_MS}ms` }} /></div>
    <span className="welcome-caption">شروع یک همراهی هوشمند</span>
  </div>;
}
