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

//need to be adjusted for other products: ex: if the same image, adjust quantity, otherwise add to storage
const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const image = document.getElementById("product-image").src;
  const quantity = Number(document.getElementById("quantity").innerHTML);
  const title = 'Fall Limited Edition Sneakers';
  const totalPrice = 125.00 * quantity;
  const id = cart ? cart.length : 0
  const data = {title, image, quantity, totalPrice, id}

  if (quantity === 0) return;

  if (!localStorage.getItem("cart") || JSON.parse(localStorage.getItem("cart").length === 0)) {
    localStorage.setItem("cart", JSON.stringify([{title, image, quantity, totalPrice, id}]))
    renderCart()
    getCount()
    openCart()
  }

  else {
    cart.push(data)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    getCount()
    openCart()
  }
}

const toggleCart = () => {
  const cart = document.getElementById("cart-display")
  const avatar = document.getElementById("avatar")
  const count = document.getElementById("count")

  if (cart.classList.contains("close")) {
    cart.classList.remove("close")
    cart.classList.add("open")

    count.classList.remove("close")
    count.classList.add("open")

    avatar.classList.add("avatar-active")
  }
 
  else {
    cart.classList.remove("open")
    cart.classList.add("close")

    count.classList.remove("open")
    count.classList.add("close")
    avatar.classList.remove("avatar-active")
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

const setCurrentImage = (image) => {
  let currentImage = document.getElementById("product-image");
  currentImage.src = image;
}
