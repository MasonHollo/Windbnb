import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div id='homelink'>
        <NavLink to="/">
          <img id='imglink' src='Windimage.jpg'></img>
          <p>windbnb</p>
        </NavLink>
      </div>
      <div id='newspotform'>
      <NavLink to='/spots/new'>
        <p>Creat a New Spot</p>
      </NavLink>
      </div>
      <div id='profile'>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;