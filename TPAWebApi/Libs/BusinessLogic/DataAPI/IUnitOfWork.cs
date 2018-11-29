using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAPI
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        IRepository<Appointment> Appointments { get; }
        IRepository<User> Users { get; }
    }
}
