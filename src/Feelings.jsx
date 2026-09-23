import React from 'react';

export const feelings = [
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
    <span>{feeling.label}</span>
    <span className="face-art" aria-hidden="true">
      <img className="face-background" src={asset(`imgEllipse${feeling.ellipse}`)} alt=""/>
      <img className="expression" src={asset(`imgFrame${feeling.face}`)} alt=""/>
    </span>
  </button>;
}

export default function Feelings({selected,onSelect,onContinue,headingRef}) {
  return <div className="check-in-content">
    <div className="check-in-heading">
      <p className="eyebrow">A LITTLE CHECK-IN</p>
      <h1 ref={headingRef} tabIndex={-1}>ตอนนี้…รู้สึกยังไงบ้าง?</h1>
      <p className="description">เลือกคำที่ใกล้กับคุณที่สุด ไม่ต้องเป็นคำตอบที่เป๊ะก็ได้</p>
    </div>
    <div className="choices">
      <div className="feelings" role="group" aria-label="ตอนนี้…รู้สึกยังไงบ้าง?">
        {feelings.map((feeling,index)=><FeelingCard key={feeling.label} feeling={feeling} index={index} selected={selected===index} onSelect={()=>onSelect(index)}/>)}
      </div>
      <p className="support"><img src={asset('imgIconFavoriteRegular')} alt=""/>ทุกความรู้สึกมีพื้นที่ตรงนี้ ไม่มีคำตอบผิด</p>
      <button className="continue" disabled={selected===null} onClick={onContinue}>เลือกความรู้สึกเพื่อไปต่อ<img src={asset('imgIconArrowSmallRight')} alt=""/></button>
    </div>
  </div>;
}
