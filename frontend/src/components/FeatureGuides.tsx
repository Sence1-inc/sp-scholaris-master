
import Feature from './Feature';

const FeatureGuides = ({features}: AppProps) => {
    return (
        <div>
            {features.map((feature:Feature)=>{
                return <Feature title={feature.title} desc={feature.desc} image={feature.image}/>
            })}
        </div>
    )
}

export default FeatureGuides;