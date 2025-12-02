using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SeuProjeto.Controllers
{
    public class CadastroController : Controller
    {
        private readonly string caminhoArquivo = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "usuarios.txt");

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Salvar([FromBody] UsuarioModel usuario)
        {
            try
            {
                var pasta = Path.GetDirectoryName(caminhoArquivo);
                if (!Directory.Exists(pasta))
                    Directory.CreateDirectory(pasta);

                if (!System.IO.File.Exists(caminhoArquivo))
                    System.IO.File.Create(caminhoArquivo).Close();

                string linha =
                    $"{usuario.Nome};{usuario.Email};{usuario.Usuario};{usuario.Senha};{usuario.CPF};{usuario.DataNascimento};{usuario.Endereco}";

                System.IO.File.AppendAllText(caminhoArquivo, linha + Environment.NewLine, Encoding.UTF8);

                return Json(new { success = true, message = "Usuário cadastrado com sucesso!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Erro ao salvar: " + ex.Message });
            }
        }
    }

    public class UsuarioModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }

        public string CPF { get; set; }
        public string DataNascimento { get; set; }
        public string Endereco { get; set; }
    }
}
