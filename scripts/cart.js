function account_id() {
  window.location.href = "signup.html";
}

/******************Adding products to bag here *****************/

let current_prod_cart_space = document.getElementById("cart_Bag");

function cart_display(el) {
  console.log("We are here in function ", el);
  var new_div = document.createElement("div");
  new_div.style.display = "flex";
  new_div.style.alignItems = "center";
  new_div.style.width = "100%";

  var img_with_description = document.createElement("div");
  //   img_with_description.style.backgroundColor = 'yellow';
  img_with_description.setAttribute(
    "style",
    "display: flex; align-items: center; width: 50%; cursor: pointer; text-transform: capitalize;"
  );
  img_with_description.addEventListener("mouseover", (event) => {
    event.target.style.fontWeight = "600";
  });

  img_with_description.addEventListener("mouseout", (event) => {
    event.target.style.fontWeight = "normal";
  });

  // img_with_description.style.float = 'left';
  var img = document.createElement("img");
  img.src = el.img;
  img.setAttribute(
    "style",
    "width: 100px; height: 100px; object-fit: scale-down"
  );

  var desc = document.createElement("span");
  desc.append(el.title);
  desc.style.margin = "5px";
  desc.style.fontSize = "16px";
  desc.style.fontWeight = "300";

  img_with_description.append(img, desc);

  var price_div = document.createElement("div");
  price_div.append(`$${el.price}`);
  price_div.style.width = "20%";
  price_div.style.textAlign = "center";
  price_div.style.fontSize = "16px";
  // price_div.style.backgroundColor = 'teal';

  var total_items_div = document.createElement("div");
  total_items_div.append(el.item_count);
  total_items_div.style.width = "15%";
  total_items_div.style.textAlign = "center";
  total_items_div.style.fontSize = "16px";
  // total_items_div.style.backgroundColor = 'pink'

  var total_disp = document.createElement("div");
  var total = el.price * el.item_count;
  total_disp.innerHTML = `$${total}`;
  // console.log(total);
  total_disp.style.width = "15%";
  total_disp.style.textAlign = "right";
  // total_disp.style.backgroundColor = 'skyblue';
  total_disp.style.fontSize = "16px";

  new_div.append(img_with_description, price_div, total_items_div, total_disp);
  new_div.style.borderBottom = "1px solid #dcdcdc";
  current_prod_cart_space.append(new_div);
}


const getUserData = async () => {
  let currentUser = JSON.parse(localStorage.getItem("current_user"));
  currentUser = await fetch(`http://localhost:3001/users/${currentUser._id}`)
    .then(res => res.json())
    .then(res => updateUser(res, currentUser))
    .catch((res) => console.error(res));
}

getUserData();
  
function updateUser(res, currentUser) {
  currentUser = res;
  localStorage.setItem('current_user', JSON.stringify(currentUser));
  console.log(currentUser.cart.cart_items.length)
  if (currentUser.cart.cart_items.length > 0) {
    console.log("currentUser", currentUser);
    current_prod_cart_space.innerText = null;
    updateBagArea(currentUser.cart);
    updateTotals(currentUser.cart);
  } else {
    current_prod_cart_space.innerHTML = ` <img src="https://lh3.googleusercontent.com/proxy/a50hSSO0ZxND9u-7h5UbkZlGAb68woEwhDLt0Djg1ZPi5WsHaKJgKeiSTVkRSJXKf3SsV2YDZ9MVqFENWeSLYbA" style="width: 300px; margin: 50px; box-sizing: border-box;" alt="Empty Cart"/>`;
  }
}

function updateBagArea(cart) {
  for (let i = 0; i < cart.cart_items.length; i++) {
    cart_display(cart.cart_items[i]);
  }
}

function updateTotals(cart) {
  console.log("efwef", cart)
  let total_bill = cart.total_price;
  let total_cart_items = cart.total_items;

  console.log(total_cart_items, total_bill);

  if (total_bill < 150) {
    document.getElementById("shipping_calculate").innerHTML = `<p>You are ${150 - total_bill
      } away from Free Ground Shipping!</p>`;
  } else {
    document.getElementById(
      "shipping_calculate"
    ).innerHTML = `<p>Your Order Qualifies For Free Ground Shipping!</p>`;
  }

  var a = document.getElementsByClassName("your_Cart")[0];
  if (total_cart_items <= 1) {
    a.innerHTML = `Your Cart (${total_cart_items} item)`;
  } else {
    a.innerHTML = `Your Cart (${total_cart_items} items)`;
  }

  document.getElementById("cart_total").innerHTML = `Subtotal $${total_bill}`;
}

// called via html
function checkLogin() {
  let currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (currentUser == null || currentUser.length == 0) {
    alert("Please sign in before purchase");
    window.location.href = "login.html";
  } else {
    let bag = currentUser.cart.cart_items;
    if (bag == null || bag.length == 0) {
      alert("Please add products in cart");
      window.location.href = "new.html";
    } else {
      window.location.href = "customer_info.html";
    }
  }
}
