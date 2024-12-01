import React from "react";

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Photo Analyzer</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#4CAF50",
    padding: "10px 20px",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
};

export default Header;
