import React, { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import Preloader from '../preloader/Preloader';

interface IProtectedRouteProps {
  onlyUnauth?: boolean;
  isLoading: boolean;
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnauth,
  isLoading,
  children,
}) => {
  const currentUser = useContext(CurrentUserContext);
  if (isLoading) return <Preloader />;
  if ((onlyUnauth && !currentUser) || (!onlyUnauth && currentUser)) {
    return <>{children}</>;
  } else {
    return <Navigate to='/' />;
  }
};

export default ProtectedRoute;
