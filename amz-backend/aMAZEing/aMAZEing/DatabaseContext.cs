using aMAZEing.models;
using Microsoft.EntityFrameworkCore;

namespace aMAZEing
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Maze> Mazes { get; set; }

        public DbSet<UserMaze> UserMazes { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=aMAZEing;Trusted_Connection=True;");
        //    }
        //}



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserMaze>().HasKey(u => new
            {
                u.UserId,
                u.MazeId
            });
        }
    }
}
