'use client';
import { useEffect, useRef, useState } from 'react';
import './Home.scss';
import Image from 'next/image';
import { MONTH, WEEK, MONTHS } from '../types/consts/calendar.const';
import DailyInput from '../components/DailyInput/DailyInput';
import { DailyTasks } from '@/types/interfaces/calendar.interface';
import { Stack, TextField } from '@mui/material';
import Calendar from '../components/Calendar/Calendar';
import { todoTasksMockTest, todoTasksNextMockTest, todoTasksPrevMockTest } from '@/mocks/todo-mock-test';
import TaskDetailDialog from '../components/TaskDetailDialog/TaskDetailDialog';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Home() {

  const [calendarType, setCalendarType] = useState(WEEK);
  const [isCalendarClicked, setIsCalendarClicked] = useState(false);
  const [weekTasks, setWeekTasks] = useState<Array<DailyTasks>>([]);
  const [weekNum, setWeekNum] = useState(0);

  const dialog = useSelector((state: RootState) => state.dialog);

  const isBrowser = typeof window !== 'undefined';
  let firstDayOfWeek = new Date();
  const nav = useRef<HTMLElement | null>(null);
  const layerBackground = useRef<HTMLElement | null>(null);

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

    setWeekTasks(todoTasksMockTest);
    firstDayOfWeek = new Date(todoTasksMockTest[0].date);

    if(isBrowser) {
      nav.current = document.getElementsByClassName('home-nav-calendar')[0] as HTMLElement;
      layerBackground.current = document.getElementsByClassName('background-layer')[0] as HTMLElement;
    }
  }, [])

  const onToggleCalendarType = () => {
    if (calendarType === WEEK) {
      setCalendarType(MONTH);
      return;
    }
    setCalendarType(WEEK);
  }

  const handleShowCalendar = () => {
    setIsCalendarClicked(true);
    nav.current?.classList.add("show-nav-calendar");
    layerBackground.current?.classList.add("show-calendar")
  }

  const handleClickBackgroundLayer = () => {
    setIsCalendarClicked(false);
    nav.current?.classList.remove("show-nav-calendar");
    layerBackground.current?.classList.remove("show-calendar")
  }

  const onMoveToPrevMonth = () => {
    if(weekNum === 0) {
      setWeekTasks(todoTasksPrevMockTest);
      setWeekNum(weekNum => weekNum - 1);
    }
    if(weekNum > 0 && weekNum <= 1) {
      setWeekTasks(todoTasksMockTest);
      setWeekNum(weekNum => weekNum - 1);
    }
  }

  const onMoveToNextMonth = () => {
    if(weekNum === 0) {
      setWeekTasks(todoTasksNextMockTest);
      setWeekNum(weekNum => weekNum + 1);
    }
    if(weekNum >= -1 && weekNum < 0) {
      setWeekTasks(todoTasksMockTest);
      setWeekNum(weekNum => weekNum + 1);
    }
    
  }

  return (
    <div className="home">
      <div className="calendar-header">
        <h1 onClick={() => handleShowCalendar()}>{MONTHS[firstDayOfWeek.getMonth()]} {firstDayOfWeek.getFullYear()}</h1>
        <div className="calendar-options">
          <button onClick={() => onToggleCalendarType()}>{calendarType}</button>
          <ul>
            <li onClick={() => onMoveToPrevMonth()}>
              <button>
                <Image 
                  src="/assets/icons/arrow-left.png" 
                  alt="arrow-left" 
                  height={12} 
                  width={7}
                ></Image>
              </button>
            </li>
            <li onClick={() => onMoveToNextMonth()}>
              <button>
                <Image 
                  src="/assets/icons/arrow-right.png" 
                  alt="arrow-right" 
                  height={12} 
                  width={7}
                ></Image>
              </button>
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
          className="calendar-body-wrapper"
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {weekTasks.map((task, index) => (
            <DailyInput key={index} task={task} num={index}/>
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

      <div>
        {dialog.isDialogOpened && <TaskDetailDialog 
          isDialogOpened={dialog.isDialogOpened}
          date={dialog.date}
          task={dialog.task}
        />}
      </div>
    </div>
  );
}
