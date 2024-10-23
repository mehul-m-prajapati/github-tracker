document.getElementById('githubForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = this.username.value;
    const response = await fetch('/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${username}`
    });

    const user = await response.json();
    if(user.name == ''){
        alert("Invalid Username");
        return false;
    }
    document.getElementById('github-user-data').innerHTML = `
        <div class="row col-md-7">
            <div class="col-md-5">User Name: </div>
            <div class="col-md-7">${user.name} </div>
        </div>
        <div class="row col-md-7">
            <div class="col-md-5">Bio: </div>
            <div class="col-md-7">${user.bio} </div>
        </div>
        <div class="row col-md-7">
            <div class="col-md-5">Location: </div>
            <div class="col-md-7">${user.location} </div>
        </div>
        <div class="row col-md-7">
            <div class="col-md-5">Repositories: </div>
            <div class="col-md-7"> <a href="javascript:void(0)" onclick="getUserRepositories()">${user.repos}</a> </div>
        </div>
        `;
    }); 

async function getUserRepositories() {
    var username = document.getElementById('username');
    const response = await fetch(`https://api.github.com/users/${username.value}/repos`);

    if (response.ok) {
        const repositories = await response.json();
        displayRepositories(repositories);
    } else {
        console.error('Unable to fetch repositories: ', response.statusText);
    }
}

function displayRepositories(repositories) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';

    repositories.forEach(repo => {
        repoList.innerHTML += `
            <div class="row">
                <div class="col-md-8">
                    <a href="${repo.html_url}" class="repo-link" target="_blank">${repo.name}</a>
                </div>
                <div class="col-md-4">
                    <span>${repo.stargazers_count} ⭐</span>
                </div>
            </div>`;
    });

}
