using System.Data;
using Microsoft.Data.SqlClient;

namespace RankReach.DAL.Infrastructure;

/* Holds connection string and creates SqlConnection instances. */
public class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly string _connectionString;
    public SqlConnectionFactory(string connectionString) => _connectionString = connectionString;

    public IDbConnection Create() => new SqlConnection(_connectionString);
}
