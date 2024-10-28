import { TASK_HIGHLIGHT_COLOR } from '../consts/calendar.const';
export interface Dates {
  day: string;
  date: string;
}

export interface DailyTasks {
  date: string;
  emoji: string;
  listTasks: Array<TaskProps>;
}

export interface TaskProps {
  taskName: string;
  isImportant: boolean;
  isDone: boolean;
  highlight: number;
  subTasks: string;
}