using System;
using System.Collections.Generic;

namespace aMAZEing.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; private set; }

        public string Username { get; private set; }

        public List<MazeDTO> OwnMazes { get; private set; }

        public UserDTO(Guid id, string username, List<MazeDTO> ownMazes)
        {
            Id = id;
            Username = username;
            OwnMazes = ownMazes;
        }

        public static UserBuilder Builder()
        {
            return new UserBuilder();
        } 

        public class UserBuilder
        {
            private Guid BuilderId { get; set; }

            private string BuilderUsername { get; set; }

            public List<MazeDTO> BuilderOwnMazes { get; private set; }

            public UserBuilder()
            {
                BuilderOwnMazes = new List<MazeDTO>();
            }

            public UserBuilder Id(Guid id)
            {
                BuilderId = id;
                return this;
            }

            public UserBuilder Username(string username)
            {
                BuilderUsername = username;
                return this;
            }

            public UserBuilder OwnMazes(List<MazeDTO> ownMazes)
            {
                BuilderOwnMazes = ownMazes;
                return this;
            }

            public UserDTO Build()
            {
                return new UserDTO(BuilderId, BuilderUsername, BuilderOwnMazes);
            }
        }
    }
}
