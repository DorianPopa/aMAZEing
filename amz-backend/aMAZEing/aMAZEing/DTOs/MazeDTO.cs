﻿using System;
using System.Collections.Generic;
using aMAZEing.utils;

namespace aMAZEing.DTOs
{
    public class MazeDTO
    {
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public Guid OwnerId { get; private set; }

        public string Owner { get; private set; }

        public int PlayersCount { get; private set; }

        public int Width { get; private set; }

        public int Height { get; private set; }

        public List<Point> State { get; private set; }

        public DateTime CreationTime { get; private set; }

        public bool Solved { get; private set; }

        

        public MazeDTO(Guid id, string name, Guid ownerId, string owner, int playersCount, int width, int height, List<Point> state, DateTime creationTime, bool solved)
        {
            Id = id;
            Name = name;
            OwnerId = ownerId;
            Owner = owner;
            PlayersCount = playersCount;
            Width = width;
            Height = height;
            State = state;
            CreationTime = creationTime;
            Solved = solved;
        }

        public static MazeBuilder Builder()
        {
            return new MazeBuilder();
        }

        public class MazeBuilder
        {
            private Guid BuilderId { get; set; }

            private string BuilderName { get; set; }

            private Guid BuilderOwnerId { get; set; }

            private string BuilderOwner { get; set; }

            public int BuilderPlayersCount { get; private set; }

            public int BuilderWidth { get; private set; }

            public int BuilderHeight { get; private set; }

            public List<Point> BuilderState { get; private set; }

            public DateTime BuilderCreationTime { get; private set; }

            public bool BuilderSolved { get; private set; }

            public MazeBuilder()
            {
                BuilderState = new List<Point>();
                BuilderSolved = false;
            }

            public MazeBuilder Id(Guid id)
            {
                BuilderId = id;
                return this;
            }

            public MazeBuilder Name(string name)
            {
                BuilderName = name;
                return this;
            }

            public MazeBuilder OwnerId(Guid id)
            {
                BuilderOwnerId = id;
                return this;
            }

            public MazeBuilder Owner(string owner)
            {
                BuilderOwner = owner;
                return this;
            }

            public MazeBuilder PlayersCount(int playersCount)
            {
                BuilderPlayersCount = playersCount;
                return this;
            }

            public MazeBuilder Width(int width)
            {
                BuilderWidth = width;
                return this;
            }

            public MazeBuilder Height(int height)
            {
                BuilderHeight = height;
                return this;
            }

            public MazeBuilder State(string state)
            {
                for (int i = 0; i < state.Length; ++i)
                {
                    int next_i = i / BuilderWidth;
                    int next_j = i % BuilderWidth;

                    Point p = new Point(next_i, next_j, state[i] - '0');
                    BuilderState.Add(p);
                }

                return this;
            }

            public MazeBuilder CreationTime(DateTime creationTime)
            {
                BuilderCreationTime = creationTime;
                return this;
            }

            public MazeBuilder Solved(bool solved)
            {
                BuilderSolved = solved;
                return this;
            }

            public MazeDTO Build()
            {
                return new MazeDTO(BuilderId, BuilderName, BuilderOwnerId, BuilderOwner, BuilderPlayersCount, BuilderWidth, BuilderHeight, BuilderState, BuilderCreationTime, BuilderSolved);
            }
        }
    }
}
