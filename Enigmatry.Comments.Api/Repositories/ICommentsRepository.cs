using Enigmatry.Comments.Api.Models;

namespace Enigmatry.Comments.Api.Repositories;

public interface ICommentsRepository
{
    public IReadOnlyCollection<Comment> GetAll();
    public Comment? GetById(Guid id);
    public Comment Add(Comment comment);
    public bool Update(Guid id, Comment updated);
    public bool Delete(Guid id);
}
