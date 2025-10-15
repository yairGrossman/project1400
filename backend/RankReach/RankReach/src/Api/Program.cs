using RankReach.BL.Services;
using RankReach.DAL.Infrastructure;
using RankReach.DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/**
 * Dependency Injection setup:
 * - Connection factory (singleton, shared for whole app)
 * - Repository and Service (scoped, new per request)
 */

// DAL
var cs = builder.Configuration.GetConnectionString("Sql")
         ?? throw new InvalidOperationException("Missing ConnectionStrings:Sql");
builder.Services.AddSingleton<ISqlConnectionFactory>(new SqlConnectionFactory(cs));
builder.Services.AddScoped<ISoldierRepository, SoldierRepository>();

// BL
builder.Services.AddScoped<ISoldierService, SoldierService>();


var app = builder.Build();

/**
 * Enable Swagger UI only in development
 */
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/**
 * Simple test endpoint to verify server is alive
 */
app.MapGet("/ping", () => Results.Ok("pong"));
app.MapControllers();

app.Run();
