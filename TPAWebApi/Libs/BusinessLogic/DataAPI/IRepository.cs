using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAPI
{
    public interface IRepository<TModel>
    {
        void Add(TModel model);
        void Delete(TModel model);
        void DeleteById(int id);
        TModel Get(int id);
        void UpdateById(int id, TModel model);
        IEnumerable<TModel> Find(Expression<Func<TModel, bool>> predicate);
    }
}
