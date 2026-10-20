import React from "react";
import "../Home/HomePage.css";
import AnnouncementCard from "../Home/AnnouncementCard";
import { getMainPageAnnouncements } from "../Home/announcementsUtils";

const AllAnnouncements = () => {
  const items = getMainPageAnnouncements();

  return (
    <section className="hp-news-section">
      <div className="hp-container">
        <div className="hp-news-header">
          <div>
            <p className="hp-news-eyebrow">Announcements</p>
            <h2>All announcements</h2>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="hp-news-empty">No announcements have been posted yet.</p>
        ) : (
          <div className="hp-news-grid">
            {items.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllAnnouncements;
