import { useState } from "react";
import CommanderDashboard from "./components/CommanderDashboard";
import SoldierDashboard from "./components/SoldierDashboard";
import SignIn from "./components/SignIn";

export default function App() {
  const [user, setUser] = useState(null);

  const users = [
    {
      id: 2133,
      firstname: "dsa",
      lastname: "dbh",
      type: "חייל",
      email: "i",
      commanderid: 1133,
    },
    {
      id: 1133,
      firstname: "11",
      lastname: "111",
      type: "מפקד",
      email: "ii",
      commanderid: 4324,
    },
    {
      id: 1133,
      firstname: "11",
      lastname: "111",
      type: "מפקד",
      email: "meshi7889@gmail.com",
      commanderid: 4324,
    },
  ];

  const handleSignOut = () => setUser(null);

  if (!user) return <SignIn users={users} onLogin={setUser} />;

  if (user.type === "מפקד")
    return <CommanderDashboard user={user} onSignOut={handleSignOut} />;

  if (user.type === "חייל")
    return <SoldierDashboard user={user} onSignOut={handleSignOut} />;

  return null;
}
