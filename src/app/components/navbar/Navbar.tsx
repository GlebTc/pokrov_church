import NavbarClientComponents from './NavbarClientComponents';
import LogInLogoutButton from './LogInLogoutButton';
import NavbarUserNavShortcuts from './NavbarUserNavShortcuts';

NavbarClientComponents;

const Navbar = () => {
  return (
    <div className='NAVBAR_MAIN_CONTAINER relative bg-white md:rounded-t-md z-[50]'>
      <LogInLogoutButton />
      <NavbarUserNavShortcuts />
      <NavbarClientComponents />
    </div>
  );
};

export default Navbar;
