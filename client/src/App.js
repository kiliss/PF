import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Tables from "./components/Tables";
import Table from "./components/Tables";
//import Reservation from "./components/Reservation";
import Navbar from "./components/Navbar";
import CreateFoods from './components/CreateFoods';
import Products from './components/Products';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/menu/:name' element={<Menu />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/tables' element={<Tables />} />
        <Route exact path='/tables/:id' element={<Table />} />
        {/*<Route exact path='/reservation' element={<Reservation />} />*/}
        <Route exact path='/product/create' element={<CreateFoods />} />
        <Route exact path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
