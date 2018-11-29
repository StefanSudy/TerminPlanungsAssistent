using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;

namespace MariaDBAccess
{
    class UserDbAccess : IRepository<User>
    {
        private readonly TpaContext _context;

        public UserDbAccess(TpaContext context)
        {
            _context = context;
        }

        public void Add(User model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));
            _context.User.Add(model);
        }

        public void Delete(User model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));
            _context.User.Remove(model);
        }

        public void DeleteById(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var user = Get(id);
            _context.User.Remove(user);
        }

        public User Get(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var user = _context.User.First(x => x.Id == id) ?? throw new ArgumentNullException(nameof(id));
            return user;
        }

        public void UpdateById(int id, User user)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var _user = Get(id);
            _user = user ?? throw new ArgumentNullException(nameof(user));
            _context.User.Update(_user);
        }

        public IEnumerable<User> Find(Expression<Func<User, bool>> predicate)
        {
            if (predicate == null) throw new ArgumentNullException(nameof(predicate));
            return _context.User.Where(predicate);
        }
    }
}
