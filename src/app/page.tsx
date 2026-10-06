"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Rocket, Sparkles, Brain, Calculator, BookOpen, FlaskConical, Code2, Puzzle, Play, Moon, Sun, Star, Clock3, Trophy, Map, X, Pause, Check, Flag, Coffee } from "lucide-react";
import { useTheme } from "next-themes";
import { Game, type Kind } from "./play";

export const ages = ["5–7 anos", "8–10 anos", "11–12 anos", "13–15 anos"];
const games: { id: Kind; name: string; world: string; desc: string; subject: string; icon: typeof Brain; color: string; }[] = [
  { id: "math", name: "Estação dos números", world: "Ilha dos números", desc: "Some ideias e encontre o tesouro!", subject: "Matemática", icon: Calculator, color: "lime" },
  { id: "words", name: "Palavras em órbita", world: "Floresta das palavras", desc: "Uma história escondida entre as letras.", subject: "Português", icon: BookOpen, color: "pink" },
  { id: "memory", name: "Conexões cósmicas", world: "Caverna dos cristais", desc: "Descubra os pares e ilumine a caverna.", subject: "Memória", icon: Brain, color: "purple" },
  { id: "logic", name: "Qual é o próximo?", world: "Cânion dos enigmas", desc: "Cada pista abre um novo caminho.", subject: "Lógica", icon: Puzzle, color: "orange" },
  { id: "science", name: "Laboratório curioso", world: "Laboratório mágico", desc: "Investigue as surpresas do nosso mundo.", subject: "Ciências", icon: FlaskConical, color: "blue" },
  { id: "code", name: "Comando, explorador!", world: "Vale dos robôs", desc: "Programe a rota da sua próxima aventura.", subject: "Programação", icon: Code2, color: "yellow" },
];
type Save = { age: number; stars: number; completed: Kind[] };
const empty: Save = { age: 0, stars: 0, completed: [] };
const artPosition = (index: number): CSSProperties => ({ backgroundImage: `url('/orbita/art/world-${index}.webp')`, backgroundPosition: 'center' });

