using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using BusinessLogic.DataAPI;
using BusinessLogic.Models;

namespace MariaDBAccess
{
    class UserDbAccess : IUserRepository<User>
    {
        private readonly TpaContext _context;

        public UserDbAccess(TpaContext context)
        {
            _context = context;
        }

        public void Create(User user, string password)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (password == null) throw new ArgumentNullException("Password is required");

            if(GetByMail(user.EMail) != null)
                throw new ArgumentException("Username is already taken");

            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.User.Add(user);
        }

        public void Create(User user)
        {
            Create(user, null);
        }

        public void DeleteById(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var user = Get(id);
            user.Active = false;
            _context.User.Update(user);
        }

        public User Get(int id)
        {
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));
            var user = _context.User.Find(id) ?? throw new ArgumentNullException(nameof(id));
            return user;
        }

        public void UpdateById(int id, User user)
        {
            UpdateById(id, user, null);
        }

        public User GetByMail(string userMail)
        {
            if (userMail == null) throw new ArgumentNullException(nameof(userMail));
            var user = _context.User.SingleOrDefault(x => x.EMail == userMail);
            return user;
        }

        public void UpdateById(int id, User user, string password = null)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (id <= 0) throw new ArgumentOutOfRangeException(nameof(id));

            var _user = Get(id);

            if (user.EMail != _user.EMail && !string.IsNullOrEmpty(user.EMail))
            {
                if (GetByMail(user.EMail) != null)
                    throw new ArgumentException($"Username {user.EMail} is already taken!");
            }

            if (!string.IsNullOrWhiteSpace(user.EMail))
            {
                _user.EMail = user.EMail;
            }

            if (!string.IsNullOrWhiteSpace(password))
            {
                CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

                _user.PasswordHash = passwordHash;
                _user.PasswordSalt = passwordSalt;
            }

            _context.User.Update(_user);
        }

        public IEnumerable<User> Find(Expression<Func<User, bool>> predicate)
        {
            if (predicate == null) throw new ArgumentNullException(nameof(predicate));
            return _context.User.Where(predicate);
        }

        public User Authenticate(string userMail, string password)
        {
            if (userMail == null) throw new ArgumentNullException(nameof(userMail));
            if (password == null) throw new ArgumentNullException(nameof(password));

            var user = GetByMail(userMail);

            if (user == null || !user.Active)
                return null;

            return !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt) ? null : user;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                if (computedHash.Where((t, i) => t != storedHash[i]).Any())
                {
                    return false;
                }
            }
            return true;
        }
    }
}
