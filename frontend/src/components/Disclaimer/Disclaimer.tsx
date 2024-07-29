import { Typography } from '@mui/material'
import React, { Component } from 'react'
import './Disclaimer.css'

export class Disclaimer extends Component {
  render() {
    return (
      <section className="section_disclaimer-contaier">
        <div className="section_disclainer-container-text">
          <Typography variant="h6" sx={{ color: 'common.white' }}>
            DISCLAIMER
          </Typography>
          <Typography variant="body1">
            We are not associated with DepEd, CHED, or any educational
            institutions, and we do not manage the scholarship listings on this
            website. Furthermore, we have no affiliation with any schools or
            organizations offering scholarship assistance. Our role is solely to
            provide a platform; we are not involved in the content posted and
            cannot be held responsible for it.
          </Typography>
        </div>
      </section>
    )
  }
}

export default Disclaimer
