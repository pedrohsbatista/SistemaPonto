namespace SistemaPonto.Domain.Views{
    public class TokenView {
        public string Usuario { get; set; }
        public string Token { get; set; }

        public TokenView(string usuario, string token){
           Usuario = usuario;
           Token = token;
        }
    }   
}