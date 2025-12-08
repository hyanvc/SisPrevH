using Newtonsoft.Json;
using System.Text;

namespace SisPrevH.Services
{
    public class BrevoEmailService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;

        public BrevoEmailService(string apiKey)
        {
            _apiKey = apiKey;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("api-key", _apiKey);
        }

        public async Task<bool> EnviarEmailAsync(string paraEmail, string paraNome, string assunto, string html)
        {
            var url = "https://api.brevo.com/v3/smtp/email";

            var payload = new
            {
                sender = new
                {
                    name = "Hyan o Gente fina.",
                    email = "hyancunha@gmail.com"
                },
                to = new[] {
                new {
                    email = paraEmail,
                    name = paraNome
                }
            },
                subject = assunto,
                htmlContent = html
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
