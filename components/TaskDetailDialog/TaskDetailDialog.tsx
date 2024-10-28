"use client"
import Image from "next/image";
import "./TaskDetailDialog.scss";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { TASK_HIGHLIGHT_COLOR } from "@/types/consts/calendar.const";
import { getDialogDateFormat } from '../../utils/date-handle.util';
import { TaskProps } from "@/types/interfaces/calendar.interface";
import { useDispatch } from "react-redux";
import { setDialogState } from "@/store/features/taskDetailDialog/taskDetailDialogSlice";
import QuillEditor from '../Editor/Editor';

const TaskDetailDialog = (
  {date, task, isDialogOpened}: 
  {date: string, task: TaskProps, isDialogOpened: boolean}
) => {
  const [currentColor, setCurrentColor] = useState(0);
  const [isImportant, setIsImportant] = useState(false);
  
  const [inputTitle, setInputTitle] = useState(task.taskName || '');
  const [inputExtraNotes, setInputExtraNotes] = useState('');

  const dispatch = useDispatch();

  const othersDialog = useRef<HTMLElement | null>(null);
  const dialogHeader = useRef<HTMLElement | null>(null);
  const dialogWrapper = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsImportant(task.isImportant);
    if(typeof window !== 'undefined') {
      othersDialog.current = document.getElementsByClassName(`dialog-others-wrapper`)[0] as HTMLElement;
      dialogHeader.current = document.getElementsByClassName(`dialog-header`)[0] as HTMLElement;
      dialogWrapper.current = document.getElementsByClassName("dialog-wrapper")[0] as HTMLElement;
      
      // Mover from top: 50% -> top: 20% when appear
      requestAnimationFrame(() => {
        const firstChild = dialogWrapper.current?.children[0];
        if (firstChild) {
          firstChild.classList.add('move-up');
        }
      });
      
    }
  }, [task]);

  const optionButtons = [
    {
      name: "Tomorrow",
      iconUrl: "/assets/icons/long-arrow-right.svg",
      alt: "long-arrow-right",
    },
    {
      name: "Repeat",
      iconUrl: "/assets/icons/repeat.svg",
      alt: "repeat",
    },
    {
      name: "Delete",
      iconUrl: "/assets/icons/trash.svg",
      alt: "trash",
    },
  ]

  const colorOptions = [
    {
      index: 4,
      color: "#E9C46A",
    },
    {
      index: 5,
      color: "#83C5BE",
    },
    {
      index: 3,
      color: "#FFB3C6",
    },
    {
      index: 2,
      color: "#CDB4DB",
    },
    {
      index: 1,
      color: "#90E0EF",
    },
  ];

  const handleCloseOthersDialog = () => {
    if (dialogHeader) {
      const children = dialogHeader.current?.children;
      if(children) {
        for (let i = 0; i < children?.length; i++) {
          const child = children[i] as HTMLElement;
          child.classList.remove("close-dialog-header");
        }
      }
    }
    dialogHeader.current?.classList.remove("shorten-header");
    othersDialog.current?.classList.remove("open-others-dialog");
  }

  const handleOpenOthersDialog = () => {
    if (dialogHeader) {
      const children = dialogHeader.current?.children;
      if(children) {
        for (let i = 0; i < children?.length; i++) {
          const child = children[i] as HTMLElement;
          child.classList.add("close-dialog-header");
        }
      }
    }
    dialogHeader.current?.classList.add("shorten-header");
    othersDialog.current?.classList.add("open-others-dialog");
    console.log("clcikc", othersDialog, dialogHeader)
  }

  const handleChooseColor = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, color: {index: number, color: string}) => {
    if(dialogHeader.current) {
      dialogHeader.current.style.backgroundColor = color.color;
    }
    
    const target = e.currentTarget as HTMLElement;
    setCurrentColor(color.index);
    if(target && target.children.length > 0) {
      setCurrentColor(0);
      if(dialogHeader.current)
      dialogHeader.current.style.backgroundColor = TASK_HIGHLIGHT_COLOR[0];
      console.log(target);
    }
  }

  const handleCloseDialog = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    dialogWrapper.current?.classList.remove("open-dialog");
    handleCloseOthersDialog();
    dispatch(setDialogState({isDialogOpened: false}))
  }

  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputTitle(e.target.value);
  }

  const handleSaveTask = () => {
    const task = {
      taskName: inputTitle,
      isImportant: isImportant,
      highlight: currentColor,
      subTasks: inputExtraNotes
    }
    console.log(date, task)
  }

  return (
    <div className={`dialog-wrapper ${isDialogOpened ? 'open-dialog' : ''}`} onClick={(e) => handleCloseDialog(e)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className={`dialog-header`}>
          <div className="dialog-header-calendar">
            <Image src="/assets/icons/calendar.svg" width={16} height={16} alt="calendar" />
            <p>{getDialogDateFormat(date)}</p>
          </div>
          <div className="dialog-header-options">
            <button onClick={() => setIsImportant(!isImportant)}>
              <Image src={`/assets/icons/${isImportant ? "yellow-border-" : ""}star.svg`} width={16} height={16} alt="star" />
            </button>
            <button onClick={() => handleOpenOthersDialog()}>
              <Image src="/assets/icons/others.svg" width={16} height={16} alt="others" />
            </button>
            <button onClick={(e) => handleCloseDialog(e)}>
              <Image src="/assets/icons/exit.svg" width={16} height={16} alt="exit" />
            </button>
          </div>
        </div>

        <div className="dialog-body">
          <div className="dialog-body-input">
            <TextField 
              id="standard-basic" 
              className="dialog-body-input-text"
              label={null}
              value={inputTitle}
              onChange={(e) => handleInputTitleChange(e)}
              placeholder="Take a note..."
              variant="standard"
              InputProps={{
                disableUnderline: true, 
                sx: {
                  '& .MuiInputBase-root': {
                    border: 'none',
                    '&:before': {
                      border: 'none',
                    },
                    '&:after': {
                      border: 'none',
                    },
                    '&:hover:before': {
                      border: 'none',
                    },
                    '&.Mui-focused:before': {
                      border: 'none',
                    },
                  },
                },
              }}
            />
            <Image 
              onClick={() => handleSaveTask()}
              className="tick-icon" 
              src="/assets/icons/tick.svg" 
              width={16} 
              height={16} 
              alt="tick"
            />
          </div>
          <div className="dialog-body-quill-editor">
            <QuillEditor />
          </div>
        </div>

        <div className={`dialog-others-wrapper dialog-others-wrapper`} onClick={() => handleCloseOthersDialog()}>
          <div className="dialog-others" onClick={(e) => e.stopPropagation()}>
            <ul className="color-pickup">
              {
                colorOptions.map((color, i) => (
                  <li 
                    key={i} 
                    value={color.color} 
                    style={{backgroundColor: `${TASK_HIGHLIGHT_COLOR[color.index]}`}}
                    onClick={(e) => handleChooseColor(e, color)}
                  >
                    {
                      currentColor === color.index 
                      ? <Image 
                          src="/assets/icons/check.svg" 
                          width={16} 
                          height={16} 
                          alt="exit" 
                        />
                      : null
                    }
                  </li>
                ))
              }
            </ul>
            {
              optionButtons.map((btn, i) => (
                <div key={i} className="dialog-others-option">
                  <p>{btn.name}</p>
                  <Image 
                    className="option-icon" 
                    src={btn.iconUrl} 
                    width={16} 
                    height={16} 
                    alt={btn.alt}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailDialog;