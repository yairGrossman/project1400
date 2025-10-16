using RankReach.DAL.Repositories;

namespace RankReach.BL.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _repo;
    public AppointmentService(IAppointmentRepository repo) => _repo = repo;

    public async Task<int> CreateAsync(DateTime appointmentDate, string appointmentLocation)
    {
        if (string.IsNullOrWhiteSpace(appointmentLocation) || appointmentLocation.Length > 200)
            throw new ArgumentException("appointmentLocation is required (≤ 200)");

        return await _repo.AddAsync(appointmentDate, appointmentLocation);
    }
}


