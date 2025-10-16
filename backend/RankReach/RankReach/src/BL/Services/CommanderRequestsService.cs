using RankReach.Core.Models;
using RankReach.DAL.Repositories;

namespace RankReach.BL.Services;

public class CommanderRequestsService : ICommanderRequestsService
{
    private readonly ICommanderRequestsRepository _repo;
    public CommanderRequestsService(ICommanderRequestsRepository repo) => _repo = repo;

    public async Task<IEnumerable<CommanderRequestRead>> GetByStatusAsync(int commanderId, int requestStatus)
    {
        if (commanderId <= 0) return Array.Empty<CommanderRequestRead>();
        if (requestStatus > 2) return Array.Empty<CommanderRequestRead>();
        return await _repo.GetByStatusAsync(commanderId, requestStatus);
    }
}


