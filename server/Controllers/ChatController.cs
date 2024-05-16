using System.Text.Json;
using LLama;
using LLama.Common;
using lobe_vidol.Server.Models.Chat;
using Microsoft.AspNetCore.Mvc;

namespace lobe_vidol.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    [HttpPost("completion")]
    public async Task Completion([FromBody] JsonElement jsonString)
    {
        RootModel rootModel = JsonSerializer.Deserialize<RootModel>(jsonString.ToString());
        string modelPath = @"D:/openchat.gguf";

        var parameters = new ModelParams(modelPath)
        {
            ContextSize = 1024,
            Seed = 1337,
            GpuLayerCount = 80,
        };
        using var model = LLamaWeights.LoadFromFile(parameters);
        using var context = model.CreateContext(parameters);
        var executor = new InteractiveExecutor(context);

        var chatHistory = new ChatHistory();
        var enteredMessage = rootModel.Messages.LastOrDefault().Content;

        foreach (var message in rootModel.Messages.Take(rootModel.Messages.Count - 1))
        {
            if (message.Role == MessageRole.System)
            {
                chatHistory.AddMessage(AuthorRole.System, message.Content);
            }
            else if (message.Role == MessageRole.User)
            {
                chatHistory.AddMessage(AuthorRole.User, message.Content);
            }
            else if (message.Role == MessageRole.Assistant)
            {
                chatHistory.AddMessage(AuthorRole.Assistant, message.Content);
            }
        }

        ChatSession session = new(executor, chatHistory);

        session.WithOutputTransform(new LLamaTransforms.KeywordTextOutputStreamTransform(
            new string[] { "User:", "Assistant:" },
            redundancyLength: 8));

        InferenceParams inferenceParams = new InferenceParams()
        {
            MaxTokens = 1024,
            AntiPrompts = new List<string> { "User:" }
        };

        Response.ContentType = "text/plain";
        Response.StatusCode = 200; // OK

        await using var responseStream = Response.BodyWriter.AsStream();
        await using var writer = new StreamWriter(responseStream);

        await foreach (var text in session.ChatAsync(
                           new ChatHistory.Message(AuthorRole.User, enteredMessage),
                           inferenceParams))
        {
            await writer.WriteAsync(text);
            await writer.FlushAsync(); // Ensure the text is sent to the client immediately
        }
    }
}