export default function Home() {
  const [save, setSave] = useState<Save>(empty);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<Kind | null>(null);
  const [trip, setTrip] = useState(false);
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);
  const [view, setView] = useState("games");
  const [storageOk, setStorageOk] = useState(true);
  const [reward, setReward] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const panelRef = useRef<HTMLElement>(null);
  const rewardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalOpen = !!active || breakTime || finished;

  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.activeElement as HTMLElement;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function keyboard(e: KeyboardEvent) {
      if (e.key === "Escape") { setActive(null); setTrip(false); setBreakTime(false); setFinished(false); setPaused(false); }
      if (e.key === "Tab") {
        const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])') || []).filter(el => el.offsetParent !== null);
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => { document.body.style.overflow = before; document.removeEventListener("keydown", keyboard); previous?.focus(); };
  }, [modalOpen]);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem("orbita-v1") || "null");
      if (v && Number.isInteger(v.age) && v.age >= 0 && v.age < 4 && Number.isFinite(v.stars) && Array.isArray(v.completed))
        setSave({ age: v.age, stars: Math.max(0, Math.floor(v.stars)), completed: v.completed.filter((id: Kind) => games.some(g => g.id === id)) });
    } catch { /* A blocked local store still allows playing. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem("orbita-v1", JSON.stringify(save)); } catch { setStorageOk(false); } }, [save, ready]);
  useEffect(() => {
    if (!trip || paused || finished) return;
    const id = setInterval(() => { if (!document.hidden) setSeconds(s => s + 1); }, 1000);
    return () => clearInterval(id);
  }, [trip, paused, finished]);
  useEffect(() => {
    if (!trip) return;
    if (breakTime && seconds >= 120) { setBreakTime(false); setSeconds(0); setActive(games[3].id); }
    else if (!breakTime && seconds >= 480) {
      setSeconds(0);
      if (stage === 5) { setFinished(true); setActive(null); setTrip(false); }
      else { setStage(stage + 1); if (stage === 2) { setBreakTime(true); setActive(null); } else setActive(games[stage + 1].id); }
    }
  }, [seconds, trip, stage, breakTime]);
  useEffect(() => () => { if (rewardTimer.current) clearTimeout(rewardTimer.current); }, []);

  function start(id: Kind) { setActive(id); setRound(r => r + 1); setFinished(false); }
  function expedition() { setTrip(true); setStage(0); setSeconds(0); setPaused(false); setBreakTime(false); setFinished(false); start("math"); }
  function close() { setActive(null); setTrip(false); setBreakTime(false); setPaused(false); setFinished(false); }
  function earned(id: Kind) {
    setSave(s => ({ ...s, stars: s.stars + 10, completed: s.completed.includes(id) ? s.completed : [...s.completed, id] }));
    setReward(true);
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(false), 1400);
  }
  const selectedIndex = games.findIndex(g => g.id === active);
  const selected = games[selectedIndex];

  return <div className="adventure-app">
    <header className="game-topbar" inert={modalOpen}>
      <button className="brand" aria-label="Órbita, início" onClick={() => setView("games")}><span className="brand-planet"><Rocket size={26} /></span>órbita<span className="brand-spark">✦</span></button>
      <nav className="world-nav" aria-label="Navegação">
        <button className={view === "games" ? "selected" : ""} onClick={() => setView("games")}><Map size={20} /><span>Mundos</span></button>
        <button className={view === "journey" ? "selected" : ""} onClick={() => setView("journey")}><Flag size={20} /><span>Aventura</span></button>
        <button className={view === "awards" ? "selected" : ""} onClick={() => setView("awards")}><Trophy size={20} /><span>Conquistas</span></button>
      </nav>
      <div className="player-hud"><span className="star-wallet"><Star size={22} fill="currentColor" />{save.stars}<span>estrelas</span></span><button className="icon-button theme-switch" aria-label="Alternar tema" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{ready && resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</button></div>
    </header>

    <main className="world-main" inert={modalOpen}>
      {view !== "awards" && <section className="adventure-banner">
        <div className="banner-art" role="img" aria-label="Mundo de ilhas flutuantes e uma raposa exploradora" />
        <div className="adventure-copy"><span className="quest-tag"><Sparkles size={16} /> UMA NOVA AVENTURA TE ESPERA</span><h1>Jogar. Descobrir.<br /><span>Aprender!</span></h1><p>Ei, explorador! O Lumi precisa de você.<br />Qual mundo vamos descobrir primeiro?</p><div className="hero-actions"><button className="primary adventure-start" aria-label="Começar expedição" onClick={expedition}><Play size={22} fill="currentColor" />Bora jogar!</button><span><Clock3 size={17} />50 min de aventura<br /><small>com uma pausa no caminho</small></span></div></div>
        <span className="lumi-name">LUMI <span>SEU COMPANHEIRO DE AVENTURAS</span></span>
        <div className="mission-ribbon"><Star size={16} fill="currentColor" />6 mundos. Um montão de descobertas.</div>
      </section>}

      <section className="world-selection">
        <div className="world-heading"><div><span className="eyebrow">{view === "awards" ? "SEU BAÚ DE CONQUISTAS" : view === "journey" ? "SEU MAPA DE AVENTURA" : "AONDE VAMOS?"}</span><h2>{view === "awards" ? "Cada descoberta vale ouro!" : view === "journey" ? "Prepare a mochila!" : "Escolha seu mundo"}</h2></div><div className="age-picker"><span>Desafios para</span><div className="age-tabs" aria-label="Faixa etária">{ages.map((a, i) => <button key={a} aria-pressed={save.age === i} className={save.age === i ? "active" : ""} onClick={() => setSave(s => ({ ...s, age: i }))}>{a}</button>)}</div></div></div>

        {view === "journey" ? <div className="journey-detail"><div className="journey-intro"><div className="lumi-avatar" /><div><h3>Seis paradas, muitas ideias!</h3><p>8 minutos em cada mundo e uma pausa de 2 minutos depois do terceiro. Você pode pausar ou sair quando quiser.</p></div><button className="primary" onClick={expedition}><Play size={18} fill="currentColor" />Partir em aventura</button></div><div className="route-list">{games.map((g, i) => <div key={g.id}><div className="route-art level-art" style={artPosition(i)} /><span className={`route-number ${g.color}`}>{i + 1}</span><div><strong>{g.world}</strong><p>{g.subject} · 8 min</p></div>{i === 2 && <span className="break-tag"><Coffee size={17} />Pausa depois desta missão</span>}</div>)}</div><p className="journey-note">O relógio também pausa quando você sai da aba.</p></div> : view === "awards" ? <div className="awards-grid">{games.map((g, i) => <article className={`award ${save.completed.includes(g.id) ? "earned" : ""}`} key={g.id}><div className="award-art level-art" style={artPosition(i)} /><span className={`medal ${g.color}`}><Trophy size={28} /></span><h3>{g.world}</h3><p>{save.completed.includes(g.id) ? "Primeira descoberta conquistada!" : "Complete um desafio para conquistar."}</p><button className="secondary" onClick={() => start(g.id)}><Play size={16} fill="currentColor" />Jogar agora</button></article>)}</div> : <div className="game-grid">{games.map((g, i) => <button className={`game-card card-${g.color}`} key={g.id} onClick={() => start(g.id)} aria-label={`Jogar ${g.name}: ${g.world}`}>
          <div className="card-art level-art" style={artPosition(i)}><span className={`subject-label ${g.color}`}><g.icon size={14} />{g.subject}</span><span className="world-number">MUNDO {String(i + 1).padStart(2, "0")}</span>{save.completed.includes(g.id) && <span className="completed-mark" aria-label="Primeira descoberta conquistada"><Star size={18} fill="currentColor" /></span>}</div>
          <div className="card-copy"><h3>{g.world}</h3><span className="game-name">{g.name}</span><p>{g.desc}</p><div className="card-bottom"><span><Star size={15} fill="currentColor" />Descubra e ganhe estrelas</span><span className="play-label"><Play size={16} fill="currentColor" />JOGAR</span></div></div>
        </button>)}</div>}
      </section>

      <div className="lumi-tip"><div className="lumi-avatar" /><p><strong>Uma dica do Lumi:</strong> a melhor descoberta começa com “e se eu tentar?”.</p><span><Sparkles size={21} /></span></div>
      <footer><span>Feito para explorar, brincar e aprender.</span><span>{storageOk ? "Seu progresso fica salvo neste aparelho." : "Progresso disponível só nesta sessão."}</span></footer>
    </main>

    {modalOpen && <div className="game-overlay"><section ref={panelRef} className={`play-panel play-${selected?.color || "purple"}`} role="dialog" aria-modal="true" aria-labelledby="game-title">
      <div className="game-scene level-art" style={artPosition(Math.max(0, selectedIndex))}><span className="scene-chip"><Flag size={16} />{trip ? `MISSÃO ${stage + 1} DE 6` : "AVENTURA LIVRE"} · {ages[save.age]}</span><button autoFocus className="icon-button exit-game" onClick={close} aria-label="Sair do jogo"><X size={22} /></button><div className="scene-world">{finished ? "Aventura concluída!" : breakTime ? "Hora de recarregar!" : selected?.world}</div></div>
      <header className="play-header"><div><span className="eyebrow">{selected?.subject || "EXPEDIÇÃO"}</span><h2 id="game-title">{finished ? "Expedição concluída!" : breakTime ? "Uma pausa também é descoberta." : selected?.name}</h2></div><span className="game-stars"><Star size={19} fill="currentColor" />{save.stars}</span></header>
      {trip && <div className="session-bar"><span><Clock3 size={16} />{breakTime ? "Pausa" : "Nesta missão"} {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")} / {breakTime ? "2:00" : "8:00"}</span><button onClick={() => setPaused(p => !p)}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? "Continuar" : "Pausar"}</button></div>}
      {finished ? <div className="finish-screen"><div className="finish-medal"><Trophy size={64} /></div><h3>Seu universo ficou maior!</h3><p>Seis mundos explorados! Descanse um pouco e conte a alguém qual foi a sua descoberta favorita.</p><button className="primary" onClick={close}>Voltar ao universo</button></div> : paused ? <div className="finish-screen"><Pause size={50} /><h3>No seu tempo.</h3><button className="primary" onClick={() => setPaused(false)}>Continuar aventura</button></div> : breakTime ? <div className="finish-screen"><Coffee size={60} /><h3>Água, alongamento e uma pausa!</h3><p>Encontre três coisas da mesma cor longe da tela. A aventura continua depois de 2 min.</p></div> : null}
      {active && !finished && !breakTime && <div hidden={paused}><Game key={`${active}-${round}`} kind={active} age={save.age} paused={paused} onWin={() => earned(active)} /></div>}
      {reward && <div className="reward-burst" aria-hidden="true"><Star size={27} fill="currentColor" /><strong>+10</strong><Sparkles size={25} /></div>}
    </section></div>}
  </div>;
}
