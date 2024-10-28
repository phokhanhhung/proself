'use client'
import { USER_DIALOG } from "@/types/consts/user.const";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./LoginDialog.scss";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import CustomInput from "../CustomInput/CustomInput";
import { useCallback } from 'react';
import axiosInstance from "@/libs/axiosInstance";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginDialog = () => {
  const [isLoginInputs, setIsLoginInputs] = useState(true);

  const loginOptionsButtons = useRef<HTMLElement | null>(null);
  const login = useRef<HTMLElement | null>(null);
  const loginText = useRef<HTMLElement | null>(null);
  const loginWrapper = useRef<HTMLElement | null>(null);

  useEffect(() => {
    loginOptionsButtons.current = document.getElementsByClassName(`login-options-buttons`)[0] as HTMLElement;
    login.current = document.getElementsByClassName("login")[0] as HTMLElement;
    loginText.current = document.getElementsByClassName("login-text")[0] as HTMLElement;
    loginWrapper.current = document.getElementsByClassName("login-wrapper")[0] as HTMLElement;
    loginWrapper.current.classList.add("go-bigger");
    loginText.current.children[0].classList.add("go-up");
    loginText.current.children[1].classList.add("go-up");

    // axiosInstance.get("https://jsonplaceholder.typicode.com/users/1")
    // .then(res => console.log(res))
  }, []);

  const handleChangeForm = (isLoginForm: boolean) => {
    setIsLoginInputs(isLoginForm);
    
    if(!isLoginForm) {
      loginOptionsButtons.current?.classList.add('move-to-right');
      login.current?.classList.add('expand');
      return;
    }
    loginOptionsButtons.current?.classList.remove('move-to-right');
    login.current?.classList.remove('expand');
  }

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="login-text-wrapper">
          <div className="login-text">
            <h1>{USER_DIALOG.APPLICATION_NAME}</h1>
            <p>{USER_DIALOG.SLOGAN}</p>
          </div>
        </div>
        <div className="login">
          <div className="login-greeting">
            <h1 dangerouslySetInnerHTML={{ __html: isLoginInputs ? USER_DIALOG.WELCOME_TEXT : USER_DIALOG.FIRST_GREETING_TEXT}}></h1>
          </div>

          <div className="login-options">
            <div className="login-options-buttons">
              <div className="login-options-button" onClick={() => handleChangeForm(true)}>
                <p>{USER_DIALOG.LOGIN_TAB}</p>
              </div>
              <div className="login-options-button" onClick={() => handleChangeForm(false)}>
                <p>{USER_DIALOG.SIGNUP_TAB}</p>
              </div>
            </div>
          </div>

          {/* <div className="login-content"> */}
            {isLoginInputs ? <LoginInputs /> : <SignupInputs />}
          {/* </div> */}
          
        </div>
      </div>
    </div>
    
  );
}

const LoginInputs = () => {
  const [isBigger, setIsBigger] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsBigger(true);
    });
  }, []);

  const handleSubmitLoginForm = async () => {
    console.log(username, password);
    const result = await signIn("credentials", { redirect: false, username, password });
    if (result?.error) {
      console.error('Login failed:', result.error);
    } else {
      console.log('Login successful:', result);
      router.push("/");
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmitLoginForm();
    }
  };
  
  return (
    <div className={`login-content ${isBigger ? "go-bigger" : ""}`}>
        <div className="login-inputs">
          <CustomInput label={USER_DIALOG.LABEL_USERNAME_INPUT} type="text" onInputChange={setUsername} />
          <CustomInput onKeyDown={handleKeyDown} label={USER_DIALOG.LABEL_PASSWORD_INPUT} type="password" onInputChange={setPassword} />
        </div>

        <div className="login-other-options">
          <div className="login-radio">
            <FormControlLabel control={<Checkbox />} label="Remember me!" />
          </div>
          <p>
            {USER_DIALOG.FORGOT_PASSWORD}
          </p>
        </div>

        <div className="login-submit-btn">
          <button onClick={handleSubmitLoginForm}>
            <p>{USER_DIALOG.LOGIN_BUTTON}</p>
            <Image
              src="/assets/icons/white-right-arrow.svg" 
              width={24} 
              height={24} 
              alt="white-right-arrow" 
            />
          </button>
        </div>
    </div>
  )
}

const SignupInputs = () => {
  const [isBigger, setIsBigger] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsBigger(true);
    });
  }, []);

  const handleSubmitSignupForm = () => {
    console.log(username, email, password, confirmPassword)
  }

  return(
    <div className={`signup-content ${isBigger ? "go-bigger" : ""}`}>
      <div className="login-inputs">
          <CustomInput label={USER_DIALOG.LABEL_USERNAME_INPUT} type="text" onInputChange={setUsername} />
          <CustomInput label={USER_DIALOG.LABEL_EMAIL_INPUT} type="email" onInputChange={setEmail} />
          <CustomInput label={USER_DIALOG.LABEL_PASSWORD_INPUT} type="password" onInputChange={setPassword} />
          <CustomInput label={USER_DIALOG.LABEL_CONFIRM_PASSWORD_INPUT} type="password" onInputChange={setConfirmPassword} />
        </div>

        <div className="login-other-text">
          <p dangerouslySetInnerHTML={{ __html: USER_DIALOG.TERM_TEXT }}></p>
        </div>

        <div className="login-submit-btn">
          <button onClick={handleSubmitSignupForm}>
            <p>{USER_DIALOG.SIGNUP_BUTTON}</p>
            <Image
              src="/assets/icons/white-right-arrow.svg" 
              width={24} 
              height={24} 
              alt="white-right-arrow" 
            />
          </button>
        </div>
    </div>
  )
}

export default LoginDialog;