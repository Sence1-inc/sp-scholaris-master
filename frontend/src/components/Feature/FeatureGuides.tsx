import './Feature.css';
import Feature from './Feature';

const FeatureGuides = ({features}: AppProps) => {
    return (
        <section className="featureGuides">
            <div className="container">
                <h2>Feature Guides</h2>
                {features.map((feature:Feature, index)=>{
                    return <Feature title={feature.title} desc={feature.desc} image={feature.image} isEven={index % 2 ? true : false} />
                })}
            </div>         
        </section>
    )
}

export default FeatureGuides;