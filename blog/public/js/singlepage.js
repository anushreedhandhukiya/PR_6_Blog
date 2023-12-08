const like = document.getElementById("like");
like.addEventListener("click", () => {
  let url = window.location.href.split("/");
  let id = url[url.length - 1];
  fetch(`/blog/like/${id}`),
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
    .then(() => {
      let count = document.getElementById("count").innerHTML;
      document.getElementById("count").innerHTML = Number(count) + 1;
    });
});