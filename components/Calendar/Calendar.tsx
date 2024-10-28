"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import "./Calendar.scss";
import Image from "next/image";
import { MONTHS } from "@/types/consts/calendar.const";
import { isSameDate } from "@/utils/date-handle.util";

type MonthDays = { month: string; daysInMonth: Date[] };

const months = MONTHS;

const currentDateStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "90px",
  backgroundColor: "#00B4D8",
  color: "#ffffff"
}

const Calendar = ({isShowedCalendar}: any) => {
  const currentMonthRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);
  
  const currentDate = new Date();

  const [monthsInYear, setMonthsInYear] = useState(Array<MonthDays>);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isCalendarRendered, setIsCalendarRendered] = useState(false);

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
  
    // Loop through the days of the month
    while (date.getMonth() === month) {
      days.push(new Date(date)); 
      date.setDate(date.getDate() + 1); 
    }
    return days;
  }

  useEffect(() => {
      console.log("hehe click ne");
      const newMonthsInYear: MonthDays[] = months.map((month, index) => {
        console.log(year)
        const arrOfDays = getDaysInMonth(index, year);
        return { month, daysInMonth: arrOfDays };
      });
      setMonthsInYear(newMonthsInYear);
  }, [isCalendarRendered, year])

  useEffect(() => {
    if(currentDate.getFullYear() === year) {
      handleScrollIntoView(currentMonthRef);
    } else {
      handleScrollIntoView(monthsRef)
    }
    setIsCalendarRendered(true);
  }, [isShowedCalendar, year]);

  const handleScrollIntoView = (node: RefObject<HTMLElement>) => {
    if (node.current) {
      (node.current as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Element not found:');
    }
  }

  const getDayOfMonth = (month: number, year: number, day: number): number => {
    const date = new Date(year, month, day);
    return date.getDay();
  }

  const handleMoveToPreviousYear = () => {
    setYear(year => year - 1);
  }

  const handleMoveToNextYear = () => {
    setYear(year => year + 1);
  }

  return (
    <div className="calendar" id="calendar">
      <div className="calendar-header">
        <h1>
          {year}
        </h1>

        <div className="year-direction">
          <button onClick={() => handleMoveToPreviousYear()}>
            <Image 
              src="/assets/icons/arrow-left.png" 
              alt="arrow-left" 
              height={12} 
              width={7}
            ></Image>
          </button>
          <button onClick={() => handleMoveToNextYear()}>
            <Image 
              src="/assets/icons/arrow-right.png" 
              alt="arrow-right" 
              height={12} 
              width={7}
            ></Image>
          </button>
        </div>
      </div>

      <div className="calendar-body">
        <div className="calendar-months" ref={monthsRef}>
          {monthsInYear.map((month, index) => {
            console.log(month)
            let  startDate = getDayOfMonth(index, year, 1);
            // getDay return 0 - 6 --> Sun - Sat. However, in this app, Sunday should be 7 due to our calendar is from Mon - Sun 
            startDate = startDate === 0 ? 6 : startDate - 1;  
            const endDate = getDayOfMonth(index, year, month.daysInMonth.length - 1);
            let emptyStartDates: Array<number> = [];
            if (startDate > 0 ){
              emptyStartDates = Array(startDate).fill(null);
            }
            let emptyEndDates: Array<number> = [];
            if (6 - endDate === 0) {
              emptyEndDates = [];
            } else if (6 - endDate > 0) {
              emptyEndDates = Array(6 - endDate).fill(null);
            }
            
            const numberOfWeekInMonth = Math.ceil((emptyStartDates.length + month.daysInMonth.length) / 7) ;
            const arrayNumberOfWeekInMonth = Array.from({ length: numberOfWeekInMonth }, (_, index) => index + 1);
            let endDateOfWeek = 7 - emptyStartDates.length;
            let startDateOfWeek = 0;
            return (
              <div key={index} className="month" id={`month-${index}`} ref={(currentDate.getFullYear() === year && currentDate.getMonth() === index) ? currentMonthRef : null}>
                <h2>{month.month}</h2>
                <div className="days-grid">
                  {
                    arrayNumberOfWeekInMonth.map((num) => {
                      const daysToDisplay = month.daysInMonth.slice(startDateOfWeek, endDateOfWeek); 
                      startDateOfWeek = endDateOfWeek;   
                      endDateOfWeek += 7;
                      if (num === 1) {
                        return (
                          <div key={num} className="row-week">
                            {
                              emptyStartDates.map((_, idx) => (
                                <div key={`empty-${idx}`} className="day empty"></div> 
                              ))
                            }

                            {
                              daysToDisplay.map((day) => (
                                  <div className="day" key={day.getDate()}>
                                    <p style={isSameDate(day, currentDate) ? currentDateStyle : {}}>
                                      {day.getDate()}<br />
                                    </p>
                                  </div>
                                ))
                            }
                          </div>
                        )
                      } else {
                        return (
                          <div key={num} className="row-week">
                            {
                              daysToDisplay.map((day) => (
                                  <div className="day" key={day.getDate()}>
                                    <p style={isSameDate(day, currentDate) ? currentDateStyle : {}}>
                                      {day.getDate()}<br />
                                    </p>
                                  </div>
                                ))
                            }
                            {
                              num === numberOfWeekInMonth && (
                                emptyEndDates.map((_, idx) => (
                                  <div key={`empty-${idx}`} className="day empty"></div> 
                                ))
                              )
                            }
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;