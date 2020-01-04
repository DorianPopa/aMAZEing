using System.Net;

namespace aMAZEing.errors
{
    public class UnauthorizedError : ApiError
    {
        public UnauthorizedError()
            : base(400, HttpStatusCode.Unauthorized.ToString())
        {
        }

        public UnauthorizedError(string message)
            : base(400, HttpStatusCode.Unauthorized.ToString(), message)
        {
        }
    }
}
