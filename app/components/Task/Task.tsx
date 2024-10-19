"use client"

import type { TaskProps } from "@/types/interfaces/calendar.interface";
import Image from "next/image";
import "./Task.scss";
import { TASK_HIGHLIGHT_COLOR } from "@/types/consts/calendar.const";
import { useEffect, useRef, useState } from "react";
import TaskDetailDialog from "../TaskDetailDialog/TaskDetailDialog";
import { useDispatch } from "react-redux";
import { setDialogState } from "@/store/features/task/dialogSlice";

const doneTaskStyles = {
  textDecoration: "line-through",
  color: "#D2D2D7"
}

const Task = (
  {task, borderStyle, date, isEmptyTask, num}: 
  {task: TaskProps, borderStyle: string, date: Date, isEmptyTask: boolean, num?: number}
) => {
  
  const taskRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<HTMLImageElement>(null);

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const dispatch = useDispatch();

  const getHighlightColor = (color: string) => {
    return TASK_HIGHLIGHT_COLOR[color as keyof typeof TASK_HIGHLIGHT_COLOR];
  }

  const handleOnTickToDoneButton = () => {
    const textEl = taskRef.current?.children[0].children[0];
    const textHighLightEl = taskRef.current?.children[0].children[1];
    const textStarEl = taskRef.current?.children[0].children[2];
    if(tickRef.current) {
      tickRef.current.src = '/assets/icons/done-tick.svg';
    }
    textEl?.classList.add("text-done");
    textHighLightEl?.classList.add("task-done");
    textStarEl?.classList.add("task-done");
  }

  const handleOnUnTickButton = () => {
    const textEl = taskRef.current?.children[0].children[0];
    const textHighLightEl = taskRef.current?.children[0].children[1];
    const textStarEl = taskRef.current?.children[0].children[2];
    if(tickRef.current) {
      tickRef.current.src = '/assets/icons/tick.svg';
    }
    textEl?.classList.remove("text-done");
    textHighLightEl?.classList.remove("task-done");
    textStarEl?.classList.remove("task-done");
    console.log(textEl, textHighLightEl, textStarEl)
  }

  const handleOpenDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Only show pop-up if task is not empty -> for editing or the first empty task
    if(!isEmptyTask || (isEmptyTask && num === 0)) {
      e.stopPropagation();
      dispatch(setDialogState({task, date: date.toISOString(), isDialogOpened: true}));
    }
  }

  // const getDialogStatus = (state: boolean) => {
  //   dispatch(getCurrentTask({task, date, isDialogOpened: true}));
  //   setIsDialogOpened(state);
  // }
  
  return (
    <div 
      className={`task task-${num} ${!isEmptyTask ? "task-on-hover" : ""}`} 
      style={{ borderBottom: borderStyle }} 
      ref={taskRef} 
      onClick={(e) => handleOpenDialog(e)}
    >
      <div className="task-text">
        <div className="text" style={task.isDone ? doneTaskStyles : {}}>{task?.taskName}</div>
        {!task.isDone && task.highlight &&
          <div className="task-text-highlight" style={{backgroundColor: getHighlightColor(task.highlight)}}></div>
        }
        {!task.isDone && task.isImportant &&
        <Image 
          className="star-icon" 
          src="/assets/icons/yellow-star.svg" 
          width={16} 
          height={15} 
          alt="star" 
        />
        }
      </div>

      <div className="task-tick" onClick={(e) => e.stopPropagation()}>
      {
        !isEmptyTask && (
          task.isDone
          ? <Image 
              className="tick-icon" 
              src="/assets/icons/done-tick.svg" 
              width={16} 
              height={16} 
              alt="done-tick" 
              onClick={() => handleOnUnTickButton()}
            />
          : <Image 
              className="tick-icon" 
              src="/assets/icons/tick.svg" 
              width={16} 
              height={16} 
              alt="tick" 
              onClick={() => handleOnTickToDoneButton()}
              ref={tickRef}
            />
        )
      }  
      </div>
    </div>
  );
}

export default Task;