import { useState } from "react";

export default function SoldierDashboard({ user, onSignOut }) {
  const [requestType, setRequestType] = useState("");
  const [note, setNote] = useState("");

  const requestTypes = ["רופא", "בקשת יציאה", "חופל", "תש"];

  const handleCreateRequest = () => {
    if (!requestType) {
      alert("בחר סוג בקשה");
      return;
    }

    console.log({
      soldierId: user.id,
      soldierName: `${user.firstname} ${user.lastname}`,
      type: requestType,
      notes: note,
      commanderId: user.commanderid,
    });

    alert("הבקשה נוצרה (נרשם בקונסול)");
    setRequestType("");
    setNote("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2rem" }}>
        <h1>שלום {user.firstname}</h1>
        <button
          onClick={onSignOut}
          style={{
            backgroundColor: "#c0392b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            height: "40px",
            marginTop: "10px",
          }}
        >
          התנתקות
        </button>
      </div>

      <h2>יצירת בקשה חדשה</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>בחר סוג בקשה: </label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "5px" }}
        >
          <option value="">בחר...</option>
          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="פרטים נוספים..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{
          width: "300px",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      ></textarea>
      <br />

      <button
        onClick={handleCreateRequest}
        style={{
          marginTop: "1rem",
          backgroundColor: "#1C6EA4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        שלח בקשה
      </button>
    </div>
  );
}
