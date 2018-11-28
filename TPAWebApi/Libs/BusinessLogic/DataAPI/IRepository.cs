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
        void DeleteById(long id);
        TModel Get(long id);
        IEnumerable<TModel> Find(Expression<Func<TModel, bool>> predicate);
    }
}
