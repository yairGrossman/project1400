namespace RankReach.DAL.Repositories;

public interface IAppointmentRepository
{
    Task<int> AddAsync(DateTime appointmentDate, string appointmentLocation);
}


