using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TPAWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: api/Users/5
        [Produces(typeof(User))]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) return BadRequest(nameof(id));
            var user = _unitOfWork.Users.Get(id);
            _unitOfWork.Save();
            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult Post(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            _unitOfWork.Users.Add(user);
            _unitOfWork.Save();
            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var _user = _unitOfWork.Users.Get(id);
            _user = user;
            _unitOfWork.Save();
            return Ok(_user);
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
