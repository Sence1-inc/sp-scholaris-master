
const Feature = ({title, desc, image, isEven}: Feature) => {
    return (
        <div className={`featureGuides__feature ${isEven ? '' : 'd-flex-row-rev'}`}>
            <div className="featureGuides__feature-text">
                <h4 className="featureGuides__feature-title">{title}</h4>
                <p className="featureGuides__feature-desc">{desc}</p>
            </div>
            <img className="featureGuides__feature-img" src={image} alt="provider-image"/>
        </div>
    )
}

export default Feature;