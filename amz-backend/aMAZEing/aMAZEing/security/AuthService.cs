using System;
using System.Collections.Generic;
using aMAZEing.services;
using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.Extensions.Logging;

namespace aMAZEing.security
{
    public class AuthService : IAuthService
    {
        private readonly ILogger<MazeService> _logger;
        private const string Secret = "THIS IS USED TO SIGN AND VERIFY JWT TOKENS. IT CAN BE ANY STRING";

        public AuthService(ILogger<MazeService> logger)
        {
            _logger = logger;
        }



        public Jwt GenerateJwt(Guid userId, string username)
        {
            var token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(Secret)
                .AddClaim("exp", DateTimeOffset.UtcNow.AddHours(12).ToUnixTimeSeconds())
                .AddClaim("userId", userId)
                .Build();

            return new Jwt(token, userId, username);
        }

        public IDictionary<string, object> ValidateJwt(string token)
        {
            try
            {
                var payload = new JwtBuilder()
                    .WithSecret(Secret)
                    .MustVerifySignature()
                    .Decode<IDictionary<string, object>>(token);

                return payload;
            }
            catch (TokenExpiredException e)
            {
                _logger.LogError("Token has expired\n\n");
                throw e;
            }
            catch (SignatureVerificationException e)
            {
                _logger.LogError("Token has invalid signature\n\n");
                throw e;
            }
            catch (InvalidTokenPartsException e)
            {
                _logger.LogError("Token has invalid format\n\n");
                throw e;
            }
        }
    }
}
