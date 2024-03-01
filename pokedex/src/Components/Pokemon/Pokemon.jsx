import './Pokemon.css';

function Pokemon({ id, name, image }) {
    return (
        <>
            <div className="pokemone">
                <div>{id}</div>
                <h3>{name}</h3>
                <div><img src={image} alt="" /></div>
            </div>
        </>
    )
}

export default Pokemon