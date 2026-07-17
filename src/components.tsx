import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ');

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props }: ButtonProps) {
  return <button className={cx('navi-button', `navi-button--${variant}`, `navi-button--${size}`, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{loading && <span className="navi-spinner" aria-hidden="true" />}{children}</button>;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { label: string; size?: 'sm' | 'md' | 'lg'; }
export function IconButton({ label, size = 'md', className, children, ...props }: IconButtonProps) {
  return <button aria-label={label} title={label} className={cx('navi-icon-button', `navi-icon-button--${size}`, className)} {...props}>{children}</button>;
}

interface FieldFrameProps { id: string; label: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; children: ReactNode; }
function FieldFrame({ id, label, hint, error, required, children }: FieldFrameProps) {
  return <div className={cx('navi-field', Boolean(error) && 'navi-field--error')}><label className="navi-field__label" htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{(error || hint) && <div className="navi-field__message" id={`${id}-message`}>{error ?? hint}</div>}</div>;
}

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> { label: ReactNode; hint?: ReactNode; error?: ReactNode; }
export function TextField({ label, hint, error, id: providedId, className, required, ...props }: TextFieldProps) {
  const generatedId = useId(); const id = providedId ?? generatedId; const describedBy = (error || hint) ? `${id}-message` : undefined;
  return <FieldFrame id={id} label={label} hint={hint} error={error} required={required}><input id={id} className={cx('navi-input', className)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} required={required} {...props} /></FieldFrame>;
}

export interface SelectFieldOption { value: string; label: string; disabled?: boolean; }
export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> { label: ReactNode; options: SelectFieldOption[]; hint?: ReactNode; error?: ReactNode; placeholder?: string; }
export function SelectField({ label, options, hint, error, placeholder, id: providedId, className, required, ...props }: SelectFieldProps) {
  const generatedId = useId(); const id = providedId ?? generatedId; const describedBy = (error || hint) ? `${id}-message` : undefined;
  return <FieldFrame id={id} label={label} hint={hint} error={error} required={required}><select id={id} className={cx('navi-select', className)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} required={required} {...props}>{placeholder && <option value="">{placeholder}</option>}{options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</select></FieldFrame>;
}

export interface SurfaceProps extends HTMLAttributes<HTMLElement> { as?: 'section' | 'article' | 'aside' | 'div'; tone?: 'default' | 'raised' | 'inset' | 'accent'; }
export function Surface({ as: Element = 'section', tone = 'default', className, ...props }: SurfaceProps) { return <Element className={cx('navi-surface', `navi-surface--${tone}`, className)} {...props} />; }

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> { nav?: ReactNode; dock?: ReactNode; }
export function AppShell({ nav, dock, className, children, ...props }: AppShellProps) { return <div className={cx('navi-app-shell', className)} {...props}>{nav}<main className="navi-app-shell__main">{children}</main>{dock}</div>; }

export interface TopNavProps extends HTMLAttributes<HTMLElement> { brand: ReactNode; actions?: ReactNode; }
export function TopNav({ brand, actions, children, className, ...props }: TopNavProps) { return <nav className={cx('navi-top-nav', className)} aria-label="Primary" {...props}><div className="navi-top-nav__brand">{brand}</div>{children && <div className="navi-top-nav__links">{children}</div>}{actions && <div className="navi-top-nav__actions">{actions}</div>}</nav>; }

export interface CommandDockProps extends HTMLAttributes<HTMLElement> { label?: string; }
export function CommandDock({ label = 'Commands', className, children, ...props }: CommandDockProps) { return <aside className={cx('navi-command-dock', className)} aria-label={label} {...props}><div className="navi-command-dock__inner">{children}</div></aside>; }

export interface SegmentedOption<T extends string> { value: T; label: ReactNode; disabled?: boolean; }
export interface SegmentedControlProps<T extends string> { value: T; options: SegmentedOption<T>[]; onChange: (value: T) => void; label: string; className?: string; }
export function SegmentedControl<T extends string>({ value, options, onChange, label, className }: SegmentedControlProps<T>) {
  const instanceId = useId();
  const chooseWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, option: SegmentedOption<T>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const enabled = options.filter(candidate => !candidate.disabled);
    const current = enabled.findIndex(candidate => candidate.value === option.value);
    const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled.at(-1) : enabled[(current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    if (next) { onChange(next.value); document.getElementById(`${instanceId}-segment-${next.value}`)?.focus(); }
  };
  return <div className={cx('navi-segmented', className)} role="radiogroup" aria-label={label}>{options.map(option => <button key={option.value} id={`${instanceId}-segment-${option.value}`} type="button" role="radio" aria-checked={value === option.value} tabIndex={value === option.value ? 0 : -1} disabled={option.disabled} onClick={() => onChange(option.value)} onKeyDown={event => chooseWithKeyboard(event, option)}>{option.label}</button>)}</div>;
}

export interface TabItem { id: string; label: ReactNode; content: ReactNode; disabled?: boolean; }
export interface TabsProps { items: TabItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label: string; className?: string; }
export function Tabs({ items, value, defaultValue, onChange, label, className }: TabsProps) {
  const instanceId = useId();
  const firstEnabled = items.find(item => !item.disabled)?.id ?? '';
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled); const selected = value ?? internal;
  const select = (id: string) => { if (value === undefined) setInternal(id); onChange?.(id); };
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const enabled = items.filter(item => !item.disabled); const current = enabled.findIndex(item => item.id === items[index]?.id);
    const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled.at(-1) : enabled[(current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    if (next) { select(next.id); document.getElementById(`${instanceId}-tab-${next.id}`)?.focus(); }
  };
  const active = items.find(item => item.id === selected) ?? items.find(item => !item.disabled);
  return <div className={cx('navi-tabs', className)}><div className="navi-tabs__list" role="tablist" aria-label={label}>{items.map((item, index) => <button key={item.id} id={`${instanceId}-tab-${item.id}`} role="tab" type="button" aria-selected={active?.id === item.id} aria-controls={`${instanceId}-panel-${item.id}`} tabIndex={active?.id === item.id ? 0 : -1} disabled={item.disabled} onClick={() => select(item.id)} onKeyDown={event => onKeyDown(event, index)}>{item.label}</button>)}</div>{active && <div id={`${instanceId}-panel-${active.id}`} role="tabpanel" aria-labelledby={`${instanceId}-tab-${active.id}`} tabIndex={0} className="navi-tabs__panel">{active.content}</div>}</div>;
}

export interface ModalProps { open: boolean; onClose: () => void; title: ReactNode; description?: ReactNode; children: ReactNode; footer?: ReactNode; closeLabel?: string; }
export function Modal({ open, onClose, title, description, children, footer, closeLabel = 'Close dialog' }: ModalProps) {
  const titleId = useId(); const descriptionId = useId(); const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const previous = document.activeElement as HTMLElement | null; const panel = panelRef.current; panel?.focus(); const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key === 'Tab' && panel) { const focusable = Array.from(panel.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(element => !element.hasAttribute('disabled')); if (!focusable.length) { event.preventDefault(); return; } const first = focusable[0], last = focusable.at(-1)!; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }; document.addEventListener('keydown', onKey); document.body.classList.add('navi-modal-open'); return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('navi-modal-open'); previous?.focus(); }; }, [open, onClose]);
  if (!open) return null;
  return <div className="navi-modal__scrim" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div ref={panelRef} className="navi-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}><header className="navi-modal__header"><div><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div><IconButton label={closeLabel} onClick={onClose}>×</IconButton></header><div className="navi-modal__body">{children}</div>{footer && <footer className="navi-modal__footer">{footer}</footer>}</div></div>;
}
