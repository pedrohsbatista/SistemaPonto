namespace SistemaPonto.Domain {
    public class AppSettings {
       public AzureCognitive AzureCognitive { get; set; }
    }

    public class AzureCognitive {
        public string Endpoint { get; set; }
        public string Key { get; set; }
        public string PersonGroupId { get; set; }
    }
}