import * as Sentry from '@sentry/react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home, RoomDetails } from './pages';

// TODO: remove after Sentry verification
function SentryTestButton() {
  return (
    <button
      style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999, background: 'red', color: 'white', padding: '8px 16px', borderRadius: 4 }}
      onClick={() => { throw new Error('Sentry test error!'); }}
    >
      Sentry Test
    </button>
  );
}


const App = () => {

  // const paths = [
  //   { path: '/', element: <Home /> },
  //   { path: '/room/:id', element: <RoomDetails /> },
  //   { path: '*', element: <PageNotFound /> },
  // ]

  // const router = createBrowserRouter(paths);
  // <RouterProvider router={router} /> 

  return (

    <main className=''>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/room/:id'} element={<RoomDetails />} />
          <Route path={'*'} element={<PageNotFound />} />
        </Routes>

        <Footer />
        <SentryTestButton />

      </BrowserRouter>
    </main>
  )
}

export default App