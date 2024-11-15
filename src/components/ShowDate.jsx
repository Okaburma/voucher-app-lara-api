import React from "react";

const ShowDate = ({ timestamp }) => {
  const date = new Date(timestamp);
  const optionsDate = { day: "numeric", month: "short", year: "numeric" };
  const currentDate = date.toLocaleDateString("en-GB", optionsDate);
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
  const currentTime = date.toLocaleTimeString("en-GB", optionsTime);
  return (
    <div>
      <p className="text-xs">{currentDate}</p>
      <p className="text-xs">{currentTime}</p>
    </div>
  );
};

export default ShowDate;
