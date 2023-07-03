import React, {useState} from "react";
import "../css/Artwork.css"
import imageSrc from "../notfound.jpg"

const Artwork = (props) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className={props.mode ? 'artwork-night' : 'artwork'}>
            <p>{props.title}</p>
            {imageError ? (
                <img src={imageSrc}></img>
            ) : (
                <img src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`} onError={handleImageError}></img>
            )}
            <button className={"delete-button"} onClick={() => props.remove(props.id)}>X</button>
        </div>
    )
}

export default Artwork;