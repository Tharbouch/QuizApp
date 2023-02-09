import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { RootLayout } from './Components/LayoutComponents';
import { UserContextProvider } from './Utils/userContext'
import { ProtectRoute } from './Utils/protectRoutes';
import './App.css'
import NotFoud from './pages/NotFound';
import Questions from './pages/Questions';
import { Quiz } from './pages/Quiz';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<RootLayout />} >
          <Route element={<ProtectRoute allowed={["Student", "Professor"]} />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<ProtectRoute allowed={["Professor"]} />}>
            <Route path='questions' element={<Questions />} />
            <Route path='quiz' element={<Quiz />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFoud />} />
        </Route>
      </Routes>
    </UserContextProvider >

  );
}


export default App
