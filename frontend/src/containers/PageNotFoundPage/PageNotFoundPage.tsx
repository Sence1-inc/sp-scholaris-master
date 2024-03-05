import PrimaryButton from '../../components/Button/PrimaryButton'
import image from '../../public/images/404.png'

import './PageNotFoundPage.css'

const PageNotFoundPage = () => {
  return (
    <div>
      <div className="container">
        <h4 className="container_404-subheading">Oops! Page not found.</h4>
        <img src={image} className="container_404-image" alt="404" />
        <h3 className="container_404-text">
          We are sorry, the page you requested was not found.
        </h3>
        <PrimaryButton label="Go to Home" url="/"></PrimaryButton>
      </div>
    </div>
  )
}

export default PageNotFoundPage
