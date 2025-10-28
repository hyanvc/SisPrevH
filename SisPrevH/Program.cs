var builder = WebApplication.CreateBuilder(args);

// ==========================================
// 🔹 Adiciona os serviços antes do Build()
// ==========================================
builder.Services.AddControllersWithViews();

// 🔹 Adiciona suporte à sessão
builder.Services.AddSession(options =>
{
    // opcional: tempo de expiração da sessão (em minutos)
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// 🔹 Permite acessar o HttpContext nas Views (_Layout)
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// ==========================================
// 🔹 Configuração do pipeline HTTP
// ==========================================
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// 🔹 Ativa o uso de sessão (antes do Authorization!)
app.UseSession();

app.UseAuthorization();

// ==========================================
// 🔹 Define a rota padrão (começa no Login)
// ==========================================
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}/{id?}");

app.Run();
