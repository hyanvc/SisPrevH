using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SeuProjeto.Controllers
{
    public class CadastroController : Controller
    {
        private readonly string caminhoArquivo = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "usuarios.txt");

        // 👉 GET: exibe a tela de cadastro
        [HttpGet]
        public IActionResult Index()
        {
            return View(); // <-- aqui está o bendito return View() 😎
        }

        // 👉 POST: salva o cadastro no arquivo TXT
        [HttpPost]
        public IActionResult Salvar([FromBody] UsuarioModel usuario)
        {
            try
            {
                // Cria pasta se não existir
                var pasta = Path.GetDirectoryName(caminhoArquivo);
                if (!Directory.Exists(pasta))
                    Directory.CreateDirectory(pasta);

                // Cria arquivo se não existir
                if (!System.IO.File.Exists(caminhoArquivo))
                    System.IO.File.Create(caminhoArquivo).Close();

                // Monta a linha e adiciona
                string linha = $"{usuario.Nome};{usuario.Email};{usuario.Usuario};{usuario.Senha}";
                System.IO.File.AppendAllText(caminhoArquivo, linha + Environment.NewLine, Encoding.UTF8);

                return Json(new { success = true, message = "Usuário cadastrado com sucesso!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Erro ao salvar: " + ex.Message });
            }
        }
    }

    // 👉 ViewModel simples para receber os dados
    public class UsuarioModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
    }
}
