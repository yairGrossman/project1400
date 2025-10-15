import { useState } from "react";

export default function SoldierCard({ soldier, type, answered }) {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(soldier.date || "");
  const [time, setTime] = useState(soldier.time || "");
  const [location, setLocation] = useState(soldier.location || "");

  if (!soldier) return null;

  const handleApprove = () => {
    if (["חופל", "רופא", "תש"].includes(type)) {
      setIsEditing(true);
    } else {
      soldier.status = "approved";
      alert("הבקשה אושרה ונשלחה לחייל");
    }
  };

  const handleReject = () => {
    soldier.status = "rejected";
    alert("הבקשה נדחתה ונשלחה לחייל");
  };

  const handleSend = () => {
    soldier.date = date;
    soldier.time = time;
    soldier.location = location;
    soldier.status = "approved";
    setIsEditing(false);
    alert("פרטי התור נשלחו לחייל");
  };

  return (
    <div className="soldier-card">
      <h3>{soldier.name}</h3>
      <p>מספר אישי: {soldier.personalNumber}</p>
      <p>הערות: {soldier.notes}</p>
      <p>סטטוס: {soldier.status}</p>

      {!answered && !isEditing && (
        <div className="card-actions">
          <button onClick={handleApprove}>אישור</button>
          <button onClick={handleReject} className="reject-btn">
            דחייה
          </button>
        </div>
      )}

      {!answered && isEditing && (
        <div className="appointment-form">
          <h4>הזנת תאריך, שעה ומיקום</h4>
          <label>תאריך:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>שעה:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <label>מיקום:</label>
          <input
            type="text"
            placeholder="מיקום"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSend}>שמירה ושליחה לחייל</button>
        </div>
      )}

      {answered && (
        <div className="appointment-details">
          {soldier.date && <p>תאריך: {soldier.date}</p>}
          {soldier.time && <p>שעה: {soldier.time}</p>}
          {soldier.location && <p>מיקום: {soldier.location}</p>}
        </div>
      )}
    </div>
  );
}
