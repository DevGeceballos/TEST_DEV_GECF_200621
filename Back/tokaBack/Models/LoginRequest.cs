﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tokaBack.Models
{
    public class LoginRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
    }
}
