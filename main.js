const USERS_API = "https://ajax.test-danit.com/api/json/users";
const POSTS_API = "https://ajax.test-danit.com/api/json/posts";

class Card {
  constructor(postId, userId, name, email, title, body) {
    this.postId = postId;
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.title = title;
    this.body = body;
  }
  render() {
    const card = document.createElement("div");
    card.id = `${this.postId}`;
    card.classList.add("card");
    card.innerHTML = `
    <h2 class="userName">${this.name} <span class="userEmail">${this.email}</span></h2>
    <h3 class="userTitle">${this.title}</h3>
    <p class = "userText">${this.body}</p>
    <div >
    <button class="cardBtn" onclick="deleteCard(${this.postId})">Delete</button>
    </div>
        `;
    return card;
  }
}

function deleteCard(postId) {
  fetch(`${POSTS_API}/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById(`${postId}`).remove();
      } else {
        console.waen(`Failed to delete card with postId: ${postId}`);
      }
    })
    .catch((err) => console.warn(err));
}

fetch(`${USERS_API}`)
  .then((response) => response.json())
  .then((users) => {
    fetch(`${POSTS_API}`)
      .then((response) => response.json())
      .then((posts) => {
        const cardsWrapper = document.querySelector(".container");
        posts.forEach((post) => {
          const user = users.find((user) => user.id === post.userId);
          const card = new Card(
            post.id,
            user.id,
            user.name,
            user.email,
            post.title,
            post.body
          );
          cardsWrapper.append(card.render());
        });
      })
      .catch((err) => console.warn(err));
  })
  .catch((err) => console.warn(err));
