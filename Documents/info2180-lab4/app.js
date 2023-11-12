document.querySelector("button").addEventListener("click", function () {
  const input = document.querySelector("input").value;
  const query = encodeURIComponent(input);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const superheroes = JSON.parse(xhr.responseText);
        displayResults(superheroes);
      } else {
        console.error(`Request failed with status ${xhr.status}`);
      }
    }
  };

  xhr.open("GET", `superheroes.php?query=${query}`, true);
  xhr.send();
});

function displayResults(superheroes) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div>
      <h2>RESULTS</h2>
      <hr>
    </div>
  `;

  if (superheroes.length === 0) {
    appendErrorMessage("SUPERHERO NOT FOUND");
  } else if (superheroes.length === 1) {
    appendSingleSuperhero(superheroes[0]);
  } else {
    appendSuperheroList(superheroes);
  }

  function appendErrorMessage(message) {
    const messageDiv = createDiv(`<p class="not-found-msg">${message}</p>`);
    resultDiv.appendChild(messageDiv);
  }

  function appendSingleSuperhero(superhero) {
    const singleSuperheroDiv = createDiv(`
      <div>
        <h3>${superhero.alias}</h3>
        <h4>${superhero.name}</h4>
        <p>${superhero.biography}</p>
      </div>
    `);
    resultDiv.appendChild(singleSuperheroDiv);
  }

  function appendSuperheroList(superheroes) {
    const list = document.createElement("ul");
    superheroes.forEach((superhero) => {
      const listItem = document.createElement("li");
      listItem.textContent = superhero.name;
      list.appendChild(listItem);
    });
    resultDiv.appendChild(list);
  }

  function createDiv(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div;
  }
}
