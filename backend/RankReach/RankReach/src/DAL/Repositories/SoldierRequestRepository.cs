using System.Data;
using Dapper;
using RankReach.Core.Models;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Sql;

namespace RankReach.DAL.Repositories;

public class SoldierRequestRepository : ISoldierRequestRepository
{
    private readonly ISqlConnectionFactory _connFactory;
    public SoldierRequestRepository(ISqlConnectionFactory connFactory) => _connFactory = connFactory;

    public async Task<IEnumerable<SoldierRequestRead>> GetBySoldierIdAsync(int soldierId, int? statusId = null)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.GetSoldierRequests.ToName();

        var param = new DynamicParameters();
        param.Add("soldierId", soldierId, DbType.Int32);
        param.Add("@statusId", statusId ?? 0, DbType.Int32);

        return await conn.QueryAsync<SoldierRequestRead>(spName, param, commandType: CommandType.StoredProcedure);
    }

    public async Task AddAsync(SoldierRequestCreate payload)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.AddSoldierRequest.ToName();

        var p = new DynamicParameters();
        p.Add("soldierId", payload.SoldierId, DbType.Int32);
        p.Add("requestId", payload.RequestId, DbType.Int32);
        p.Add("comment",   payload.Comment,   DbType.String, size: 500);

        await conn.ExecuteAsync(spName, p, commandType: CommandType.StoredProcedure);
    }

    public async Task UpdateAsync(SoldierRequestUpdate payload)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.UpdateSoldierRequest.ToName();

        var p = new DynamicParameters();
        p.Add("soldierRequestId", payload.SoldierRequestId, DbType.Int32);
        p.Add("requestStatus",    payload.RequestStatus,    DbType.Byte);
        p.Add("appointmentId",    payload.AppointmentId,    DbType.Int32);

        await conn.ExecuteAsync(spName, p, commandType: CommandType.StoredProcedure);
    }
}