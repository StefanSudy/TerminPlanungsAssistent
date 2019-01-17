using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TPAWebApi.ModelsDto;

namespace TPAWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AppointmentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Produces(typeof(AppointmentDto[]))]
        [HttpGet("{userId}")]
        public IActionResult GetAppointments(int userId)
        {
            if (!userAuthorized(Request.Headers["Authorization"], userId))
                return Unauthorized();

            if (userId <= 0) return BadRequest(nameof(userId));

            var appointments = _unitOfWork
                                   .Appointments
                                   .Find(x => x.UserId == userId && x.Status)
                               ?? throw new ArgumentNullException(nameof(userId));

            return Ok(appointments.ToArray());
        }

        [HttpPost]
        public IActionResult Post([FromBody]AppointmentDto appointment)
        {
            if (!userAuthorized(Request.Headers["Authorization"], appointment.UserId))
                return Unauthorized();

            if (appointment == null) throw new ArgumentNullException(nameof(appointment));
            var _appointment = _mapper.Map<AppointmentDto, Appointment>(appointment);
            _unitOfWork.Appointments.Create(_appointment);
            _unitOfWork.Save();
            appointment = _mapper.Map<Appointment, AppointmentDto>(_appointment);
            return Ok(appointment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]AppointmentDto appointment)
        {
            if (!userAuthorized(Request.Headers["Authorization"], appointment.UserId))
                return Unauthorized();

            if (id <= 0) BadRequest(nameof(id));
            var _appointment = _mapper.Map<AppointmentDto, Appointment>(appointment);
            _unitOfWork.Appointments.UpdateById(id, _appointment);
            _unitOfWork.Save();
            appointment = _mapper.Map<Appointment, AppointmentDto>(_appointment);
            return Ok(appointment);
        }

        [HttpDelete("{id}/{userId}")]
        public IActionResult Delete(int id, int userId)
        {
            if (!userAuthorized(Request.Headers["Authorization"], userId))
                return Unauthorized();

            if (id <= 0) return BadRequest(nameof(id));
            _unitOfWork.Appointments.DeleteById(id);
            _unitOfWork.Save();
            return Ok();
        }
        private static bool userAuthorized(string tokenString, int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            tokenString = tokenString
                .Replace("Bearer ", "")
                .Replace(" ", "");
            var token = tokenHandler.ReadJwtToken(tokenString);
            int.TryParse(token.Claims
                    .ToArray()[0]
                    .ToString()
                    .Split(':')[1]
                , out var userId);

            return userId == id;
        }
    }
}
