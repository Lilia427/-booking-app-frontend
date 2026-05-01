import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { Home, RoomDetails, Login, Admin } from './pages';


const App = () => {

  return (

    <main className=''>
      <BrowserRouter>

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