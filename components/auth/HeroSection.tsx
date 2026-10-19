import { FormEvent, useCallback, useState } from "react";
import { copy, HamiUser, quickChips } from "./data";
import { Illustration } from "./Illustration";
import { Logo } from "./Logo";
import { SignupModal } from "./SignupModal";
import { WelcomeScreen } from "./WelcomeScreen";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<HamiUser | null>(null);
  const [welcoming, setWelcoming] = useState(false);
  const [asked, setAsked] = useState<string | null>(null);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const finishWelcome = useCallback(() => {
    setWelcoming(false);
    setAsked((q) => q ?? "");
  }, []);

  const pickChip = (id: string) => {
    const chip = quickChips.find((c) => c.id === id)!;
    if (activeChip === id) { setActiveChip(null); setQuery(""); return; }
    setActiveChip(id);
    setQuery(chip.question);
  };

  const start = (e?: FormEvent) => {
    e?.preventDefault();
    if (user) { setAsked(query.trim()); return; }
    setModalOpen(true);
  };

  return (
    <section dir="rtl" className="hami-grain relative isolate min-h-screen overflow-hidden bg-[#0D1117] font-[Vazirmatn] text-slate-100">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-48 right-[22%] z-10 opacity-70 h-[420px] w-[520px] rounded-full bg-[#C9A13B]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-10 h-[380px] w-[520px] rounded-full bg-[#0E7C86]/25 blur-[120px]" />

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10">
        <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold text-white">
          <Logo className="h-9 w-9" /> {copy.brand}
        </a>
        {user ? (
          <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-4 py-2.5 text-sm font-bold backdrop-blur-md">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22D3EE]/20 text-[#5EEAD4]">{user.name[0]}</span>
            {user.name} · {user.role}
          </span>
        ) : (
          <button onClick={() => setModalOpen(true)}
            className="rounded-xl border border-white/15 bg-[#0D1117]/60 px-5 py-2.5 text-sm font-bold text-slate-100 backdrop-blur-md transition hover:border-[#22D3EE]/60 hover:text-white hover:shadow-[0_0_24px_-6px_#22D3EE]">
            {copy.login}
          </button>
        )}
      </header>

      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]">
        {/* RIGHT (first in RTL): copy + UI */}
        <div className="relative z-20 order-2 flex items-center px-5 pb-14 pt-4 sm:px-10 lg:order-1 lg:py-24 lg:pl-6 xl:pr-16">
          <div className="w-full max-w-[660px]">
            <span className="hami-badge inline-flex items-center gap-2 rounded-full border border-[#F5C76B]/30 bg-[#F5C76B]/[.07] px-4 py-2 text-sm font-medium text-[#F3E3BC] shadow-[0_0_24px_-8px_#F5C76B]">
              <span className="hami-twinkle text-[#F5C76B]">✦</span> {copy.badge}
            </span>

            <h1 className="mt-6 text-[1.8rem] font-black leading-[1.55] tracking-tight text-white sm:text-[2.9rem] sm:leading-[1.45] lg:text-[clamp(2.1rem,3.3vw,3.3rem)]">
              <span className="bg-gradient-to-l from-[#38E8EC] to-[#5EEAD4] bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(56,232,236,.25)]">{copy.titleA}</span>
              {copy.titleB}
              <br />
              <span className="bg-gradient-to-l from-[#F5C76B] to-[#E0A94A] bg-clip-text text-transparent">{copy.titleC}</span>
              {copy.titleD}
            </h1>

            <p className="mt-4 max-w-[600px] text-lg leading-8 text-slate-300/90">{copy.subtitle}</p>

            <form onSubmit={start} className="mt-7">
              <label className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[.04] px-5 py-4 backdrop-blur-md transition focus-within:border-[#22D3EE]/60 focus-within:bg-white/[.06] focus-within:shadow-[0_0_0_4px_rgba(34,211,238,.12)]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-slate-400 transition group-focus-within:text-[#5EEAD4]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
                <span className="sr-only">سؤال شما</span>
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveChip(null); }}
                  placeholder={copy.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500 sm:text-lg"
                />
                {query && (
                  <button type="button" aria-label="پاک کردن" onClick={() => { setQuery(""); setActiveChip(null); }} className="grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white">×</button>
                )}
              </label>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {quickChips.map((c) => (
                  <button type="button" key={c.id} onClick={() => pickChip(c.id)} aria-pressed={activeChip === c.id}
                    className={`rounded-full border px-4 py-2 text-[15px] font-medium transition ${activeChip === c.id
                      ? "border-[#22D3EE] bg-[#22D3EE]/15 text-[#A5F3FC] shadow-[0_0_20px_-4px_#22D3EE]"
                      : "border-white/12 bg-white/[.05] text-slate-200 hover:border-white/30 hover:bg-white/[.09]"}`}>
                    {c.label}
                  </button>
                ))}
              </div>

              <button type="submit"
                className="hami-cta group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#2EE6EA] via-[#22D3EE] to-[#5EEAD4] py-4 text-xl font-extrabold text-[#062126] transition hover:brightness-110 active:scale-[.99]">
                {copy.cta}
                <span className="transition-transform group-hover:-translate-x-1.5">←</span>
              </button>
            </form>

            {asked !== null && user && (
              <div className="hami-pop mt-6 rounded-2xl border border-white/10 bg-white/[.05] p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">گفت‌وگوی تازه با حامی درمان</p>
                {asked ? (
                  <>
                    <p className="mt-2 mr-auto w-fit max-w-[90%] rounded-2xl rounded-tl-md bg-[#22D3EE]/15 px-4 py-2.5 text-base text-[#CFFAFE]">{asked}</p>
                    <p className="mt-3 flex items-center gap-2 text-base text-slate-300">
                      <span className="flex gap-1"><i className="hami-dot" /><i className="hami-dot [animation-delay:.15s]" /><i className="hami-dot [animation-delay:.3s]" /></span>
                      حامی در حال بررسی قوانین و بخشنامه‌ها…
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-base text-slate-200">سلام {user.name}! سؤالت را در کادر بالا بنویس یا یکی از پرسش‌های سریع را انتخاب کن.</p>
                )}
              </div>
            )}

            <p className="mt-5 text-[15px] text-slate-400">
              🔒 {copy.footA} <span className="mx-1.5 text-slate-600">|</span> ⚡ {copy.footB}
            </p>
          </div>
        </div>

        {/* LEFT: cinematic illustration */}
        <div className="relative order-1 h-[58vh] min-h-[380px] lg:order-2 lg:-mr-[14%] lg:h-auto">
          <Illustration />
        </div>
      </div>

      <SignupModal
        open={modalOpen}
        question={query.trim()}
        onClose={closeModal}
        onDone={(u) => { setUser(u); setModalOpen(false); setWelcoming(true); setAsked(query.trim() || null); }}
      />
      {welcoming && user && <WelcomeScreen user={user} onFinish={finishWelcome} />}
    </section>
  );
}
