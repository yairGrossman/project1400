using System.Data;
using Dapper;
using RankReach.Core.Models;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Sql;

namespace RankReach.DAL.Repositories;

public class CommanderRequestsRepository : ICommanderRequestsRepository
{
    private readonly ISqlConnectionFactory _connFactory;
    public CommanderRequestsRepository(ISqlConnectionFactory connFactory) => _connFactory = connFactory;

    public async Task<IEnumerable<CommanderRequestRead>> GetByStatusAsync(int commanderId, int requestStatus)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.GetCommanderSoldierRequestsByStatus.ToName();

        var p = new DynamicParameters();
        p.Add("commanderId", commanderId, DbType.Int32);
        p.Add("requestStatus", requestStatus, DbType.Byte);

        return await conn.QueryAsync<CommanderRequestRead>(spName, p, commandType: CommandType.StoredProcedure);
    }
}


