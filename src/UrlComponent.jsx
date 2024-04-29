import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const UrlComponent = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
          throw new Error("Error al obtener la URL corta");
        }
        
      const responseData = await response.json();
      setShortUrl(responseData.data);
    } catch (error) {
      setError("Error al obtener la URL corta");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Shortify
        </Button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="body1">URL corta generada:</Typography>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default UrlComponent;