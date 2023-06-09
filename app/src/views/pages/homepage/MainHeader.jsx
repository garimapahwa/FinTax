import React from 'react';
import { Link } from 'react-router-dom';
import { links } from './data';
import { useState } from 'react';
import Popup from './Popup.jsx';
// import{Link} from 'react-router-dom'
import { GoThreeBars } from 'react-icons/go';
// import Logo from '../images/Gymgenix.png'
import { NavLink } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
import './Navbar.css';
import './MainHeader.css';
import Image from '../../../../src/assets/images/landscape-day-bottom-image_desktop.svg';
import Tradeimage from '../../../../src/assets/images/tradephone.png';
import Logoimg from '../../../../src/assets/images/logo.png'

const MainHeader = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  return (
    <>
      <Popup />
      <nav>
        <div className="container nav__container">
          <ul className={`nav__links ${isNavShowing ? 'show__nav' : 'hide__nav'}`}>
            {links.map(({ name, path }, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => (isActive ? 'active-nav' : ' ')}
                    onClick={() => setIsNavShowing((prev) => !prev)}
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <button className="nav__toggle-btn" onClick={() => setIsNavShowing((prev) => !prev)}>
            {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
          </button>
        </div>
      </nav>
      <header className="main__header">
        <div className="container main__header-container">

            <div className="main__header-left">
                <img src={Logoimg} alt='logoimg' className='logo'/>
                <h4 className='tag'> #ChatGPT</h4>
                <h1 className='heading'>A Tax Accounting Blockchain Platform</h1>
                <p>FinTax is an innovative solution for tax accounting that was created with the aim of addressing the difficulties associated with tax compliance in the context of blockchain-based transactions.</p>
                <Link to="/dashboard/default" className='btn lg'>Get Started</Link>
                </div>
                <div className="main__header-right">
            <div className="buttons">
              <a href="/pages/login/login3" className="btn-other">
                {' '}
                Login
              </a>
              <a href="/pages/register/register3" className="btn md">
                {' '}
                Register here
              </a>
            </div>

            <div className="main__header-circle"></div>
            <div className="main__header-image">
              <img src={Tradeimage} alt="Main Header" />
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <div className="bottom-image">
            <img src={Image} alt="bottomimg" />
          </div>
        </div>
        <div className='footer'>

        </div>
      </header>
    </>
  );
};

export default MainHeader;
