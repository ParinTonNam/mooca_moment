import React from 'react';

export const needs = [
  {id:'rest',title:'ขอพักสักครู่',description:'เว้นที่ว่าง โดยยังไม่ต้องแก้อะไร',image:'mooca-rest-transparent.svg'},
  {id:'think',title:'ขอให้ความคิดชัดขึ้น',description:'หยิบเรื่องในหัวออกมาดูทีละเรื่อง',image:'mooca-think.svg'},
  {id:'talk',title:'ขอคุยกับใครสักคน',description:'เตรียมคำพูดเล็ก ๆ\nเพื่อเริ่มบทสนทนา',image:'mooca-talk.svg'},
];

export default function Needs({feeling,selected,onSelect,onBack,headingRef,confirmed,onConfirm}) {
  return <div className="check-in-content needs-content">
    <div className="check-in-heading">
      <div className="needs-topline"><p className="eyebrow">LISTEN TO YOUR NEEDS</p><button type="button" className="back-button" onClick={onBack}><img src="/assets/back-arrow.svg" alt=""/>ย้อนกลับ</button></div>
      <h1 ref={headingRef} tabIndex={-1}>ใจคุณอยากได้อะไรตอนนี้?</h1>
      <p className="description">เลือกสิ่งที่อยากให้ตัวเองได้รับในช่วงเวลาสั้น ๆ นี้</p>
      <p className="chosen-feeling">ตอนนี้คุณเลือก<span style={{background:feeling.background}}>{feeling.label}</span></p>
    </div>
    <div className="needs-grid" role="group" aria-label="ใจคุณอยากได้อะไรตอนนี้?">
      {needs.map(need=><button key={need.id} type="button" className={`need-card need-${need.id}${selected===need.id?' selected':''}`} aria-pressed={selected===need.id} onClick={()=>onSelect(need.id)}>
        <span className="need-copy"><span className="need-title">{need.title}</span><span className="need-description">{need.description}</span></span>
        <span className="need-art"><img src={`/assets/${need.image}`} alt=""/></span>
      </button>)}
    </div>
    <div className="needs-actions"><p className="support">เลือกได้หนึ่งอย่าง และเปลี่ยนใจได้เสมอ<img src="/assets/imgIconFavoriteRegular.svg" alt=""/></p><button type="button" className="continue" disabled={!selected} aria-pressed={confirmed} onClick={onConfirm}>ให้สิ่งนี้กับตัวเอง<img src={confirmed?'/assets/step-check.svg':'/assets/imgIconArrowSmallRight.svg'} alt=""/></button></div>
  </div>;
}
