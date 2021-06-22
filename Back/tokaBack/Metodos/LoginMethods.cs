using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tokaBack.Models;
using System.Data.SqlClient;
using System.Web;
using System.Data;
using tokaBack.Conn;
using System.Text.RegularExpressions;
using System.Collections;
using tokaBack.Helper;
using Newtonsoft.Json;

namespace tokaBack.Metodos
{
    public class LoginMethods
    {

        public static string LoginUsers(LoginRequest users)
        {
            string sp;
            Connection cadenac = new Connection();
            string response;

            sp = "sp_ObtenerUsers";
            SqlParameter[] sqlParameters = new SqlParameter[] {
                  new SqlParameter("@Email", users.Email) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@Pass", users.Pass) {
                      SqlDbType = SqlDbType.VarChar
                    }
                };

            response = EjecutarSP(sqlParameters, sp);

            return response;
        }

        public static string EjecutarSP(SqlParameter[] sqlParameters, string sp)
        {
            Connection clsConexion;
            DataTable dt;
            clsConexion = new Connection();
            dt = new DataTable();
            string JSONresult = string.Empty; ;
            string actualMetodo = System.Reflection.MethodBase.GetCurrentMethod().Name;
            try
            {
                using (var conexion = new SqlConnection(clsConexion.cadenaConexion))
                {
                    conexion.Open();

                    using (var comando = new SqlCommand(sp, conexion))
                    {
                        comando.Parameters.AddRange(sqlParameters);
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.CommandTimeout = 60000;
                        using (SqlDataReader dtReader = comando.ExecuteReader())
                        {
                            dt.Load(dtReader);
                        }
                    }
                }
                if (dt.Rows.Count > 0)
                {
                    JSONresult = JsonConvert.SerializeObject(dt);
                }
                else
                {
                    JSONresult = "No hay datos en la tabla";
                }
            }
            catch (Exception ex)
            {
                JSONresult = "Ocurrio un error al ejecutar el sp:" + sp;
                Logger.SetLog(actualMetodo, "Error", "Error al ejecutar el query/sp. Message: " + ex.Message + ". Method: " + actualMetodo);
                throw new Exception("Error al ejecutar el query/sp. Message: " + ex.Message);
            }

            return JSONresult;
        }


    }
}
