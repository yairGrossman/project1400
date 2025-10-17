using RankReach.Core.Models;

namespace RankReach.DAL.Repositories;

/**
 * Interface for soldier data access.
 */
public interface ISoldierRepository
{
    Task<Soldier?> GetByEmailAsync(string soldierEmail);
    Task<int> AddAsync(SoldierCreate payload);
}
