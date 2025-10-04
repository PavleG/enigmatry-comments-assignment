using Microsoft.AspNetCore.Mvc;

namespace Enigmatry.Comments.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private static bool _isDismissedByUser;

    [HttpPost("dismiss")]
    public IActionResult Dismiss()
    {
        _isDismissedByUser = true;
        return Ok();
    }

    [HttpGet("isDismissed")]
    public ActionResult<bool> IsDismissed()
    {
        return Ok(_isDismissedByUser);
    }
}
