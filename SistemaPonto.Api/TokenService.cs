using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Api
{ 
    public static class TokenService
    {        
        public static string GenerateToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
               Subject = new ClaimsIdentity(new Claim[]
               {
                   new Claim(ClaimTypes.Name, usuario.Nome)
               }),
               Expires = DateTime.UtcNow.AddHours(8),
               SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(RetornaKey()), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static byte[] RetornaKey(){
            return Encoding.ASCII.GetBytes("sistemapontochavedeautenticacao");
        }
    }
}