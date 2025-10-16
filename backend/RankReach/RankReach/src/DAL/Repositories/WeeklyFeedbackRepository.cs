using System.Data;
using Dapper;
using RankReach.Core.Models;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Sql;

namespace RankReach.DAL.Repositories;

public class WeeklyFeedbackRepository : IWeeklyFeedbackRepository
{
    private readonly ISqlConnectionFactory _connFactory;
    public WeeklyFeedbackRepository(ISqlConnectionFactory connFactory) => _connFactory = connFactory;

    public async Task AddAsync(WeeklyFeedbackCreate payload)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.AddWeeklyFeedback.ToName();

        var p = new DynamicParameters();
        p.Add("soldierId", payload.SoldierId, DbType.Int32);
        p.Add("courseId",  payload.CourseId, DbType.Int32);
        p.Add("review",    payload.Review,   DbType.String);
        p.Add("weekDate",  payload.WeekDate?.Date, DbType.Date);

        await conn.ExecuteAsync(spName, p, commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<CourseFeedbackRead>> GetCourseFeedbacksAsync(int courseId, DateTime weekDate)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.GetCourseFeedbacks.ToName();

        var p = new DynamicParameters();
        p.Add("courseId", courseId, DbType.Int32);
        p.Add("weekDate", weekDate.Date, DbType.Date);

        return await conn.QueryAsync<CourseFeedbackRead>(spName, p, commandType: CommandType.StoredProcedure);
    }
}


