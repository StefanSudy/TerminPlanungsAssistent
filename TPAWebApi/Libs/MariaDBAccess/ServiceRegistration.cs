using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.DataAPI;
using BusinessLogic.Dependencies;
using BusinessLogic.ServiceAPI;

namespace MariaDBAccess
{
    public class ServiceRegistration : IServiceRegistry
    {
        private readonly IConfigProvider _config;

        public ServiceRegistration(IConfigProvider config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }
        public void RegisterServices(IDependencyRegistry container)
        {
            if (container == null) throw new ArgumentNullException(nameof(container));
            container.RegisterScopedType<IUnitOfWork, EFCoreUnitOfWork>();
        }
    }
}
