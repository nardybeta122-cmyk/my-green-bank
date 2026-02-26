import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

export default function App() {
  const [view, setView] = useState("login");
  const [balance, setBalance] = useState(125000);
  const [history, setHistory] = useState([]);

  const handleTransaction = (record) => {
    if (record.clearHistory) {
      setHistory([]);
    } else {
      setBalance(prev => prev + record.amt);
      setHistory(prev => [record, ...prev]);
    }
  };

  return (
    <div className="mobile-layout">
      {view === "login" && <Login onNavigate={() => setView("register")} onLogin={() => setView("home")} />}
      {view === "register" && <Register onNavigate={() => setView("login")} onLogin={() => setView("home")} />}
      {view === "home" && (
        <Home 
          balance={balance} 
          history={history} 
          onLogout={() => setView("login")} 
          onTransactionComplete={handleTransaction} 
        />
      )}
    </div>
  );
}