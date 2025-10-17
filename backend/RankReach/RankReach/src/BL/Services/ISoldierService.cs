using RankReach.Core.Models;

namespace RankReach.BL.Services;
/**
 * Interface for creating validation/rules for Soldier .
 */
public interface ISoldierService
{
    Task<Soldier?> GetAsync(string soldierEmail);
    Task<int> CreateAsync(SoldierCreate payload);
}
