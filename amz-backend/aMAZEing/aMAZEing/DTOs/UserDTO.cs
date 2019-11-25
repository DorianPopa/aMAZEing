using System;

namespace aMAZEing.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; private set; }

        public String Username { get; private set; }

        public UserDTO(Guid id, String username)
        {
            Id = id;
            Username = username;
        }

        public static UserBuilder Builder()
        {
            return new UserBuilder();
        } 

        public class UserBuilder
        {
            private Guid BuilderId { get; set; }

            private String BuilderUsername { get; set; }

            public UserBuilder()
            {

            }

            public UserBuilder Id(Guid id)
            {
                BuilderId = id;
                return this;
            }

            public UserBuilder Username(String username)
            {
                BuilderUsername = username;
                return this;
            }

            public UserDTO Build()
            {
                return new UserDTO(BuilderId, BuilderUsername);
            }
        }
    }
}
