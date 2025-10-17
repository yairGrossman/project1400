import styles from "./SoldierRequests.module.css";
import Card from "../UI/Card/Card";
import RequestList from "../Requests/RequestList";
import type { Request } from "../Requests/RequestList";
import NewRequestFab from "../Requests/NewRequestFab";
import type { ViewKey } from "../../types/requests";

/* Demo data */
const unanswered: Request[] = [
  { id: "1", name: "חופל", notes: "בדיקה רפואית בסיסית." },
  { id: "2", name: "תש", notes: "תשאול/תחקיר קצר מול המפקד." },
  { id: "3", name: "רופא", notes: "פגישה עם רופא היחידה." },
  { id: "4", name: "בקשת יציאה", notes: "בקשה ליציאה מוקדמת/חופשה." },
  { id: "5", name: "חופל", notes: "מועד שני לבדיקה." },
];

const approved: Request[] = [
  {
    id: "11",
    name: "רופא",
    notes: "תיאום בוצע.",
    date: "2025-10-20 09:30",
    location: "מרפאה גדודית",
  },
  {
    id: "12",
    name: "בקשת יציאה",
    notes: "אושרה לשישי.",
    date: "2025-10-24",
    location: "בסיס נווה",
  },
  {
    id: "13",
    name: "תש",
    notes: "תחקיר קצר לאחר תורנות.",
    date: "2025-10-22 16:00",
    location: "חדר מפקד",
  },
];

const rejected: Request[] = [
  { id: "21", name: "בקשת יציאה", notes: "חוסר כוח אדם במשמרת." },
  { id: "22", name: "רופא", notes: "לא סופקו מסמכים נדרשים." },
];

const cardTitles: Record<ViewKey, string> = {
  unanswered: "בקשות שלא נענו",
  approved: "בקשות שאושרו",
  rejected: "בקשות שלא אושרו",
};

interface Props {
  view: ViewKey;
}

export default function SoldierRequests({ view }: Props) {
  const data =
    view === "unanswered"
      ? unanswered
      : view === "approved"
      ? approved
      : rejected;

  return (
    <section className={styles.wrapper} dir="rtl">
      <h2 className={styles.pageTitle}>הבקשות שלי</h2>

      <Card title={cardTitles[view]}>
        <RequestList items={data} variant={view} />
      </Card>

      <NewRequestFab />
    </section>
  );
}
