using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SeuProjeto.Controllers
{
    public class RequerimentoController : Controller
    {
        private readonly string caminhoArquivo = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "usuarios.txt");

        [HttpGet]
        public IActionResult Aposentadoria()
        {
            return View();
        }
    }
     
}
