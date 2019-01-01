using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAPI
{
    public interface IUserRepository<TModel> : IRepository<TModel>
    {
        void UpdateById(int id, TModel model, string password);
        TModel Authenticate(string userMail, string password);
        void Create(TModel user, string pwd);

    }
}
