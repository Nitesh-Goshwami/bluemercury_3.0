//   Add to bag

// Counting products
var count = 1;
let cart_btn = document.querySelector("#add_to_bag");
let remove_count = document.getElementById("remove_count");
let add_count = document.getElementById("add_count");
let product_count = document.getElementById("product_count");

var current_prod = JSON.parse(localStorage.getItem("current_selected_prod"));


// Image changing
let img_1 = document.getElementById("img_1");
let img_2 = document.getElementById("img_2");
let main_img = document.getElementById("main_img");

// let current``

img_1.addEventListener("click", function () {
  main_img.src = current_prod.img;
});

img_2.addEventListener("click", function () {
  main_img.src =
    "https://cdn.shopify.com/s/files/1/0283/0185/2747/products/global_images-3606000578579-2_525x525.jpg?v=1623217977";
});

cart_btn.addEventListener("click", async function () {
  if (count != 0) {
    current_prod.item_count = count;

    let currentUser = JSON.parse(localStorage.getItem("current_user"));

    // Before updating new product, fetching the latest user details
    await fetch(`http://localhost:3001/users/${currentUser._id}`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("current_user", JSON.stringify(res));
        currentUser = res; // updating currentUser details
        updateCart();
        return res;
      })
      .catch((err) => console.error(err));
      
    function updateCart() {
      let flag = 0;
      let totalItems = 0;
      let totalPrice = 0;

      if (currentUser.cart.total_items === 0) {
        currentUser.cart.total_items = current_prod.item_count;
        currentUser.cart.total_price = current_prod.price * current_prod.item_count;
        currentUser.cart.cart_items.push(current_prod);
      }

      for (let i = 0; i < currentUser.cart.cart_items.length; i++) {
        if (currentUser.cart.cart_items[i].prod_id_num == current_prod.prod_id_num) {
          currentUser.cart.cart_items[i].item_count = current_prod.item_count;
          flag = 1;
        }
        totalItems += currentUser.cart.cart_items[i].item_count;
        totalPrice +=
          currentUser.cart.cart_items[i].item_count *
          currentUser.cart.cart_items[i].price;
      }

      
      if (flag === 0) {
        currentUser.cart.cart_items.push(current_prod);
      }

      currentUser.cart.total_items = totalItems;
      currentUser.cart.total_price = totalPrice;
      
      console.log("currentUser", currentUser);
      
      fetch(`http://localhost:3001/users/cart/${currentUser._id}`, {
        method: "PUT",

        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          cart_items: currentUser.cart.cart_items,
          total_price: currentUser.cart.total_price,
          total_items: currentUser.cart.total_items,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("current_user", JSON.stringify(...res));
          return res;
        })
        .catch((err) => console.error(err));
    }
  }
});

remove_count.addEventListener("click", function () {
  count = count - 1;

  if (count <= 0) {
    cart_btn.setAttribute("style", "opacity: 0.5 ; cursor: not-allowed");
  } else {
    cart_btn.removeAttribute("style");
  }

  if (count < 0) {
    product_count.innerHTML = 0;
    count = count + 1;
  } else {
    product_count.innerHTML = count;
  }
});

add_count.addEventListener("click", function () {
  count = count + 1;

  if (count < 0) {
    product_count.innerHTML = 0;
  } else {
    cart_btn.removeAttribute("style");
    product_count.innerHTML = count;
  }
});
// var current_prod = JSON.parse(localStorage.getItem("current_selected_prod"));


document.title = `${current_prod.name} ${current_prod.title}`;

document.getElementById("img_1").src = current_prod.img;
document.getElementById("main_img").src = current_prod.img;
document
  .getElementById("main_img")
  .setAttribute("style", "width: 400px !important;");

var title_name = document.getElementById("prod-company-name");
title_name.innerHTML = current_prod.name;
title_name.setAttribute("style", "text-transform: capitalize");

var add_price = document.getElementById("dynamic-price");
add_price.innerHTML = "$" + current_prod.price;

var add_title = document.getElementById("prod-title-name");
add_title.innerHTML = current_prod.title;
add_title.setAttribute("style", "text-transform: capitalize");

var page_navigator = document.getElementById("page_navigator-span");
page_navigator.innerHTML = current_prod.title;
page_navigator.setAttribute("style", "text-transform: capitalize;");

cart_btn.append(current_prod.price);
