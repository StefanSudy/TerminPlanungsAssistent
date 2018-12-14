using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.ServiceAPI
{
    public interface IConfigProvider
    {
        string GetCurrentEnvironmentName();
        string GetConnectionString();
        string GetSecretKey();
    }
}
