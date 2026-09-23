import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/prompt/300.css';
import '@fontsource/prompt/400.css';
import '@fontsource/prompt/500.css';
import '@fontsource/prompt/600.css';
import Mascot from './Mascot';
import MobileWelcome from './MobileWelcome';
import Progress from './Progress';
import Needs from './Needs';
import Rest from './Rest';
import Completion from './Completion';
import Reflection, {starterMessage} from './Reflection';
import './styles.css';
import './needs.css';
import './rest.css';
import './reflection.css';
import './completion.css';
import './mobile.css';
import './progress.css';
import './desktop.css';

const feelings = [
  {label:'สบายใจ',background:'#e5f3eb',border:'#355956',ellipse:3,face:22},
  {label:'เหนื่อย',background:'#e8eff8',border:'#465969',ellipse:4,face:29},
  {label:'กังวล',background:'#fff4da',border:'#d97800',ellipse:5,face:23},
  {label:'หงุดหงิด',background:'#fbe7e3',border:'#e44743',ellipse:6,face:30},
  {label:'สับสนวุ่นวาย',background:'#f0e9f8',border:'#69517f',ellipse:7,face:31},
  {label:'ยังบอกไม่ถูก',background:'#f1ede7',border:'#686058',ellipse:8,face:32},
];
const asset = name => `/assets/${name}.svg`;
function FeelingCard({feeling,index,selected,onSelect}) {
 return <button type="button" className={`feeling feeling-${index}${selected?' selected':''}`} style={{background:feeling.background,'--feeling-border':feeling.border}} aria-pressed={selected} onClick={onSelect}>
  <span>{feeling.label}</span><span className="face-art" aria-hidden="true"><img className="face-background" src={asset(`imgEllipse${feeling.ellipse}`)} alt=""/><img className="expression" src={asset(`imgFrame${feeling.face}`)} alt=""/></span>
 </button>;
}
function App(){
 const [selected,setSelected]=useState(null);
 const [screen,setScreen]=useState('feelings');
 const [selectedNeed,setSelectedNeed]=useState(null);
 const [needConfirmed,setNeedConfirmed]=useState(false);
 const [restCompleted,setRestCompleted]=useState(false);
 const [thinkDraft,setThinkDraft]=useState({text:'',choice:null,saved:false});
 const [talkDraft,setTalkDraft]=useState({text:starterMessage,saved:false});
 const isReflection=screen==='think'||screen==='talk';
 const isRest=screen==='rest'||screen==='observe';
 const isCompletion=screen==='summary'||screen==='restart';
 const heading=useRef(null);
 useEffect(()=>{
   const sync=()=>{
     const target=window.location.hash.slice(1);
     if(selected===null){setScreen('feelings');return;}
     if((target==='rest'||target==='observe') && selectedNeed==='rest'){setScreen(target);return;}
     if((target==='think'||target==='talk') && selectedNeed===target){setScreen(target);return;}
     if((target==='summary'||target==='restart') && selectedNeed){setScreen(target);return;}
     setScreen(target==='needs'?'needs':'feelings');
   };
   window.addEventListener('hashchange',sync);
   return ()=>window.removeEventListener('hashchange',sync);
 },[selected,selectedNeed]);
 useLayoutEffect(()=>{
   heading.current?.focus({preventScroll:true});
   window.scrollTo({top:0,left:0,behavior:'instant'});
 },[screen]);
 const navigate=(next)=>{setScreen(next);window.location.hash=next;};
 const back=()=>navigate('feelings');
 const reset=()=>{setSelected(null);setSelectedNeed(null);setNeedConfirmed(false);setRestCompleted(false);setThinkDraft({text:'',choice:null,saved:false});setTalkDraft({text:starterMessage,saved:false});back();};
 const grid=useRef(null);

 const continueCheckIn=()=>{if(selected!==null)navigate('needs');};
 return <div className="page" data-screen={screen}>
  <header className="header shell"><a className="brand" href="#" aria-label="mooca moment" onClick={reset}><div className="brand-mascot"><Mascot/></div><div className="brand-copy"><div className="wordmark"><strong>mooca</strong><span>moment</span></div><p>ช่วงพักเล็ก ๆ กับ ooca</p></div></a><a className="consult" href="https://ooca.co/" target="_blank" rel="noreferrer">เริ่มปรึกษาได้เลย</a></header>
  <main className="shell">
   <Progress screen={screen}/>
   <section className={`check-in ${screen==='needs'?'needs-screen':isRest?'rest-screen':isReflection?`${screen}-screen`:isCompletion?'completion-screen':''}`}>
    <aside className="welcome"><MobileWelcome initial={screen==='feelings'}/><div className="welcome-inner"><p className="pill">พื้นที่เล็กๆ ให้ใจได้พัก</p><div className="welcome-heading"><p>ไม่ต้องพร้อมทุกเรื่อง</p><h2>ก็เริ่มดูแลใจได้</h2></div><div className="illustration"><img className="inner-circle" src={asset('imgEllipse1')} alt=""/><img className="outer-circle" src={asset('imgEllipse2')} alt=""/><div className="hero-mascot" role="img" aria-label="Mooca กอด Sunny"><Mascot/></div><p className="reassurance">วันนี้ เราอยู่ตรงนี้ด้วยนะ</p></div><p className="welcome-note">แค่ช่วงเวลาสั้นๆ<br/><span>ที่คุณไม่ต้องไปไหน</span></p></div></aside>
    {isCompletion ? <Completion screen={screen} feeling={feelings[selected]} need={selectedNeed} thought={['เริ่มจากสิ่งเล็กที่สุดที่ทำได้','พักก่อน แล้วค่อยกลับมาดู','ขอความช่วยเหลือจากใครสักคน'][thinkDraft.choice]} headingRef={heading} onBack={()=>{setRestCompleted(false);navigate(selectedNeed==='rest'?'observe':selectedNeed);}} onFinish={()=>navigate('restart')} onRestart={reset}/> : isReflection ? <Reflection key={screen} screen={screen} headingRef={heading} onBack={()=>navigate('needs')} draft={screen==='think'?thinkDraft:talkDraft} onChange={screen==='think'?setThinkDraft:setTalkDraft} onSave={()=>{if(screen==='think')setThinkDraft(d=>({...d,saved:true}));else setTalkDraft(d=>({...d,saved:true}));navigate('summary');}}/> : isRest ? <Rest screen={screen} headingRef={heading} completed={screen==='observe' && restCompleted} onBack={()=>navigate(screen==='observe'?'rest':'needs')} onNext={()=>{if(screen==='rest')navigate('observe');else {setRestCompleted(true);navigate('summary');}}} onSkip={()=>{setRestCompleted(false);navigate('needs');}}/> : screen==='needs' && selected!==null ? <Needs feeling={feelings[selected]} selected={selectedNeed} onSelect={id=>{setSelectedNeed(id);setNeedConfirmed(false);}} onBack={back} headingRef={heading} confirmed={needConfirmed} onConfirm={()=>{if(selectedNeed==='rest'){setRestCompleted(false);navigate('rest');}else if(selectedNeed)navigate(selectedNeed);}}/> : <div className="check-in-content"><div className="check-in-heading"><p className="eyebrow">A LITTLE CHECK-IN</p><h1 ref={heading} tabIndex={-1}>ตอนนี้…รู้สึกยังไงบ้าง?</h1><p className="description">เลือกคำที่ใกล้กับคุณที่สุด ไม่ต้องเป็นคำตอบที่เป๊ะก็ได้</p></div><div className="choices"><div className="feelings" ref={grid} role="group" aria-label="ตอนนี้…รู้สึกยังไงบ้าง?">{feelings.map((feeling,index)=><FeelingCard key={feeling.label} feeling={feeling} index={index} selected={selected===index} onSelect={()=>{setSelected(index);setNeedConfirmed(false);setRestCompleted(false);}}/>)}</div><p className="support"><img src={asset('imgIconFavoriteRegular')} alt=""/>ทุกความรู้สึกมีพื้นที่ตรงนี้ ไม่มีคำตอบผิด</p><button className="continue" disabled={selected===null} onClick={continueCheckIn}>เลือกความรู้สึกเพื่อไปต่อ<img src={asset('imgIconArrowSmallRight')} alt=""/></button></div></div>}
   </section>
  </main>
  <footer><div className="shell"><span>mooca moment</span><span>OOCA – Assignment</span></div></footer>
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
