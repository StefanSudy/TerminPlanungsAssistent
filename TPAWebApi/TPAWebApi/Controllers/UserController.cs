using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TPAWebApi.ModelsDto;

namespace TPAWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        // GET: api/Users/5
        [Produces(typeof(UserDto))]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) return BadRequest(nameof(id));
            var user = _unitOfWork.Users.Get(id);
            var _user = _mapper.Map<User, UserDto>(user);
            return Ok(_user);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult Post(UserDto user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            var _user = _mapper.Map<UserDto, User>(user);
            _unitOfWork.Users.Add(_user);
            _unitOfWork.Save();
            user = _mapper.Map<User, UserDto>(_user);
            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserDto user)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var _user = _mapper.Map<UserDto, User>(user);
            _unitOfWork.Users.UpdateById(id, _user);
            _unitOfWork.Save();
            user = _mapper.Map<User, UserDto>(_user);
            return Ok(user);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            _unitOfWork.Users.DeleteById(id);
            _unitOfWork.Save();
            return Ok();
        }
    }
}
