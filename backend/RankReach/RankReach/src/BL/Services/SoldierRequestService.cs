using RankReach.Core.Models;
using RankReach.DAL.Repositories;

namespace RankReach.BL.Services;

public class SoldierRequestService : ISoldierRequestService
{
    private readonly ISoldierRequestRepository _repo;
    public SoldierRequestService(ISoldierRequestRepository repo) => _repo = repo;

    public async Task<IEnumerable<SoldierRequestRead>> GetBySoldierIdAsync(int soldierId, int? statusId = null)
    {
        if (soldierId <= 0) return Array.Empty<SoldierRequestRead>();
        return await _repo.GetBySoldierIdAsync(soldierId, statusId);
    }

    public async Task AddAsync(SoldierRequestCreate payload)
    {
        if (payload.SoldierId <= 0)
            throw new ArgumentException("SoldierId must be > 0");
        if (payload.RequestId <= 0)
            throw new ArgumentException("RequestId must be > 0");
        if (payload.Comment != null && payload.Comment.Length > 500)
            throw new ArgumentException("Comment must be ≤ 500 characters");

        await _repo.AddAsync(payload);
    }

    public async Task UpdateAsync(SoldierRequestUpdate payload)
    {
        if (payload.SoldierRequestId <= 0)
            throw new ArgumentException("SoldierRequestId must be > 0");
        if (payload.RequestStatus > 2)
            throw new ArgumentException("RequestStatus must be 0, 1, or 2");

        await _repo.UpdateAsync(payload);
    }
}


