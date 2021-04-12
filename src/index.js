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

  // outerDiv.html = `
  // <div class = `
  const collectionDiv = document.querySelector('div#toy-collection')
  collectionDiv.append(outerDiv)
}


// id, name, img, likes