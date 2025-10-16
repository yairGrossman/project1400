using RankReach.Core.Models;

namespace RankReach.BL.Services;

public interface ICommanderRequestsService
{
    Task<IEnumerable<CommanderRequestRead>> GetByStatusAsync(int commanderId, int requestStatus);
}


