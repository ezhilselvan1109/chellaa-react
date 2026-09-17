import React from "react";
import { Link } from "react-router-dom";

export const AnnouncementBanner: React.FC = () => {
  return (
    <div className="announcement-banner">
      <div className="announcement-content">
        <span>Build faster with Chella UI Design System 💎 Zero CSS imports required</span>
        <Link to="/docs/installation" className="announcement-link">
          Learn more
        </Link>
      </div>
    </div>
  );
};
