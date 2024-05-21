using LobeVidol.Server.Settings;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LobeVidol.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public AuthorizationController(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        [HttpGet("generate")]
        public IActionResult Generate(string username, string password)
        {
            if (username == _jwtSettings.Username && password == _jwtSettings.Password)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer,
                    audience: _jwtSettings.Audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(_jwtSettings.ExpirationInHours),
                    signingCredentials: creds
                );

                return Ok($"Bearer {new JwtSecurityTokenHandler().WriteToken(token)}");
            }
            else
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }
        }

        [HttpPost("check")]
        public IActionResult Check()
        {
            if (!Request.Headers.TryGetValue("Authorization", out var token))
            {
                return BadRequest("Authorization header missing");
            }

            var tokenStr = token.ToString().StartsWith("Bearer ") ? token.ToString().Substring(7) : token.ToString();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);

            try
            {
                tokenHandler.ValidateToken(tokenStr, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _jwtSettings.Issuer,
                    ValidAudience = _jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                }, out SecurityToken validatedToken);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
