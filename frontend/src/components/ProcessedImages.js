import React, { useState, useEffect } from "react";
import axios from "axios";

function ProcessedImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await axios.get("http://localhost:8000/processed/");
      setImages(response.data.files);
    }
    fetchImages();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
      {images.map((image) => (
        <div key={image}>
          <img
            src={`http://localhost:8000/static/${image}`}
            alt={image}
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => window.open(`http://localhost:8000/static/${image}`, "_blank")}
          />
        </div>
      ))}
    </div>
  );
}

export default ProcessedImages;
