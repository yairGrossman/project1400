export default function RequestList({ type, answered, onSelect }) {
  // נתוני דוגמה
  const soldiers = [
    {
      name: "משה כהן",
      personalNumber: "1234567",
      notes: "מרגיש לא טוב, מבקש לראות רופא.",
      status: "pending",
    },
    {
      name: "דניאל לוי",
      personalNumber: "2345678",
      notes: "מבקש חופל לבדיקת פציעה.",
      status: "pending",
    },
  ];

  const filtered = soldiers.filter((s) =>
    answered ? s.status !== "pending" : s.status === "pending"
  );

  return (
    <div className="request-list-box">
      <h3>{type}</h3>
      {filtered.length === 0 ? (
        <p>אין בקשות</p>
      ) : (
        filtered.map((soldier, i) => (
          <div
            key={i}
            className="soldier-item"
            onClick={() => onSelect(soldier)}
          >
            <strong>{soldier.name}</strong>
            <p>סטטוס: {soldier.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
