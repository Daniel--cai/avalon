import React from "react";
import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__burger-group">
        <div className="header__burger" />
        <div className="header__burger" />
        <div className="header__burger" />
      </div>
      <span className="header__title">Avalon</span>
      <span className="header__question">?</span>
    </div>
  );
};
