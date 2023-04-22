const renderCart = () => {
  let cartContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart"))
  cartContainer.innerHTML = '';

  if ( localStorage.getItem("cart") && cart.length ) {
    for (const item of cart) {
      const { title, image, quantity, totalPrice, id } = item;
      cartContainer.innerHTML += (
        `<div class='items'>
          <img class='cart-image' src=${image} alt='cart-image'>
          <div id='cart-info'>
            ${title} 
            <div id='cart-price'> 
              $125.00 x ${quantity} <span id='total-price'>$${totalPrice}.00</span>
            </div>
          </div>
         <img class='trash-image' onclick="removeFromCart(${id})" src='./images/icon-delete.svg'>
        </div>`) 
    }

    cartContainer.innerHTML += ("<div id='cart-button'>Checkout</div>")

    localStorage.setItem("cart", JSON.stringify(cart))
  }

  else {
    cartContainer.innerHTML = 'Your cart is empty.'
  }
}

const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const image = document.getElementById("product-image").src;
  const quantity = Number(document.getElementById("quantity").innerHTML);
  const title = 'Fall Limited Edition Sneakers';
  const totalPrice = 125.00 * quantity;
  const id = cart ? cart.length : 0
  if (quantity === 0) return;

  localStorage.setItem("cart", JSON.stringify([{title, image, quantity, totalPrice, id}]))
  renderCart()
  getCount()
  openCart() 
}

const toggleCart = () => {
  const cart = document.getElementById("cart-display")
  const count = document.getElementById("count")

  if (cart.classList.contains("close")) {
    cart.classList.remove("close")
    cart.classList.add("open")

    count.classList.remove("close")
    count.classList.add("open")
  }
 
  else {
    cart.classList.remove("open")
    cart.classList.add("close")

    count.classList.remove("open")
    count.classList.add("close")
  }
}

const openCart = () => {
  const cart = document.getElementById("cart-display")
  const count = document.getElementById("count")

  if (cart.classList.contains("close")) {
    cart.classList.remove("close")
    count.classList.remove("close")
  }

  cart.classList.add("open")
  count.classList.add("open")
}

const increaseQuantity = () => {
  const quantity = document.getElementById("quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
}

const decreaseQuantity = () => {
  const quantity = document.getElementById("quantity");
  if (Number(quantity.innerHTML) === 0) return;
  quantity.innerHTML = Number(quantity.innerHTML) - 1
}

const removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"))
  cart = cart.filter(item => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(cart))
  renderCart()
  getCount()
  openCart()
}

const getCount = () => {
  const countContainer = document.getElementById("count")
  let count = 0;
  let cart = JSON.parse(localStorage.getItem("cart"))
  console.log(cart)
  if (JSON.parse(localStorage.getItem("cart").length)) {
    for (const item of cart ) {
      const { quantity } = item;
      console.log(quantity)
      count += Number(quantity);
    }
  }
  countContainer.innerHTML = count;
}

const toggleLightbox = () => {
  const lightbox = document.getElementById("lightbox")
  lightbox.style["display"]= "flex";
  lightbox.style["align-items"]= "center";
  lightbox.style["justify-content"]= "center";
}

const closeLightbox = () => {
  const lightbox = document.getElementById("lightbox")
  lightbox.style["display"] = 'none';
}

const setCurrentImage = (image, newThumbnail) => {
  let currentImage = document.getElementById("product-image");
  currentImage.src = image;
  console.log(document.getElementsByClassName("selected")[0])
  const prevThumbnail = document.getElementsByClassName('selected')[1]
  prevThumbnail.classList.remove("selected")
  newThumbnail.classList.add("selected");
}

const setLightboxImage = (image, newThumbnail) => {
  let currentImage = document.getElementById("lightbox-image");
  currentImage.src = image;
  console.log(document.getElementsByClassName("selected")[0])
  const prevThumbnail = document.getElementsByClassName('selected')[0]
  prevThumbnail.classList.remove("selected")
  newThumbnail.classList.add("selected");
}


const changeLightboxImage = (trigger) => {
  const lightboxImage = document.getElementById("lightbox-image")
  const images = [{src: "/images/image-product-1.jpg", id: 1}, {src: "/images/image-product-2.jpg", id: 2}, {src: "/images/image-product-3.jpg", id:3}, {src:"/images/image-product-4.jpg", id:4}]
  let index = -1
  let thumbnailId = 0;
  for (let i = 0; i < images.length; i++) {
    const { src, id} = images[i]
    if ((lightboxImage.src).includes(src)) {
      index = i;
      thumbnailId = id;
      break;
    }
  }

  if (trigger === 'prev') {
    if (index === 0) return;
      const newSrc = images[index - 1].src
      const newImage = `.${newSrc}`
      lightboxImage.src = newImage;

      const prevThumbnail = document.getElementsByClassName('selected')[0]
      prevThumbnail.classList.remove("selected")

      const newThumbnail = document.getElementById(`thumb${thumbnailId - 1}`)
      newThumbnail.classList.add("selected")
  }

  else {
    if (index === images.length - 1) return;
    console.log(document.getElementsByClassName("selected"))
    const newSrc = images[index + 1].src
    const newImage = `.${newSrc}`
    lightboxImage.src = newImage;

    const prevThumbnail = document.getElementsByClassName('selected')[0]
    prevThumbnail.classList.remove("selected")

    const newThumbnail = document.getElementById(`thumb${thumbnailId + 1}`)
    newThumbnail.classList.add("selected")
  }
}

const toggleAvatar = () => {
  avatar = document.getElementById("avatar")
  if (avatar.classList.contains("avatar-active")) {
    avatar.classList.remove("avatar-active");
  }

  else {
    avatar.classList.add("avatar-active");
  }
}