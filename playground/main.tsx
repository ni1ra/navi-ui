import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppShell, Button, CommandDock, Modal, NaviProvider, SegmentedControl, SelectField, Surface, Tabs, TextField, ThemeSwitcher, TopNav } from '../src';
import '../src/styles.css';
import './playground.css';

function Mark() { return <span className="play-mark"><span>N</span> NAVI UI</span>; }

function Playground() {
  const [pace, setPace] = useState<'steady' | 'pressure' | 'sudden'>('pressure');
  const [modal, setModal] = useState(false);
  return <NaviProvider>
    <AppShell
      nav={<TopNav brand={<Mark />} actions={<ThemeSwitcher />}><a href="#system">System</a><a href="#controls">Controls</a><a href="#states">States</a></TopNav>}
      dock={<CommandDock><Button variant="ghost" size="sm">⌘ Search</Button><Button variant="secondary" size="sm">Preview</Button><Button size="sm" onClick={() => setModal(true)}>Ship blueprint</Button></CommandDock>}
    >
      <header className="play-hero" id="system">
        <div className="play-hero__copy"><span className="play-kicker">Blueprint 01 / Live system</span><h1>One grammar.<br/><em>Three temperatures.</em></h1><p>Navi UI turns semantic decisions into expressive product surfaces—without cloning components for every mood.</p><div className="play-actions"><Button size="lg" onClick={() => setModal(true)}>Inspect release</Button><Button size="lg" variant="ghost">Read the contract ↗</Button></div></div>
        <div className="play-orbit" aria-label="Theme blueprint visualization"><div className="play-orbit__ring"/><div className="play-orbit__core">1.0<span>stable</span></div><span className="play-orbit__label play-orbit__label--one">BLACK</span><span className="play-orbit__label play-orbit__label--two">SILVER</span><span className="play-orbit__label play-orbit__label--three">BLOOD</span></div>
      </header>

      <section className="play-workbench" id="controls">
        <div className="play-section-heading"><div><span className="play-kicker">Interactive specimen</span><h2>A match room, under pressure.</h2></div><SegmentedControl label="Match pace" value={pace} onChange={setPace} options={[{value:'steady',label:'Steady'},{value:'pressure',label:'Pressure'},{value:'sudden',label:'Sudden death'}]} /></div>
        <Surface tone="raised" className="play-match">
          <div className="play-score"><div><span className="play-kicker">Leg 03 / Best of 5</span><h3>501 <span>→</span> 141</h3><p>Checkout path · T20 · T19 · D12</p></div><div className="play-live"><i/> LIVE</div></div>
          <div className="play-board" aria-label="Abstract dart board"><div className="play-board__disc"><div className="play-board__wire"/><b>60</b><span>last throw</span></div></div>
          <div className="play-controls"><Tabs label="Scoring input" items={[{id:'keypad',label:'Keypad',content:<div className="play-field-grid"><TextField label="Score" inputMode="numeric" defaultValue="60" hint="1 dart · T20"/><SelectField label="Throw result" defaultValue="valid" options={[{value:'valid',label:'Valid throw'},{value:'bounce',label:'Bounce out'},{value:'miss',label:'Miss'}]}/></div>},{id:'voice',label:'Always-on voice',content:<p className="play-muted">Listening for “sixty”, “undo”, or a checkout command.</p>},{id:'board',label:'Board input',content:<p className="play-muted">Tap a segment on the connected visual board.</p>}]} /><div className="play-submit"><Button variant="secondary">Undo</Button><Button>Register 60</Button></div></div>
        </Surface>
      </section>

      <section className="play-states" id="states">
        <div className="play-section-heading"><div><span className="play-kicker">State coverage</span><h2>Calm defaults. Loud consequences.</h2></div></div>
        <div className="play-state-line"><span>Actions</span><div><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button><Button loading>Working</Button><Button disabled>Disabled</Button></div></div>
        <div className="play-state-line"><span>Inputs</span><div className="play-inputs"><TextField label="Callsign" defaultValue="NAVI-01" hint="Visible to your crew"/><TextField label="Checkout" defaultValue="179" error="No three-dart checkout exists"/><SelectField label="Mode" defaultValue="x01" options={[{value:'x01',label:'X01'},{value:'cricket',label:'Cricket'},{value:'around',label:'Around the clock'}]}/></div></div>
        <div className="play-state-line"><span>Surfaces</span><div className="play-surfaces"><Surface><b>Default</b><small>Working canvas</small></Surface><Surface tone="inset"><b>Inset</b><small>Quiet containment</small></Surface><Surface tone="accent"><b>Accent</b><small>Current attention</small></Surface></div></div>
      </section>
      <footer className="play-footer"><Mark/><p>React primitives · semantic tokens · accessible by default</p><span>v1.0.0</span></footer>
      <Modal open={modal} onClose={() => setModal(false)} title="Blueprint ready" description="This dialog proves focus, escape, backdrop, and responsive behavior." footer={<><Button variant="ghost" onClick={() => setModal(false)}>Not yet</Button><Button onClick={() => setModal(false)}>Confirm release</Button></>}><p className="play-modal-copy">The package exposes a stable React API, all three complete themes, and one CSS contract. Dartio can consume it without copying source.</p></Modal>
    </AppShell>
  </NaviProvider>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><Playground /></StrictMode>);
