namespace RankReach.Core.Models;

public class SoldierRequestCreate
{
    public int SoldierId { get; set; }
    public int RequestId { get; set; }
    public string? Comment { get; set; }
}

public class SoldierRequestRead
{
    public int SoldierRequestId { get; set; }
    public int SoldierId { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName  { get; set; } = "";
    public string RequestName { get; set; } = "";
    public byte RequestStatus { get; set; }
    public string StatusName { get; set; } = "";
    public DateTime RequestDate { get; set; }
    public string? Comment { get; set; }
    public int? AppointmentId { get; set; }
    public DateTime? AppointmentDate { get; set; }
    public string? AppointmentLocation { get; set; }
}

public class SoldierRequestUpdate
{
    public int SoldierRequestId { get; set; }
    public byte RequestStatus { get; set; }
    public int? AppointmentId { get; set; }
}


