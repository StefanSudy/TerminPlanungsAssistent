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
        private IRepository<Appointment> _appointment;
        private IRepository<User> _user;

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
        public IRepository<Appointment> appointment => _appointment ?? (_appointment = new AppointmentDBAccess(_context));
        public IRepository<User> user => _user ?? (_user = new UserDbAccess(_context));
    }
}
