export interface Soldier {
  soldierId: number;
  firstName: string;
  lastName: string;
  soldierNumber: string;
  soldierEmail: string;
  soldierType: 1 | 2 | 3; // 1=Soldier, 2=Course Commander, 3=Occupation Commander
  courseId: number;
}
