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
  highlight: "",
  subTasks: "",
};

const dailyInputHeaderStyles = {
  color: "#00B4D8",
  borderBottom: "#00B4D8 solid 1px",
  backgroundColor: "#CAF0F8",
}

const dailyInputHeaderIconStyles = {
  backgroundColor: "#00B4D8",
}

const DailyInput = ({task, num}: {task: DailyTasks, num: number}) => {
  const date = new Date(task.date);
  const currentDate = new Date();

  const isCurrentDay = isSameDate(currentDate, date);

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskProps>(defaultTask);

  const getBorderStyle = (index: number) => {
    return task.listTasks.length % 2 === 0
    ? index % 2 === 0
      ? "1px solid #F5F5F7"
      : "1px solid #D2D2D7"
    : index % 2 === 0
      ? "1px solid #D2D2D7"
      : "1px solid #F5F5F7"

  } 

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
            num={i} 
            task={task} 
            date={date}
            borderStyle={i%2===0 ? "1px solid #F5F5F7" : "1px solid #D2D2D7"}
            isEmptyTask={false}
          />
        ))}
        {Array.from({ length: 10 - task.listTasks.length }, (_, i) => i + 1).map((_, i) => (
          <Task 
            key={`${num}-${i + task.listTasks.length}`} 
            num={i}
            date={date}
            task={defaultTask} 
            borderStyle={getBorderStyle(i)} 
            isEmptyTask={true} 
          />
        ))}
      </Stack>
    </div>
  );
}

export default DailyInput;