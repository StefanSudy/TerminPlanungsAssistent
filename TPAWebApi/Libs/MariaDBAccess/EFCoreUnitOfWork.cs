using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;
using BusinessLogic.ServiceAPI;

namespace MariaDBAccess
{
    class EFCoreUnitOfWork : IUnitOfWork
    {
        private readonly TpaContext _context;
        private IConfigProvider _config;
        public IRepository<Appointment> _appointment;
        public IUserRepository<User> _user;

        public void Dispose()
        {
            _context.Dispose();
        }

        public EFCoreUnitOfWork(IConfigProvider config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _context = new TpaContext(_config.GetConnectionString());
        }
        public void Save()
        {
            _context.SaveChanges();
        }
        public IRepository<Appointment> Appointments => _appointment ?? (_appointment = new AppointmentDBAccess(_context));
        public IUserRepository<User> Users => _user ?? (_user = new UserDbAccess(_context));
    }
}
