using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TPAWebApi.ModelsDto
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required]
        public string EMail { get; set; }
        public string Password { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}
