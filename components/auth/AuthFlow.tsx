import { useEffect, useRef, useState, type FormEvent } from 'react';
import { DEMO_CODE, formatPersian, normalizeDigits } from './content';
import { Brand, Icon } from './Icon';

type Props = { onVerified: () => void };

/** UI-only adapter: replace the two submit handlers with your own authenticated API. */
export function AuthFlow({ onVerified }: Props) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(0);
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fieldRef.current?.focus(); }, [step]);
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeDigits(phone).replace(/[\s-]/g, '');
    if (!/^09\d{9}$/.test(normalized)) {
      setError('شمارهٔ موبایل را با ۰۹ و در ۱۱ رقم وارد کنید.');
      fieldRef.current?.focus();
      return;
    }
    setPhone(normalized);
    setError('');
    setStep('code');
    setSeconds(30);
  }

  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (normalizeDigits(code) !== DEMO_CODE) {
      setError('در نسخهٔ نمایشی، کد ۱۲۳۴۵۶ را وارد کنید.');
      fieldRef.current?.focus();
      return;
    }
    setError('');
    onVerified();
  }

  return <div className="auth-flow">
    <Brand />
    <div className="auth-emblem"><Icon name={step === 'phone' ? 'phone' : 'shield'} size={31} /></div>
    <p className="eyebrow">یک قدم تا همراه هوشمند شما</p>
    <h2 id="auth-title">{step === 'phone' ? 'به حامی درمان خوش آمدید' : 'کد ورود را وارد کنید'}</h2>
    <p id="auth-description" className="dialog-description">
      {step === 'phone'
        ? 'برای شروع گفت‌وگو، شمارهٔ موبایل خود را وارد کنید.'
        : <>شمارهٔ واردشده: <bdi dir="ltr">{phone}</bdi></>}
    </p>
    <div className="demo-notice"><Icon name="spark" size={17} /><span>نسخهٔ نمایشی؛ پیامکی ارسال نمی‌شود و حساب واقعی ساخته نمی‌شود.
      {step === 'code' && <> کد آزمایشی: <bdi dir="ltr">{DEMO_CODE}</bdi></>}
    </span></div>
    {step === 'phone' ? <form onSubmit={submitPhone} noValidate>
      <label className="field-label" htmlFor="mobile">شمارهٔ موبایل</label>
      <div className={`auth-input-wrap ${error ? 'has-error' : ''}`}>
        <Icon name="phone" size={20} />
        <input ref={fieldRef} data-autofocus id="mobile" name="tel" type="tel" inputMode="tel"
          autoComplete="tel-national" placeholder="0912 345 6789" dir="ltr" value={phone} maxLength={17}
          aria-invalid={Boolean(error)} aria-describedby={error ? 'auth-error auth-hint' : 'auth-hint'}
          onChange={event => { setPhone(event.target.value); setError(''); }} />
      </div>
      <p id="auth-hint" className="field-hint">اعداد فارسی و انگلیسی پذیرفته می‌شوند.</p>
      {error && <p id="auth-error" role="alert" className="field-error">{error}</p>}
      <button className="primary-button auth-submit" type="submit">دریافت کد آزمایشی<Icon name="arrow" size={20} /></button>
    </form> : <form onSubmit={submitCode} noValidate>
      <label className="field-label" htmlFor="verification-code">کد تأیید شش‌رقمی</label>
      <input ref={fieldRef} data-autofocus id="verification-code" className={`otp-input ${error ? 'has-error' : ''}`}
        name="code" inputMode="numeric" autoComplete="one-time-code" dir="ltr" placeholder="— — — — — —"
        value={code} maxLength={6} aria-invalid={Boolean(error)}
        aria-describedby={error ? 'auth-error code-hint' : 'code-hint'}
        onChange={event => { setCode(normalizeDigits(event.target.value).replace(/\D/g, '').slice(0, 6)); setError(''); }} />
      <p id="code-hint" className="field-hint">کد نمایشی ۱۲۳۴۵۶ است؛ این مرحله احراز هویت واقعی نیست.</p>
      {error && <p id="auth-error" role="alert" className="field-error">{error}</p>}
      <button className="primary-button auth-submit" type="submit">ورود به نسخهٔ نمایشی<Icon name="arrow" size={20} /></button>
      <div className="code-actions">
        <button type="button" className="text-button" onClick={() => { setStep('phone'); setCode(''); setError(''); }}>ویرایش شماره</button>
        <button type="button" className="text-button" disabled={seconds > 0}
          onClick={() => { setSeconds(30); setCode(''); setError(''); fieldRef.current?.focus(); }}>
          {seconds > 0 ? `نمایش دوباره در ${formatPersian(seconds)} ثانیه` : 'نمایش دوبارهٔ کد آزمایشی'}
        </button>
      </div>
    </form>}
    <p className="auth-privacy"><Icon name="lock" size={14} />شماره فقط در حافظهٔ موقت این صفحه نگهداری می‌شود.</p>
    <div className="flow-steps" aria-label={step === 'phone' ? 'مرحلهٔ ۱ از ۲' : 'مرحلهٔ ۲ از ۲'}><span className="active" /><span className={step === 'code' ? 'active' : ''} /></div>
  </div>;
}
