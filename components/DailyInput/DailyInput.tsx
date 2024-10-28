"use client"

import "./DailyInput.scss";
import { DailyTasks, TaskProps } from '@/types/interfaces/calendar.interface';
import { dateToDay, getDaySuffix } from "@/utils/date-handle.util";
import { Stack } from '@mui/material';
import Image from 'next/image';
import Task from "../Task/Task";
import { isSameDate } from '../../utils/date-handle.util';
import { useState } from "react";

const defaultTask: TaskProps = {
  taskName: "",
  isImportant: false,
  isDone: false,
  highlight: 0,
  subTasks: "",
};

const dailyInputHeaderStyles = {
  color: "#00B4D8",
  borderBottom: "#00B4D8 solid 1px",
}

const dailyInputHeaderIconStyles = {
  backgroundColor: "#00B4D8",
}

const DailyInput = ({task, num}: {task: DailyTasks, num: number}) => {
  const date = new Date(task.date);
  const currentDate = new Date();

  const isCurrentDay = isSameDate(currentDate, date);

  return (
    <div className="daily-input">
      <Stack
        style={isCurrentDay ? dailyInputHeaderStyles : {}}
        className="daily-input-header"
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>
          {dateToDay(date)} {date.getDate()}{getDaySuffix(date.getDate())}
        </h4>
        
        <Image src={`/assets/icons/${isCurrentDay ? 'blue-' : ''}emotion.svg`} alt="emotion" width={20} height={20}/>
      </Stack>
        

      <Stack
        className="daily-input-body"
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {task.listTasks.map((task, i) => (
          <Task 
            key={`${num}-${i}`} 
            task={task} 
            date={date}
            isEmptyTask={false}
          />
        ))}
        {Array.from({ length: 10 - task.listTasks.length }, (_, i) => i + 1).map((_, i) => (
          <Task 
            key={`${num}-${i + task.listTasks.length}`} 
            date={date}
            task={defaultTask} 
            isEmptyTask={true} 
          />
        ))}
      </Stack>
    </div>
  );
}

export default DailyInput;