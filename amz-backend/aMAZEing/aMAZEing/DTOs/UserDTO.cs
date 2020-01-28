using System;
using System.Collections.Generic;

namespace aMAZEing.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; private set; }

        public string Username { get; private set; }

        public int Accuracy { get; private set; }

        //public List<MazeDTO> OwnMazes { get; private set; }

        public int OwnMazesCount { get; private set; }

        public int OwnMazesPlayersCount { get; private set; }

        public int SolvedMazesCount { get; private set; }

        public UserDTO(Guid id, string username, int accuracy, List<MazeDTO> ownMazes, int ownMazesCount, int ownMazesPlayersCount, int solvedMazesCount)
        {
            Id = id;
            Username = username;
            Accuracy = accuracy;
            //OwnMazes = ownMazes;
            OwnMazesCount = ownMazesCount;
            OwnMazesPlayersCount = ownMazesPlayersCount; 
            SolvedMazesCount = solvedMazesCount;
        }

        public static UserBuilder Builder()
        {
            return new UserBuilder();
        } 

        public class UserBuilder
        {
            private Guid BuilderId { get; set; }

            private string BuilderUsername { get; set; }

            public int BuilderAccuracy { get; set; }

            public List<MazeDTO> BuilderOwnMazes { get; private set; }

            public int BuilderOwnMazesCount { get; private set; }

            public int BuilderOwnMazesPlayersCount { get; private set; }

            public int BuilderSolvedMazesCount { get; private set; }

            public UserBuilder()
            {
                BuilderOwnMazes = new List<MazeDTO>();
                BuilderOwnMazesPlayersCount = 0;
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

            public UserBuilder Accuracy(int accuracy)
            {
                BuilderAccuracy = accuracy;
                return this;
            }

            public UserBuilder OwnMazes(List<MazeDTO> ownMazes)
            {
                BuilderOwnMazes = ownMazes;
                BuilderOwnMazesCount = ownMazes.Count;
                foreach (MazeDTO maze in ownMazes)
                    BuilderOwnMazesPlayersCount += maze.PlayersCount;

                return this;
            }

            public UserBuilder SolvedMazesCount(int solvedMazesCount)
            {
                BuilderSolvedMazesCount = solvedMazesCount;
                return this;
            }

            public UserDTO Build()
            {
                return new UserDTO(BuilderId, BuilderUsername, BuilderAccuracy, BuilderOwnMazes, BuilderOwnMazesCount, BuilderOwnMazesPlayersCount, BuilderSolvedMazesCount);
            }
        }
    }
}
