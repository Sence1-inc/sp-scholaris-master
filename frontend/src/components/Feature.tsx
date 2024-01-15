
const Feature = ({title, desc, image}: Feature) => {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{desc}</h2>
            <img src={image} alt="provider-image" width={100} height={100}/>
        </div>
    )
}

export default Feature;