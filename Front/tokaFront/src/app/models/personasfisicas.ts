export class personasfisicas{
	constructor(
		public IdPersonaFisica : number,
		public FechaRegistro : any,
		public FechaActualizacion : any,
		public Nombre : string,
		public ApellidoPaterno : string,
		public ApellidoMaterno : string,
		public RFC : string,
		public FechaNacimiento : any,
		public UsuarioAgrega : number,
		public Activo : boolean				
	){}
}