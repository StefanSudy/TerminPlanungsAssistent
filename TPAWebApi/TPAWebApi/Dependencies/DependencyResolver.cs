using BusinessLogic.ServiceAPI;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Dependencies;

namespace TPAWebApi.Dependencies
{
    public class AspDotNetCoreDependencyResolver : IDependencyResolver
    {
        private IServiceProvider _serviceProvider = null;
        private IServiceProvider GetProvider()
        {
            if (_serviceProvider == null)
                throw new InvalidOperationException("the dependency resolver can only be used after the Configure Services method is completed");

            return _serviceProvider;
        }

        public void SetServiceProvider(IServiceProvider provider)
        {
            _serviceProvider = provider ?? throw new ArgumentNullException(nameof(provider));
        }

        public TClassRequested Resolve<TClassRequested>() where TClassRequested : class
        {
            return GetProvider().GetRequiredService<TClassRequested>();
        }

        public object Resolve(Type typeToResolve)
        {
            if (typeToResolve == null)
            {
                throw new ArgumentNullException(nameof(typeToResolve));
            }

            return GetProvider().GetRequiredService(typeToResolve);
        }

        public IEnumerable<TClassRequested> ResolveAll<TClassRequested>() where TClassRequested : class
        {
            return GetProvider().GetServices<TClassRequested>();
        }

    }
}
