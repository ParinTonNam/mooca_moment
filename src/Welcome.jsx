import React from 'react';
import Mascot from './Mascot';
import MobileWelcome from './MobileWelcome';

const asset = name => `/assets/${name}.svg`;

export default function Welcome({initial}) {
  return <aside className="welcome">
    <MobileWelcome initial={initial}/>
    <div className="welcome-inner">
      <p className="pill">พื้นที่เล็กๆ ให้ใจได้พัก</p>
      <div className="welcome-heading"><p>ไม่ต้องพร้อมทุกเรื่อง</p><h2>ก็เริ่มดูแลใจได้</h2></div>
      <div className="illustration">
        <img className="inner-circle" src={asset('imgEllipse1')} alt=""/>
        <img className="outer-circle" src={asset('imgEllipse2')} alt=""/>
        <div className="hero-mascot" role="img" aria-label="Mooca กอด Sunny"><Mascot/></div>
        <p className="reassurance">วันนี้ เราอยู่ตรงนี้ด้วยนะ</p>
      </div>
      <p className="welcome-note">แค่ช่วงเวลาสั้นๆ<br/><span>ที่คุณไม่ต้องไปไหน</span></p>
    </div>
  </aside>;
}
