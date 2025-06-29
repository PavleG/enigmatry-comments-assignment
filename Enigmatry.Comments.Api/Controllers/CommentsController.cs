using Enigmatry.Comments.Api.Models;
using Enigmatry.Comments.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Enigmatry.Comments.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly CommentsService _service;

    public CommentsController(CommentsService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Comment>> GetAll() => Ok(_service.GetAll());

    [HttpGet("{id}")]
    public ActionResult<Comment> GetById(Guid id)
    {
        var comment = _service.GetById(id);
        return comment == null ? (ActionResult<Comment>)NotFound() : (ActionResult<Comment>)Ok(comment);
    }

    [HttpPost]
    public ActionResult<Comment> Add(Comment comment)
    {
        var created = _service.Add(comment);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, Comment updated) => _service.Update(id, updated) ? NoContent() : NotFound();

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id) => _service.Delete(id) ? NoContent() : NotFound();
}
