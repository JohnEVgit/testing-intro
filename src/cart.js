function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Колькасць тавару павінна быць больш за 0");
  }
  if (quantity > product.stock) {
    throw new RangeError("Колькасць тавару не павинна перавышаць колькасць на складзе");
  }

  const productInCart = cart.find(elem => elem.id === product.id);

  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.push({...product, quantity});
  }

  return cart;
}

function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Колькасць тавару павінна быць больш за 0");
  }

  const productInCart = cart.find(elem => elem.id === id);

  if (productInCart) {
    if (quantity > productInCart.stock) {
      throw new RangeError("Колькасць тавару не павинна перавышаць колькасць на складзе");
    }

    productInCart.quantity = quantity;
  }

  return cart;
}

function removeFromCart(cart, id) {
  const productInCartIndex = cart.findIndex(elem => elem.id === id);

  if (productInCartIndex >= 0) {
    cart.splice(productInCartIndex, 1);
  }

  return cart;
}

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, current) => acc + current.quantity * current.price, 0);
}

function calculateOrderTotal(cart, promocode) {
  const subtotal = calculateCartSubtotal(cart);
  const PROMOCODE_NAME = 'SAVE10';
  let discount = 0;
  let delivery = 0;

  if (PROMOCODE_NAME === promocode && subtotal >= 20000) {
    discount = subtotal * 0.1
  }

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {subtotal, discount, delivery, total};
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
