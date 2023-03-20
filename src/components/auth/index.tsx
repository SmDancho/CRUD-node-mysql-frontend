import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
  const [status, setStatus] = useState<number>();
  const [isBlocked, setIsBlocked] = useState<string>('');
  const [name, setName] = useState<string>();
  const [mail, setmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [authState, setAuthState] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:5000/auth/${authState ? 'login' : 'registration'}`,
        {
          name,
          mail,
          password,
        }
      )
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        setStatus(response.status);
      })
      .catch((error) => {
        setIsBlocked(error.response.data);
      });
 
  };
  if (status === 200) {
    navigate('/main');
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] h-[100vh] flex flex-col items-center justify-center  p-5 gap-2">
        <div className="text-[red]">{isBlocked && 'user blocked'}</div>
        <h1 className="font-bold text-lg">
          {authState ? 'login' : 'Register'}
        </h1>
        <div
          onClick={() => {
            setAuthState((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          {authState ? 'create account' : 'Sign in'}
        </div>

        <form
          className="border-2 rounded-lg p-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="name">name</label>

          <input
            className="w-full h-[50px]  border-2 rounded-lg p-5"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="mail">mail</label>
          <input
            className="w-full h-[50px]  border-2 rounded-lg p-5"
            type="mail"
            value={mail}
            name="mail"
            onChange={(e) => setmail(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            className="w-full h-[50px]  border-2 rounded-lg p-5"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className=" border-2 rounded-lg p-2 mt-5"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
