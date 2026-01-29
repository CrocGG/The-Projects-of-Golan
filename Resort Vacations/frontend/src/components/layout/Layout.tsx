import Navbar from './nav-bar/Nav-Bar'
import Footer from './footer/Footer'
import './Layout.css'
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import EntranceRouting from './routing/EntranceRouting';
import Routing from './routing/Routing';

export default function Layout() {

  const authContext = useContext(AuthContext);

  const isLoggedIn = !!authContext?.jwt;

  return (
    <div className='Layout'>
      {isLoggedIn && <>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routing />
        </main>
      </>}
      {(!isLoggedIn && <EntranceRouting />)}
      <footer>
        <Footer />
      </footer>
    </div >

  )
}

