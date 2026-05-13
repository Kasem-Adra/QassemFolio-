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
      <div class="card-header">
        <h3>${escapeHtml(repo.name)}</h3>
        <span>${escapeHtml(repo.language || 'Code')}</span>
      </div>

      <p>${escapeHtml(repo.description || 'No description available.')}</p>

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

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#050816;
  color:white;
  font-family:Inter,sans-serif;
  padding:60px 20px;
  background-image:
    radial-gradient(circle at top left,#7c3aed33,transparent 25%),
    radial-gradient(circle at bottom right,#06b6d433,transparent 25%);
}

.container{
  max-width:1200px;
  margin:auto;
}

.hero{
  text-align:center;
  margin-bottom:70px;
}

.avatar{
  width:140px;
  height:140px;
  border-radius:50%;
  border:4px solid #7c3aed;
  margin-bottom:20px;
  box-shadow:0 0 30px #7c3aed88;
}

h1{
  font-size:56px;
  margin-bottom:10px;
}

.bio{
  color:#94a3b8;
  font-size:18px;
  max-width:700px;
  margin:auto;
  line-height:1.7;
}

.stats{
  margin-top:30px;
  display:flex;
  justify-content:center;
  gap:20px;
  flex-wrap:wrap;
}

.stats div{
  background:#0f172a;
  padding:14px 24px;
  border-radius:16px;
  border:1px solid #1e293b;
}

.projects-title{
  margin-bottom:30px;
  font-size:34px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:25px;
}

.card{
  background:#0f172a;
  border:1px solid #1e293b;
  border-radius:24px;
  padding:25px;
  transition:.3s;
}

.card:hover{
  transform:translateY(-8px);
  border-color:#7c3aed;
  box-shadow:0 10px 30px #7c3aed22;
}

.card-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:15px;
}

.card-header h3{
  font-size:22px;
}

.card-header span{
  background:#7c3aed22;
  color:#c4b5fd;
  padding:6px 12px;
  border-radius:999px;
  font-size:13px;
}

.card p{
  color:#94a3b8;
  line-height:1.7;
  margin-bottom:20px;
}

.meta{
  display:flex;
  gap:15px;
  margin-bottom:20px;
  color:#cbd5e1;
}

.card a{
  color:#22d3ee;
  text-decoration:none;
  font-weight:bold;
}

.card a:hover{
  color:#67e8f9;
}

.footer{
  text-align:center;
  margin-top:80px;
  color:#64748b;
}

@media(max-width:768px){
  h1{
    font-size:38px;
  }

  .bio{
    font-size:16px;
  }
}
</style>
</head>

<body>

<div class="container">

  <section class="hero">
    <img class="avatar" src="${user.avatar_url}" />

    <h1>${escapeHtml(user.name || user.login)}</h1>

    <p class="bio">
      ${escapeHtml(bio)}
    </p>

    <div class="stats">
      <div>📦 ${user.public_repos} Repositories</div>
      <div>👥 ${user.followers} Followers</div>
      <div>⭐ Open Source</div>
    </div>
  </section>

  <section>
    <h2 class="projects-title">Featured Projects</h2>

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
