const wrapper = document.querySelector(".wrapper");
//fetching data from the friends.json
fetch("./data/friends.json")
  .then((response) => response.json())
  .then((data) => {
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
      wrapper.appendChild(card);
    });
  })
  .catch((e) => {
    const p = document.createElement("p");
    p.innerHTML = "No friends list is found.";
    wrapper.appendChild(p);
    console.error("Error in fetching friends-list", e);
  });
