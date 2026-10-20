import React from "react";

const AnnouncementCard = ({ announcement }) => (
  <div className="hp-news-card">
    {announcement.image ? (
      <img className="hp-news-card-image" src={announcement.image} alt="" />
    ) : (
      <div className="hp-news-card-placeholder">Optional image from admin</div>
    )}
    <div className="hp-news-card-body">
      <div className="hp-news-badges">
        {announcement.pinned && <span className="hp-pinned-badge">📌 Pinned</span>}
        {announcement.category && (
          <span className="hp-category-badge">{announcement.category.toUpperCase()}</span>
        )}
        <span className="hp-news-date">{announcement.date}</span>
      </div>
      <h3>{announcement.title}</h3>
      <p>{announcement.body}</p>
    </div>
  </div>
);

export default AnnouncementCard;
