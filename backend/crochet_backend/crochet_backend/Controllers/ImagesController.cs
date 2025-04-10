using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly BlobStorageService _blobStorageService;

    public ImagesController(BlobStorageService blobStorageService)
    {
        _blobStorageService = blobStorageService;
    }

    [HttpGet("{fileName}")]
    public async Task<IActionResult> GetImage(string fileName)
    {
        var imageData = await _blobStorageService.GetImageAsync(fileName);
        if (imageData == null)
        {
            return NotFound();
        }

        return File(imageData, "image/jpeg"); // Adjust MIME type if needed
    }
}
