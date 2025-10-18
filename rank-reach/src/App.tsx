import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import SoldierRequests from "./components/Soldier/SoldierRequests";
import CommanderRequests from "./components/Commander/CommanderRequests";
import WeeklyFeedback from "./components/Soldier/WeeklyFeedback/WeeklyFeedback";
import CourseFeedback from "./components/SubjectCommader/CourseFeedback";
import styles from "./App.module.css";
import type { ViewKey } from "./types/requests";

export default function App() {
  const [view, setView] = useState<ViewKey>("unanswered");

  return (
    <>
      <Header onMenuSelect={setView} />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/soldier" element={<SoldierRequests view={view} />} />
          <Route path="/soldier/weekly-feedback" element={<WeeklyFeedback />} />
          <Route
            path="/commander"
            element={<CommanderRequests view={view} />}
          />
          <Route path="/subjectcommander" element={<CourseFeedback />} />
        </Routes>
      </main>
    </>
  );
}
