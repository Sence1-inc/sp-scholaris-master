import { useEffect, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactElement | null;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
}