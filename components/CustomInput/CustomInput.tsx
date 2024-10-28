"use client"
import { styled, TextField, TextFieldProps } from "@mui/material";
import "./CustomInput.scss";
import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import { USER_DIALOG } from "@/types/consts/user.const";

const CustomInput = memo((
  {label, type, onInputChange, onKeyDown}: 
  {label: string, type: string, onInputChange: (value: string) => void, onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void }
) => {
  const [inputValue, setInputValue] = useState('');
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onInputChange(e.target.value);
    setInputValue(e.target.value);
    console.log(e.target.value)
  };

  useEffect(() => {
    if(label === USER_DIALOG.LABEL_USERNAME_INPUT) {
      inputRef.current?.focus();
    }

    if (inputRef.current && inputValue) {
      inputRef.current?.focus();
    }
  }, [inputValue]);

  const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{
        disableUnderline: true,
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      overflow: 'hidden',
      borderRadius: 0,
      borderBottom: '1px solid #D2D2D7',
      backgroundColor: '#ffffff',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: '#CAF0F8 0 0 0 0.5px',
        borderBottom: 'unset',
        borderColor: '#CAF0F8',
        borderRadius: 8,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
        borderColor: '#2D3843',
      }),
    },
  }));

  return (
    <RedditTextField
      className="login-input"
      label={label}
      id={`reddit-input-${id}`}
      variant="filled"
      style={{ marginTop: 4 }}
      type={type}
      onChange={handleInputChange}
      value={inputValue}
      inputRef={inputRef}
      onKeyDown={onKeyDown}
    />
  );
})

CustomInput.displayName = 'CustomInput';

export default CustomInput;