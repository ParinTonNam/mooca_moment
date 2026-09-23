import React from 'react';

export default function MobileWelcome({initial}) {
 return <div className={`welcome-mobile${initial?' welcome-mobile-initial':''}`}>
  {initial?<h2><span>ไม่ต้องพร้อมทุกเรื่อง</span><strong>ก็เริ่มดูแลใจได้</strong></h2>:<p>วันนี้ เราอยู่ตรงนี้ด้วยนะ</p>}
  <img src="/assets/mooca-hugging-sunny.svg" alt="" width="72" height="56"/>
 </div>;
}
