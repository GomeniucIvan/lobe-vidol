using System.Text.Json;
using LLama;
using LLama.Common;
using LobeVidol.Server.Models.Chat;
using Microsoft.AspNetCore.Mvc;

namespace LobeVidol.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    string modelPath = @"D:/openchat.gguf";

    public async Task<bool> IsImageGeneration(string enteredMessage)
    {
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
        chatHistory.AddMessage(AuthorRole.System, "Return only 'true' if the incoming message is an image generation request, and 'false' if the entered text is not an image generation request. This value is required.");

        ChatSession session = new(executor, chatHistory);

        session.WithOutputTransform(new LLamaTransforms.KeywordTextOutputStreamTransform(
            new string[] { "User:", "Assistant:", "System:" },
            redundancyLength: 8));

        InferenceParams inferenceParams = new InferenceParams()
        {
            MaxTokens = 1024,
            AntiPrompts = new List<string> { "User:" }
        };


        var isImageGeneration = false;

        await foreach (var text in session.ChatAsync(
                           new ChatHistory.Message(AuthorRole.User, enteredMessage),
                           inferenceParams))
        {
            isImageGeneration = text.ToLower().Trim() == "true";

            if (isImageGeneration)
                break;
        }

        return isImageGeneration;
    }


    [HttpPost("completion")]
    public async Task Completion([FromBody] JsonElement jsonString)
    {
        RootModel rootModel = JsonSerializer.Deserialize<RootModel>(jsonString.ToString());
        var enteredMessage = rootModel.Messages.LastOrDefault().Content;

        var isImageGeneration = await IsImageGeneration(enteredMessage);

        var parameters = new ModelParams(modelPath)
        {
            ContextSize = 1024,
            Seed = 1337,
            GpuLayerCount = 80,
        };
        using var model = LLamaWeights.LoadFromFile(parameters);
        using var context = model.CreateContext(parameters);
        var executor = new InteractiveExecutor(context);

        ChatSession session = null;
        if (isImageGeneration)
        {
            var chatHistory = new ChatHistory();

            chatHistory.AddMessage(AuthorRole.System, "Generate an improved prompt for image creation, ensuring the description is clear and easily understandable. " +
                                                      "You should not generate image you should just write entered message in better way without any description or additional text." +
                                                      "You should create prompt in one sequence so it can be used by stable diffusion the length of this prompt should be about 300 characters.");

            //TODO character specification
            session = new(executor, chatHistory);

            session.WithOutputTransform(new LLamaTransforms.KeywordTextOutputStreamTransform(
                new string[] { "Improved Prompt:", "Prompt:", "Please note" , "Generated Image", "Note" },
                redundancyLength: 8));
        }
        else
        {
            var chatHistory = new ChatHistory();

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

            session = new(executor, chatHistory);

            session.WithOutputTransform(new LLamaTransforms.KeywordTextOutputStreamTransform(
                new string[] { "User:", "Assistant:" },
                redundancyLength: 8));
        }

        InferenceParams inferenceParams = new InferenceParams()
        {
            MaxTokens = 1024,
            AntiPrompts = isImageGeneration ? new List<string> { "User:", "Generated Image:" } : new List<string> { "User:" }
        };

        Response.ContentType = "text/plain";
        Response.StatusCode = 200; // OK

        await using var responseStream = Response.BodyWriter.AsStream();
        await using var writer = new StreamWriter(responseStream);

        if (isImageGeneration)
        {
            await foreach (var text in session.ChatAsync(
                               new ChatHistory.Message(AuthorRole.User, enteredMessage),
                               inferenceParams))
            {
                var jsonResponse = JsonSerializer.Serialize(new { isImagePrompt = true, content = text});
                await writer.WriteAsync(jsonResponse);
                await writer.FlushAsync();
            }
        }
        else
        {
            await foreach (var text in session.ChatAsync(
                               new ChatHistory.Message(AuthorRole.User, enteredMessage),
                               inferenceParams))
            {
                var jsonResponse = JsonSerializer.Serialize(new { isTextPromt = true, content = text });
                await writer.WriteAsync(jsonResponse);
                await writer.FlushAsync();
            }
        }
    }
}