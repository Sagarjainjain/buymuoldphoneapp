"use client";
import React, { useState, useEffect } from "react";
import "./countdown.css"; // Import custom CSS

const CountdownTimer = () => {
  // Calculate the target date (7 days from now)
  const targetDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const days = String(
      Math.floor(difference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    const hours = String(
      Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
      Math.floor((difference % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">

      <div className="countdown">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">{value}</div>
              <div className="flip-card-back">{value}</div>
            </div>
            <span>{label.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
