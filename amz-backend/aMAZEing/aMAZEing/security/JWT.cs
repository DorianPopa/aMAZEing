using System;

namespace aMAZEing.security
{
    public class Jwt
    {
        public Guid Id { get; set; }
        public string Token { get; set; }

        public Jwt(string token, Guid id)
        {
            Id = id;
            Token = token;
        }
    }
}
