using RankReach.Core.Models;

namespace RankReach.DAL.Repositories;

public interface ICommanderRequestsRepository
{
    Task<IEnumerable<CommanderRequestRead>> GetByStatusAsync(int commanderId, int requestStatus);
}


