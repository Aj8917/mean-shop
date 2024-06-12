import React from 'react';
import { Container } from 'react-bootstrap';

//import  {Header} from './components/Header'
import Header from './components/Header.jsx' 
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
