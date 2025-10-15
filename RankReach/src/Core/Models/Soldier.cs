namespace RankReach.Core.Models;

public class Soldier
{
    public int SoldierId { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName  { get; set; } = "";
    public string SoldierNumber { get; set; } = ""; // CHAR(7)
    public string SoldierEmail  { get; set; } = "";
    public byte SoldierType { get; set; }            // 1=Soldier, 2=Commander, 3=Admin
    public int CourseId { get; set; }                // FK -> Course(courseId)
}

/* API input for create (all required). */
public class SoldierCreate
{
    public string FirstName { get; set; } = "";
    public string LastName  { get; set; } = "";
    public string SoldierNumber { get; set; } = "";  // exactly 7
    public string SoldierEmail  { get; set; } = "";
    public byte SoldierType { get; set; }            // 1.2.3
    public int CourseId { get; set; }                // required FK
}

/* API output. */
public class SoldierRead
{
    public int SoldierId { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName  { get; set; } = "";
    public string SoldierNumber { get; set; } = "";
    public string SoldierEmail  { get; set; } = "";
    public byte SoldierType { get; set; }
    public int CourseId { get; set; }
}
