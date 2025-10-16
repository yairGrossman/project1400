using Microsoft.AspNetCore.Mvc;
using RankReach.BL.Services;

namespace RankReach.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService _service;
    public AppointmentsController(IAppointmentService service) => _service = service;

    public record AppointmentCreate(DateTime appointmentDate, string appointmentLocation);

    [HttpPost]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] AppointmentCreate payload)
    {
        try
        {
            var id = await _service.CreateAsync(payload.appointmentDate, payload.appointmentLocation);
            return Created($"/api/appointments/{id}", new { appointmentId = id });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}


