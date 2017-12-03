import React from 'react';

export class Carousel extends React.Component {
  

  public render() {
    return (
      <div className='carousel carousel-slider center z-depth-3' data-indicators='true'>
        <div className='carousel-fixed-item center'>
          <a className='btn tooltipped waves-effect white grey-text darken-text-2' role='button'>Focus me!</a>
        </div>
        <a className='carousel-item green white-text' href='#one!'>
          <h2>First Panel</h2>
          <p className='white-text'>This is your first panel</p>
        </a>
        <a className='carousel-item amber white-text' href='#two!'>
          <h2>Second Panel</h2>
          <p className='white-text'>This is your second panel</p>
        </a>
        <a className='carousel-item red white-text' href='#three!'>
          <h2>Third Panel</h2>
          <p className='white-text'>This is your third panel</p>
        </a>
        <a className='carousel-item purple white-text' href='#four!'>
          <h2>Fourth Panel</h2>
          <p className='white-text'>This is your fourth panel</p>
        </a>
      </div>
    );
  }
}
