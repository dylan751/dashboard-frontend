import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../../services/AuthApi';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev
  ? process.env.NEXT_PUBLIC_APP_ENDPOINT_LOCAL
  : process.env.NEXT_PUBLIC_APP_ENDPOINT;

async function createUser(email: string, password: string) {
  const response = await AuthApi.signup({
    email,
    password,
  });

  console.log(response);

  // TODO: Add error handler
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  async function submitHandler(event: any) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;

    // optional: Add validation
    try {
      await createUser(enteredEmail, enteredPassword);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto w-1/4 pt-20">
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
            Sign up
          </button>
          <button
            type="button"
            className="cursor-pointer text-blue-500 font-normal mt-3 rounded-none"
            onClick={() => navigate('/login')}
          >
            Login with existing account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
