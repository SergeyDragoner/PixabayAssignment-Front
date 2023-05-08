import "./ShowPixabay.css";
import { useState, useEffect } from "react";
import pixabayService from "../../../Services/PixabayService";

function ShowPixabay() {
    const [imagesArray, setImages] = useState([]);
    const [category, setCategory] = useState("Love");
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        pixabayService
            .getAllFromPixabay(category, page)
            .then((items) => {
                setImages(items);
            })
            .catch((err) => console.log(err));
    }, [category, page]);


    function handlePrev() {
        if (page <= 1) return;

        setPage(page - 1);
    }

    function handleNext() {
        if (imagesArray.length < 9) return;

        setPage(page + 1);
    }

    function setCategories() {
        const categories = [
            "Love",
            "Sport",
            "Computer",
            "Nature",
            "Home",
            "Dogs",
            "Cats",
        ];

        return categories.map((category, index) => (
            <option key={index} value={category}>
                {category}
            </option>
        ));
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleImageClick(image) {
        setSelectedImage(image);
    }



    return (
        <div className="ShowPixabay">
            {!imagesArray && <p>Sorry no images...</p>}
            {imagesArray.length > 0 && (
                <>
                    <section id="categories">
                        <select value={category} onChange={handleCategoryChange}>
                            {setCategories()}
                        </select>
                    </section>
                    <div className="grid-container">
                        {imagesArray.map((image) => (
                            <div key={image.id} className="image-container">
                                <img
                                    src={image.webformatURL}
                                    alt={image.id}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button onClick={handlePrev}>Prev</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </>
            )}
            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={() => setSelectedImage(null)}>
              <button className={"close-button"}>Close</button>
            </span>
                        <img src={selectedImage.webformatURL} alt={selectedImage.id} />
                        <div className="image-details">
                            <p>Likes: {selectedImage.views}</p>
                            <p>Views: {selectedImage.likes}</p>
                            <p>Downloads: {selectedImage.downloads}</p>
                            <p>Collections: {selectedImage.collections}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowPixabay;