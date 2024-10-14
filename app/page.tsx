'use client';
import { useEffect, useState } from 'react';
import './Home.scss';
import Image from 'next/image';
import { MONTH, WEEK } from '../types/consts/calendar.const';
import DailyInput from './components/DailyInput/DailyInput';
import { Dates } from '@/types/interfaces/calendar.interface';
import { Stack, TextField } from '@mui/material';
import Calendar from './components/Calendar/Calendar';

export default function Home() {

  const [calendarType, setCalendarType] = useState(WEEK);
  const [isCalendarClicked, setIsCalendarClicked] = useState(false);

  useEffect(() => {
    const currentDay = new Date(2024, 10, 1);
    const indexDayOfWeek = currentDay.getDay();
    const indexDayOfMonth = currentDay.getDate();
    const week: Array<Date> = [];

    // Loop through 7 days of week - Monday to Sunday
    for(let i = 1; i <= 7; i++) {
      const indexOfDay = indexDayOfMonth - indexDayOfWeek + i;
      const newDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), indexOfDay);
      week.push(newDay);
    }
  }, [])

  const onToggleCalendarType = () => {
    if (calendarType === WEEK) {
      setCalendarType(MONTH);
      return;
    }
    setCalendarType(WEEK);
  }

  const week: Array<Dates> = [
    {day: "Mon", date: "20th"},
    {day: "Tue", date: "21st"},
    {day: "Wed", date: "22sd"},
    {day: "Thu", date: "23rd"},
    {day: "Fri", date: "24th"},
    {day: "Sat", date: "25th"},
    {day: "Sun", date: "26th"},
  ]

  const handleShowCalendar = () => {
    setIsCalendarClicked(true);
    const nav = document.getElementsByClassName('home-nav-calendar')[0];
    nav.classList.add("show-nav-calendar");

    const layerBackground = document.getElementsByClassName('background-layer')[0];
    layerBackground.classList.add("show-calendar")
  }

  const handleClickBackgroundLayer = () => {
    setIsCalendarClicked(false);
    const nav = document.getElementsByClassName('home-nav-calendar')[0];
    nav.classList.remove("show-nav-calendar");

    const layerBackground = document.getElementsByClassName('background-layer')[0];
    layerBackground.classList.remove("show-calendar")
  }

  return (
    <div className="home">
      <div className="calendar-header">
        <h1 onClick={() => handleShowCalendar()}>OCTOBER 2024</h1>
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

      <div className="calendar-body">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {week.map((dates, index) => (
            <DailyInput key={index} dates={dates} />
          ))}
        </Stack>  
      </div>

      <div className="calendar-footer">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="calendar-footer-section">
            <div className="calendar-footer-title">
              <h4>Note</h4>
            </div>
            <Stack
              className="calendar-footer-body"
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => (
                <TextField 
                  disabled
                  fullWidth 
                  key={i} 
                  id="standard-basic" 
                  variant="standard" 
                  style={{borderBottom: i%2===0 ? "1px solid #F5F5F7" : "1px solid #D2D2D7"}}
                />
              ))}
            </Stack>
          </div>
          
          <div className="calendar-footer-section">
            <div className="calendar-footer-title">
              <h4>Reflection</h4>
            </div>

            <Stack
              className="calendar-footer-body"
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => (
                <TextField 
                  disabled
                  fullWidth 
                  key={i} 
                  id="standard-basic" 
                  variant="standard" 
                  style={{borderBottom: i%2===0 ? "1px solid #F5F5F7" : "1px solid #D2D2D7"}}
                />
              ))}
            </Stack>
          </div>
        </Stack>  
      </div>

      <div className="home-nav-calendar">
        <Calendar isShowedCalendar={isCalendarClicked}/>
      </div>

      <div className="background-layer" onClick={() => handleClickBackgroundLayer()}></div>
    </div>
  );
}
