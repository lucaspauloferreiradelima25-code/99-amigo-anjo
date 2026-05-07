import { useState, useEffect } from 'react';
function App() {
  const [motoristas, setMotoristas] = useState(() => {
    const salvo = localStorage.getItem('gestao_99_anjo');
    return salvo ? JSON.parse(salvo) : [];
  });

  const [hashtagsEnviadas, setHashtagsEnviadas] = useState(() => {
    const salvo = localStorage.getItem('count_hashtag');
    return salvo ? parseInt(salvo) : 0;
  });

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('gestao_99_anjo', JSON.stringify(motoristas));
    localStorage.setItem('count_hashtag', hashtagsEnviadas.toString());
  }, [motoristas, hashtagsEnviadas]);

  const cadastrar = (e) => {
    e.preventDefault();
    if (motoristas.length >= 100) return alert("Limite de 100 pessoas atingido!");
    if (!nome || !telefone || !email) return alert("Preencha Nome, Zap e E-mail!");
    setMotoristas([...motoristas, { id: Date.now(), nome, telefone, email }]);
    setNome(''); setTelefone(''); setEmail('');
  };

  const statusBonus = hashtagsEnviadas >= 6;

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '15px', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#ffda00', padding: '20px', borderRadius: '15px', marginBottom: '20px', color: '#000', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={30} />
          <h2 style={{ margin: 0, fontSize: '18px' }}>PAINEL AMIGO ANJO</h2>
        </div>
        <strong>LUCAS PAULO</strong>
      </header>

      {/* CONTROLE DE BÔNUS POR HASHTAG */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '15px', marginBottom: '20px', border: statusBonus ? '2px solid #00c853' : '2px solid #ff4444' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#ffda00' }}>META HASHTAG (6x SEMANA)</h3>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ flex: 1, height: '10px', borderRadius: '5px', backgroundColor: i <= hashtagsEnviadas ? '#ffda00' : '#333' }}></div>
          ))}
        </div>
        <button onClick={() => hashtagsEnviadas < 6 && setHashtagsEnviadas(hashtagsEnviadas + 1)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#ffda00', fontWeight: 'bold', cursor: 'pointer' }}>
          {statusBonus ? "BÔNUS GARANTIDO! ✅" : "CONFIRMAR ENVIO HOJE"}
        </button>
        <button onClick={() => setHashtagsEnviadas(0)} style={{ width: '100%', background: 'none', color: '#444', border: 'none', fontSize: '11px', marginTop: '10px', cursor: 'pointer' }}>Reiniciar Semana</button>
      </section>

      {/* FORMULÁRIO DE GESTÃO */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#ffda00' }}>CADASTRAR ({motoristas.length}/100)</h3>
        <form onSubmit={cadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }} />
          <input type="text" placeholder="Zap" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }} />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }} />
          <button type="submit" style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#fff', fontWeight: 'bold' }}>SALVAR MOTORISTA</button>
        </form>
      </section>

      {/* LISTA DE MOTORISTAS */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '15px' }}>
        {motoristas.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{m.nome}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>{m.telefone} | {m.email}</div>
            </div>
            <button onClick={() => setMotoristas(motoristas.filter(x => x.id !== m.id))} style={{ background: 'none', border: 'none', color: '#ff4444' }}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;