using RankReach.Core.Models;

namespace RankReach.DAL.Repositories;

public interface IWeeklyFeedbackRepository
{
    Task AddAsync(WeeklyFeedbackCreate payload);
    Task<IEnumerable<CourseFeedbackRead>> GetCourseFeedbacksAsync(int courseId, DateTime weekDate);
}


