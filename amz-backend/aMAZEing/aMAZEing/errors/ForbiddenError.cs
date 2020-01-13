using System.Net;


namespace aMAZEing.errors
{
    public class ForbiddenError : ApiError
    {
        public ForbiddenError()
            : base(403, HttpStatusCode.Forbidden.ToString())
        {
        }

        public ForbiddenError(string message)
            : base(403, HttpStatusCode.Forbidden.ToString(), message)
        {
        }
    }
}
