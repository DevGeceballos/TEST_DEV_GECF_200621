using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace tokaBack.Helper
{
    public class Logger
    {
		/// <summary>
		/// Este metodo se utilizara para los logs, se compone de 3 parametros, el primero hace referencia al nombre del archivo donde se guardaran los logs,
		/// el segundo es el tipo de mensaje que se genero "Ok, warning, error..." y el ultimo es un mensaje que haga referencia a la respuesta que haya generado algun metodo.
		/// </summary>
		/// <param name="archivo"></param>
		/// <param name="type"></param>
		/// <param name="message"></param>
		public static void SetLog(string archivo, string type = " WARNING", string message = " MENSAJE DEL LOG")
		{
			string response = Environment.CurrentDirectory;
			string file = response + @"\ErrorLog\" + archivo + ".log";

			using (StreamWriter sw = File.AppendText(file))
			{
				sw.WriteLine(DateTime.Now.ToString("[yyyy-MM-dd HH:mm:ss] ") + type + message);
			}
		}
	}
}
