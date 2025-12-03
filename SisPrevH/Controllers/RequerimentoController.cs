using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SeuProjeto.Controllers
{
    public class RequerimentoController : Controller
    {
        private readonly string caminhoArquivo = Path.Combine(
            AppDomain.CurrentDomain.BaseDirectory,
            "App_Data",
            "aposentadorias.txt"
        );

        [HttpGet]
        public IActionResult Aposentadoria()
        {

            var cpfSessao = HttpContext.Session.GetString("UsuarioCPF");

            // 2. Se existir CPF na sessão, verifica no arquivo se já tem registro
            if (!string.IsNullOrEmpty(cpfSessao))
            {
                if (System.IO.File.Exists(caminhoArquivo))

                {
                    // Verifica se existe o CPF no arquivo
                    var linhas = System.IO.File.ReadAllLines(caminhoArquivo);

                    bool cpfJaRegistrado = linhas.Any(l => l.Contains($"CPF: {cpfSessao}"));

                    if (cpfJaRegistrado)
                    {
                        // Já existe registro -> vai direto para a confirmação
                        return RedirectToAction("Confirmacao");
                    }
                }
            }
            // Senão, só abre o formulário normal
            return View();

        }

        [HttpPost]
        public IActionResult Aposentadoria(RequerimentoModel dados)
        {
            // 🔹 Garante que a pasta existe
            Directory.CreateDirectory(Path.GetDirectoryName(caminhoArquivo));

            // 🔹 Salva CPF na sessão SEMPRE
            HttpContext.Session.SetString("UsuarioCPF", dados.CPF);

            // 🔹 Se o arquivo já existe, verificar se o CPF já foi registrado
            if (System.IO.File.Exists(caminhoArquivo))
            {
                var conteudo = System.IO.File.ReadAllText(caminhoArquivo);

                if (conteudo.Contains($"CPF: {dados.CPF}"))
                {
                    // CPF já existe → redireciona sem gravar
                    return RedirectToAction("Confirmacao");
                }
            }

            var protocolo = new Random().Next(100000, 999999).ToString();
            HttpContext.Session.SetString("Protocolo", protocolo);


            var texto = new StringBuilder();
            texto.AppendLine("===================================================");
            texto.AppendLine($"Protocolo: {protocolo}");
            texto.AppendLine($"Nome: {dados.NomeCompleto}");
            texto.AppendLine($"CPF: {dados.CPF}");
            texto.AppendLine($"Nascimento: {dados.DataNascimento}");
            texto.AppendLine($"Matrícula: {dados.Matricula}");
            texto.AppendLine($"Sexo: {dados.Sexo}");
            texto.AppendLine($"Estado Civil: {dados.EstadoCivil}");
            texto.AppendLine($"CEP: {dados.CEP}");
            texto.AppendLine($"Rua: {dados.Rua}");
            texto.AppendLine($"Número: {dados.Numero}");
            texto.AppendLine($"Complemento: {dados.Complemento}");
            texto.AppendLine($"Bairro: {dados.Bairro}");
            texto.AppendLine($"Cidade: {dados.Cidade}");
            texto.AppendLine($"Estado: {dados.Estado}");
            texto.AppendLine($"Telefone: {dados.Telefone}");
            texto.AppendLine($"Celular: {dados.Celular}");
            texto.AppendLine($"Email: {dados.Email}");
            texto.AppendLine($"Tipo de Aposentadoria: {dados.TipoAposentadoria}");
            texto.AppendLine($"Último Cargo: {dados.UltimoCargo}");
            texto.AppendLine($"Data Ingresso: {dados.DataIngresso}");
            texto.AppendLine($"Data Saída: {dados.DataSaida}");
            texto.AppendLine($"Tempo Total Serviço: {dados.TempoTotalServico}");
            texto.AppendLine($"Exposição Nocivos: {dados.ExposicaoNocivos}");
            texto.AppendLine($"Descrição Nocivos: {dados.DescricaoNocivos}");
            texto.AppendLine($"Anos Exposição: {dados.AnosExposicao}");
            texto.AppendLine("===================================================");
            texto.AppendLine();

            System.IO.File.AppendAllText(caminhoArquivo, texto.ToString(), Encoding.UTF8);

            return RedirectToAction("Confirmacao");
        }



        [HttpGet]
        public IActionResult Confirmacao()
        {

            var protocolosave = new Random().Next(100000, 999999).ToString();
            HttpContext.Session.SetString("Protocolo", protocolosave);
            string cpfSession = HttpContext.Session.GetString("UsuarioCPF");
            string protocoloSession = HttpContext.Session.GetString("Protocolo");

            if (string.IsNullOrEmpty(cpfSession))
                return Content("Nenhum CPF encontrado na sessão.");

            string arquivo = caminhoArquivo;
            string nome = "";
            string tipoAposentadoria = "";
            string protocolo = protocoloSession; // fallback = sessão

            if (System.IO.File.Exists(arquivo))
            {
                var linhas = System.IO.File.ReadAllLines(arquivo);

                for (int i = 0; i < linhas.Length; i++)
                {
                    if (linhas[i].Contains($"CPF: {cpfSession}"))
                    {
                        nome = linhas[i - 1].Replace("Nome: ", "").Trim();

                        // 🔹 Pega o protocolo que está 1 linha acima do Nome
                        protocolo = linhas[i - 2].Replace("Protocolo:", "").Trim();

                        for (int j = i; j < linhas.Length; j++)
                        {
                            if (linhas[j].StartsWith("Tipo de Aposentadoria:"))
                            {
                                tipoAposentadoria = linhas[j].Replace("Tipo de Aposentadoria:", "").Trim();
                                break;
                            }
                            if (linhas[j].StartsWith("===")) break;
                        }
                        break;
                    }
                }
            }

            ViewBag.Nome = nome;
            ViewBag.CPF = cpfSession;
            ViewBag.Tipo = tipoAposentadoria;
            ViewBag.Protocolo = protocolo;

            return View();
        }




        public class RequerimentoModel
        {
            public string NomeCompleto { get; set; }
            public string CPF { get; set; }
            public string DataNascimento { get; set; }
            public string Matricula { get; set; }
            public string Sexo { get; set; }
            public string EstadoCivil { get; set; }
            public string CEP { get; set; }
            public string Rua { get; set; }
            public string Numero { get; set; }
            public string Complemento { get; set; }
            public string Bairro { get; set; }
            public string Cidade { get; set; }
            public string Estado { get; set; }
            public string Telefone { get; set; }
            public string Celular { get; set; }
            public string Email { get; set; }
            public string TipoAposentadoria { get; set; }
            public string UltimoCargo { get; set; }
            public string DataIngresso { get; set; }
            public string DataSaida { get; set; }
            public string TempoTotalServico { get; set; }
            public string ExposicaoNocivos { get; set; }
            public string DescricaoNocivos { get; set; }
            public string AnosExposicao { get; set; }
        }
    }
}
