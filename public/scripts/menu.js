let hamMenu = document.querySelector('.menu-button')
let closeButton = document.querySelector('.close-button')
let hamItems = document.querySelector('.side-bar')

hamMenu.addEventListener('click', function(e) {
  e.preventDefault()
  hamItems.classList.toggle('active') 
})

closeButton.addEventListener('click', function() {
  hamItems.classList.toggle('active')
})