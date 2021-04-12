let addToy = false;
const form = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector('div#toy-collection')


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


  toyCollection.append(outerDiv)
}




form.addEventListener('submit', event => {
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


toyCollection.addEventListener('click', event => {
  if (event.target.className === 'like-btn') likeToy(event.target)
  event.preventDefault()
})

function likeToy(toyElement) {
  // console.log(toyElement.closest('div.card'))
  const cardDiv = toyElement.closest('div.card')
  const likesPTag = cardDiv.querySelector('div.card p')
  let currLikes = parseInt(likesPTag.textContent)
  // likesPTag.textContent = `${currLikes + 1} Likes`
  // console.log(currLikes)

  fetch(`http://localhost:3000/toys/${cardDiv.dataset.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: currLikes + 1
    })
  })
    .then(resp => resp.json())
    .then(data => {
      likesPTag.textContent = `${data.likes} Likes`
    })
}



renderAllToys()

