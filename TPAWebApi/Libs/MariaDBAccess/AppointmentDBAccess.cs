using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;

namespace MariaDBAccess
{
    class AppointmentDBAccess : IRepository<Appointment>
    {
        private readonly TpaContext _context;

        public AppointmentDBAccess(TpaContext context)
        {
            _context = context;
        }

        public void Create(Appointment user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            _context.Appointment.Add(user);
        }

        public void DeleteById(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var appointment = Get(id);
            appointment.Status = false;
            _context.Appointment.Update(appointment);
        }

        public Appointment Get(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var appointment = _context.Appointment.First(x => x.Id == id) ?? throw new ArgumentNullException(nameof(id));
            return appointment;
        }

        public void UpdateById(int id, Appointment model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            model.Id = id;
            _context.Appointment.Update(model);
        }

        public IEnumerable<Appointment> Find(Expression<Func<Appointment, bool>> predicate)
        {
            if (predicate == null) throw new ArgumentNullException(nameof(predicate));
            return _context.Appointment.Where(predicate);
        }
    }
}
