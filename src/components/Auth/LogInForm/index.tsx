import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import AuthApi from '../../../services/AuthApi';
import { Toast, ToastContainer } from 'react-bootstrap';

import {
  StateContextType,
  useStateContext,
} from '../../../contexts/ContextProvider';

import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();
  const { setUser, accessToken } = useStateContext() as StateContextType;
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function submitHandler(event: any) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;

    // TODO: Add validation
    try {
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
    } catch (error: any) {
      setErrorMessage(error.response.data.error.messages);
      setShowError(true);
    }
  }

  // set current user then redirect to home page
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <div className="mx-auto w-1/4 pt-20 mt-24">
      <Helmet>
        <title>Log In</title>
        <meta name="log-in-form" content="Log In" />
      </Helmet>
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
        </div>
      </form>
      <ToastContainer className="absolute right-2 " position="top-end">
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={3000}
          autohide
          className="px-8 py-4 m-10 bg-red-300 flex flex-col items-start border-1 rounded"
        >
          <Toast.Header>
            <strong className="me-auto">Zuong Dashboard</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LogInForm;
