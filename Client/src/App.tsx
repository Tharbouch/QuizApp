import { Routes, Route } from 'react-router-dom';
import { Login } from './Components/pages/Login';
import { Home } from './Components/pages/Home';
import { NavBar } from './Components/Nav';
import { RootLayout } from './Components/LayoutComponents';
import { UserContextProvider } from './Utils/userContext'
import { ProtectRoute } from './Utils/protectRoutes';
import './App.css'
import NotFoud from './Components/pages/NotFound';
import Questions from './Components/pages/Questions';

function App() {

  return (
    <UserContextProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<RootLayout />} >
          <Route element={<ProtectRoute allowed={["Student", "Professor"]} />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<ProtectRoute allowed={["Professor"]} />}>
            <Route path='questions' element={<Questions />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFoud />} />
        </Route>
      </Routes>
    </UserContextProvider >

  );
}


export default App
