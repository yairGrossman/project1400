namespace RankReach.Core.Models;

public class WeeklyFeedbackCreate
{
    public int SoldierId { get; set; }
    public int CourseId { get; set; }        // required for anonymity per course
    public string? Review { get; set; }
    public DateTime? WeekDate { get; set; }  // optional; if null, server may set to today
}

public class CourseFeedbackRead
{
    public string Review { get; set; } = "";
}


