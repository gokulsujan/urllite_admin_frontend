import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {useAuth} from './AuthContextProviderComponent'

export const AuthWatcher = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    const isAuthPage = currentPath === '/signin' || currentPath === '/signup';

    if (!isAuthPage && !isLoggedIn) {
      logout(); // optional: redirect to /signin
    }
  }, [location, isLoggedIn, logout]);

  return null; // this component doesn't render anything
};
