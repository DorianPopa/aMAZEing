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
            _context.SaveChanges();

            // ensure user saved to db
            if (new Guid(FindById(user.UserId).UserId.ToString()) == user.UserId)
            {
                _logger.LogInformation("User with Id {0} saved into database\n\n", user.UserId);
                return user;
            }

            _logger.LogError("Server error! User with Id {0} not saved into database\n\n", user.UserId);
            return null;
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
