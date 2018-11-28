namespace BusinessLogic.Dependencies
{
    public interface IServiceRegistry
    {
        void RegisterServices(IDependencyRegistry container);
    }
}