import { useState } from "react";
import RequestList from "./RequestList.jsx";
import SoldierCard from "./SoldierCard.jsx";

export default function CommanderDashboard({ user, onSignOut }) {
  const [view, setView] = useState("unanswered");
  const [selectedSoldier, setSelectedSoldier] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [email, setEmail] = useState("");

  const types = ["תש", "חופל", "רופא", "בקשת יציאה"];

  const handleClosePopup = () => {
    setSelectedSoldier(null);
    setSelectedType(null);
    setShowCreateUser(false);
  };

  const handleCreateUser = () => {
    console.log("האימייל שהוזן:", email);
    setShowCreateUser(false);
    setEmail("");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>מערכת ניהול פניות – מפקד</h1>
        <nav>
          <button onClick={() => setView("unanswered")}>בקשות שלא נענו</button>
          <button onClick={() => setView("answered")}>בקשות שנענו</button>
          <button onClick={() => setShowCreateUser(true)}>יצירת משתמש לחייל</button>
          <button
            onClick={onSignOut}
            style={{ backgroundColor: "#c0392b", color: "white", marginRight: "1rem" }}
          >
            התנתקות
          </button>
        </nav>
      </header>

      <div className="dashboard">
        <div className="request-lists">
          {types.map((type) => (
            <div className="request-list" key={type}>
              <RequestList
                type={type}
                answered={view === "answered"}
                onSelect={(soldier) => {
                  setSelectedSoldier(soldier);
                  setSelectedType(type);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedSoldier && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={handleClosePopup}>×</span>
            <SoldierCard
              soldier={selectedSoldier}
              type={selectedType}
              answered={view === "answered"}
            />
          </div>
        </div>
      )}

      {showCreateUser && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={handleClosePopup}>×</span>
            <h3>יצירת משתמש לחייל</h3>
            <input
              type="email"
              placeholder="הכנס כתובת אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "1rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleCreateUser}
              style={{
                marginTop: "1rem",
                backgroundColor: "#1C6EA4",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              צור משתמש
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
