import React, { useState } from "react";
import './App.css';  // Импортируем стили

// Функция для загрузки изображений
async function uploadImages(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
    }

    try {
        const response = await fetch("http://localhost:8000/process-image/", {
            method: "POST",
            body: formData,
        });
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

function App() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            alert("Пожалуйста, выберите хотя бы одно изображение!");
            return;
        }

        const urls = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const result = await uploadImages([selectedFiles[i]]);
            urls.push(result);
        }
        setImageUrls(urls);
    };

    return (
        <div className="App">
            <h1>Аналиизатор ЛЭП</h1>
            <input 
                type="file" 
                onChange={handleFileChange} 
                multiple 
            />
            <button onClick={handleUpload}>Загрузить и проанализировать</button>
            {imageUrls.length > 0 && (
                <div>
                    <h2>Результаты анализа:</h2>
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index}>
                            <h3>Изображение {index + 1}:</h3>
                            <img src={imageUrl} alt={`Processed ${index + 1}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
