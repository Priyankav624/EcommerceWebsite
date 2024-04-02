import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'  // main comp
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <> 
        <ToastContainer />
        <Navigation />
        <div className='bg-black'>
        <main className='py-3'>
          <Outlet />
        </main>
        </div>
    </>
  )
}

export default App
