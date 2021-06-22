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
    /// <summary>
    /// Controlador para todo el crud de la api
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class PersonasController : ControllerBase
    {
        [HttpPost]
        public string CreateUser(PersonasRequest personas)
        {
            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            string response;
                try
                {
                    response = PersonasMethods.PostPersonas(personas);
                }
                catch (Exception ex)
                {
                    Logger.SetLog(actualMetodo, "Error", "Fallo al ejecutar el metodo: " + actualMetodo + " , error: " + ex.Message);
                    response = "Ocurrio un error en el metodo: " + actualMetodo + ", favor de reportar el error con el administrador para que revise los logs";
                }
            
            return response;
        }
        [HttpGet]
        public string ReadUsers()
        {
            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            string response;
            try
            {
                response = PersonasMethods.GetPersonas();         
            }
            catch (Exception ex)
            {
                Logger.SetLog(actualMetodo, "Error", "Fallo al ejecutar el metodo: " + actualMetodo + " , error: " + ex.Message);
                response = "Ocurrio un error en el metodo: " + actualMetodo + ", favor de reportar el error con el administrador para que revise los logs";
            }

            return response;
        }
        [HttpPut]
        public string UpdateUsers(PersonasRequest personas)
        {
            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            string response;
            try
            {
                response = PersonasMethods.UpdatePersonas(personas);
            }
            catch (Exception ex)
            {
                Logger.SetLog(actualMetodo, "Error", "Fallo al ejecutar el metodo: " + actualMetodo + " , error: " + ex.Message);
                response = "Ocurrio un error en el metodo: " + actualMetodo + ", favor de reportar el error con el administrador para que revise los logs";
            }

            return response;
        }
        [HttpDelete("/{id}")]
        public string DeleteUser()
        {

            var id = RouteData.Values["id"];

            int param = Convert.ToInt32(id);

            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            string response;
            try
            {
                response = PersonasMethods.DeletePersonas(param);
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
