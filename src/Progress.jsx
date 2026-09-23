import React, {useRef} from 'react';

export default function Progress({screen}) {
 const previousStep=useRef(1);
 if(screen==='summary'||screen==='restart'){
  previousStep.current=1;
  return null;
 }
 const step=screen==='feelings'?1:screen==='needs'?2:3;
 const fromStep=previousStep.current;
 previousStep.current=step;
 const label=['ฟังความรู้สึก','เลือกสิ่งที่ต้องการ','ให้เวลากับตัวเอง'][step-1];
 return <div className="journey-progress">
  <div className="journey-progress-label"><span>ขั้นตอนที่ {step} จาก 3</span><span className="journey-section">{label}</span><span className="journey-duration">ใช้เวลาประมาณ 2 นาที</span></div>
  <div className="journey-progress-track" role="progressbar" aria-label="ขั้นตอนช่วงพัก" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step} aria-valuetext={`ขั้นตอนที่ ${step} จาก 3: ${label}`}><span key={step} style={{'--progress-from':`${fromStep/3*100}%`,'--progress-to':`${step/3*100}%`}}/></div>
 </div>;
}
