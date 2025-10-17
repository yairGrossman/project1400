using RankReach.Core.Models;

namespace RankReach.BL.Services;

public interface ISoldierRequestService
{
    Task<IEnumerable<SoldierRequestRead>> GetBySoldierIdAsync(int soldierId, int? statusId = null);
    Task AddAsync(SoldierRequestCreate payload);
    Task UpdateAsync(SoldierRequestUpdate payload);
}


