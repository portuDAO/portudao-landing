import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import NavbarLayout from 'layouts/NavbarLayout';
import LoadingScreen from './components/LoadingScreen';

// @ts-ignore
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      {/* @ts-ignore */}
      <Component {...props} />
    </Suspense>
  );

const Landing = Loadable(lazy(() => import('views/Landing')));
const Events = Loadable(lazy(() => import('views/Events')));
const Event = Loadable(lazy(() => import('views/Event')));
const Gallery = Loadable(lazy(() => import('views/Gallery')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <NavbarLayout />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/event/:eventId',
        element: <Event />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
    ],
  },
];

export default routes;
