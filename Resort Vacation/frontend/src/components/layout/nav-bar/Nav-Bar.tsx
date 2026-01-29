import { NavLink, useNavigate } from 'react-router-dom'
import './Nav-Bar.css'
import { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { useFirstName, useLastName } from '../../../hooks/use-name';
import { useRoleId } from '../../../hooks/use-role-id';
import { MANAGER_ID } from '../../../utilities/RoleIds';

export default function Navbar() {

  const authContext = useContext(AuthContext);

  const currentUserFirstName = useFirstName();

  const currentUserLastName = useLastName();

  const roleId = useRoleId();

  const navigate = useNavigate()

  function logout() {
    authContext?.newJwt('');
    navigate('/login')
  };

  return (
    <div className='Navbar'>
      <h2 className='logo'>
        Aloha, {currentUserFirstName} {currentUserLastName}! Relax through the Resort Website!
      </h2>
      <button className="log-out-button" onClick={logout}>Log Out</button>
      <div className='nav-links'>
        {(roleId === MANAGER_ID) && <>
          <NavLink to="/vacation/vacation-manager"
          >
            Show Vacations
          </NavLink>
          <NavLink to="/vacation/vacation-add"
          >
            Add Vacation
          </NavLink>
          <NavLink to="/vacation/vacation-report"
          >
            Vacations Report
          </NavLink>
        </>}
      </div>
    </div>
  )
}
