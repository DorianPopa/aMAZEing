using System.Net;

namespace aMAZEing.errors
{
    public class UnauthorizedError : ApiError
    {
        public UnauthorizedError()
            : base(401, HttpStatusCode.Unauthorized.ToString())
        {
        }

        public UnauthorizedError(string message)
            : base(401, HttpStatusCode.Unauthorized.ToString(), message)
        {
        }
    }
}
