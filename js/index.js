
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchQuery = searchInput.value.trim();
  
  if (searchQuery === '') {
    return;
  }
  
  fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';
      data.items.forEach(user => {
        const username = user.login;
        const avatarUrl = user.avatar_url;
        const profileUrl = user.html_url;
        const userDiv = document.createElement('div');
        const avatarImg = document.createElement('img');
        const usernameLink = document.createElement('a');
        avatarImg.src = avatarUrl;
        avatarImg.alt = `${username}'s avatar`;
        usernameLink.href = profileUrl;
        usernameLink.textContent = username;

        userDiv.appendChild(avatarImg);
        userDiv.appendChild(usernameLink);
        resultsContainer.appendChild(userDiv);
        userDiv.addEventListener('click', function () {
          getUserRepos(username);
        });
      });
    })
    .catch(error => {
      console.log('Error:', error);

    });
});
function getUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';

      data.forEach(repo => {
        const repoName = repo.name;
        const repoUrl = repo.html_url;

        const repoLink = document.createElement('a');
        repoLink.href = repoUrl;
        repoLink.textContent = repoName;

        resultsContainer.appendChild(repoLink);
      });
    })
    .catch(error => {
      console.log('Error:', error);

    });
}
