function showGithubData() {
    return fetch('/users.json')
        .then(res => res.json())
        .then(users => fetch(`https://api.github.com/users/${users[0].username}`))
        .then(res => {
            if(res.status >= 400) {
                throw `Error: ${res.statusText}`;
            }
            return res.json();
        }).then(githubData => {
            const img = new Image();
            img.src = githubData.avatar_url;
            document.body.append(img);
            return githubData;
        }).catch(err => {
            document.getElementById('content').innerHTML = err;
        });
}

showGithubData().then(gitData => {
    console.log(gitData);
    console.log('Demo finished.');
});