let addToy = false;
const form = document.querySelector("body > div.container > form")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderAllToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysArr => {
      toysArr.forEach(toyObj => {
        renderOneToy(toyObj)
      })
    })
}

function renderOneToy(toyObj) {
  const outerDiv = document.createElement('div')
  // console.log(outerDiv)
  outerDiv.classList.add('card')
  outerDiv.dataset.id = toyObj.id

  outerDiv.innerHTML = `
  
  <h2>${toyObj.name}</h2>
  <img src=${toyObj.image} class="toy-avatar" />
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>
`

  const collectionDiv = document.querySelector('div#toy-collection')
  collectionDiv.append(outerDiv)
}




form.addEventListener('submit', function (event) {
  event.preventDefault()

  const newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify(newToyObj)
  })
    .then(resp => resp.json())
    .then(newToyObj => {
      renderOneToy(newToyObj)
    })
  form.reset()
})

const collectionUl = document.querySelector('div#toy-collection')
collectionUl.addEventListener('click', event => {
  event.target.matches('.like-btn')
    console.log("clicked")
    const cardDiv = event.target.closest('div.card')
    const likesPTag = cardDiv.querySelector('div.card p')
    const currLikes = parseInt(likesPTag.textContent)

    fetch(`http://localhost:3000/toys/${cardDiv.dataset.id}`), {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": currLikes + 1
      })
      .then(resp => resp.json())
      .then(data => {
        likesPTag.textContent = `${data.likes} Likes`
      })
    }
})



renderAllToys()

// id, name, img, likes