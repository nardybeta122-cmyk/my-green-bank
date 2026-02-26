import React, { useState } from "react";

export default function Home({ balance, history, onLogout, onTransactionComplete }) {
  const [activeTab, setActiveTab] = useState("inicio");
  const [activeModal, setActiveModal] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // --- PERFIL Y SEGURIDAD ---
  const [userName, setUserName] = useState("Usuario CEMAC");
  const [profilePic, setProfilePic] = useState(null);
  const [lang, setLang] = useState("Español");
  const [securityPanel, setSecurityPanel] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  const [pin, setPin] = useState("");

  // --- ESTADOS DE FORMULARIOS (RESTAURADOS) ---
  const [amount, setAmount] = useState("");
  const [targetName, setTargetName] = useState("");
  const [targetAccount, setTargetAccount] = useState("");
  const [accountType, setAccountType] = useState("Cuenta de Ahorro");

  // --- RECORDATORIOS ---
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // --- ICONOS SVG MINIMALISTAS (OUTLINE) ---
  const Icons = {
    Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Vida: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    Avisos: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Camera: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
    Send: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
    Withdraw: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
    Deposit: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
    Link: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
    Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  };

  const vidaDiariaData = {
    restaurantes: [
      { name: "La Luna", info: "Comida internacional Malabo", icon: "🍴", rating: "9.5/10", location: "Calle de Argelia, Malabo" },
      { name: "Pizzeria Pizza Real", info: "Pizzas artesanas", icon: "🍕", rating: "8.8/10", location: "Barrio Paraíso, Malabo" }
    ],
    supermercados: [
      { name: "Martinez Hermanos", info: "Distribución nacional", icon: "🛒", location: "Centro Ciudad" },
      { name: "EGTC", info: "Supermercados y suministros", icon: "🛍️", location: "Malabo / Bata" }
    ],
    atracciones: [
      { name: "AfriMall", info: "Ocio y compras", icon: "🎬", location: "Malabo II" },
      { name: "Parque Nacional", info: "Paseo y deporte", icon: "🌳", location: "Malabo II" }
    ],
    utilidades: [
      { name: "MUNI", info: "Red Movistar G.E.", icon: "📶" },
      { name: "SEGESA", info: "Suministro Eléctrico", icon: "💡" }
    ]
  };

  const handleStartTransaction = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return alert("Monto inválido");
    if (activeModal === "Transferir" && (!targetName || !targetAccount)) return alert("Completa los datos del beneficiario");
    setIsVerifyingPin(true);
  };

  const confirmWithPin = () => {
    if (pin === "1234") {
      const val = parseFloat(amount);
      const isExpense = activeModal !== "Depositar";
      const record = {
        id: "TRX-" + Math.random().toString(36).substr(2, 7).toUpperCase(),
        type: activeModal,
        amt: isExpense ? -val : val,
        destinatario: activeModal === "Transferir" ? targetName : "Misma Cuenta",
        cuenta: activeModal === "Transferir" ? targetAccount : accountType,
        date: new Date().toLocaleTimeString(),
        icon: activeModal,
      };
      onTransactionComplete(record);
      setInvoice(record);
      setIsVerifyingPin(false);
      setActiveModal(null);
      setPin(""); setAmount(""); setTargetName(""); setTargetAccount("");
    } else {
      alert("PIN Incorrecto");
      setPin("");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: '#f8f9fa', color: '#333' }}>
      
      {/* 🛡️ MODAL SEGURIDAD RESTAURADO */}
      {securityPanel && (
        <div className="modal-overlay" style={{zIndex: 6000}}>
          <div style={{ background: "white", padding: '25px 0', borderRadius: 25, width: "90%", maxHeight: '85%', overflowY: 'auto' }}>
            <div style={{padding: '0 25px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{margin:0, fontSize: 18}}>Centro de Seguridad</h3>
                <button onClick={() => setSecurityPanel(false)} style={{border:'none', background:'none', fontSize: 20}}>✕</button>
            </div>
            <div style={{margin: '20px', padding: 15, background: '#f0f9f0', borderRadius: 15}}>
                <div style={{color:'#008000', marginBottom: 5, display:'flex', alignItems:'center', gap: 8}}><Icons.Shield /> <b>Reporte Protección</b></div>
                <p style={{fontSize: 11, color: '#666', margin: 0}}>Gestione su seguridad y dispositivos vinculados.</p>
            </div>
            <div className="profile-section-title">Opciones</div>
            <div style={{margin: '0 20px', border: '1px solid #eee', borderRadius: 15, overflow:'hidden'}}>
                <div className="profile-item" style={{padding: 18, borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}} onClick={() => alert("Reseteo enviado")}><span>🔐 Resetear Contraseña</span><span>〉</span></div>
                <div className="profile-item" style={{padding: 18, borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}} onClick={() => alert("ID: BEAC-8829")}><span>🆔 Info Identidad</span><span>〉</span></div>
                <div className="profile-item" style={{padding: 18, display:'flex', justifyContent:'space-between', color:'red'}} onClick={onLogout}><span>🚫 Desvincular</span><span>〉</span></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PIN */}
      {isVerifyingPin && (
        <div className="modal-overlay" style={{zIndex: 7000}}>
          <div style={{ background: "white", padding: 30, borderRadius: 25, width: "80%", textAlign: 'center' }}>
            <h3 style={{fontWeight:'600'}}>PIN de Seguridad</h3>
            <input type="password" maxLength="4" className="input-field" style={{textAlign: 'center', fontSize: 24, letterSpacing: 10, borderBottom:'2px solid #008000'}} value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
            <button className="btn-main" onClick={confirmWithPin} style={{marginTop: 20}}>Confirmar</button>
            <button onClick={() => setIsVerifyingPin(false)} style={{border:'none', background:'none', marginTop: 10, color:'#999'}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL FACTURA */}
      {invoice && (
        <div className="modal-overlay" style={{zIndex: 5500}}>
          <div style={{ background: "white", padding: 30, borderRadius: 25, width: "85%", textAlign: 'center' }}>
            <div style={{color:'#008000', marginBottom:10}}><Icons.Shield /></div>
            <h2 style={{ fontSize: 20, margin: '0 0 15px' }}>Éxito</h2>
            <div style={{ textAlign: 'left', background: '#f9f9f9', padding: 15, borderRadius: 15, fontSize: 12 }}>
              <p><b>Monto:</b> {Math.abs(invoice.amt).toLocaleString()} XAF</p>
              <p><b>Destino:</b> {invoice.destinatario}</p>
              <p><b>Referencia:</b> {invoice.id}</p>
            </div>
            <button className="btn-main" onClick={() => setInvoice(null)} style={{marginTop: 20}}>Cerrar</button>
          </div>
        </div>
      )}

      {/* CONTENIDO SCROLLABLE */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        
        {activeTab === "inicio" && (
          <>
            <div style={{ background: '#008000', color: 'white', padding: '40px 25px 50px', borderRadius: '0 0 30px 30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{fontSize: 12, fontWeight: '500', opacity: 0.9}}>BEAC DIGITAL G.E.</span>
                <span onClick={() => setShowBalance(!showBalance)} style={{cursor:'pointer'}}><Icons.Shield /></span>
              </div>
              <small style={{opacity: 0.8, fontSize: 11}}>Saldo disponible</small>
              <h1 style={{ margin: '5px 0 0 0', fontSize: 32, fontWeight:'600' }}>{showBalance ? `${balance.toLocaleString()} XAF` : "••••••••"}</h1>
            </div>

            <div style={{ padding: '0 20px', marginTop: -25 }}>
               <div style={{ background: '#1a1a1a', height: 160, borderRadius: 24, padding: 25, color: 'white', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{fontSize: 10}}>PLATINUM CEMAC</span><div style={{ width: 35, height: 22, background: '#f1c40f', borderRadius: 4 }}></div></div>
                  <div style={{ fontSize: 18, letterSpacing: 3 }}>**** **** **** 8829</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>{userName.toUpperCase()}</span><span>12/28</span></div>
               </div>
            </div>

            {/* BOTONES OPERACIONES */}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '30px 10px' }}>
              <div onClick={() => setActiveModal("Retirar")} style={{textAlign:'center', cursor:'pointer'}}><div className="icon-circle-outline"><Icons.Withdraw /></div><span style={{fontSize: 11}}>Retirar</span></div>
              <div onClick={() => setActiveModal("Transferir")} style={{textAlign:'center', cursor:'pointer'}}><div className="icon-circle-outline"><Icons.Send /></div><span style={{fontSize: 11}}>Enviar</span></div>
              <div onClick={() => setActiveModal("Depositar")} style={{textAlign:'center', cursor:'pointer'}}><div className="icon-circle-outline"><Icons.Deposit /></div><span style={{fontSize: 11}}>Ingresar</span></div>
              <div onClick={() => setActiveModal("LinkBank")} style={{textAlign:'center', cursor:'pointer'}}><div className="icon-circle-outline"><Icons.Link /></div><span style={{fontSize: 11}}>Enlazar</span></div>
            </div>

            <div style={{ padding: '0 25px' }}>
              <h4 style={{margin:'0 0 15px'}}>Actividad Reciente</h4>
              {history.map(h => (
                <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <div style={{display:'flex', alignItems:'center'}}><div style={{width:35, height:35, borderRadius:10, background:'#f9f9f9', display:'flex', alignItems:'center', justifyContent:'center', marginRight:12}}><Icons.Send /></div>
                  <div><div style={{fontSize: 13, fontWeight:'600'}}>{h.type}</div><div style={{fontSize:10, color:'#999'}}>{h.cuenta}</div></div></div>
                  <span style={{ fontSize: 14, fontWeight: '700', color: h.amt > 0 ? '#008000' : '#333' }}>{h.amt > 0 ? '+' : ''}{h.amt.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIDA DIARIA (RESTAURADA FUNCIONALIDAD) */}
        {activeTab === "vida" && (
          <div style={{ padding: 25 }}>
            <h2 style={{fontSize: 22, fontWeight:'700'}}>Vida Diaria</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginTop: 20 }}>
              {Object.keys(vidaDiariaData).map(cat => (
                <div key={cat} onClick={() => setActiveCategory(cat)} style={{ background: 'white', padding: 20, borderRadius: 20, textAlign: 'center', border:'1px solid #eee', cursor:'pointer' }}>
                  <div style={{color:'#008000', marginBottom: 10, display:'flex', justifyContent:'center'}}><Icons.Vida /></div>
                  <span style={{fontWeight:'600', fontSize: 13, textTransform:'capitalize'}}>{cat}</span>
                </div>
              ))}
            </div>
            {activeCategory && (
              <div style={{marginTop: 30}}>
                <h4 style={{textTransform:'capitalize', color:'#008000'}}>{activeCategory}</h4>
                {vidaDiariaData[activeCategory].map((item, i) => (
                  <div key={i} style={{padding: '15px 0', borderBottom: '1px solid #eee'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                       <b style={{fontSize:14}}>{item.name}</b>
                       {item.rating && <span style={{fontSize:10, color:'#f39c12'}}>★ {item.rating}</span>}
                    </div>
                    <div style={{fontSize: 11, color: '#888'}}>{item.info}</div>
                    {item.location && <div style={{fontSize: 10, color: '#008000', marginTop: 4}}>📍 {item.location}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AVISOS */}
        {activeTab === "avisos" && (
          <div style={{ padding: 25 }}>
            <h2 style={{fontSize: 22, fontWeight:'700'}}>Notificaciones</h2>
            <div style={{ display:'flex', gap: 10, margin:'20px 0' }}>
              <input className="input-field" style={{marginBottom:0}} placeholder="Añadir nota..." value={newReminder} onChange={(e) => setNewReminder(e.target.value)} />
              <button onClick={() => {if(newReminder){setReminders([{id:Date.now(), text:newReminder}, ...reminders]); setNewReminder("")}}} style={{width: 50, height:50, borderRadius:12, background:'#008000', border:'none', color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}><Icons.Plus /></button>
            </div>
            {reminders.map(r => <div key={r.id} style={{background:'white', padding:15, margin:'10px 0', borderRadius:15, border:'1px solid #eee'}}>• {r.text}</div>)}
          </div>
        )}

        {/* PERFIL (YO) */}
        {activeTab === "perfil" && (
           <div style={{ padding: 25 }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ width: 90, height: 90, background: '#f0f0f0', borderRadius: '50%', margin: '0 auto 15px', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #008000', padding:3 }}>
                  <div style={{width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden'}}>
                    {profilePic ? <img src={profilePic} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="pfp" /> : <Icons.User />}
                  </div>
                  <label style={{position:'absolute', bottom:0, right:0, background:'white', width:30, height:30, borderRadius:'50%', cursor:'pointer', border:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'center'}}><Icons.Camera /> <input type="file" hidden onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))} /></label>
                </div>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} style={{border:'none', textAlign:'center', fontSize:18, fontWeight:'700', width:'100%', background:'transparent'}} />
              </div>
              <div style={{background:'white', borderRadius:20, border:'1px solid #eee', overflow:'hidden'}}>
                <div onClick={() => setSecurityPanel(true)} style={{padding:20, borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', cursor:'pointer'}}><span style={{fontSize:14}}>🛡️ Centro de Seguridad</span><span>〉</span></div>
                <div style={{padding:20, display:'flex', justifyContent:'space-between'}}><span style={{fontSize:14}}>🌍 Idioma</span><select value={lang} onChange={(e)=>setLang(e.target.value)} style={{border:'none', color:'#008000', fontWeight:'700'}}><option>Español</option><option>Français</option></select></div>
              </div>
              <button className="btn-main" style={{marginTop: 30, background:'transparent', color:'red', border:'1px solid red'}} onClick={onLogout}>Cerrar Sesión</button>
           </div>
        )}
      </div>

      {/* NAVBAR */}
      <div style={{ height: 80, background: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', paddingBottom: 10 }}>
        <div onClick={() => {setActiveTab("inicio"); setActiveCategory(null)}} style={{ color: activeTab === "inicio" ? "#008000" : "#bbb", textAlign:'center', cursor:'pointer' }}><Icons.Home /><br/><span style={{fontSize: 10}}>Inicio</span></div>
        <div onClick={() => setActiveTab("vida")} style={{ color: activeTab === "vida" ? "#008000" : "#bbb", textAlign:'center', cursor:'pointer' }}><Icons.Vida /><br/><span style={{fontSize: 10}}>Vida</span></div>
        <div onClick={() => setActiveTab("avisos")} style={{ color: activeTab === "avisos" ? "#008000" : "#bbb", textAlign:'center', cursor:'pointer' }}><Icons.Avisos /><br/><span style={{fontSize: 10}}>Avisos</span></div>
        <div onClick={() => setActiveTab("perfil")} style={{ color: activeTab === "perfil" ? "#008000" : "#bbb", textAlign:'center', cursor:'pointer' }}><Icons.User /><br/><span style={{fontSize: 10}}>Yo</span></div>
      </div>

      {/* MODAL TRANSACCIONES DINÁMICO (RESTAURADO CON INPUTS) */}
      {(activeModal && activeModal !== "LinkBank") && (
        <div className="modal-overlay" style={{zIndex: 3500}}>
          <div style={{ background: 'white', padding: 30, borderRadius: 25, width: '90%' }}>
            <h3 style={{marginTop:0}}>{activeModal}</h3>
            <label style={{fontSize:10, color:'#888'}}>MONTO XAF</label>
            <input type="number" className="input-field" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            
            {activeModal === "Transferir" ? (
              <>
                <label style={{fontSize:10, color:'#888'}}>BENEFICIARIO</label>
                <input type="text" className="input-field" placeholder="Nombre completo" value={targetName} onChange={(e) => setTargetName(e.target.value)} />
                <label style={{fontSize:10, color:'#888'}}>CUENTA DESTINO</label>
                <input type="text" className="input-field" placeholder="Número de cuenta" value={targetAccount} onChange={(e) => setTargetAccount(e.target.value)} />
              </>
            ) : (
              <>
                <label style={{fontSize:10, color:'#888'}}>DESDE / HACIA</label>
                <select className="input-field" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option>Cuenta de Ahorro</option><option>Cuenta Corriente</option>
                </select>
              </>
            )}
            <button className="btn-main" onClick={handleStartTransaction} style={{marginTop: 10}}>Continuar</button>
            <button onClick={() => setActiveModal(null)} style={{ border: 'none', background: 'none', width: '100%', marginTop: 15, color: '#999' }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL LINKBANK */}
      {activeModal === "LinkBank" && (
        <div className="modal-overlay" style={{zIndex: 3500}}>
          <div style={{ background: 'white', padding: 30, borderRadius: 25, width: '90%' }}>
            <h3 style={{marginTop:0}}>Enlazar Banco</h3>
            <select className="input-field" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
              <option value="">Elegir entidad...</option>
              <option value="BANGE">BANGE</option><option value="CCEI">CCEI Bank</option>
            </select>
            <button className="btn-main" onClick={() => setActiveModal(null)} style={{marginTop: 15}}>Vincular</button>
            <button onClick={() => setActiveModal(null)} style={{ border: 'none', background: 'none', width: '100%', marginTop: 15, color: '#999' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}