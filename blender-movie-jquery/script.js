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
const playPauseBtn = document.querySelector(".circle");
const movieVideo = document.querySelector(".video-container");
movieVideo.src = movie.videoUrl;
document.querySelector(".video-container").load();
const movieTitle = document.querySelector(".movie-title");
const movieDescription = document.querySelector(".movie-description");
const postersContainer = document.querySelector(".posters");
movieTitle.textContent = movie.title;
movieDescription.textContent = movie.description;
const playIcon = playPauseBtn.querySelector("i");

//movies event listeners
let controlsActivated = false;
playPauseBtn.addEventListener("click", () => {
  if (movieVideo.paused) {
    movieVideo.play();
  } else {
    movieVideo.controls = false;
  }
});
movieVideo.addEventListener("play", () => {
  movieVideo.controls = true;
  playPauseBtn.style.visibility = "hidden";
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
});

movieVideo.addEventListener("pause", () => {
  playPauseBtn.style.visibility = "visible";
  movieVideo.controls = false;
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
});

movieVideo.addEventListener("seeking", () => {
  movieVideo.play();
  movieVideo.controls = true;
});
movieVideo.addEventListener("seeked", () => {
  movieVideo.play();
});

movieVideo.addEventListener("ended", () => {
  playPauseBtn.style.visibility = "visible";
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
});

// displaying the movie, comments and posters
const commentFragment = document.createDocumentFragment();
comments.forEach((comment) => {
  const article = createElement("article", {
    className: "comment",
  });
  const figure = createElement("figure", {
    className: "comment-profile",
  });
  const img = createElement("img", {
    attributes: {
      src: comment.image,
      alt: comment.name,
    },
  });
  const span = createElement("span");
  const name = createElement("p", {
    className: "comment-name",
    textContent: comment.name,
  });
  const description = createElement("p", {
    className: "comment-description",
    textContent: comment.comment,
  });
  figure.appendChild(img);
  span.append(name, description);
  article.append(figure, span);

  commentFragment.appendChild(article);
});
commentsContainer.appendChild(commentFragment);

const postersFragments = document.createDocumentFragment();
posters.forEach((poster) => {
  const figure = createElement("figure", {
    className: "poster-container",
  });
  const img = createElement("img", {
    attributes: {
      src: poster.imageUrl,
      alt: poster.title,
    },
  });
  figure.appendChild(img);
  postersFragments.appendChild(figure);
});
postersContainer.appendChild(postersFragments);

//helper function for creating elements
function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.textContent) element.textContent = options.textContent;
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) =>
      element.setAttribute(key, value),
    );
  }
  return element;
}
