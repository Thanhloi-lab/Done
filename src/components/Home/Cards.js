import React from 'react';
import CardItem from './CardItem'
import './Cards.css';
import ChartSummary from '../Chart/SummaryTaskChart'; 

function Cards() {
    return (
      <div className='cards'>
        <h1>Tổng quan</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ChartSummary/>
          </div>
        </div>
      </div>
    );
  }
  
  export default Cards;