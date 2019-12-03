using Microsoft.VisualStudio.TestTools.UnitTesting;
using aMAZEing.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace aMAZEing.repositories.Tests
{
    [TestClass()]
    public class UserRepositoryTests
    {
        private static UserRepository sutUserRepository;
        private User user1, user2;

        [ClassInitialize()]
        public static void ClassSetUp(TestContext context)
        {
            var logger = GetUserRepositoryLogger();
            sutUserRepository = GetInMemoryUserRepository(logger);
        }

        private static UserRepository GetInMemoryUserRepository(ILogger<UserRepository> logger)
        {
            DbContextOptions<DatabaseContext> options;
            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseInMemoryDatabase("aMAZEingTest");
            options = builder.Options;
            DatabaseContext databaseContext = new DatabaseContext(options);
            databaseContext.Database.EnsureDeleted();
            databaseContext.Database.EnsureCreated();
            return new UserRepository(logger, databaseContext);
        }

        private static ILogger<UserRepository> GetUserRepositoryLogger()
        {
            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();

            var logger = factory.CreateLogger<UserRepository>();
            return logger;
        }



        [TestInitialize()]
        public void TestSetUp()
        {
            user1 = User.Create("leonard.olariu", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");
            user2 = User.Create("dorian.popa", "8F59105B5953EF266DD8E1429C9EA5EDC8BCD0B4BECB4404C15A606EE5373520");

            sutUserRepository.Create(user1);
            sutUserRepository.Create(user2);
        }


        [TestMethod()]
        public void Create_ShoulSaveAndReturnGivenUser()
        {
            User user = sutUserRepository.Create(User.Create("_testUsername", "_testPassword"));
            Assert.AreEqual(user, sutUserRepository.FindById(user.UserId));

            sutUserRepository.Delete(user.UserId);
        }

        [TestMethod()]
        public void FindByUsername_ShouldReturnUserByUsername_WhenUsernameInDatabase()
        {
            Assert.AreEqual(user1, sutUserRepository.FindByUsername("leonard.olariu"));
        }

        [TestMethod()]
        public void GetAll_ShouldReturn2userList()
        {
            Assert.AreEqual(2, sutUserRepository.GetAll().Count);
        }

        [TestCleanup()]
        public void TestCleanUp()
        {
            sutUserRepository.Delete(user1.UserId);
            sutUserRepository.Delete(user2.UserId);
        }
    }
}