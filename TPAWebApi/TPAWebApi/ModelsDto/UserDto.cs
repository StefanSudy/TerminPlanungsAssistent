using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TPAWebApi.ModelsDto
{
    public class UserDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string EMail { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public bool Active { get; set; }
    }
}
