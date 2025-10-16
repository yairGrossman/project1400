using RankReach.Core.Models;

namespace RankReach.DAL.Repositories;

public interface ISoldierRequestRepository
{
    Task<IEnumerable<SoldierRequestRead>> GetBySoldierIdAsync(int soldierId);
    Task AddAsync(SoldierRequestCreate payload);
    Task UpdateAsync(SoldierRequestUpdate payload);
}


