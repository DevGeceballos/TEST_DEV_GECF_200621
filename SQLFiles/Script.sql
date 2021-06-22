create database toka_exam
go
use toka_exam
go

-- =================================================================== 
--Parte del script enviado para el examen --No pongo los  SP'S, ya que modifique algunos que no funcionaban bien
CREATE TABLE Tb_PersonasFisicas
(
    IdPersonaFisica INT IDENTITY,
    FechaRegistro DATETIME,
    FechaActualizacion DATETIME,
    Nombre VARCHAR(50),
    ApellidoPaterno VARCHAR(50),
    ApellidoMaterno VARCHAR(50),
    RFC VARCHAR(13),
    FechaNacimiento DATE,
    UsuarioAgrega INT,
    Activo BIT
);

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [PK_Tb_PersonasFisicas]
    PRIMARY KEY (IdPersonaFisica);

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [DF_Tb_PersonasFisicas_FechaRegistro]
    DEFAULT (GETDATE()) FOR FechaRegistro;

ALTER TABLE Tb_PersonasFisicas
ADD CONSTRAINT [DF_Tb_PersonasFisicas_Activo]
    DEFAULT (1) FOR Activo;
GO
-- ===================================================================


--Tabla para login con pass y correo
CREATE TABLE Tb_Users
(
    IdUsers INT IDENTITY,
    Nombre VARCHAR(200),
    Email VARCHAR(200),
	Pass VARCHAR(200)
);

ALTER TABLE Tb_Users
ADD CONSTRAINT [PK_Tb_Users]
    PRIMARY KEY (IdUsers);
GO

--SP Para actualziar una persona
CREATE PROCEDURE [dbo].[sp_ActualizarPersonaFisica]
(
    @IdPersonaFisica INT,
    @Nombre VARCHAR(50),
    @ApellidoPaterno VARCHAR(50),
    @ApellidoMaterno VARCHAR(50),
    @RFC VARCHAR(13),
    @FechaNacimiento DATE,
    @UsuarioAgrega INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ERROR VARCHAR(500);
    BEGIN TRY
        IF NOT EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE IdPersonaFisica = @IdPersonaFisica
                  AND Activo = 1
        )
        BEGIN
            SELECT @ERROR = 'La persona fisica no existe.';
            THROW 50000, @ERROR, 1;
        END;
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE RFC = @RFC and IdPersonaFisica != @IdPersonaFisica and Activo = 1
        )
        BEGIN
            SELECT @ERROR = 'Este rfc ya esta en uso por otra persona.';
            THROW 50000, @ERROR, 2;
        END;

        UPDATE dbo.Tb_PersonasFisicas
        SET Nombre = @Nombre,
            ApellidoPaterno = @ApellidoPaterno,
            ApellidoMaterno = @ApellidoMaterno,
            RFC = @RFC,
            FechaNacimiento = @FechaNacimiento,
			UsuarioAgrega = @UsuarioAgrega
        WHERE IdPersonaFisica = @IdPersonaFisica;
        SELECT @IdPersonaFisica AS ERROR,
               'Registro exitoso' AS MENSAJEERROR;

    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ERROR,
               ISNULL(@ERROR, 'Error al actualizar el registro.') AS MENSAJEERROR;
    END CATCH;
END;
GO

