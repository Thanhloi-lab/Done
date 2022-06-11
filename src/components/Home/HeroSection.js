import React from 'react';
import { Button } from '../Common/Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
function HeroSection() {
  let navigate = useNavigate();
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>PRESSURE IS MOTIVATION</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={navigate("/job/")}
        >
          GET STARTED
        </Button>

      </div>
    </div>
  );
}

export default HeroSection;