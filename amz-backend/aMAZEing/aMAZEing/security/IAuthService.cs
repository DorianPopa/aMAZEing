using System;
using System.Collections.Generic;

namespace aMAZEing.security
{
    public interface IAuthService
    {
        Jwt GenerateJwt(Guid userId);

        IDictionary<string, object> ValidateJwt(string token);
    }
}
