using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public class Appointment : BaseModel
    {
        [Required]
        public string EntryName { get; set; }
        public string EntryText { get; set; }
        public DateTime DateDue { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public short Duration { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}