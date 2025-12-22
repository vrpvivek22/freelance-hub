import { useState } from "react";

export default function FreelancerRating({ onChange }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <>
      <label>Rating</label>
      <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleClick(star)}
            style={{
              fontSize: "28px",
              color: star <= rating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  );
}
