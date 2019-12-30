using System;

namespace aMAZEing.utils
{
    public struct Point
    {
        public int I { get; set; }
        public int J { get; set; }
        public int Value { get; set; }

        // public Point previous ;

        public Point(int next_i, int next_j, int v):this()
        {
            this.I = next_i;
            this.J = next_j;
            this.Value = v;
        }
        public double DistanceTo(Point p2)
        {
            return Math.Sqrt(
                Math.Pow((this.I - p2.I), 2) + 
                Math.Pow((this.J - p2.J), 2)
                );
        }

        public static Point Default { get { return new Point(); } }
    }
}
