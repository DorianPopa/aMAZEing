using aMAZEing.repositories;
using aMAZEing.security;
using aMAZEing.services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace aMAZEing
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
            services.AddCors(options => options.AddPolicy("Cors", builder =>
            {
               builder.
               AllowAnyOrigin().
               AllowAnyMethod().
               AllowAnyHeader();
            }));

            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(@"Server=.\SQLEXPRESS;Database=aMAZEing;Trusted_Connection=True;")
                //options.UseSqlServer(@"Server=tcp:amazeingdbserver.database.windows.net,1433;Initial Catalog=aMAZEing;Persist Security Info=False;User ID=DBmaster;Password=qwer1234!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
            );

            services.AddControllers();

            services.AddScoped<IBfsService, BfsService>();
            services.AddScoped<IAStarService, AStarService>();
            services.AddScoped<IBfsTwoWayService, BfsTwoWayService>();

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<UserService>();
            services.AddScoped<MazeService>();

            services.AddScoped<UserRepository>();
            services.AddScoped<MazeRepository>();
            services.AddScoped<UserMazeRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("Cors");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
