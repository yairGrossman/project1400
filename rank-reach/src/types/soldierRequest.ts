export interface SoldierRequestCreate {
  soldierId: number;
  requestId: number;
  comment?: string | null;
}

export interface SoldierRequestRead {
  soldierRequestId: number;
  soldierId: number;
  firstName: string;
  lastName: string;
  requestName: string;
  requestStatus: number; // status id
  statusName: string | null; // joined name (can be null)
  requestDate: string; // ISO string from API
  comment: string | null;

  appointmentId?: number | null;
  appointmentDate?: string | null; // ISO or null
  appointmentLocation?: string | null; // or null
}

export interface SoldierRequestUpdate {
  soldierRequestId: number;
  requestStatus: number; // 0=unanswered, 1=approved, 2=rejected
  appointmentId?: number | null;
}
