using RankReach.Core.Models;
using RankReach.DAL.Repositories;

namespace RankReach.BL.Services;

/* Minimal validation rules for Soldier. */
public class SoldierService : ISoldierService
{
    private readonly ISoldierRepository _repo;
    public SoldierService(ISoldierRepository repo) => _repo = repo;

    public async Task<Soldier?> GetAsync(int soldierId)
        => soldierId <= 0 ? null : await _repo.GetByIdAsync(soldierId);

    public async Task<int> CreateAsync(SoldierCreate payload)
    {
        // Required lengths (match DB definitions)
        if (string.IsNullOrWhiteSpace(payload.FirstName) || payload.FirstName.Length > 50)
            throw new ArgumentException("FirstName is required (≤ 50)");
        if (string.IsNullOrWhiteSpace(payload.LastName) || payload.LastName.Length > 50)
            throw new ArgumentException("LastName is required (≤ 50)");
        if (string.IsNullOrWhiteSpace(payload.SoldierEmail) || payload.SoldierEmail.Length > 255)
            throw new ArgumentException("SoldierEmail is required (≤ 255)");

        // soldierNumber must be exactly 7 (CHAR(7))
        if (string.IsNullOrWhiteSpace(payload.SoldierNumber) || payload.SoldierNumber.Length != 7)
            throw new ArgumentException("SoldierNumber must be exactly 7 characters");

        // soldierType: 1..3 (1=Soldier, 2=Commander, 3=Admin)
        if (payload.SoldierType is < 1 or > 3)
            throw new ArgumentException("SoldierType must be 1, 2, or 3");

        // courseId required (FK)
        if (payload.CourseId <= 0)
            throw new ArgumentException("CourseId must be > 0");

        // TODO: business check later:
        // If soldierNumber uniqueness is required, verify no duplicate exists BEFORE insert.
        // check CorseId exists in Course table.

        return await _repo.AddAsync(payload);
    }
}
