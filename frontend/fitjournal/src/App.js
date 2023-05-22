import './App.css';

import ErrorPage from './ErrorPage';
import IndexRoute from './routes/IndexRoute';
import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import WorkoutRoute from './routes/WorkoutRoute';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexRoute />,
    errorElement: <ErrorPage />
  },
  {
    path: '/sign-up',
    element: <SignupRoute />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginRoute />,
    errorElement: <ErrorPage />
  },
  {
    path: '/workout',
    element: <WorkoutRoute />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return (
    <>
      <h1>NavigationBar</h1>
      <RouterProvider router = {router} />
    </>
  );
}

export default App;
