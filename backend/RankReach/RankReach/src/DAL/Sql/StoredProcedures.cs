namespace RankReach.DAL.Sql;

/* Centralized SP names. */
public enum StoredProc
{
    // Soldier
    GetSoldier,
    AddSoldier,

    // SoldierRequest
    GetSoldierRequests,
    AddSoldierRequest,
    UpdateSoldierRequest,

    // Appointment
    AddAppointment,

    // Feedback
    AddWeeklyFeedback,
    GetCourseFeedbacks,

    // Commander
    GetCommanderSoldierRequestsByStatus
}

public static class StoredProcExtensions
{
    public static string ToName(this StoredProc sp) => sp switch
    {
        StoredProc.GetSoldier                         => "dbo.GetSoldier",
        StoredProc.AddSoldier                         => "dbo.AddSoldier",
        StoredProc.GetSoldierRequests                 => "dbo.GetSoldierRequests",
        StoredProc.AddSoldierRequest                  => "dbo.AddSoldierRequest",
        StoredProc.UpdateSoldierRequest               => "dbo.UpdateSoldierRequest",
        StoredProc.AddAppointment                     => "dbo.AddAppointment",
        StoredProc.AddWeeklyFeedback                  => "dbo.AddWeeklyFeedback",
        StoredProc.GetCourseFeedbacks                 => "dbo.GetCourseFeedbacks",
        StoredProc.GetCommanderSoldierRequestsByStatus=> "dbo.GetCommanderSoldierRequestsByStatus",
        _ => throw new ArgumentOutOfRangeException(nameof(sp), sp, "Unknown stored procedure")
    };
}
