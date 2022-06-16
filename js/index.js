const init = () => {
  let form = document.getElementById("github-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = document.querySelector("input#search");
    fetch(`https://api.github.com/users/${search.value}`)
      .then((res) => res.json())
      .then((data) => {
        const user = document.querySelector("#user-list");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const id = document.createElement("h2");
        const htmlUrl = document.createElement("a");

        console.log(data);
        htmlUrl.href = data["html_url"];
        htmlUrl.textContent = "this is my link";
        id.textContent = data.id;
        name.textContent = data.login;
        img.src = data["avatar_url"];

        name.addEventListener("click", (e) => {
          const user = e.target.textContent;
          fetch(`https://api.github.com/users/${user}/repos`)
            .then((res) => res.json())
            .then((data) => {
              const list = document.querySelector("#repos-list");

              data.forEach((repos) => {
                const repoUrl = document.createElement("a");
                const li = document.createElement("li");
                repoUrl.href = repos["html_url"];
                repoUrl.textContent = repos.name;

                li.append(repoUrl);
                list.append(li);
              });
            });
        });

        // appends variables to DOM
        user.append(name);
        user.append(htmlUrl);
        user.append(id);
        user.append(img);
      });
  });
};

// Event listener -- loads everything on page render
document.addEventListener("DOMContentLoaded", init);
