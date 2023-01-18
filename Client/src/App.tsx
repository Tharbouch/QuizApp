import { Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { NavBar } from './Components/Nav';
import { RootLayout } from './Components/LayoutComponents';
import { UserContextProvider } from './Utils/userContext'
import { ProtectRoute } from './Utils/protectRoutes';
import './App.css'
import NotFoud from './Components/NotFound';

function App() {

  return (
    <UserContextProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<RootLayout />} >
          <Route element={<ProtectRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFoud />} />
        </Route>
      </Routes>
    </UserContextProvider >

  );
}


export default App
