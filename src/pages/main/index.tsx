import { AuthForm } from '../../components/auth';
import { Pannel } from '../../components/UserPannel';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    setToken(sessionStorage.getItem('token') as string);
  }, [token]);

  if (!token) {
    navigate('/');
  }

  return <div>{token ? <Pannel /> : <AuthForm />}</div>;
};
