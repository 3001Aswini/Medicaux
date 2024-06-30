import React from 'react';
import './Community.css';
function CommunityPage() {
  return (
    <div className="community-container">
      <div className="chat-box">
        <div className="chat-message doctor">
          <div className="avatar">Dr. A</div>
          <div className="message-content">
            <p>Hello everyone! How's your day going?</p>
            <span className="message-time">10:00 AM</span>
          </div>
        </div>

        <div className="chat-message patient">
          <div className="avatar">Patient B</div>
          <div className="message-content">
            <p>Hi Dr. A! I'm feeling much better, thanks for asking.</p>
            <span className="message-time">10:05 AM</span>
          </div>
        </div>

        <div className="chat-message doctor">
          <div className="avatar">Dr. C</div>
          <div className="message-content">
            <p>Good to hear! Remember to follow up if you have any concerns.</p>
            <span className="message-time">10:10 AM</span>
          </div>
        </div>

    
      </div>
    </div>
  );
}

export default CommunityPage;
