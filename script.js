let articles = [];

// Load articles from JSON
fetch("articles.json")
  .then(res => res.json())
  .then(data => {
    articles = data;
    updateList();
  })
  .catch(() => alert("Failed to load articles"));

// Navigation
function goToPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "list") updateList();
}

// Render article list
function updateList(filter = "") {
  const list = document.getElementById("articleList");
  list.innerHTML = "";

  articles
    .filter(a => a.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((a, i) => {
      const li = document.createElement("li");
      li.textContent = a.title;
      li.onclick = () => openArticle(i);
      list.appendChild(li);
    });
}

// Open article
function openArticle(index) {
  const article = articles[index];
  document.getElementById("articleTitle").innerText = article.title;
  const contentArea = document.getElementById("articleContent");
  contentArea.innerHTML = "";

  article.sections.forEach(sec => {
    const h2 = document.createElement("h2");
    h2.textContent = sec.heading;
    h2.classList.add("collapsible");

    const wrapper = document.createElement("div");
    wrapper.className = "content";
    wrapper.style.display = "none";

    sec.content.split("\n").forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      wrapper.appendChild(p);
    });

    h2.onclick = () => wrapper.style.display = wrapper.style.display === "block" ? "none" : "block";

    contentArea.appendChild(h2);
    contentArea.appendChild(wrapper);
  });

  goToPage("article");
}

// Search input
document.getElementById("searchInput").addEventListener("input", function() {
  updateList(this.value);
});