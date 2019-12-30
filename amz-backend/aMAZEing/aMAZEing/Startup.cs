using aMAZEing.repositories;
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
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(@"Server=.\SQLEXPRESS;Database=aMAZEing;Trusted_Connection=True;")
            );

            services.AddControllers();

            services.AddScoped<IBfsService, BFS_Service>();
            services.AddScoped<IAstarService, AStar_Service>();
            services.AddScoped<IBfsServiceTwoWay, BidirectionalBFS>();

            services.AddScoped<UserService>();
            services.AddScoped<IMazeService, MazeService>();

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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
