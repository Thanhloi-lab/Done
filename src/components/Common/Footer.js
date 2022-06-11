import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>

      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/'>NguyenThanhHien</Link>
            <Link to='/'>CaoThanhLoi</Link>
            <Link to='/'>NguyenThanhDuy</Link>

          </div>
          <div className='footer-link-items' style={{ marginLeft: "50px" }}>
            <h2>Contact Us</h2>
            <Link to='/'>thanhhienm4@gmail.com</Link>
            <Link to='/'>cthanhloi2705@gmail.com</Link>
            <Link to='/'>duynguyenthanh2000@gmail.com</Link>

          </div>
        </div>
        <div className='footer-link-wrapper' style={{ marginLeft: "80px" }}>

          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              DONE
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>DONE © 2020</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;