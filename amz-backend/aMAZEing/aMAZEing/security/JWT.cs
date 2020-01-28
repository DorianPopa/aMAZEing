using System;

namespace aMAZEing.security
{
    public class Jwt
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }

        public Jwt(string token, Guid id, string username)
        {
            Id = id;
            Username = username;
            Token = token;
        }
    }
}
