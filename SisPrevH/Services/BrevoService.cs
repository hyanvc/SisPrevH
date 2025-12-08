using Newtonsoft.Json;
using System.Text;

namespace SisPrevH.Services
{
    public class BrevoService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;

        public BrevoService(string apiKey)
        {
            _apiKey = apiKey;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("api-key", _apiKey);
        }

        public async Task<bool> EnviarSmsAsync(string numeroDestino, string mensagem, string remetente = "SuaEmpresa")
        {
            var url = "https://api.brevo.com/v3/transactionalSMS/sms";

            var payload = new
            {
                sender = remetente,    // Nome que aparecerá no SMS
                recipient = numeroDestino, // Ex: "+5585988887777"
                content = mensagem
            };

            string json = JsonConvert.SerializeObject(payload);

            var response = await _httpClient.PostAsync(
                url,
                new StringContent(json, Encoding.UTF8, "application/json")
            );

            return response.IsSuccessStatusCode;
        }
    }
}
