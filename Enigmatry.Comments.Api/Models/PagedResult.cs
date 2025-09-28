namespace Enigmatry.Comments.Api.Models;

public class PagedResult
{
    public IEnumerable<Comment> Items { get; set; } = Enumerable.Empty<Comment>();
    public int TotalElements { get; set; }
}
