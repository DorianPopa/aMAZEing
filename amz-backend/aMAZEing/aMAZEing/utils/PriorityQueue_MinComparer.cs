using System.Collections.Generic;

namespace aMAZEing.utils
{
    public class PriorityQueue_MinComparer : IComparer<double>
    {
        public int Compare(double x, double y)
        {
            return x.CompareTo(y);
        }
    }
}
