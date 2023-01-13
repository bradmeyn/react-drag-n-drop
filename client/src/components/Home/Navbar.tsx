import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/pro-duotone-svg-icons';
import { Link } from 'react-router-dom';

const logoStyle: Object = {
  '--fa-primary-color': 'rgb(139 92 246)',
  '--fa-secondary-color': 'rgb(56 189 248)',
  '--fa-primary-opacity': '1',
  '--fa-secondary-opacity': '1',
};

const Navbar = () => {
  return (
    <nav className='navbar  px-3'>
      <div className='flex md:justify-between container w-full mx-auto justify-between items-center'>
        <div className='flex items-center'>
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            style={logoStyle}
            className='mr-3 text-2xl'
          />
          <div className='font-bold inline-block text-slate-50 text-xl'>
            Workshop
          </div>
        </div>

        <div className='flex'>
          <Link
            to='/projects'
            className='text-white align-middle flex items-center'
          >
            <button className='rounded-md  text-slate-100 py-2 px-4 mr-2 text-md font-semibold'>
              Login
            </button>
          </Link>
          <Link
            to='/projects'
            className='text-white align-middle flex items-center'
          >
            <button className='rounded-md bg-purple-600 text-slate-100 py-2 px-4 text-md font-semibold'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
