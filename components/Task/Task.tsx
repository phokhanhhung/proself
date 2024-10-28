"use client"
import type { TaskProps } from "@/types/interfaces/calendar.interface";
import Image from "next/image";
import "./Task.scss";
import { DEFAULT, TASK_HIGHLIGHT_COLOR } from "@/types/consts/calendar.const";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setDialogState } from "@/store/features/taskDetailDialog/taskDetailDialogSlice";

const doneTaskStyles = {
  textDecoration: "line-through",
  color: "#D2D2D7"
}

const Task = (
  {task, date, isEmptyTask}: 
  {task: TaskProps, date: Date, isEmptyTask: boolean}
) => {
  
  const taskRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<HTMLImageElement>(null);

  const dispatch = useDispatch();

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
    e.stopPropagation();
    dispatch(setDialogState({task, date: date.toISOString(), isDialogOpened: true}));
  }
  
  return (
    <div 
      className="task"
      ref={taskRef} 
      onClick={(e) => handleOpenDialog(e)}
    >
      <div className="task-text">
        <div className="text" style={task.isDone ? doneTaskStyles : {}}>{task?.taskName}</div>
        {!task.isDone && TASK_HIGHLIGHT_COLOR[task.highlight] !== DEFAULT &&
          <div className="task-text-highlight" style={{backgroundColor: TASK_HIGHLIGHT_COLOR[task.highlight]}}></div>
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