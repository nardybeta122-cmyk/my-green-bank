import React from "react";

const Register = ({ onNavigate, onLogin }) => {
  return (
    <div className="content">
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#008000",
          borderRadius: 12,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyCenter: "center",
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          paddingLeft: 18,
          paddingTop: 12,
        }}
      >
        C
      </div>
      <h1>Crear Cuenta</h1>
      <p>Región CEMAC (BEAC)</p>

      <input
        type="text"
        placeholder="Nombre completo"
        className="input-field"
      />

      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <select
          style={{
            width: 110,
            height: 50,
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "white",
          }}
        >
          <option>🇨🇲 +237</option>
          <option>🇬🇶 +240</option>
          <option>🇬🇦 +241</option>
          <option>🇨🇬 +242</option>
          <option>🇹🇩 +235</option>
          <option>🇨🇫 +236</option>
        </select>
        <input
          type="tel"
          placeholder="Teléfono"
          className="input-field"
          style={{ flex: 1 }}
        />
      </div>

      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Contraseña" className="input-field" />

      <button className="btn-main" onClick={onLogin}>
        Registrarse
      </button>

      <span
        style={{
          color: "#00A000",
          marginTop: 20,
          cursor: "pointer",
          fontSize: 14,
        }}
        onClick={onNavigate}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </span>
    </div>
  );
};

export default Register;
