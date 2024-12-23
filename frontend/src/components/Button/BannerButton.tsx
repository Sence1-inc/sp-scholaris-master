import React from 'react'
import { Link } from 'react-router-dom'
import './BannerButton.css'
import { useMediaQuery, useTheme } from '@mui/material';

const BannerButton = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // up to 600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px to 1024px
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // 1024px and above
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl')); // 1024px and above

  if (isSmallScreen) {
    return (
        <Link to={`/sign-up`} id='img-btn-banner'>
            <button>
            <img src="/images/advertising_banner_mobile.png" alt="sign up today and access premium resources at no cost" />
            </button>
        </Link>
    );
  } else if (isMediumScreen) {
    return (
        <Link to={`/sign-up`} id='img-btn-banner'>
            <button>
            <img src="/images/advertising_banner_tablet.png" alt="sign up today and access premium resources at no cost" />
            </button>
        </Link>
    );
  } else if (isLargeScreen) {
    return (
        <Link to={`/sign-up`} id='img-btn-banner'>
            <button>
            <img src="../images/advertising_banner_pc.png" alt="sign up today and access premium resources at no cost" />
            </button>
        </Link>
    );
  } else if (isExtraLargeScreen) {
    return (
        <Link to={`/sign-up`} id='img-btn-banner'>
            <button>
            <img src="../images/advertising_banner_pc.png" alt="sign up today and access premium resources at no cost" />
            </button>
        </Link>
    );
}

  return null;
};

   <BannerButton />

export default BannerButton
