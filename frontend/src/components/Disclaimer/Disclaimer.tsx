import React, { Component } from 'react'
import './Disclaimer.css'

export class Disclaimer extends Component {
  render() {
    return (
      <section className='section_disclaimer-contaier'>
        <div className='section_disclainer-container-text'>
          <h1 className='section_disclainer-container-text-heading'>DISCLAIMER</h1>
          <h1>We have no affiliation with DepEd, CHED, or any educational institutions, and we do not oversee the scholarship listings on this website. Moreover, we are not connected to any schools or organizations providing scholarship assistance.</h1>
        </div>
      </section>
    )
  }
}

export default Disclaimer