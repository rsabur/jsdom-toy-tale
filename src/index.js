let addToy = false;

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
    image: event.target.url.value,
    likes: 0


  }

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(newToyObj)
  })
    .then(resp => resp.json())
    .then(newToyObj => {
      renderOneToy(newToyObj)
    })
  form.reset()
})





renderAllToys()

// id, name, img, likes