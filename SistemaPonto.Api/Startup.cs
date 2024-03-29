using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SistemaPonto.Infra.Data;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Repositories;
using SistemaPonto.Domain.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SistemaPonto.Domain;
using SistemaPonto.Domain.Interface;
using SistemaPonto.Cognitive.Services;
using Microsoft.Extensions.Options;

namespace SistemaPonto.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           services.Configure<AppSettings>(Configuration).AddSingleton(sp => sp.GetRequiredService<IOptions<AppSettings>>().Value);

           services.AddControllers().AddNewtonsoftJson(options => {
               options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
           });   

           services.AddDbContext<DataContext>(options => options.UseNpgsql(Configuration.GetConnectionString("ConnectionString")));          
           
           services.AddTransient(typeof(GenericService<>));           
           services.AddTransient<AdministrativoService>();
           services.AddTransient<ColaboradorService>();
           services.AddTransient<MovimentacaoService>();
           services.AddTransient<SetorService>();
           services.AddTransient<UsuarioService>();
   
           services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
           services.AddTransient<IAdministrativoRepository, AdministrativoRepository>();
           services.AddTransient<IColaboradorRepository, ColaboradorRepository>();
           services.AddTransient<IMovimentacaoRepository, MovimentacaoRepository>();
           services.AddTransient<ISetorRepository, SetorRepository>();
           services.AddTransient<IUsuarioRepository, UsuarioRepository>();
           services.AddTransient<HorarioRepository>();
           services.AddTransient<ICognitiveService, CognitiveService>();
  
           services.AddAuthentication(options => {
              options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
           })
           .AddJwtBearer(options => {
               options.RequireHttpsMetadata = false;
               options.SaveToken = true;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(TokenService.RetornaKey()),
                   ValidateIssuer = false,
                   ValidateAudience = false
               };
           });

           services.AddCors(options =>  {
                options.AddPolicy("CorsPolicy", 
                     builder => builder.AllowAnyOrigin().
                                AllowAnyMethod().
                                AllowAnyHeader()); 
           });                           

           services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext => new BadRequestObjectResult(actionContext.ModelState);
            });                  
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            DbInitializar.Initialize(dataContext);
        }
    }
}
