import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../../layout/footer';
import Header from '../../layout/header';
import Main from '../../layout/main';
import AppLoader from '../hoc/appLoader/appLoader';

function App() {
  return (
    <div className="app">
      <AppLoader>
        <Header />
        <Main />
        <Footer />
        <ToastContainer />
      </AppLoader>
    </div>
  );
}

export default App;
