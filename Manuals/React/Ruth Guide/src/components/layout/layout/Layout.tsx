import Navbar from '../navbar/Navbar'
import Routing from '../routing/Routing'
import './Layout.css'


export default function Layout() {
  return (
    <div className='Layout'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routing />
      </main>
    </div>
  )
}
