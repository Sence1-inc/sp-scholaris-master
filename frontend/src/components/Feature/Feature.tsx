import './Feature.css';
import React from 'react'

const Feature: React.FC<FeatureProps> = ({title, desc, image, isEven}) => {
    return (
        <div className={`featureGuides__feature ${isEven ? '' : 'd-flex-row-rev'}`}>
            <div className="featureGuides__feature-text">
                <h3 className="featureGuides__feature-title">{title}</h3>
                <p className="featureGuides__feature-desc">{desc}</p>
            </div>
            <img className="featureGuides__feature-img" src={image} alt="provider"/>
        </div>
    )
}

export default Feature; 