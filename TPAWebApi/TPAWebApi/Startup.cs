using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.Dependencies;
using BusinessLogic.ServiceAPI;
using MariaDBAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using TPAWebApi.Dependencies;

namespace TPAWebApi
{
    public class Startup
    {
        public static IDependencyRegistry DependencyRegistry { get; private set; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {Title = "Termin Planungs Assistent", Version = "v1"});
                c.DescribeAllEnumsAsStrings();
            });
            services.AddDbContext<TpaContext>();

            AutoMapper.Configure();

            services.AddCors();

            DependencyRegistry = new AspDotNetCoreServiceRegistry(services);

            //new BusinessLogic.ServiceRegistration().RegisterServices(DependencyRegistry);
            DependencyRegistry.RegisterType<IConfigProvider, AspDotNetCoreConfigProvider>();
            var dependencyResolver = new AspDotNetCoreDependencyResolver();
            DependencyRegistry.RegisterInstance<IDependencyResolver>(dependencyResolver);
            dependencyResolver.SetServiceProvider(services.BuildServiceProvider(validateScopes: true));

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = 5001;
            });



            new MariaDBAccess.ServiceRegistration(dependencyResolver.Resolve<IConfigProvider>()).RegisterServices(DependencyRegistry);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Termin Planungs Assistent V1");
            });

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());

            app.UseMvc();
        }
    }
}
