using Enigmatry.Comments.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Enigmatry.Comments.Api.Repositories;

public class CommentsDbContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }

    public CommentsDbContext(DbContextOptions<CommentsDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var fourthId = Guid.NewGuid();
        modelBuilder.Entity<Comment>().HasData(
            new Comment { Id = Guid.NewGuid(), Title = "First Comment", Text = "This is the first comment.", CreatedAt = DateTime.UtcNow },
            new Comment { Id = Guid.NewGuid(), Title = "Second Comment", Text = "This is the second comment.", CreatedAt = DateTime.UtcNow },
            new Comment { Id = Guid.NewGuid(), Title = "Third Comment", Text = "This is the third comment.", CreatedAt = DateTime.UtcNow },
            new Comment { Id = fourthId, Title = $"Fourth Comment", Text = $"Fourth comment with id for testing direct URL access: {fourthId}", CreatedAt = DateTime.UtcNow },
            new Comment
            {
                Id = Guid.NewGuid(),
                Title = "Fifth Comment",
                Text = "This is the fifth comment. Unlike the others, it is intentionally much longer so that it exceeds one hundred characters in length, making it valid for the comment details page example.",
                CreatedAt = DateTime.UtcNow
            },
            new Comment { Id = Guid.NewGuid(), Title = "Sixth Comment", Text = "This is the sixth comment.", CreatedAt = DateTime.UtcNow }
        );
    }
}
