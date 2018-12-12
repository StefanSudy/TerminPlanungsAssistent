using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TPAWebApi.ModelsDto
{
    public class AppointmentDto
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
        public int Id { get; set; }
    }
}
