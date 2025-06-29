using Enigmatry.Comments.Api.Models;
using Enigmatry.Comments.Api.Repositories;

namespace Enigmatry.Comments.Api.Services;

public class CommentsService
{
    private readonly ICommentsRepository _repository;

    public CommentsService(ICommentsRepository repository)
    {
        _repository = repository;
    }

    public IReadOnlyCollection<Comment> GetAll() => _repository.GetAll();

    public Comment? GetById(Guid id) => _repository.GetById(id);

    public Comment Add(Comment comment) => _repository.Add(comment);

    public bool Update(Guid id, Comment updated) => _repository.Update(id, updated);

    public bool Delete(Guid id) => _repository.Delete(id);
}
