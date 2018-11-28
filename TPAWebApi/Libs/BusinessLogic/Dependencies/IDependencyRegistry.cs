using System;
using System.Collections.Generic;

namespace BusinessLogic.Dependencies
{
    public interface IDependencyRegistry : IDisposable
    {
        IDependencyRegistry RegisterType<TInterface, TImplementation>()
            where TInterface : class
            where TImplementation : class, TInterface;

        IDependencyRegistry RegisterType(Type interfaceType, Type implementationType);

        IDependencyRegistry RegisterInstance<TInterface>(TInterface instance)
            where TInterface : class;

        IDependencyRegistry RegisterScopedType<TInterface, TImplementation>()
            where TInterface : class
            where TImplementation : class, TInterface;
    }
}