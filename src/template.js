function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderPortfolio({ user, repos }) {
  const title = `${user.name || user.login} — Portfolio`;
  const bio = user.bio || 'Developer • Open Source • Builder';

  const repoCards = repos.map(repo => `
    <div class="card">
      <div class="card-top">
        <h3>${escapeHtml(repo.name)}</h3>
        <span>${escapeHtml(repo.language || 'Code')}</span>
      </div>

      <p>
        ${escapeHtml(repo.description || 'No description available yet.')}
      </p>

      <div class="meta">
        <span>⭐ ${repo.stars}</span>
        <span>🍴 ${repo.forks}</span>
      </div>

      <a href="${repo.url}" target="_blank">
        View Project →
      </a>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${escapeHtml(title)}</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:'Inter',sans-serif;
  background:
    radial-gradient(circle at top left,#7c3aed55,transparent 25%),
    radial-gradient(circle at bottom right,#06b6d455,transparent 25%),
    #050816;

  color:white;
  min-height:100vh;
  padding:60px 20px;
}

.container{
  max-width:1200px;
  margin:auto;
}

.hero{
  background:linear-gradient(
    135deg,
    rgba(15,23,42,.95),
    rgba(2,6,23,.95)
  );

  border:1px solid rgba(255,255,255,.08);

  border-radius:36px;

  padding:60px;

  position:relative;

  overflow:hidden;

  box-shadow:
    0 10px 40px rgba(0,0,0,.5),
    0 0 80px rgba(124,58,237,.15);
}

.hero::before{
  content:'';
  position:absolute;
  inset:0;

  background:
    radial-gradient(circle at top right,#7c3aed22,transparent 30%),
    radial-gradient(circle at bottom left,#06b6d422,transparent 30%);

  pointer-events:none;
}

.avatar{
  width:120px;
  height:120px;

  border-radius:50%;

  border:4px solid #7c3aed;

  object-fit:cover;

  margin-bottom:25px;

  box-shadow:
    0 0 30px rgba(124,58,237,.7);
}

.label{
  color:#60a5fa;
  font-size:14px;
  letter-spacing:3px;
  text-transform:uppercase;
  margin-bottom:15px;
  font-weight:700;
}

.hero h1{
  font-size:78px;
  line-height:1;
  margin-bottom:25px;

  font-weight:800;
}

.bio{
  font-size:24px;
  color:#cbd5e1;
  max-width:700px;
  line-height:1.7;
  margin-bottom:35px;
}

.stats{
  display:flex;
  gap:15px;
  flex-wrap:wrap;
  margin-bottom:35px;
}

.stats div{
  padding:14px 22px;

  border-radius:999px;

  border:1px solid rgba(255,255,255,.08);

  background:rgba(255,255,255,.03);

  color:#e2e8f0;

  font-weight:600;
}

.github-btn{
  display:inline-block;

  background:linear-gradient(
    135deg,
    #2563eb,
    #3b82f6
  );

  color:white;

  text-decoration:none;

  padding:16px 28px;

  border-radius:18px;

  font-weight:700;

  transition:.3s;
}

.github-btn:hover{
  transform:translateY(-4px);

  box-shadow:
    0 10px 25px rgba(59,130,246,.4);
}

.section{
  margin-top:70px;
}

.section-label{
  color:#60a5fa;
  text-transform:uppercase;
  letter-spacing:2px;
  font-size:14px;
  font-weight:700;
  margin-bottom:10px;
}

.section h2{
  font-size:54px;
  margin-bottom:35px;
}

.grid{
  display:grid;

  grid-template-columns:
    repeat(auto-fit,minmax(280px,1fr));

  gap:28px;
}

.card{
  background:
    linear-gradient(
      180deg,
      rgba(15,23,42,.95),
      rgba(2,6,23,.95)
    );

  border:1px solid rgba(255,255,255,.08);

  border-radius:28px;

  padding:28px;

  transition:.35s;

  position:relative;

  overflow:hidden;
}

.card::before{
  content:'';

  position:absolute;
  top:-100px;
  right:-100px;

  width:220px;
  height:220px;

  background:radial-gradient(
    circle,
    rgba(124,58,237,.18),
    transparent 70%
  );
}

.card:hover{
  transform:translateY(-10px);

  border-color:#7c3aed;

  box-shadow:
    0 10px 35px rgba(124,58,237,.18);
}

.card-top{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:15px;
  margin-bottom:20px;
}

.card-top h3{
  font-size:30px;
  line-height:1.2;
}

.card-top span{
  background:#facc15;

  color:#111827;

  font-size:13px;

  padding:8px 12px;

  border-radius:999px;

  font-weight:700;

  white-space:nowrap;
}

.card p{
  color:#cbd5e1;
  line-height:1.8;
  font-size:18px;
  margin-bottom:25px;
}

.meta{
  display:flex;
  gap:18px;
  color:#fcd34d;
  margin-bottom:25px;
  font-size:18px;
}

.card a{
  display:inline-block;

  background:linear-gradient(
    135deg,
    #2563eb,
    #3b82f6
  );

  color:white;

  text-decoration:none;

  padding:14px 22px;

  border-radius:16px;

  font-weight:700;

  transition:.3s;
}

.card a:hover{
  transform:translateY(-3px);
}

.footer{
  text-align:center;
  margin-top:90px;
  color:#64748b;
  font-size:15px;
}

@media(max-width:900px){

  .hero{
    padding:40px 30px;
  }

  .hero h1{
    font-size:56px;
  }

  .bio{
    font-size:20px;
  }

  .section h2{
    font-size:42px;
  }
}

@media(max-width:640px){

  body{
    padding:30px 15px;
  }

  .hero{
    padding:30px 22px;
  }

  .hero h1{
    font-size:42px;
  }

  .bio{
    font-size:17px;
  }

  .section h2{
    font-size:34px;
  }

  .card-top h3{
    font-size:24px;
  }
}

</style>

</head>

<body>

<div class="container">

  <section class="hero">

    <img
      class="avatar"
      src="${user.avatar_url}"
      alt="${escapeHtml(user.login)}"
    />

    <div class="label">
      Generated by QassemFolio
    </div>

    <h1>
      ${escapeHtml(user.name || user.login)}
    </h1>

    <p class="bio">
      ${escapeHtml(bio)}
    </p>

    <div class="stats">
      <div>📦 ${user.public_repos} repos</div>
      <div>👥 ${user.followers} followers</div>
      <div>⭐ ${user.following} following</div>
    </div>

    <a
      class="github-btn"
      href="${user.html_url}"
      target="_blank"
    >
      GitHub Profile
    </a>

  </section>

  <section class="section">

    <div class="section-label">
      Selected work
    </div>

    <h2>Projects</h2>

    <div class="grid">
      ${repoCards}
    </div>

  </section>

  <div class="footer">
    Generated with QassemFolio 🚀
  </div>

</div>

</body>
</html>
`;
}
