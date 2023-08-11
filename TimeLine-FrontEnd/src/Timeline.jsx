import "./App.css";

import React, { useEffect, useState } from "react";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <ul>
        {events.map((event) => (
          <p
            key={event.id}
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              marginBottom: "30px",
              border: "2px solid black",
              borderRadius: "24px",
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <img
              src={event.image_url}
              alt={event.title}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "24px",
              }}
            />
          </p>
        ))}
      </ul>
    </div>
  );
};

function Timeline() {
  return (
    <>
      <p>View Your Timeline</p>
      <div>
        <EventsList />
      </div>
      <div className="card"></div>
    </>
  );
}

export default Timeline;
