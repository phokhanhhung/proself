'use client';
import { useState } from 'react';
import './Home.scss';
import Image from 'next/image';
import { MONTH, WEEK } from '../types/consts/calendar.const';

export default function Home() {

  const [calendarType, setCalendarType] = useState(WEEK);

  const onToggleCalendarType = () => {
    if (calendarType === WEEK) {
      setCalendarType(MONTH);
      return;
    }
    setCalendarType(WEEK);
  }

  return (
    <div className="home">
      <div className="calendar-header">
        <h1>OCTOBER 2024</h1>
        <div className="calendar-options">
          <button onClick={() => onToggleCalendarType()}>{calendarType}</button>
          <ul>
            <li>
              <Image 
                src="/assets/icons/arrow-left.png" 
                alt="arrow-left" 
                height={12} 
                width={7}
              ></Image>
            </li>
            <li>
              <Image 
                src="/assets/icons/arrow-right.png" 
                alt="arrow-right" 
                height={12} 
                width={7}
              ></Image>
            </li>
            <li>
            <Image 
                src="/assets/icons/option.png" 
                alt="option" 
                height={18} 
                width={4}
              ></Image>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
