using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using BusinessLogic.ServiceAPI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TPAWebApi.ModelsDto;

namespace TPAWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfigProvider _config;

        public UserController(IUnitOfWork unitOfWork, IMapper mapper, IConfigProvider config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;
        }

        [Produces(typeof(UserDto))]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) return BadRequest(nameof(id));
            var user = _unitOfWork.Users.Get(id);
            //var _user = _mapper.Map<User, UserDto>(user);
            var _user = new UserDto
            {
                Id = user.Id,
                EMail = user.EMail,
                Active = user.Active
            };

            return Ok(_user);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _unitOfWork.Users.Authenticate(userDto.EMail, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSecretKey());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Usermail = user.EMail,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            //var user = _mapper.Map<UserDto, User>(userDto);
            var user = new User
            {
                EMail = userDto.EMail,
                Active = userDto.Active,
            };

            try
            {
                _unitOfWork.Users.Create(user, userDto.Password);
                _unitOfWork.Save();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            //var user = _mapper.Map<User>(userDto);
            var user = new User
            {
                Active = userDto.Active,
                EMail = userDto.EMail,
                Id = id
            };


            try
            {
                _unitOfWork.Users.UpdateById(id, user, userDto.Password);
                _unitOfWork.Save();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            _unitOfWork.Users.DeleteById(id);
            _unitOfWork.Save();
            return Ok();
        }

        //[HttpPost]
        //public IActionResult Post(UserDto user)
        //{
        //    if (user == null) throw new ArgumentNullException(nameof(user));
        //    var _user = _mapper.Map<UserDto, User>(user);
        //    _unitOfWork.Users.Create(_user);
        //    _unitOfWork.Save();
        //    user = _mapper.Map<User, UserDto>(_user);
        //    return Ok(user);
        //}

        //[HttpPost]
        //[Route("validate")]
        //public IActionResult Post([FromBody] dynamic data)
        //{
        //    string mail = data.mail;
        //    string pwd = data.pwd;
        //    if (mail == null) throw new ArgumentNullException(nameof(mail));
        //    if (pwd == null) throw new ArgumentNullException(nameof(pwd));

        //    var user = _unitOfWork.Users.Find(x => x.EMail == mail).First();
        //    if (user.Active && user.Password == pwd)
        //        return Ok(user);

        //    return BadRequest(user.Password != pwd ? "Password incorrect" : "User not found or inactive");
        //}

        // PUT: api/Users/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, UserDto user)
        //{
        //    if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
        //    var _user = _mapper.Map<UserDto, User>(user);
        //    _unitOfWork.Users.UpdateById(id, _user);
        //    _unitOfWork.Save();
        //    user = _mapper.Map<User, UserDto>(_user);
        //    return Ok(user);
        //}
    }
}
