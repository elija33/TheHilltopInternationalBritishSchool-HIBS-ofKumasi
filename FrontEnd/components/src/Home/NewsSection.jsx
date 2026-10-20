import React from "react";
import { Link } from "react-router-dom";
import AnnouncementCard from "./AnnouncementCard";
import { getMainPageAnnouncements } from "./announcementsUtils";

const PREVIEW_COUNT = 3;

const NewsSection = () => {
  const items = getMainPageAnnouncements().slice(0, PREVIEW_COUNT);

  return (
    <section className="hp-news-section" id="news">
      <div className="hp-container">
        <div className="hp-news-header">
          <div>
            <p className="hp-news-eyebrow">Announcements</p>
            <h2>What&rsquo;s happening at HIBS</h2>
          </div>
          <Link to="/news" className="hp-news-view-all">
            View all announcements &rarr;
          </Link>
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

export default NewsSection;
