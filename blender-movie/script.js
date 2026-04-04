// to fetch the posters
const fetchPosters = async () => {
  try {
    const response = await fetch("./data/posters.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error message:", err);
  }
};

// to fetch the movie and its comments
const fetchMovie = async () => {
  try {
    const response = await fetch("./data/video.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error message:", err);
  }
};
const posters = await fetchPosters();
const movie = await fetchMovie();
const comments = movie.comments;

// DOM selections
const commentsContainer = document.querySelector(".comments");
const movieVideo = document.querySelector(".video-container source");
movieVideo.src = movie.videoUrl;
document.querySelector(".video-container").load();
const movieTitle = document.querySelector(".movie-title");
const movieDescription = document.querySelector(".movie-description");
const postersContainer = document.querySelector(".posters");
movieTitle.textContent = movie.title;
movieDescription.textContent = movie.description;

// displaying the movie, comments and posters
const commentFragment = document.createDocumentFragment();
comments.forEach((comment) => {
  const article = document.createElement("article");
  article.className = "comment";
  const figure = document.createElement("figure");
  figure.className = "comment-profile";
  const img = document.createElement("img");
  img.src = comment.image;
  img.alt = comment.name;
  figure.appendChild(img);
  const span = document.createElement("span");
  const name = document.createElement("p");
  name.className = "comment-name";
  name.textContent = comment.name;
  const description = document.createElement("p");
  description.className = "comment-description";
  description.textContent = comment.comment;
  span.appendChild(name);
  span.appendChild(description);
  article.appendChild(figure);
  article.appendChild(span);
  commentFragment.appendChild(article);
});
commentsContainer.appendChild(commentFragment);

const postersFragments = document.createDocumentFragment();
posters.forEach((poster) => {
  const figure = document.createElement("figure");
  figure.className = "poster-container";
  const img = document.createElement("img");
  img.src = poster.imageUrl;
  img.alt = poster.title;
  figure.appendChild(img);
  postersFragments.appendChild(figure);
});
postersContainer.append(postersFragments);
