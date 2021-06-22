using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tokaBack.Models;
using tokaBack.Metodos;
using tokaBack.Helper;

namespace tokaBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController: ControllerBase
    {
        [HttpPost]
        public string CreateUser(LoginRequest user)
        {
            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            string response;
                try
                {
                    response = UsersMethods.PostUsers(user);
                }
                catch (Exception ex)
                {
                    Logger.SetLog(actualMetodo, "Error", "Fallo al ejecutar el metodo: " + actualMetodo + " , error: " + ex.Message);
                    response = "Ocurrio un error en el metodo: " + actualMetodo + ", favor de reportar el error con el administrador para que revise los logs";
                }
            
            return response;
        }               
    }
}
