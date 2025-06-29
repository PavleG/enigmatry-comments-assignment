namespace Enigmatry.Comments.Api.Models;

public class Comment
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Text { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastEditedAt { get; set; }
}
