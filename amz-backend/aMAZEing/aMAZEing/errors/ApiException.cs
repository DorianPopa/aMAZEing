using System;

namespace aMAZEing.errors
{
    public class ApiException : Exception
    {
        public int StatusCode { get; private set; }

        public ApiException(int statusCode, string message)
            : base(message)
        {
            this.StatusCode = statusCode;
        }
    }
}
