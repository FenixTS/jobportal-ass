import React, { useState, useEffect } from "react";
import "./SalaryRange.css";

const SalaryRange = ({ selectedSalaryRange, setSelectedSalaryRange, hasJobsInRange }) => {
  const [min, setMin] = useState(27000);
  const [max, setMax] = useState(64000);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setShowWarning(!hasJobsInRange);
  }, [hasJobsInRange]);

  const handleMin = (e) => {
    const value = Math.floor(Math.min(Number(e.target.value), max - 5000));
    setMin(value);
    setSelectedSalaryRange({ min: value, max });
    setShowWarning(false);
  };

  const handleMax = (e) => {
    const value = Math.floor(Math.max(Number(e.target.value), min + 5000));
    setMax(value);
    setSelectedSalaryRange({ min, max: value });
    setShowWarning(false);
  };

  const getBackground = () => {
    const rangeMin = 10000;
    const rangeMax = 100000;

    const minPercent = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
    const maxPercent = ((max - rangeMin) / (rangeMax - rangeMin)) * 100;

    return {
      background: `linear-gradient(to right, 
        #ddd ${minPercent}%, 
        #000 ${minPercent}%, 
        #000 ${maxPercent}%, 
        #ddd ${maxPercent}%)`,
    };
  };

  return (
    <div className="salary-section">
      <div className="salary-header">
        <label>Salary Per Month</label>
        <div className="salary-values">
          ₹{Math.floor(min / 1000)}k - ₹{Math.floor(max / 1000)}k
        </div>
      </div>

      <div className="slider-container">
        <div className="slider-track" style={getBackground()}></div>

        <input
          type="range"
          min="10000"
          max="100000"
          value={min}
          onChange={handleMin}
          className="range-thumb"
        />
        <input
          type="range"
          min="10000"
          max="100000"
          value={max}
          onChange={handleMax}
          className="range-thumb"
        />
      </div>

      {showWarning && (
        <div className="salary-warning">
          No jobs found in this range. Try adjusting the salary range.
        </div>
      )}
    </div>
  );
};

export default SalaryRange; 