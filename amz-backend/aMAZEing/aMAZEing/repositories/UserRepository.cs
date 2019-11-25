﻿using System;
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

        public UserRepository(ILogger<UserRepository> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            // ensure user saved to db
            if (new Guid(FindById(user.Id).Id.ToString()) == user.Id)
            {
                _logger.LogInformation("User with Id {0} saved into database\n\n", user.Id);
                return user;
            }

            _logger.LogError("Server error! User with Id {0} not saved into database\n\n", user.Id);
            return null;
        }

        public User FindById(Guid id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User FindByUsername(String username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }
    }
}
