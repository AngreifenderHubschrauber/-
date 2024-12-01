import React, { useState } from "react";
import axios from "axios";

function UploadImages() {
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post("http://localhost:8000/upload/", formData);
      alert("Uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadImages;

