import { useState } from "react";

export default function ClientRating({ onChange }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <>
      <label>Rating</label>
      <div className="display-flex space-x-2 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleClick(star)}
            style={{
              fontSize: "28px",
              color: star <= rating ? "blue" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  );
}
