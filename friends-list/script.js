const wrapper = document.querySelector(".wrapper");
//fetching data from the friends.json
async function fetchFriendLists() {
  try {
    const response = await fetch("./data/friends.json");
    const data = await response.json();
    const fragment = document.createDocumentFragment();
    data.forEach((friend) => {
      const card = document.createElement("article");
      card.classList.add("card");
      card.innerHTML = `
        <figure class="profile">
        <img src="${friend.img}" alt="${friend.first_name}" />
        </figure>
        <section>
        <p class="name">${friend.first_name} ${friend.last_name}</p>
        <p class="email">${friend.email}</p>
        </section>
        `;
      fragment.appendChild(card);
    });
    wrapper.appendChild(fragment);
  } catch (err) {
    const p = document.querySelector(".fallback-text");
    p.classList.toggle("hide");
    console.log("Something went wrong: " + err);
  }
}
//function calling
fetchFriendLists();
