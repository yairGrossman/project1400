using System.Data;

namespace RankReach.DAL.Infrastructure;

/**
 * Interface for creating SQL connections.
 */
public interface ISqlConnectionFactory
{
    IDbConnection Create();
}
