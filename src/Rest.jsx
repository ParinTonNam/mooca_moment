import React from 'react';

export const restCopy = {
  rest: {
    title:'วางความเร่งรีบไว้สักครู่',
    description:'ถ้าสะดวก ลองพักมือจากสิ่งที่ทำ แล้วมองออกจากหน้าจอสักครู่',
    prompt:'ช่วงนี้ ไม่ต้องทำอะไรให้สำเร็จ',
    detail:'พักตามจังหวะที่สบาย แล้วกดต่อเมื่อพร้อม',
    action:'พร้อมแล้ว ไปต่อเบาๆ',
  },
  observe: {
    title:'เก็บหนึ่งอย่างจากรอบตัว',
    description:'มองหาสิ่งหนึ่งที่อยู่ใกล้ตัว ลองสังเกตสี รูปร่าง หรือรายละเอียดเล็ก ๆ ของมัน',
    prompt:'เลือกสังเกตเพียงหนึ่งอย่างก็พอ',
    detail:'จะเป็นแสงบนโต๊ะ หรือสีของแก้วใกล้ ๆ ก็ได้',
    action:'สังเกตแล้ว เก็บช่วงเวลานี้ไว้',
  },
};

export default function Rest({screen,onBack,onNext,onSkip,headingRef,completed}) {
  const copy=restCopy[screen];
  return <div className="check-in-content rest-content">
    <div className="check-in-heading">
      <div className="needs-topline"><p className="eyebrow">ONE SMALL MOMENT</p><button type="button" className="back-button" onClick={onBack}><img src="/assets/back-arrow.svg" alt=""/>ย้อนกลับ</button></div>
      <h1 ref={headingRef} tabIndex={-1}>{copy.title}</h1>
      <p className="description">{copy.description}</p>
    </div>
    <div className="rest-panel">
      <div className="rest-illustration" aria-hidden="true"><img className="rest-inner-circle" src="/assets/rest-inner-circle.svg" alt=""/><img className="rest-outer-circle" src="/assets/rest-outer-circle.svg" alt=""/><img className="rest-happy" src="/assets/mooca-happy.svg" alt=""/></div>
      <div className="rest-copy"><h2>{copy.prompt}</h2><p>{copy.detail}</p></div>
    </div>
    <div className="rest-actions">
      <p className="support"><span className="rest-clock"><img src="/assets/rest-clock.svg" alt=""/></span>ใช้เวลาสัก 20–30 วินาที หรือนานเท่าที่อยากพัก</p>
      <div className="rest-buttons"><button className="continue" onClick={onNext} disabled={completed}>{copy.action}<img src={completed?'/assets/step-check.svg':'/assets/imgIconArrowSmallRight.svg'} alt=""/></button><button type="button" className="skip-button" onClick={onSkip}>ตอนนี้ยังไม่สะดวก ข้ามกิจกรรม</button></div>
      <span className="sr-only" role="status">{completed?'เก็บช่วงเวลานี้ไว้แล้ว':''}</span>
    </div>
  </div>;
}
