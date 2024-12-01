import React from "react";
import Header from "./components/Header";
import UploadImages from "./components/UploadImages";
import ProcessedImages from "./components/ProcessedImages";

function App() {
  return (
    <div>
      <Header />
      <main style={styles.main}>
        <h2>Upload Images for Analysis</h2>
        <UploadImages />
        <h2>Processed Images</h2>
        <ProcessedImages />
      </main>
    </div>
  );
}

const styles = {
  main: {
    padding: "20px",
    textAlign: "center",
  },
};

export default App;
