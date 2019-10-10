async function showGithubData() {
  try {
    const res1 = await fetch("/users.json");
    const users = await res1.json();
    const res2 = await fetch(
      `https://api.github.com/users/${users[0].username}`
    );
    const githubData = await res2.json();
    const img = new Image();
    img.src = githubData.avatar_url;
    document.body.append(img);
    return githubData;
  } catch (err) {
    document.getElementById("content").innerHTML = err;
  }
}

showGithubData().then(gitData => {
  console.log(gitData);
  console.log("Demo finished.");
});
