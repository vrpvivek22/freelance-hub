export default function DisplayFreelancerRatings({ value }) {
  const total = 5;

  return (
    <div className="flex gap-1">
      {[...Array(total)].map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: "30px",
            color: i < Math.round(value) ? "darkblue" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
