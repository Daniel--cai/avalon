import React from "react";
import "./Progress.css";

export const Progress = () => {
  return (
    <div className="progress">
      <div className="progress__bar progress__bar--active" />
      <div className="progress__bar" />
      <div className="progress__bar" />
      <div className="progress__bar" />
      <div className="progress__bar">.</div>
    </div>
  );
};
