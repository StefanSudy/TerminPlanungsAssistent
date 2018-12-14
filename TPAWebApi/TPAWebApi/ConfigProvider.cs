using BusinessLogic.ServiceAPI;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPAWebApi
{
    public class AspDotNetCoreConfigProvider : IConfigProvider
    {
        private readonly IConfiguration _configuration;

        public AspDotNetCoreConfigProvider(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public string GetCurrentEnvironmentName()
        {
            return _configuration["ASPNETCORE_ENVIRONMENT"];
        }

        public string GetConnectionString()
        {
            return _configuration["ConnectionStrings:TPADataBase"];
        }

        public string GetSecretKey()
        {
            return _configuration["AppSettings:Secret"];
        }
    }
}
