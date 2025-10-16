using RankReach.Core.Models;
using RankReach.DAL.Repositories;

namespace RankReach.BL.Services;

public class WeeklyFeedbackService : IWeeklyFeedbackService
{
    private readonly IWeeklyFeedbackRepository _repo;
    public WeeklyFeedbackService(IWeeklyFeedbackRepository repo) => _repo = repo;

    public async Task AddAsync(WeeklyFeedbackCreate payload)
    {
        if (payload.SoldierId <= 0)
            throw new ArgumentException("SoldierId must be > 0");
        if (payload.CourseId <= 0)
            throw new ArgumentException("CourseId is required and must be > 0");
        if (payload.Review != null && payload.Review.Length == 0)
            payload.Review = null; // normalize empty to null

        // Thursday-only rule handled by SP. If WeekDate is null, pass null → SP defaults to today.
        await _repo.AddAsync(payload);
    }

    public async Task<IEnumerable<CourseFeedbackRead>> GetCourseFeedbacksAsync(int courseId, DateTime weekDate)
    {
        if (courseId <= 0) return Array.Empty<CourseFeedbackRead>();
        return await _repo.GetCourseFeedbacksAsync(courseId, weekDate);
    }
}


