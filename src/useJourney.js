import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {feelings} from './Feelings';
import {starterMessage} from './Reflection';

const emptyThinkDraft = () => ({text:'',choice:null,saved:false});
const emptyTalkDraft = () => ({text:starterMessage,saved:false});

export default function useJourney() {
  const [selected,setSelected]=useState(null);
  const [screen,setScreen]=useState('feelings');
  const [selectedNeed,setSelectedNeed]=useState(null);
  const [needConfirmed,setNeedConfirmed]=useState(false);
  const [restCompleted,setRestCompleted]=useState(false);
  const [thinkDraft,setThinkDraft]=useState(emptyThinkDraft);
  const [talkDraft,setTalkDraft]=useState(emptyTalkDraft);
  const heading=useRef(null);

  useEffect(()=>{
    const sync=()=>{
      const target=window.location.hash.slice(1);
      if(selected===null){setScreen('feelings');return;}
      if((target==='rest'||target==='observe') && selectedNeed==='rest'){
        if(target==='observe')setRestCompleted(false);
        setScreen(target);
        return;
      }
      if((target==='think'||target==='talk') && selectedNeed===target){setScreen(target);return;}
      if((target==='summary'||target==='restart') && selectedNeed){setScreen(target);return;}
      setScreen(target==='needs'?'needs':'feelings');
    };
    window.addEventListener('hashchange',sync);
    return ()=>window.removeEventListener('hashchange',sync);
  },[selected,selectedNeed]);

  useLayoutEffect(()=>{
    const title=heading.current;
    title?.focus({preventScroll:true});
    const sectionHeading=title?.closest('.check-in-heading');
    if(!sectionHeading)return;
    const bounds=sectionHeading.getBoundingClientRect();
    if(bounds.top<20||bounds.bottom>window.innerHeight-20){
      window.scrollTo({top:Math.max(0,window.scrollY+bounds.top-20),left:0,behavior:'instant'});
    }
  },[screen]);

  const navigate=next=>{setScreen(next);window.location.hash=next;};
  const backToFeelings=()=>navigate('feelings');
  const backToNeeds=()=>navigate('needs');

  const restart=()=>{
    setSelected(null);
    setSelectedNeed(null);
    setNeedConfirmed(false);
    setRestCompleted(false);
    setThinkDraft(emptyThinkDraft());
    setTalkDraft(emptyTalkDraft());
    backToFeelings();
  };
  const selectFeeling=index=>{
    setSelected(index);
    setNeedConfirmed(false);
    setRestCompleted(false);
  };
  const continueFromFeelings=()=>{if(selected!==null)navigate('needs');};
  const selectNeed=id=>{setSelectedNeed(id);setNeedConfirmed(false);};
  const confirmNeed=()=>{
    if(selectedNeed==='rest'){
      setRestCompleted(false);
      navigate('rest');
    }else if(selectedNeed)navigate(selectedNeed);
  };
  const backFromRest=()=>navigate(screen==='observe'?'rest':'needs');
  const continueFromRest=()=>{
    if(screen==='rest')navigate('observe');
    else {setRestCompleted(true);navigate('summary');}
  };
  const skipRest=()=>{setRestCompleted(false);backToNeeds();};
  const changeReflection=draft=>{
    if(screen==='think')setThinkDraft(draft);
    else setTalkDraft(draft);
  };
  const saveReflection=()=>{
    if(screen==='think')setThinkDraft(draft=>({...draft,saved:true}));
    else setTalkDraft(draft=>({...draft,saved:true}));
    navigate('summary');
  };
  const backFromSummary=()=>{
    setRestCompleted(false);
    navigate(selectedNeed==='rest'?'observe':selectedNeed);
  };

  return {
    screen,
    selected,
    feeling:feelings[selected],
    selectedNeed,
    needConfirmed,
    restCompleted,
    reflectionDraft:screen==='think'?thinkDraft:talkDraft,
    takeaway:['เริ่มจากสิ่งเล็กที่สุดที่ทำได้','พักก่อน แล้วค่อยกลับมาดู','ขอความช่วยเหลือจากใครสักคน'][thinkDraft.choice],
    heading,
    navigate,
    restart,
    selectFeeling,
    continueFromFeelings,
    selectNeed,
    confirmNeed,
    backToFeelings,
    backToNeeds,
    backFromRest,
    continueFromRest,
    skipRest,
    changeReflection,
    saveReflection,
    backFromSummary,
  };
}
