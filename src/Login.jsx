import React from "react";

const Login = ({ onNavigate, onLogin }) => {
  return (
    <div className="content">
      <div style={{width:60, height:60, backgroundColor:'#008000', borderRadius:12, marginBottom:20, display:'flex', alignItems:'center', justifyCenter:'center', color:'white', fontSize:24, fontWeight:'bold', paddingLeft:18, paddingTop:12}}>C</div>
      <h1>Bienvenido</h1>
      <p>Banca Digital CEMAC</p>
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Contraseña" className="input-field" />
      <button className="btn-main" onClick={onLogin}>Iniciar sesión</button>
      <span style={{color:'#00A000', marginTop:20, cursor:'pointer', fontSize:14}} onClick={onNavigate}>
        ¿No tienes cuenta? Regístrate
      </span>
    </div>
  );
};

export default Login;