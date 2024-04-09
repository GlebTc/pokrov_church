import NavbarClientComponents from './NavbarClientComponents';
import LogInLogoutButton from './LogInLogoutButton';
import NavbarUserNavShortcuts from '@/src/app/components/navbar/NavbarUserNavShortcuts';

NavbarClientComponents;

const Navbar = () => {
  return (
    <div className='NAVBAR_MAIN_CONTAINER relative bg-white md:rounded-t-md'>
      <LogInLogoutButton />
      <NavbarUserNavShortcuts />
      <NavbarClientComponents />
    </div>
  );
};

export default Navbar;
