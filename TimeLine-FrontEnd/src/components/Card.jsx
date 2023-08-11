import React, { useState } from "react";
import "./styles.css"; // Import the CSS file

const createEvent = async (title, description, date, image_url) => {
  const event = {
    title,
    description,
    date,
    image_url,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // Success message
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// CardForm component
const CardForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const clear = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setDate("");
  };

  // Add a boolean variable to check if the inputs are filled
  const inputsFilled =
    title !== "" || description !== "" || image !== "" || date !== "";

  return (
    <div className="card-form">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description"
      />
      <input
        type="text"
        value={date}
        onChange={handleDateChange}
        placeholder="Enter a date"
      />
      <input
        type="text"
        value={image}
        onChange={handleImageChange}
        placeholder="Enter image URL"
      />
      <div className={`card ${inputsFilled ? "filled" : ""}`}>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
          <p className="card-date">{date}</p>
          {image && (
            <img
              src={image}
              alt={title}
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          )}
        </div>
        <button
          onClick={() => {
            createEvent(title, description, date, image);
            clear();
          }}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default CardForm;
