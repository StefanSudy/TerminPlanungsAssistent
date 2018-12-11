using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TPAWebApi.ModelsDto;

namespace TPAWebApi.Controllers
{
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

        //ToDO: Evaluate if GetAppointmentById is required
        // GET api/values/5
        /*[Produces(typeof(Appointment))]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) BadRequest(nameof(id));
            var appointment = _unitOfWork.Appointments.Get(id);
            return Ok(appointment);
        }*/

        [Produces(typeof(AppointmentDto[]))]
        [HttpGet("{userId}")]
        public IActionResult GetAppointments(int userId)
        {
            if (userId <= 0) return BadRequest(nameof(userId));
            var appointments = _unitOfWork
                                   .Appointments
                                   .Find(x => x.UserId == userId)
                               ?? throw new ArgumentNullException(nameof(userId));
            return Ok(appointments.ToArray());
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post(AppointmentDto appointment)
        {
            if (appointment == null) throw new ArgumentNullException(nameof(appointment));
            var _appointment = _mapper.Map<AppointmentDto, Appointment>(appointment);
            _unitOfWork.Appointments.Add(_appointment);
            _unitOfWork.Save();
            appointment = _mapper.Map<Appointment, AppointmentDto>(_appointment);
            return Ok(appointment);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, AppointmentDto appointment)
        {
            if (id <= 0) BadRequest(nameof(id));
            var _appointment = _mapper.Map<AppointmentDto, Appointment>(appointment);
            _unitOfWork.Appointments.UpdateById(id, _appointment);
            _unitOfWork.Save();
            appointment = _mapper.Map<Appointment, AppointmentDto>(_appointment);
            return Ok(appointment);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest(nameof(id));
            _unitOfWork.Appointments.DeleteById(id);
            _unitOfWork.Save();
            return Ok();
        }
    }
}
