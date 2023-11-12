document
  .getElementsByTagName("button")[0]
  .addEventListener("click", function () {
    fetch("superheroes.php")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });
