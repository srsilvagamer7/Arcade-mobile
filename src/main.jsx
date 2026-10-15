import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Gamepad2, Heart, Menu, X, Smartphone, MonitorPlay, Sparkles, Play, ArrowLeft, ExternalLink, Info } from 'lucide-react';
import './styles.css';

const games = [
  { id: 1, title: 'Pixel Adventure', platform: 'HTML5', category: 'Plataforma', color: 'sunset', icon: '🧙', description: 'Uma aventura de plataforma em pixel art.', type: 'demo' },
  { id: 2, title: 'Neon Racer', platform: 'HTML5', category: 'Corrida', color: 'blue', icon: '🏎️', description: 'Desvie dos obstáculos e tente bater seu recorde.', type: 'demo' },
  { id: 3, title: 'Space Defender', platform: 'HTML5', category: 'Arcade', color: 'purple', icon: '👾', description: 'Defenda a galáxia neste mini jogo arcade.', type: 'demo' },
  { id: 4, title: 'Puzzle Blocks', platform: 'HTML5', category: 'Puzzle', color: 'green', icon: '🧩', description: 'Um desafio casual para jogar na tela do celular.', type: 'demo' },
  { id: 5, title: 'Retro Tennis', platform: 'HTML5', category: 'Esportes', color: 'pink', icon: '🎾', description: 'Um jogo de esporte com visual retrô.', type: 'demo' },
  { id: 6, title: 'Classic Quest', platform: 'Emulador web', category: 'Aventura', color: 'gold', icon: '🗺️', description: 'Espaço preparado para carregar um jogo compatível e legalmente disponibilizado.', type: 'placeholder' },
  { id: 7, title: 'Dungeon Pixel', platform: 'HTML5', category: 'Aventura', color: 'red', icon: '🛡️', description: 'Explore masmorras e descubra tesouros.', type: 'demo' },
  { id: 8, title: 'Mega Jump', platform: 'HTML5', category: 'Plataforma', color: 'teal', icon: '🚀', description: 'Salte cada vez mais alto e sobreviva.', type: 'demo' }
];
const categories = ['Todos', 'Arcade', 'Plataforma', 'Corrida', 'Puzzle', 'Aventura', 'Esportes'];

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [active, setActive] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [view, setView] = useState('home');

  const filtered = useMemo(() => games.filter(g =>
    (category === 'Todos' || g.category === category) &&
    g.title.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  const toggleFavorite = (id) => setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const launch = (game) => { setActive(game); setView('game'); window.scrollTo({top:0, behavior:'smooth'}); };
  const back = () => { setActive(null); setView('home'); };

  return <div className="app">
    <header className="topbar">
      <button className="mobile-menu icon-btn" aria-label="Abrir menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <button className="brand" onClick={back} aria-label="Página inicial"><span className="brand-mark"><Gamepad2 size={24}/></span><span>ARCADE<span className="brand-accent">MOBILE</span></span></button>
      <nav className={mobileMenu ? 'nav open' : 'nav'}>
        <button className={view === 'home' ? 'nav-link selected' : 'nav-link'} onClick={() => {back();setMobileMenu(false)}}>Início</button>
        <button className="nav-link" onClick={() => {setCategory('Todos');setView('home');setActive(null);setMobileMenu(false)}}>Jogos</button>
        <button className="nav-link" onClick={() => {setQuery('');setCategory('Todos');setView('home');setActive(null);setMobileMenu(false);document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'})}}>Categorias</button>
        <button className="nav-link" onClick={() => {setView('favorites');setActive(null);setMobileMenu(false)}}>Favoritos <span className="fav-count">{favorites.length}</span></button>
      </nav>
      <div className="header-right"><span className="status-dot"></span><span className="status-text">JOGUE NO NAVEGADOR</span></div>
    </header>

    {view === 'game' && active ? <main className="game-page">
      <button className="back-btn" onClick={back}><ArrowLeft size={18}/> Voltar à biblioteca</button>
      <div className="game-heading"><div><p className="eyebrow">AGORA JOGANDO</p><h1>{active.title}</h1><p className="muted">{active.description}</p></div><button className={'favorite-btn ' + (favorites.includes(active.id) ? 'is-fav' : '')} onClick={() => toggleFavorite(active.id)}><Heart size={18} fill={favorites.includes(active.id) ? 'currentColor' : 'none'}/></button></div>
      <GameStage game={active}/>
      <div className="notice"><Info size={18}/><p>Este projeto inclui uma área demonstrativa. Para adicionar jogos completos, use arquivos HTML5 próprios ou jogos com licença e permissão de distribuição. Emuladores web podem exigir configuração adicional e arquivos de jogos fornecidos legalmente pelo usuário.</p></div>
    </main> : view === 'favorites' ? <main className="catalog-page">
      <div className="section-title"><div><p className="eyebrow">SUA COLEÇÃO</p><h1>Jogos favoritos</h1></div></div>
      {favorites.length ? <div className="game-grid">{games.filter(g=>favorites.includes(g.id)).map(g=><GameCard key={g.id} game={g} launch={launch} favorite={true} toggleFavorite={toggleFavorite}/>)}</div> : <div className="empty"><Heart size={34}/><h2>Nenhum favorito ainda</h2><p>Toque no coração de um jogo para guardá-lo aqui.</p><button className="primary-btn" onClick={back}>Explorar jogos</button></div>}
    </main> : <>
      <main>
        <section className="hero">
          <div className="hero-copy"><div className="hero-pill"><Sparkles size={14}/> SUA ARCADE DE BOLSO</div><h1>Seus jogos.<br/><span>Em qualquer lugar.</span></h1><p>Uma coleção de jogos retrô e experiências de navegador, feita para funcionar melhor no celular Android.</p><div className="hero-actions"><button className="primary-btn" onClick={() => document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'})}><Play size={17} fill="currentColor"/> Explorar jogos</button><span className="hero-note"><Smartphone size={17}/> Sem instalar um app</span></div><div className="hero-stats"><div><strong>08</strong><span>JOGOS DE EXEMPLO</span></div><div><strong>100%</strong><span>FOCO NO CELULAR</span></div><div><strong>∞</strong><span>DIVERSÃO</span></div></div></div>
          <div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="floating-chip chip-top">RETRO GAMING</div><div className="console"><div className="console-screen"><div className="screen-stars">✦　·　✧</div><div className="pixel-sun"></div><div className="pixel-mountain"></div><div className="screen-label">PRESS START</div></div><div className="console-controls"><div className="dpad"><i></i><b></b></div><div className="console-buttons"><i>A</i><i>B</i></div></div></div><div className="floating-chip chip-bottom"><span className="live-dot"></span> PRONTO PARA JOGAR</div></div>
        </section>
        <section className="feature-strip"><div><Gamepad2/><span><b>Jogos de navegador</b><small>Abra e jogue com facilidade</small></span></div><div><Smartphone/><span><b>Feito para Android</b><small>Layout que se adapta à tela</small></span></div><div><MonitorPlay/><span><b>Modo tela ampla</b><small>Para jogos compatíveis</small></span></div></section>
        <section className="catalog-section" id="catalogo"><div className="section-title"><div><p className="eyebrow">ESCOLHA SUA PRÓXIMA FASE</p><h2>Biblioteca de jogos <span className="title-count">{filtered.length}</span></h2></div><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar jogo..." aria-label="Buscar jogo"/></div></div>
          <div className="category-row">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'category active':'category'}>{c}</button>)}</div>
          {filtered.length ? <div className="game-grid">{filtered.map(g=><GameCard key={g.id} game={g} launch={launch} favorite={favorites.includes(g.id)} toggleFavorite={toggleFavorite}/>)}</div> : <div className="empty"><Search/><h3>Nenhum jogo encontrado</h3><p>Tente outra busca ou categoria.</p></div>}
        </section>
      </main>
    </>}
    <footer><div className="footer-brand"><Gamepad2 size={20}/> ARCADE<span>MOBILE</span></div><p>Projeto independente de jogos para navegador. Não afiliado ao Wasmarcade.</p><p className="copyright">© 2026 Arcade Mobile · Use apenas jogos que você tem autorização para distribuir.</p></footer>
  </div>;
}

function GameCard({game, launch, favorite, toggleFavorite}) {
  return <article className="game-card"><button className={'cover cover-' + game.color} onClick={() => launch(game)} aria-label={'Abrir '+game.title}><span className="cover-glow"></span><span className="cover-icon">{game.icon}</span><span className="cover-platform">{game.platform}</span><span className="cover-play"><Play size={19} fill="currentColor"/></span><span className="cover-grid"></span></button><div className="game-info"><div className="game-meta"><span>{game.category}</span><button className={'heart-btn '+(favorite?'is-fav':'')} aria-label="Adicionar aos favoritos" onClick={()=>toggleFavorite(game.id)}><Heart size={17} fill={favorite?'currentColor':'none'}/></button></div><h3>{game.title}</h3><p>{game.description}</p><button className="play-link" onClick={()=>launch(game)}>Jogar agora <ExternalLink size={14}/></button></div></article>;
}

function GameStage({game}) {
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [lane, setLane] = useState(1);
  if (game.type === 'placeholder') return <div className="stage placeholder-stage"><div className="placeholder-icon">🕹️</div><h2>Espaço para emulador web</h2><p>Este slot está pronto para integrar um emulador compatível. Ele ainda não carrega ROMs nem inclui jogos protegidos.</p><div className="stage-tags"><span>HTML5</span><span>WebAssembly</span><span>Controles touch</span></div></div>;
  return <div className="stage"><div className="stage-top"><span><i className="live-dot"></i> DEMO JOGÁVEL</span><span>PONTOS: {score.toString().padStart(3,'0')}</span></div><div className={'mini-game mini-'+game.color}><div className="mini-sky"><span className="mini-star s1">✦</span><span className="mini-star s2">✧</span><span className="mini-star s3">·</span><div className="mini-moon"></div><div className="mini-hills"></div><div className="mini-ground"></div>{started ? <><div className="mini-player" style={{left:`${20+lane*25}%`}}>{game.icon}</div><div className="collectible">✦</div></> : <div className="start-overlay"><div className="start-emoji">{game.icon}</div><h2>{game.title}</h2><p>Toque em iniciar para jogar</p><button className="primary-btn" onClick={()=>{setStarted(true);setScore(0)}}><Play size={16} fill="currentColor"/> Iniciar jogo</button></div>}</div></div><div className="touch-controls"><button onClick={()=>{setLane(Math.max(0,lane-1));setScore(s=>s+10)}} aria-label="Mover para esquerda">◀</button><span>CONTROLES DE TOQUE</span><button onClick={()=>{setLane(Math.min(2,lane+1));setScore(s=>s+10)}} aria-label="Mover para direita">▶</button><button className="action-control" onClick={()=>setScore(s=>s+25)} aria-label="Ação">A</button></div><p className="demo-caption">Demonstração de interface interativa — substitua por um jogo completo para publicação.</p></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
