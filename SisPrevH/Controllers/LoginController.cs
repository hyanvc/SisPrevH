using Microsoft.AspNetCore.Mvc;
using SisPrevH.Models;

namespace SisPrevH.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            string caminhoArquivo = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "usuarios.txt");

            if (!System.IO.File.Exists(caminhoArquivo))
            {
                ViewBag.Mensagem = "Nenhum usuário cadastrado ainda.";
                return View(model);
            }

            var linhas = System.IO.File.ReadAllLines(caminhoArquivo);

            foreach (var linha in linhas)
            {
                // Estrutura do arquivo:
                // Nome;Email;Usuario;Senha;CPF;DataNascimento;Endereco
                var campos = linha.Split(';');

                if (campos.Length < 7)
                    continue;

                string nome = campos[0];
                string email = campos[1];
                string usuario = campos[2];
                string senha = campos[3];
                string cpf = campos[4];
                string dataNascimento = campos[5];
                string endereco = campos[6];

                if (model.Usuario == cpf && model.Senha == senha)
                {

                    HttpContext.Session.SetString("UsuarioLogado", nome);
                    HttpContext.Session.SetString("UsuarioNome", nome);
                    HttpContext.Session.SetString("UsuarioEmail", email);
                    HttpContext.Session.SetString("UsuarioUsuario", usuario);
                    HttpContext.Session.SetString("UsuarioSenha", senha);
                    HttpContext.Session.SetString("UsuarioCPF", cpf);
                    HttpContext.Session.SetString("UsuarioDataNascimento", dataNascimento);
                    HttpContext.Session.SetString("UsuarioEndereco", endereco);

                    return RedirectToAction("Index", "Home");
                }
            }

            ViewBag.Mensagem = "CPF ou Senha incorretos.";
            return View(model);
        }



        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Login");
        }
    }
}

