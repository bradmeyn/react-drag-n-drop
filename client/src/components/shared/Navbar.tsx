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
    <nav className='navbar bg-base-300 px-3'>
      <div className='flex md:justify-between container w-full mx-auto justify-between'>
        <Link
          to='/boards'
          className='text-white align-middle flex items-center'
        >
          <div className='text-3xl'>
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              style={logoStyle}
              className='mr-3 '
            />
            <span className='font-semibold'>Workshop</span>
          </div>
        </Link>

        <span className='rounded-full bg-sky-600 text-slate-100 p-2'>BM</span>
      </div>
    </nav>
  );
};

export default Navbar;
