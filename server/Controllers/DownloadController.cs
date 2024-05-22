using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace LobeVidol.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class DownloadController : ControllerBase
    {
        private static readonly HttpClient HttpClient = new();
        private static readonly ConcurrentDictionary<string, (Task downloadTask, long totalSize, long downloadedSize)> Downloads = new();

        [HttpGet("model")]
        public IActionResult Model([FromQuery] string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl))
            {
                return BadRequest("File URL is required.");
            }

            var downloadId = Guid.NewGuid().ToString();

            // Define the task variable first
            Task downloadTask = null;

            downloadTask = Task.Run(async () =>
            {
                var response = await HttpClient.GetAsync(fileUrl, HttpCompletionOption.ResponseHeadersRead);
                response.EnsureSuccessStatusCode();

                var totalSize = response.Content.Headers.ContentLength ?? -1;
                var buffer = new byte[81920];
                long downloadedSize = 0;

                using (var stream = await response.Content.ReadAsStreamAsync())
                {
                    while (true)
                    {
                        var bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                        if (bytesRead == 0)
                        {
                            break;
                        }

                        downloadedSize += bytesRead;
                        Downloads[downloadId] = (downloadTask, totalSize, downloadedSize);
                    }
                }
            });

            // Store the task in the dictionary
            Downloads[downloadId] = (downloadTask, 0, 0);

            return Ok(new { downloadId, totalSize = 0 });
        }

        [HttpGet("status/{downloadId}")]
        public IActionResult GetStatus(string downloadId)
        {
            if (Downloads.TryGetValue(downloadId, out var downloadInfo))
            {
                var (downloadTask, totalSize, downloadedSize) = downloadInfo;
                return Ok(new { totalSize, downloadedSize, isCompleted = downloadTask.IsCompleted });
            }

            return NotFound();
        }

        [HttpGet("file/{downloadId}")]
        public async Task<IActionResult> DownloadFile(string downloadId)
        {
            if (!Downloads.TryGetValue(downloadId, out var downloadInfo))
            {
                return NotFound();
            }

            var (downloadTask, totalSize, downloadedSize) = downloadInfo;

            if (!downloadTask.IsCompleted)
            {
                return BadRequest("Download is not completed yet.");
            }

            var memory = new MemoryStream();
            var fileUrl = "url-of-the-file-to-be-downloaded";
            var response = await HttpClient.GetAsync(fileUrl, HttpCompletionOption.ResponseHeadersRead);
            response.EnsureSuccessStatusCode();

            using (var stream = await response.Content.ReadAsStreamAsync())
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            Downloads.TryRemove(downloadId, out _);

            return File(memory, "application/octet-stream", "downloadedfile.ext");
        }
    }
}
