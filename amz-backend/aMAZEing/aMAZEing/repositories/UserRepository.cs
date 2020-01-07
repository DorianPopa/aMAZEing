using System;
using System.Collections.Generic;
using System.Linq;
using aMAZEing.models;
using Microsoft.Extensions.Logging;

namespace aMAZEing.repositories
{
    public class UserRepository
    {
        private readonly ILogger<UserRepository> _logger;
        private readonly DatabaseContext _context;

        public UserRepository()
        {

        }

        public UserRepository(ILogger<UserRepository> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public virtual User Create(User user)
        {
            _context.Users.Add(user);
            var result = _context.SaveChanges();

            if (result == 0) {
                _logger.LogError("Server error! User with Id {0} not saved into database\n\n", user.UserId);
                throw new Exception($"Server error! User {user.UserId} not saved into database");
            }
            _logger.LogInformation("User with Id {0} saved into database\n\n", user.UserId);
            return user;
        }

        public virtual User FindById(Guid id)
        {
            return _context.Users.FirstOrDefault(u => u.UserId == id);
        }

        public virtual User FindByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public virtual List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public virtual void Delete(Guid id)
        {
            _context.Users.Remove(FindById(id));
            _context.SaveChanges();
        }
    }
}
