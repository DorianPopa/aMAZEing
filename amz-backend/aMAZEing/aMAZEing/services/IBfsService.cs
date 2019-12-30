using aMAZEing.utils;

namespace aMAZEing.services
{
    public interface IBfsService : IAlgorithmService
    {
        string ValidateMaze(MazeFE mazeFE);
    }
}
