using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAPI
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
    }
}
