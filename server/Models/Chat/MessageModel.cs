using System.Text.Json.Serialization;

namespace LobeVidol.Server.Models.Chat;

public class RootModel
{
    [JsonPropertyName("model")]
    public string Model { get; set; }

    [JsonPropertyName("messages")]
    public List<MessageModel> Messages { get; set; }
}

public class MessageModel
{
    [JsonPropertyName("content")]
    public string Content { get; set; }
    
    [JsonPropertyName("role")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public MessageRole Role { get; set; }
}

public enum MessageRole
{
    Assistant,
    User,
    System
}