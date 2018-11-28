using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public abstract class BaseModel
    {
        [Required]
        public int Id { get; set; }
    }
}
