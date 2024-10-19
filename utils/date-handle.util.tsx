import { FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY } from "@/types/consts/calendar.const";

export const dateToDay = (date: Date): string => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return SUNDAY.slice(0, 3);
      break;
    case 1:
      return MONDAY.slice(0, 3);
      break;
    case 2:
      return TUESDAY.slice(0, 3);
      break;
    case 3:
      return WEDNESDAY.slice(0, 3);
      break;
    case 4:
      return THURSDAY.slice(0, 3);
      break;
    case 5:
      return FRIDAY.slice(0, 3);
      break;
    case 6:
      return SATURDAY.slice(0, 3);
      break;
    default:
      return "";
      break;
  }
}

export const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getFullYear() === secondDate.getFullYear() 
  && firstDate.getMonth() === secondDate.getMonth()
  && firstDate.getDate() === secondDate.getDate()
}

export const getDialogDateFormat = (date: string) => {
  const currentDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const parts = formattedDate.split(' ');
  return `${parts[0].split(",")[0]}, ${parts[1]} ${parts[2].split(",")[0]} ${parts[3]}`;
}