
import { PrimeReactProvider } from 'primereact/api';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { keys } from "./constants/settings";
import { paths } from './constants/path';

export const Layout = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem(keys.API_TOKEN) ? localStorage.getItem(keys.API_TOKEN) : null;

  useEffect(() => {
    if(token === null) {
      navigate(paths.LOGIN);
    }

    if(window.location.pathname === '/') {
      navigate(paths.HOME);
    }
  }, [token, navigate]);

  
  return (
    <PrimeReactProvider value={{ ripple: true}}>
      { token && <Outlet />}
    </PrimeReactProvider>
  );
}
