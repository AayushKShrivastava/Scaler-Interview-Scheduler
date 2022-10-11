import React, { useState } from 'react'
import '../css/Header.css'
import Overlay from './Overlay';
import SchedulerForm from './SchedulerForm';

function Header() {

   const [seen, setSeen] = useState(false);

  return (
    <div className='header'>
        <p className="header-title">Scaler Interview Scheduler</p>
        <button className='header-scheduler' onClick={()=>setSeen(true)}>Schedule an Interview</button>
        {seen && <SchedulerForm toggle = {()=>setSeen(false)}/> }
        {seen  && <Overlay />}

    </div>

    
  )
}

export default Header