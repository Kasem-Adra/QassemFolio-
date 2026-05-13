export async function fetchGitHubProfile(username) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'qassemfolio-cli'
  };

  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) {
    throw new Error(`GitHub user not found or API error: ${userRes.status}`);
  }
  const user = await userRes.json();

  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers });
  if (!repoRes.ok) {
    throw new Error(`Could not fetch repositories: ${repoRes.status}`);
  }
  const repos = await repoRes.json();

  const cleanRepos = repos
    .filter(repo => !repo.fork)
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 8)
    .map(repo => ({
      name: repo.name,
      description: repo.description || 'No description yet.',
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language || 'Code',
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }));

  return { user, repos: cleanRepos };
}
