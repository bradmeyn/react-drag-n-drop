const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='footer mt-auto items-center p-4 bg-neutral text-neutral-content justify-center'>
      <div className='justify-center'>
        <p className='mx-auto'>
          Developed by{' '}
          <a
            href={'https://www.bradmeyn.com'}
            target='_blank'
            rel='noreferrer'
            className='text-white hover:underline underline-offset-2 hover:text-cyan-500'
          >
            Brad Meyn
          </a>
        </p>
        <p>Copyright © {date} - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
