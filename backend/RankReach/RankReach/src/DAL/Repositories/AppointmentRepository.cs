using System.Data;
using Dapper;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Sql;

namespace RankReach.DAL.Repositories;

public class AppointmentRepository : IAppointmentRepository
{
    private readonly ISqlConnectionFactory _connFactory;
    public AppointmentRepository(ISqlConnectionFactory connFactory) => _connFactory = connFactory;

    public async Task<int> AddAsync(DateTime appointmentDate, string appointmentLocation)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.AddAppointment.ToName();

        var p = new DynamicParameters();
        p.Add("appointmentDate", appointmentDate, DbType.DateTime);
        p.Add("appointmentLocation", appointmentLocation, DbType.String, size: 200);

        var id = await conn.QuerySingleAsync<decimal>(spName, p, commandType: CommandType.StoredProcedure);
        return (int)id;
    }
}


