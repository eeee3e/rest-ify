import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './Components/Styles/Global.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './Components/NavBar/NavBar';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Accounts/Register';
import Login from './Pages/Accounts/Login';
import Create from './Pages/Restaurant/create';
import Search from './Pages/Restaurant/search';
import Info from './Pages/Restaurant/info';
import Feed from './Pages/Blog/Feed';
import Blog from './Pages/Blog/Blog';
import EditProfile from './Pages/Accounts/EditProfile';
import Menu from './Pages/Restaurant/menu';
import Images from './Pages/Restaurant/images';
import AddBlog from './Pages/Blog/AddBlog';

function App() {
 
  const path = window.location.pathname;
  const newSession = true;

  return (
    
    <BrowserRouter>
      {path === '/register' || path === '/login' || path === '/' ?  <></> : <NavBar /> }
      
      <React.StrictMode>
        <Routes>

            <Route path="/" element={ newSession ? ( 
              <Login /> 
              ) : (
              <></> //home if not new User
              )} 
            />
            <Route path="*" element={< NotFound />} />
            <Route path="/home" element={<Search />} />
            <Route path="/register" element={<Register />}/>
            <Route index path="/login" element={<Login />} />
            <Route path="/restaurant/create" element={<Create/>} />
            <Route path="/restaurant/search" element={<Search/>} />
            <Route path="/restaurant/info/:id" element={<Info/>} />
            <Route path="/restaurant/addmenu" element={<Menu/>} />
            <Route path="/restaurant/addimage" element={<Images/>} />
            <Route path="/feed" element={<Feed />} />
            <Route path="blogs/:id" element={<Blog />} />
            <Route path="account/edit" element={<EditProfile />} />
            <Route path="blog/add" element={<AddBlog />} />
          
          
          
        
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
