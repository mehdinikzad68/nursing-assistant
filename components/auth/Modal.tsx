import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';

type Props = {
  titleId: string;
  descriptionId?: string;
  onClose: () => void;
  children: ReactNode;
  variant?: 'auth' | 'welcome' | 'chat';
};

export function Modal({ titleId, descriptionId, onClose, children, variant = 'auth' }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    const page = document.getElementById('root');
    const wasInert = page?.hasAttribute('inert') ?? false;
    document.body.style.overflow = 'hidden';
    page?.setAttribute('inert', '');
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== 'Tab') return;
      const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      ) ?? []).filter(node => node.getClientRects().length > 0);
      if (nodes.length === 0) { event.preventDefault(); panelRef.current?.focus(); return; }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = oldOverflow;
      if (!wasInert) page?.removeAttribute('inert');
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.scrollTop = 0;
      const preferred = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]');
      const first = preferred ?? panelRef.current?.querySelector<HTMLElement>('input, textarea, button');
      (first ?? panelRef.current)?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [variant]);

  return createPortal(
    <div className={`modal-backdrop modal-backdrop--${variant}`} dir="rtl"
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panelRef} className={`modal-panel modal-panel--${variant}`} role="dialog"
        aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} tabIndex={-1}>
        <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="بستن پنجره">
          <Icon name="close" size={21} />
        </button>
        {children}
      </div>
    </div>, document.body,
  );
}
