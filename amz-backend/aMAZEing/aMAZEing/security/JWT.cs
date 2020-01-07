namespace aMAZEing.security
{
    public class Jwt
    {
        public string Token { get; set; }

        public Jwt(string token)
        {
            Token = token;
        }
    }
}
