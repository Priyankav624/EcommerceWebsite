import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify'; // main comp
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // Check if the current route is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <> 
      <ToastContainer />
      <Navigation />
      <div style={{ backgroundColor: "rgb(14, 13, 13)" }}>
        <main className='py-3'>
          <Outlet />
        </main>
        {/* Render the Footer only if not on login or register page */}
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}

export default App;
