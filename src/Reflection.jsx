import React, {useRef, useState} from 'react';

export const starterMessage='วันนี้เรามีเรื่องอยู่ในหัวนิดหน่อย ถ้าเธอสะดวก เราขอคุยด้วยสักพักได้ไหม ยังไม่ต้องช่วยหาคำตอบก็ได้ แค่รับฟังก็พอ';
const options=['เริ่มจากสิ่งเล็กที่สุดที่ทำได้','พักก่อน แล้วค่อยกลับมาดู','ขอความช่วยเหลือจากใครสักคน'];

export default function Reflection({screen,headingRef,onBack,draft,onChange,onSave}) {
 const isThink=screen==='think';
 const [copyStatus,setCopyStatus]=useState('');
 const message=useRef(null);
 const update=patch=>{setCopyStatus('');onChange({...draft,...patch,saved:false});};
 async function copyMessage(){
  try{await navigator.clipboard.writeText(draft.text);setCopyStatus('คัดลอกแล้ว');}
  catch{message.current?.focus();message.current?.select();setCopyStatus('เลือกข้อความแล้ว กดคัดลอกได้เลย');}
 }
 return <div className={`check-in-content reflection-content ${screen}-content`}>
  <div className="check-in-heading">
   <div className="needs-topline"><p className="eyebrow">ONE SMALL MOMENT</p><button type="button" className="back-button" onClick={onBack}><img src="/assets/back-arrow.svg" alt=""/>ย้อนกลับ</button></div>
   <h1 ref={headingRef} tabIndex={-1}>{isThink?'ค่อย ๆ ดูทีละเรื่องก็พอ':'เริ่มจากข้อความเล็ก ๆ'}</h1>
   <p className="description">{isThink?'เลือกเรื่องเดียวที่อยู่ในหัว แล้วหาก้าวเล็ก ๆ ที่เหมาะกับตอนนี้':'นึกถึงคนที่คุณไว้ใจ แล้วปรับข้อความนี้ให้เป็นคำพูดของคุณ'}</p>
  </div>
  <div className="reflection-field">
   <div className="reflection-label"><label htmlFor={`${screen}-text`}>{isThink?'เรื่องที่อยู่ในหัวตอนนี้':'ข้อความเริ่มต้นของคุณ'}</label>{isThink&&<span>ไม่จำเป็นต้องเขียน</span>}</div>
   <textarea id={`${screen}-text`} ref={message} value={draft.text} onChange={e=>update({text:e.target.value})} maxLength={isThink?180:undefined} placeholder={isThink?'เช่น มีหลายเรื่องเข้ามาพร้อมกัน':undefined} aria-describedby={`${screen}-hint`} spellCheck={false}/>
   <div className="reflection-hint" id={`${screen}-hint`}><p>{isThink?'เขียนสั้น ๆ หรือคิดไว้ในใจก็ได้':'ไม่ต้องใส่ชื่อหรือข้อมูลติดต่อของใคร'}</p>{isThink&&<span>{draft.text.length}/180</span>}</div>
  </div>
  {isThink?<fieldset className="reflection-options"><legend>กับเรื่องนี้ ตอนนี้คุณอยาก…</legend>{options.map((option,index)=><label key={option} className={`reflection-option${draft.choice===index?' selected':''}`}><input type="radio" name="small-step" value={index} checked={draft.choice===index} onChange={()=>update({choice:index})}/><img src="/assets/reflection-dot.svg" alt=""/><span>{option}</span></label>)}</fieldset>:<div className="copy-section"><button type="button" className="copy-button" onClick={copyMessage} disabled={!draft.text.trim()}>{copyStatus||'คัดลอกข้อความ'}</button><p>ระบบจะไม่ส่งข้อความ คุณเลือกส่งเองเมื่อพร้อม</p><span className="sr-only" role="status">{copyStatus}</span></div>}
  <div className="rest-buttons"><button type="button" className="continue" onClick={onSave} aria-pressed={draft.saved}>เก็บก้าวเล็กๆ นี้ไว้<img src={draft.saved?'/assets/step-check.svg':'/assets/imgIconArrowSmallRight.svg'} alt=""/></button><button type="button" className="skip-button" onClick={onBack}>ยังไม่อยากเลือกตอนนี้</button><span className="sr-only" role="status">{draft.saved?'เก็บก้าวเล็กๆ นี้ไว้แล้ว':''}</span></div>
 </div>;
}
