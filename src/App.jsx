import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home, RoomDetails, Login, Admin } from './pages';


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

        {/* <Header /> */}

        <Routes>
          <Route path={'/'} element={<Home />} />
         
          <Route path={'/room/:id'} element={<RoomDetails />} />
         

           <Route path={'/admin-login'} element={<Login />} />
           <Route path={'/admin'} element={<Admin />} />

            <Route path={'*'} element={<PageNotFound />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </main>
  )
}

export default App