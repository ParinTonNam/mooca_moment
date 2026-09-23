import React from 'react';
import Mascot from './Mascot';
import Progress from './Progress';
import Welcome from './Welcome';
import JourneyScreen, {screenClass} from './JourneyScreen';
import useJourney from './useJourney';

export default function App() {
  const journey=useJourney();
  const {screen}=journey;

  return <div className="page" data-screen={screen}>
    <header className="header shell">
      <a className="brand" href="#" aria-label="mooca moment" onClick={journey.restart}>
        <div className="brand-mascot"><Mascot/></div>
        <div className="brand-copy"><div className="wordmark"><strong>mooca</strong><span>moment</span></div><p>ช่วงพักเล็ก ๆ กับ ooca</p></div>
      </a>
      <a className="consult" href="https://ooca.co/" target="_blank" rel="noreferrer" aria-label="ดูบริการปรึกษาของ ooca">
        <span className="consult-label-desktop">ดูบริการปรึกษาของ ooca</span>
        <span className="consult-label-mobile">ดูบริการ ooca</span>
      </a>
    </header>
    <main className="shell">
      <Progress screen={screen}/>
      <section className={`check-in ${screenClass(screen)}`}>
        <Welcome initial={screen==='feelings'}/>
        <JourneyScreen journey={journey}/>
      </section>
    </main>
    <footer><div className="shell"><span>mooca moment</span><span>OOCA – Assignment</span></div></footer>
  </div>;
}
