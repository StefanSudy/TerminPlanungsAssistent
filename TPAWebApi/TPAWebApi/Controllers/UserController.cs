using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Cors;
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

        [Produces(typeof(UserDto))]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) return BadRequest(nameof(id));
            var user = _unitOfWork.Users.Get(id);
            var _user = _mapper.Map<User, UserDto>(user);
            return Ok(_user);
        }
        
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

        [HttpPost]
        [Route("validate")]
        public IActionResult Post([FromBody] dynamic data)
        {
            string mail = data.mail;
            string pwd = data.pwd;
            if (mail == null) throw new ArgumentNullException(nameof(mail));
            if (pwd == null) throw new ArgumentNullException(nameof(pwd));

            var user = _unitOfWork.Users.Find(x => x.EMail == mail).First();
            if (user.Active && user.Password == pwd)
                return Ok(user);

            return BadRequest(user.Password != pwd ? "Password incorrect" : "User not found or inactive");
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
