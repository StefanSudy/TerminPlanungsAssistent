using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DataAPI;
using BusinessLogic.Dependencies;
using BusinessLogic.Models;
using BusinessLogic.ServiceAPI;
using MariaDBAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
using Microsoft.IdentityModel.Tokens;
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
                c.AddSecurityDefinition("https", new ApiKeyScheme());
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

            var configProvider = new AspDotNetCoreConfigProvider(Configuration);
            var key = Encoding.ASCII.GetBytes(configProvider.GetSecretKey());
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var userContext = context.HttpContext.RequestServices.GetService<IUnitOfWork>();
                            var userId = int.Parse(context.Principal.Identity.Name);
                            var user = userContext.Users.Get(userId);
                            if (user == null)
                            {
                                // return unauthorized if user no longer exists
                                context.Fail("Unauthorized");
                            }
                            return Task.CompletedTask;
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
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

            app.UseAuthentication();

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
