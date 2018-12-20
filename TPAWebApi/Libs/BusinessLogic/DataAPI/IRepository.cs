using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAPI
{
    public interface IRepository<TModel>
    {
        void Create(TModel user);
        void Create(TModel user, string pwd);
        void Delete(TModel model);
        void DeleteById(int id);
        TModel Get(int id);
        void UpdateById(int id, TModel model);
        void UpdateById(int id, TModel model, string password);
        IEnumerable<TModel> Find(Expression<Func<TModel, bool>> predicate);
        TModel Authenticate(string userMail, string password);
    }
}
