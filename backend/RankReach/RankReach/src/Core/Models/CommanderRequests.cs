namespace RankReach.Core.Models;

public class CommanderRequestRead
{
    public int SoldierRequestId { get; set; }
    public int SoldierId { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName  { get; set; } = "";
    public int RequestId { get; set; }
    public string RequestName { get; set; } = "";
    public DateTime RequestDate { get; set; }
    public string? Comment { get; set; }
    public int? AppointmentId { get; set; }
    public DateTime? AppointmentDate { get; set; }
    public string? AppointmentLocation { get; set; }
}


