import React from 'react';
import Feelings from './Feelings';
import Needs from './Needs';
import Rest from './Rest';
import Reflection from './Reflection';
import Completion from './Completion';

export function screenClass(screen) {
  if(screen==='needs')return 'needs-screen';
  if(screen==='rest'||screen==='observe')return 'rest-screen';
  if(screen==='think'||screen==='talk')return `${screen}-screen`;
  if(screen==='summary'||screen==='restart')return 'completion-screen';
  return '';
}

export default function JourneyScreen({journey}) {
  const {screen,heading}=journey;

  if(screen==='summary'||screen==='restart'){
    return <Completion
      screen={screen}
      feeling={journey.feeling}
      need={journey.selectedNeed}
      thought={journey.takeaway}
      headingRef={heading}
      onBack={journey.backFromSummary}
      onFinish={()=>journey.navigate('restart')}
      onRestart={journey.restart}
    />;
  }
  if(screen==='think'||screen==='talk'){
    return <Reflection
      key={screen}
      screen={screen}
      headingRef={heading}
      onBack={journey.backToNeeds}
      draft={journey.reflectionDraft}
      onChange={journey.changeReflection}
      onSave={journey.saveReflection}
    />;
  }
  if(screen==='rest'||screen==='observe'){
    return <Rest
      screen={screen}
      headingRef={heading}
      completed={screen==='observe' && journey.restCompleted}
      onBack={journey.backFromRest}
      onNext={journey.continueFromRest}
      onSkip={journey.skipRest}
    />;
  }
  if(screen==='needs' && journey.selected!==null){
    return <Needs
      feeling={journey.feeling}
      selected={journey.selectedNeed}
      onSelect={journey.selectNeed}
      onBack={journey.backToFeelings}
      headingRef={heading}
      onConfirm={journey.confirmNeed}
    />;
  }
  return <Feelings
    selected={journey.selected}
    onSelect={journey.selectFeeling}
    onContinue={journey.continueFromFeelings}
    headingRef={heading}
  />;
}
