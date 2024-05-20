namespace LobeVidol.Server.Settings
{
    public class JwtSettings
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpirationInHours { get; set; }
        public string SecretKey { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
