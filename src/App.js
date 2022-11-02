import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from './components/Layout';
import Home from './components/Home';
import Pets from './components/Pets/Pets';
import AdoptionForm from './components/AdoptionForm';
import ThanksAdoption from './components/ThanksAdoption';
import Foundations from './components/Foundations/Foundations';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import History from './components/History';
import Profile from './components/Profile';
import Favorites from './components/Favorites/Favorites';
import SingularPet from './components/SingularPet/SingularPet';
import SingularFoundation from './components/SingularFoundation/SingularFoundation';
import Chat from './components/Chat/Chat.jsx';
import Messages from './components/Messages';
import Notifications from './components/Notifications';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["'League Spartan'", 'sans-serif'].join(","),
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/mascotas' element={<Pets/>}/>
            <Route path='/adoptionForm' element={<AdoptionForm/>}/>
            <Route path='/thanksAdoption' element={<ThanksAdoption/>}/>
            <Route path='/fundaciones' element={<Foundations/>}/>
            <Route path='/mascotas/:petId' element={<SingularPet/>}/>
            <Route path='/fundaciones/:foundationName' element={<SingularFoundation/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path='/chat/:fId' element={<Chat/>}/>
            <Route path='/notifications' element={<Notifications/>}/>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
