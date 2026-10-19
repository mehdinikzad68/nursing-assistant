import { useEffect, useRef, useState, type FormEvent } from 'react';
import { copy, MAX_QUESTION_LENGTH } from './content';
import { Brand, Icon } from './Icon';

type Message = { id: number; role: 'user' | 'assistant'; text: string };
const greeting: Message = { id: 0, role: 'assistant', text: 'سلام، به حامی درمان خوش آمدید. این محیط پیش‌نمایش رابط گفت‌وگو است؛ پاسخ‌ها نمایشی‌اند و مشاورهٔ حقوقی یا اداری محسوب نمی‌شوند. موضوع سؤالتان چیست؟' };

function demoReply(question: string): string {
  if (/اضافه|کارانه|سنوات|سختی/.test(question)) return 'برای بررسی این موضوع، نوع استخدام، سازمان محل خدمت، بازهٔ زمانی و اطلاعات حکم یا فیش با حذف مشخصات شخصی لازم است. در این نسخه محاسبه یا استعلام واقعی انجام نمی‌شود؛ اتصال به موتور محاسبات و منابع معتبر باید در بک‌اند انجام شود.';
  if (/بازآموزی|امتیاز/.test(question)) return 'برای بررسی امتیاز بازآموزی، عنوان حرفه، نام دوره و مرجع صادرکننده را مشخص کنید. این نسخه به سامانهٔ بازآموزی یا منبع رسمی متصل نیست و امتیاز قطعی ارائه نمی‌دهد.';
  if (/طرح/.test(question)) return 'برای بررسی قوانین طرح، رشته، وضعیت خدمت و تاریخ موردنظر را بنویسید. این نسخه به بخشنامه‌های رسمی متصل نیست؛ پاسخ نهایی باید همراه منبع معتبر و تاریخ آخرین بررسی ارائه شود.';
  return 'سؤال شما در همین پیش‌نمایش دریافت شد. برای پاسخ واقعی باید سرویس گفت‌وگو و منابع تأییدشده به پروژه متصل شوند. فعلاً می‌توانید جریان ورود، انتخاب سؤال و ارسال پیام را آزمایش کنید. لطفاً اطلاعات هویتی بیماران یا اسناد محرمانه را وارد نکنید.';
}

export function DemoChat({ initialQuestion }: { initialQuestion: string }) {
  const [messages, setMessages] = useState<Message[]>(() => initialQuestion ? [greeting, { id: 1, role: 'user', text: initialQuestion }] : [greeting]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(initialQuestion);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => {
      const reply: Message = { id: nextId.current++, role: 'assistant', text: demoReply(pending) };
      setMessages(previous => [...previous, reply]);
      setPending('');
    }, 850);
    return () => window.clearTimeout(timer);
  }, [pending]);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, pending]);

  function send(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || pending) return;
    const message: Message = { id: nextId.current++, role: 'user', text };
    setMessages(previous => [...previous, message]);
    setPending(text);
    setDraft('');
    inputRef.current?.focus();
  }

  return <div className="chat-content">
    <header className="chat-heading"><Brand /><span className="demo-tag">نسخهٔ نمایشی</span></header>
    <h2 id="chat-title">گفتگو با حامی درمان</h2>
    <p id="chat-description" className="chat-disclaimer">بدون اتصال به هوش مصنوعی، پیامک یا منابع حقوقی؛ داده‌ها با بستن گفت‌وگو پاک می‌شوند.</p>
    <div ref={listRef} className="chat-messages" role="log" aria-label="پیام‌های گفت‌وگو" aria-live="polite" aria-relevant="additions">
      {messages.map(message => <div key={message.id} className={`message message--${message.role}`}>
        <span className="message-author">{message.role === 'user' ? 'شما' : 'حامی درمان · نمایشی'}</span>
        <p>{message.text}</p>
      </div>)}
      {pending && <div className="typing" role="status"><span /><span /><span /><span className="sr-only">در حال آماده‌سازی پاسخ نمایشی</span></div>}
    </div>
    <div className="chat-suggestions">{copy.questions.map((question: string) => <button key={question} type="button" disabled={Boolean(pending)} onClick={() => { setDraft(question); inputRef.current?.focus(); }}>{question}</button>)}</div>
    <form className="chat-composer" onSubmit={send}>
      <label htmlFor="chat-input" className="sr-only">پیام شما</label>
      <textarea ref={inputRef} data-autofocus id="chat-input" rows={2} placeholder="پیامتان را بنویسید..."
        value={draft} maxLength={MAX_QUESTION_LENGTH}
        onChange={event => setDraft(event.target.value)}
        onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(); } }} />
      <button type="submit" className="send-button" disabled={!draft.trim() || Boolean(pending)} aria-label="ارسال پیام"><Icon name="send" size={22} /></button>
    </form>
    <p className="chat-hint">Enter برای ارسال · Shift + Enter برای خط جدید</p>
  </div>;
}