namespace RankReach.BL.Services;

public interface IAppointmentService
{
    Task<int> CreateAsync(DateTime appointmentDate, string appointmentLocation);
}


