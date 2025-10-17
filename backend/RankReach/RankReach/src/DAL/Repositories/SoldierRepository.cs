using System.Data;
using Dapper;
using RankReach.Core.Models;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Sql;

namespace RankReach.DAL.Repositories;

public class SoldierRepository : ISoldierRepository
{
    private readonly ISqlConnectionFactory _connFactory;
    public SoldierRepository(ISqlConnectionFactory connFactory) => _connFactory = connFactory;

    public async Task<Soldier?> GetByEmailAsync(string soldierEmail)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.GetSoldier.ToName();

        var param = new DynamicParameters();
        param.Add("soldierEmail", soldierEmail, DbType.String);

        return await conn.QueryFirstOrDefaultAsync<Soldier>(
            spName, param, commandType: CommandType.StoredProcedure);
    }

    public async Task<int> AddAsync(SoldierCreate payload)
    {
        using var conn = _connFactory.Create();
        var spName = StoredProc.AddSoldier.ToName();

        var p = new DynamicParameters();
        p.Add("soldierNumber", payload.SoldierNumber, DbType.AnsiStringFixedLength, size: 7);
        p.Add("firstName",     payload.FirstName,     DbType.String, size: 50);
        p.Add("lastName",      payload.LastName,      DbType.String, size: 50);
        p.Add("soldierType",   payload.SoldierType,   DbType.Byte);
        p.Add("courseId",      payload.CourseId,      DbType.Int32);
        p.Add("soldierEmail",  payload.SoldierEmail,  DbType.String, size: 255);

        // SCOPE_IDENTITY() comes back as DECIMAL(38,0) → read decimal, cast to int.
        var newIdDecimal = await conn.QuerySingleAsync<decimal>(
            spName, p, commandType: CommandType.StoredProcedure);

        return (int)newIdDecimal; 
    }
}
