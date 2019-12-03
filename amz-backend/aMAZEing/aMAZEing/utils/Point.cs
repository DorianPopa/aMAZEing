namespace aMAZEing.utils
{
    public class Point
    {
        public int I { get; set; }

        public int J { get; set; }

        public int Value { get; set; }

        public Point()
        {

        }

        public Point(int next_i, int next_j, int v)
        {
            this.I = next_i;
            this.J = next_j;
            this.Value = v;
        }
    }
}