--SP Para agregar persona fisica
CREATE PROCEDURE [dbo].[sp_AgregarPersonaFisica]
(
    @Nombre VARCHAR(50),
    @ApellidoPaterno VARCHAR(50),
    @ApellidoMaterno VARCHAR(50),
    @RFC VARCHAR(13),
    @FechaNacimiento DATE,
    @UsuarioAgrega INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ERROR VARCHAR(500);
    BEGIN TRY
        IF LEN(@RFC) != 13
        BEGIN
            SELECT @ERROR = 'El RFC no es válido';
            THROW 50000, @ERROR, 1;
        END;
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE RFC = @RFC
                  AND Activo = 1
        )
        BEGIN
            SELECT @ERROR = 'El RFC ya existe en el sistema';
            THROW 50000, @ERROR, 1;
        END;

        INSERT INTO dbo.Tb_PersonasFisicas
        (
            FechaRegistro,
            FechaActualizacion,
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            RFC,
            FechaNacimiento,
            UsuarioAgrega,
            Activo
        )
        VALUES
        (   GETDATE(),        -- FechaRegistro - datetime
            NULL,             -- FechaActualizacion - datetime
            @Nombre,          -- Nombre - varchar(50)
            @ApellidoPaterno, -- ApellidoPaterno - varchar(50)
            @ApellidoMaterno, -- ApellidoMaterno - varchar(50)
            @RFC,             -- RFC - varchar(13)
            @FechaNacimiento, -- FechaNacimiento - date
            @UsuarioAgrega,   -- UsuarioAgrega - int
            1                 -- Activo - bit
            );

        SELECT @ID = SCOPE_IDENTITY();
        SELECT @ID AS ERROR,
               'Registro exitoso' AS MENSAJEERROR;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ERROR,
               ISNULL(@ERROR, 'Error al guardar el registro.') AS MENSAJEERROR;
    END CATCH;
END;
GO
-- SP Para agregar un usuario
CREATE PROCEDURE [dbo].[sp_AgregarUser]
(
    @Nombre VARCHAR(200),
    @Email VARCHAR(200),
    @Pass VARCHAR(200)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ERROR VARCHAR(500);
    BEGIN TRY
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_Users
            WHERE Email = @Email
        )
        BEGIN
            SELECT @ERROR = 'El correo ya existe en el sistema';
            THROW 50000, @ERROR, 1;
        END;

        INSERT INTO dbo.Tb_Users
        (
            Nombre,
            Email,
            Pass
        )
        VALUES
        (
            @Nombre, 
            @Email,
            @Pass
            );
        SELECT @ID = SCOPE_IDENTITY();
        SELECT @ID AS ERROR,
               'Registro exitoso' AS MENSAJEERROR;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ERROR,
               ISNULL(@ERROR, 'Error al guardar el registro.') AS MENSAJEERROR;
    END CATCH;
END;
GO
-- SP Para eliminar persona especifica (Realmente solo la desactiva)
CREATE PROCEDURE [dbo].[sp_EliminarPersonaFisica]
(@IdPersonaFisica INT)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ID INT,
            @ERROR VARCHAR(500);
    BEGIN TRY
        IF NOT EXISTS
        (
            SELECT *
            FROM dbo.Tb_PersonasFisicas
            WHERE IdPersonaFisica = @IdPersonaFisica
                  AND Activo = 1
        )
        BEGIN
            SELECT @ERROR = 'La persona fisica no existe.';
            THROW 50000, @ERROR, 1;
        END;

        UPDATE dbo.Tb_PersonasFisicas
        SET Activo = 0
        WHERE IdPersonaFisica = @IdPersonaFisica;
        SELECT 'Persona fisica eliminada' AS MENSAJEERROR;
    END TRY
    BEGIN CATCH
        PRINT ERROR_MESSAGE();
        SELECT ERROR_NUMBER() * -1 AS ERROR,
               ISNULL(@ERROR, 'Error al actualizar el registro.') AS MENSAJEERROR;
    END CATCH;
END;
GO
--SP Para obtener las personas fisicas activas
CREATE PROCEDURE [dbo].[sp_ObtenerPersonas]
AS
BEGIN
	SELECT * FROM Tb_PersonasFisicas WITH(NOLOCK) WHERE Activo = 1
END;
GO
-- SP Para obtener usuarios
CREATE PROCEDURE [dbo].[sp_ObtenerUsers]
(
    @Email VARCHAR(200),
    @Pass VARCHAR(200)
)
AS
BEGIN
    BEGIN 
        IF EXISTS
        (
            SELECT *
            FROM dbo.Tb_Users
            WHERE Email = @Email and Pass = @Pass
        )
        BEGIN
            SELECT NOMBRE AS RESPONSE FROM dbo.Tb_Users WHERE Email = @Email and Pass = @Pass
        END;
		ELSE
		BEGIN
			SELECT 'DENEGADO' AS RESPONSE;
		END;
	END
END;
GO