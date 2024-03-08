import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ path, ...props }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? <Route path={path} {...props} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
