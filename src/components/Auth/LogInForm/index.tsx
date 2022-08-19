import React, { useEffect, useRef } from 'react';
import AuthApi from '../../../services/AuthApi';

import {
  StateContextType,
  useStateContext,
} from '../../../contexts/ContextProvider';

import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useStateContext() as StateContextType;
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  async function submitHandler(event: any) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;

    // TODO: Add validation
    const response = await AuthApi.login({
      username: enteredEmail,
      password: enteredPassword,
    });

    localStorage.setItem('accessToken', response.data.data.access_token);
    const { userId, email } = response.data.data.user;
    setUser({
      userId,
      email,
      accessToken: response.data.data.access_token,
    });
  }

  // set current user then redirect to home page
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="mx-auto w-1/4 pt-20 mt-24">
      {!currentUser ? (
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 justify-center px-8 py-12 border shadow-lg shadow-blue-200 bg-white items-center m-0"
        >
          <div className="w-full">
            <label htmlFor="email"></label>
            <input
              className="w-full mb-4 bg-white rounded border border-slate-200 p-2"
              placeholder="Email"
              type="email"
              id="email"
              required
              ref={emailInputRef}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password"></label>
            <input
              className="w-full mb-4 bg-white rounded border border-slate-200 p-2"
              placeholder="Password"
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <button className="w-full cursor-pointer text-white bg-blue-500 border rounded py-2 px-10 font-medium">
              Log in
            </button>
            {/* <button
              type="button"
              className="cursor-pointer text-blue-500 font-normal mt-3 rounded-none"
              onClick={() => navigate('/signup')}
            >
              Create new account
            </button> */}
          </div>
        </form>
      ) : (
        <p>Logged in</p>
      )}
    </div>
  );
};

export default LogInForm;
