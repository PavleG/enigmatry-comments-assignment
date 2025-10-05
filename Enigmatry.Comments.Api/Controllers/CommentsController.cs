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
    public ActionResult<PagedResult> Search(
    [FromQuery] int page = 0,
    [FromQuery] int size = 5,
    [FromQuery] string? search = null)
    {
        Thread.Sleep(1000); // Simulate latency
        var query = _service.GetAll().AsQueryable();

        if (!String.IsNullOrWhiteSpace(search))
        {
            query = query.Where(c =>
                (c.Title != null && c.Title.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                (c.Text != null && c.Text.Contains(search, StringComparison.OrdinalIgnoreCase)));
        }

        var total = query.Count();

        var items = query
            .OrderByDescending(c => c.CreatedAt)
            .Skip(page * size)
            .Take(size)
            .ToList();

        var result = new PagedResult
        {
            Items = items,
            TotalElements = total
        };

        return Ok(result);
    }



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
