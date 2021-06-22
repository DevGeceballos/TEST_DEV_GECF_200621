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
    /// <summary>
    /// Clase con los metodos de apoyo para el crud de la api
    /// </summary>
    public class PersonasMethods
    {
        public static string PostPersonas(PersonasRequest personas)
        {
            string sp;
            Connection cadenac = new Connection();
            string response;

            sp = "sp_AgregarPersonaFisica";
            SqlParameter[] sqlParameters = new SqlParameter[] {
                  new SqlParameter("@Nombre", personas.Nombre) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@ApellidoPaterno", personas.ApellidoPaterno) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@ApellidoMaterno", personas.ApellidoMaterno) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@RFC", personas.RFC) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@FechaNacimiento", personas.FechaNacimiento) {
                      SqlDbType = SqlDbType.DateTime
                    },
                  new SqlParameter("@UsuarioAgrega", personas.UsuarioAgrega) {
                      SqlDbType = SqlDbType.Int
                    }
                };

            response = EjecutarSP(sqlParameters, sp);

            return response;
        }

        public static string GetPersonas()
        {
            string sp;
            Connection cadenac = new Connection();
            string response;

            sp = "sp_ObtenerPersonas";
            SqlParameter[] sqlParameters = new SqlParameter[] {
                };

            response = EjecutarSP(sqlParameters, sp);

            return response;
        }

        public static string UpdatePersonas(PersonasRequest personas)
        {
            string sp;
            Connection cadenac = new Connection();
            string response;

            sp = "sp_ActualizarPersonaFisica";
            SqlParameter[] sqlParameters = new SqlParameter[] {
                  new SqlParameter("@IdPersonaFisica", personas.IdPersonaFisica) {
                      SqlDbType = SqlDbType.Int
                    },
                  new SqlParameter("@Nombre", personas.Nombre) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@ApellidoPaterno", personas.ApellidoPaterno) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@ApellidoMaterno", personas.ApellidoMaterno) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@RFC", personas.RFC) {
                      SqlDbType = SqlDbType.VarChar
                    },
                  new SqlParameter("@FechaNacimiento", personas.FechaNacimiento) {
                      SqlDbType = SqlDbType.DateTime
                    },
                  new SqlParameter("@UsuarioAgrega", personas.UsuarioAgrega) {
                      SqlDbType = SqlDbType.Int
                    }
                };

            response = EjecutarSP(sqlParameters, sp);

            return response;
        }

        public static string DeletePersonas(int id)
        {
            string sp;
            Connection cadenac = new Connection();
            string response;

            sp = "sp_EliminarPersonaFisica";
            SqlParameter[] sqlParameters = new SqlParameter[] {
                  new SqlParameter("@IdPersonaFisica", id) {
                      SqlDbType = SqlDbType.Int
                    }
                };

            response = EjecutarSP(sqlParameters, sp);

            return response;
        }
        public  static string EjecutarSP(SqlParameter[] sqlParameters, string sp)
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
