const fetchPosters = async () => {
  try {
    const response = await fetch("./data/posters.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error message:", err);
  }
};
const fetchVideo = async () => {
  try {
    const response = await fetch("./data/video.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error message:", err);
  }
};
const posters = await fetchPosters();
const movie = await fetchVideo();
const comments = movie.comments;
console.log(comments);

const commentsContainer = document.querySelector(".comments");
const movieVideo = document.querySelector(".video-container source");
movieVideo.src = movie.videoUrl;
document.querySelector(".video-container").load();
const movieTitle = document.querySelector(".movie-title");
const movieDescription = document.querySelector(".movie-description");
const postersContainer = document.querySelector(".posters");
movieTitle.textContent = movie.title;
movieDescription.textContent = movie.description;

const commentFragment = document.createDocumentFragment();
comments.forEach((comment) => {
  commentsContainer.insertAdjacentHTML(
    "beforeend",
    `
      <article class="comment">
        <figure class="comment-profile">
          <img src="${comment.image}" alt="${comment.name}" />
        </figure>
        <span>
          <p class="comment-name">${comment.name}</p>
          <p class="comment-description">
            ${comment.comment}
          </p>
        </span>
      </article>
      `,
  );
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
