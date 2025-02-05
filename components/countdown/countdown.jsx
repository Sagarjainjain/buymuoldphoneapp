"use client";
import React, { useState, useEffect } from "react";
import "./countdown.css"; // Import custom CSS

const CountdownTimer = () => {
  const startDate = new Date("2025-02-06T00:00:00Z").getTime();
  const targetDate = startDate + 5 * 24 * 60 * 60 * 1000; // 7 days after start

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0"),
      minutes: String(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0"),
      seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(null); // Initial state is null to prevent mismatch

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Set initial timeLeft after mounting

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null; // Avoid rendering mismatched content

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
