using Enigmatry.Comments.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Enigmatry.Comments.Api.Repositories;

public class InMemoryCommentsRepository : ICommentsRepository
{
    private readonly CommentsDbContext _dbContext;

    public InMemoryCommentsRepository(CommentsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IReadOnlyCollection<Comment> GetAll() => _dbContext.Comments.AsNoTracking().ToList();

    public Comment? GetById(Guid id) => _dbContext.Comments.AsNoTracking().FirstOrDefault(c => c.Id == id);

    public Comment Add(Comment comment)
    {
        comment.Id = Guid.NewGuid();
        comment.CreatedAt = DateTime.UtcNow;
        _dbContext.Comments.Add(comment);
        _dbContext.SaveChanges();
        return comment;
    }

    public bool Update(Guid id, Comment updated)
    {
        var existing = _dbContext.Comments.FirstOrDefault(c => c.Id == id);
        if (existing != null)
        {
            existing.Title = updated.Title;
            existing.Text = updated.Text;
            existing.LastEditedAt = DateTime.UtcNow;
            _dbContext.SaveChanges();
            return true;
        }
        return false;
    }

    public bool Delete(Guid id)
    {
        var comment = _dbContext.Comments.FirstOrDefault(c => c.Id == id);
        if (comment != null)
        {
            _dbContext.Comments.Remove(comment);
            _dbContext.SaveChanges();
            return true;
        }
        return false;
    }
}
