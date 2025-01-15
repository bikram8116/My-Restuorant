// Models/User.cs
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace UserStore.Models
{
    public class User
    {
        
    public int Id { get; set; }

    [Required] // You might want to use a built-in validation attribute instead
    public string FirstName { get; set; } = null!;

    [Required] // Same here
    public string LastName { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
    }

    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
    }
}