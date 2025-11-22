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
            if (ModelState.IsValid)
            {
                if (model.Usuario == "admin" && model.Senha == "123")
                {
                    // salva sessão
                    HttpContext.Session.SetString("UsuarioLogado", model.Usuario);

                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.Mensagem = "Usuário ou senha incorretos.";
                }
            }

            return View(model);
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Login");
        }
    }
}

