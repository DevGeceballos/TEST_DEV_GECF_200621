using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tokaBack.Conn
{
    public class Connection
    {
        public string cadenaConexion;
        public Connection()
        {
            cadenaConexion = "server=localhost;uid=userg;password= pass123;database=toka_exam";
            //cadenaConexion = "server=server;uid=user;password= pass;database=toka_exam";
        }
    }
}