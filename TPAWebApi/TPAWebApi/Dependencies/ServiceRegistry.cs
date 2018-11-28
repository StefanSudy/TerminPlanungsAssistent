using BusinessLogic.ServiceAPI;
using Microsoft.Extensions.DependencyInjection;
using System;
using BusinessLogic.Dependencies;

namespace TPAWebApi.Dependencies
{
    public class AspDotNetCoreServiceRegistry : IDependencyRegistry
    {
        private readonly IServiceCollection _serviceCollection;

        public AspDotNetCoreServiceRegistry(IServiceCollection serviceCollection)
        {
            _serviceCollection = serviceCollection ?? throw new ArgumentNullException(nameof(serviceCollection));
        }

        public IDependencyRegistry RegisterInstance<TInterface>(TInterface instance)
            where TInterface : class
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }

            _serviceCollection.AddSingleton<TInterface>(instance);
            return this;
        }

        public IDependencyRegistry RegisterType(Type interfaceType, Type implementationType)
        {
            if (interfaceType == null)
            {
                throw new ArgumentNullException(nameof(interfaceType));
            }

            if (implementationType == null)
            {
                throw new ArgumentNullException(nameof(implementationType));
            }

            _serviceCollection.AddTransient(interfaceType, implementationType);
            return this;
        }

        public IDependencyRegistry RegisterType<TInterface, TImplementation>()
            where TInterface : class
            where TImplementation : class, TInterface
        {
            _serviceCollection.AddTransient<TInterface, TImplementation>();
            return this;
        }

        public IDependencyRegistry RegisterScopedType<TInterface, TImplementation>()
            where TInterface : class
            where TImplementation : class, TInterface
        {
            _serviceCollection.AddScoped<TInterface, TImplementation>();
            return this;
        }

        public void Dispose()
        {

        }
    }
}
