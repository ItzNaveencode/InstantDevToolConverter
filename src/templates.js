/**
 * DevForge — Project Templates
 * Each template provides a complete, runnable starting project.
 */

export const templates = {
  vanilla: {
    name: 'Vanilla Web',
    emoji: '🌐',
    desc: 'HTML + CSS + JS starter',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1 class="title">Hello, <span class="gradient">DevForge</span> ⚡</h1>
      <p class="subtitle">Start building something amazing</p>
      <button id="counter-btn" class="btn">Clicked <span id="count">0</span> times</button>
    </div>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': {
        language: 'css',
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0f0f1a;
  color: #e2e8f0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.gradient {
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}`
      },
      'script.js': {
        language: 'javascript',
        content: `let count = 0;

const btn = document.getElementById('counter-btn');
const countEl = document.getElementById('count');

btn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
  
  // Add a little animation
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = '', 150);
  
  console.log(\`Button clicked! Count: \${count}\`);
});

console.log('🚀 App initialized');`
      }
    }
  },

  canvas: {
    name: 'Canvas Animation',
    emoji: '🎨',
    desc: 'HTML5 Canvas particle system',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Particle System</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="overlay">
    <h1>Particle System</h1>
    <p>Move your mouse to interact</p>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': {
        language: 'css',
        content: `* { margin: 0; padding: 0; }
body { overflow: hidden; background: #000; }
canvas { display: block; }
.overlay {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  pointer-events: none;
  z-index: 10;
}
.overlay h1 {
  font-family: system-ui;
  font-size: 2.5rem;
  font-weight: 200;
  letter-spacing: 8px;
  text-transform: uppercase;
  opacity: 0.8;
}
.overlay p {
  font-family: system-ui;
  font-size: 0.9rem;
  opacity: 0.4;
  margin-top: 8px;
}`
      },
      'script.js': {
        language: 'javascript',
        content: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3;
    this.life = 1;
    this.hue = Math.random() * 60 + 240;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.01;
    this.size *= 0.99;
  }
  draw() {
    ctx.fillStyle = \`hsla(\${this.hue}, 80%, 60%, \${this.life})\`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(mouse.x, mouse.y));
  }
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0 || particles[i].size <= 0.3) {
      particles.splice(i, 1);
    }
  }
  
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        ctx.strokeStyle = \`rgba(130, 130, 255, \${(1 - dist / 80) * 0.2})\`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; });
animate();
console.log('🎨 Particle system running');`
      }
    }
  },

  todoApp: {
    name: 'Todo App',
    emoji: '✅',
    desc: 'Interactive todo list with local storage',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app">
    <h1>📋 My Todos</h1>
    <form id="todo-form">
      <input id="todo-input" type="text" placeholder="Add a new task..." autofocus>
      <button type="submit">Add</button>
    </form>
    <div id="filters">
      <button class="filter active" data-filter="all">All</button>
      <button class="filter" data-filter="active">Active</button>
      <button class="filter" data-filter="done">Done</button>
    </div>
    <ul id="todo-list"></ul>
    <p id="stats"></p>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': {
        language: 'css',
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 3rem 1rem;
}
.app { width: 100%; max-width: 500px; }
h1 { font-size: 1.8rem; margin-bottom: 1.5rem; text-align: center; }
form { display: flex; gap: 8px; margin-bottom: 1rem; }
input {
  flex: 1; padding: 10px 14px;
  background: #1e293b; border: 1px solid #334155;
  border-radius: 8px; color: #e2e8f0;
  font-size: 14px; outline: none;
}
input:focus { border-color: #6366f1; }
form button {
  padding: 10px 20px; background: #6366f1; color: white;
  border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
}
form button:hover { background: #4f46e5; }
#filters { display: flex; gap: 6px; margin-bottom: 1rem; }
.filter {
  padding: 6px 14px; border-radius: 6px;
  background: #1e293b; color: #94a3b8;
  border: 1px solid #334155; cursor: pointer; font-size: 12px;
}
.filter.active { background: #6366f1; color: white; border-color: #6366f1; }
ul { list-style: none; }
li {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; background: #1e293b;
  border-radius: 8px; margin-bottom: 6px;
  border: 1px solid #334155;
}
li.done span { text-decoration: line-through; opacity: 0.5; }
li input[type="checkbox"] { accent-color: #6366f1; }
li span { flex: 1; font-size: 14px; }
li button {
  background: none; border: none;
  color: #64748b; cursor: pointer; font-size: 16px;
}
li button:hover { color: #ef4444; }
#stats { text-align: center; font-size: 12px; color: #64748b; margin-top: 1rem; }`
      },
      'script.js': {
        language: 'javascript',
        content: `let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const stats = document.getElementById('stats');

function render() {
  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });
  
  list.innerHTML = filtered.map((t, i) => \`
    <li class="\${t.done ? 'done' : ''}" data-id="\${t.id}">
      <input type="checkbox" \${t.done ? 'checked' : ''} onchange="toggle(\${t.id})">
      <span>\${t.text}</span>
      <button onclick="remove(\${t.id})">✕</button>
    </li>
  \`).join('');
  
  const active = todos.filter(t => !t.done).length;
  stats.textContent = \`\${active} remaining · \${todos.length} total\`;
  localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!input.value.trim()) return;
  todos.push({ id: Date.now(), text: input.value.trim(), done: false });
  input.value = '';
  render();
  console.log('Added todo:', todos[todos.length - 1].text);
});

window.toggle = (id) => {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
};

window.remove = (id) => {
  todos = todos.filter(t => t.id !== id);
  render();
};

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    render();
  });
});

render();
console.log('✅ Todo app loaded');`
      }
    }
  },

  api: {
    name: 'API Dashboard',
    emoji: '📡',
    desc: 'Fetch & display live API data',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="dashboard">
    <h1>🌍 API Dashboard</h1>
    <p class="sub">Real-time data from JSONPlaceholder</p>
    <div class="tabs">
      <button class="tab active" onclick="loadSection('users')">Users</button>
      <button class="tab" onclick="loadSection('posts')">Posts</button>
      <button class="tab" onclick="loadSection('todos')">Todos</button>
    </div>
    <div id="content" class="content">
      <div class="loader">Loading...</div>
    </div>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': {
        language: 'css',
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: system-ui; background: #0a0a0f; color: #e2e8f0;
  padding: 2rem;
}
.dashboard { max-width: 800px; margin: 0 auto; }
h1 { font-size: 2rem; margin-bottom: 4px; }
.sub { color: #64748b; margin-bottom: 1.5rem; }
.tabs { display: flex; gap: 8px; margin-bottom: 1.5rem; }
.tab {
  padding: 8px 20px; border-radius: 8px; border: 1px solid #1e293b;
  background: #111827; color: #94a3b8; cursor: pointer; font-size: 13px; font-weight: 500;
}
.tab.active { background: #6366f1; color: white; border-color: #6366f1; }
.content { display: grid; gap: 12px; }
.card {
  background: #111827; border: 1px solid #1e293b; border-radius: 12px;
  padding: 16px 20px; transition: border-color 0.2s;
}
.card:hover { border-color: #6366f1; }
.card h3 { font-size: 14px; margin-bottom: 4px; }
.card p { font-size: 12px; color: #64748b; line-height: 1.5; }
.card .badge {
  display: inline-block; font-size: 10px; padding: 2px 8px;
  border-radius: 4px; margin-top: 6px; font-weight: 600;
}
.badge.green { background: rgba(34,197,94,0.15); color: #22c55e; }
.badge.blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
.loader { text-align: center; padding: 3rem; color: #64748b; }`
      },
      'script.js': {
        language: 'javascript',
        content: `const BASE = 'https://jsonplaceholder.typicode.com';
const content = document.getElementById('content');

async function loadSection(type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  content.innerHTML = '<div class="loader">Loading...</div>';
  
  try {
    const res = await fetch(\`\${BASE}/\${type}?_limit=10\`);
    const data = await res.json();
    console.log(\`Fetched \${data.length} \${type}\`);
    
    if (type === 'users') {
      content.innerHTML = data.map(u => \`
        <div class="card">
          <h3>\${u.name}</h3>
          <p>\${u.email} · \${u.company.name}</p>
          <span class="badge green">Active</span>
        </div>
      \`).join('');
    } else if (type === 'posts') {
      content.innerHTML = data.map(p => \`
        <div class="card">
          <h3>\${p.title}</h3>
          <p>\${p.body.slice(0, 100)}...</p>
          <span class="badge blue">Post #\${p.id}</span>
        </div>
      \`).join('');
    } else {
      content.innerHTML = data.map(t => \`
        <div class="card">
          <h3>\${t.completed ? '✅' : '⬜'} \${t.title}</h3>
          <span class="badge \${t.completed ? 'green' : 'blue'}">\${t.completed ? 'Done' : 'Pending'}</span>
        </div>
      \`).join('');
    }
  } catch (err) {
    content.innerHTML = '<div class="loader">Error loading data</div>';
    console.error('Fetch failed:', err);
  }
}

loadSection('users');`
      }
    }
  },

  blank: {
    name: 'Blank Project',
    emoji: '📄',
    desc: 'Empty HTML file to start from scratch',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello World</h1>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': { language: 'css', content: '/* Write your styles here */\n' },
      'script.js': { language: 'javascript', content: '// Write your code here\nconsole.log("Hello from DevForge!");\n' }
    }
  },

  game: {
    name: 'Snake Game',
    emoji: '🎮',
    desc: 'Classic snake game on canvas',
    files: {
      'index.html': {
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Snake Game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="game-container">
    <div class="hud">
      <span>Score: <strong id="score">0</strong></span>
      <span>Use arrow keys to play</span>
    </div>
    <canvas id="game" width="400" height="400"></canvas>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      'style.css': {
        language: 'css',
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #0a0a0f; display: flex; align-items: center;
  justify-content: center; height: 100vh; font-family: system-ui;
}
.game-container { text-align: center; }
.hud {
  display: flex; justify-content: space-between; color: #94a3b8;
  font-size: 14px; margin-bottom: 12px; padding: 0 4px;
}
.hud strong { color: #6366f1; }
canvas {
  border: 2px solid #1e293b; border-radius: 8px;
  background: #0f172a;
}`
      },
      'script.js': {
        language: 'javascript',
        content: `const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const grid = 20;
const cols = canvas.width / grid;
const rows = canvas.height / grid;

let snake = [{ x: 10, y: 10 }];
let food = spawnFood();
let dir = { x: 1, y: 0 };
let nextDir = { x: 1, y: 0 };
let score = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function update() {
  dir = { ...nextDir };
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  
  // Wrap around
  head.x = (head.x + cols) % cols;
  head.y = (head.y + rows) % rows;
  
  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    snake = [{ x: 10, y: 10 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = score;
    food = spawnFood();
    console.log('Game Over! Restarting...');
    return;
  }
  
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    food = spawnFood();
    console.log('Score:', score);
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Food
  ctx.fillStyle = '#ef4444';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#ef4444';
  ctx.beginPath();
  ctx.arc(food.x * grid + grid/2, food.y * grid + grid/2, grid/2 - 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Snake
  snake.forEach((s, i) => {
    const t = i / snake.length;
    ctx.fillStyle = \`hsl(\${240 + t * 60}, 80%, \${65 - t * 20}%)\`;
    ctx.beginPath();
    ctx.roundRect(s.x * grid + 1, s.y * grid + 1, grid - 2, grid - 2, 4);
    ctx.fill();
  });
}

function gameLoop() {
  update();
  draw();
}

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp':    if (dir.y !== 1)  nextDir = { x: 0, y: -1 }; break;
    case 'ArrowDown':  if (dir.y !== -1) nextDir = { x: 0, y: 1 };  break;
    case 'ArrowLeft':  if (dir.x !== 1)  nextDir = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (dir.x !== -1) nextDir = { x: 1, y: 0 };  break;
  }
  e.preventDefault();
});

setInterval(gameLoop, 120);
console.log('🎮 Snake game started! Use arrow keys.');`
      }
    }
  }
}
