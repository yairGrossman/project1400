using RankReach.Core.Models;

namespace RankReach.BL.Services;

public interface IWeeklyFeedbackService
{
    Task AddAsync(WeeklyFeedbackCreate payload);
    Task<IEnumerable<CourseFeedbackRead>> GetCourseFeedbacksAsync(int courseId, DateTime weekDate);
}


