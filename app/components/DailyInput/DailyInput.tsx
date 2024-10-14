import "./DailyInput.scss";

import { Dates } from '@/types/interfaces/calendar.interface';
import { Stack, TextField } from '@mui/material';
import Image from 'next/image';

const DailyInput = ({dates}: {dates: Dates}) => {
  return (
    <div className="daily-input">
      <Stack
        className="daily-input-header"
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>
          {dates.day} {dates.date}
        </h4>
        
        <Image src="/assets/icons/emotion.png" alt="emotion" width={20} height={20}/>
      </Stack>
        

      <Stack
        className="daily-input-body"
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => (
          <TextField key={i} disabled id="standard-basic" variant="standard" style={{borderBottom: i%2===0 ? "1px solid #F5F5F7" : "1px solid #D2D2D7"}}/>
        ))}
      </Stack>
    </div>
  );
}

export default DailyInput;