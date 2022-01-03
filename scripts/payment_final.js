let currentUser = JSON.parse(localStorage.getItem('current_user'));

async function showCart() {
  currentUser = await fetch(
    `https://bluemercuryclone.herokuapp.com/users/${currentUser._id}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  let cart = currentUser.cart.cart_items
  for (let i = 0; i < cart.length; i++) {
    appendProducts(cart[i]);
  }
}

showCart();

function appendProducts(el) {
  let prod_div = document.getElementById("Prod_row_1");
  prod_div.style.display = "flex";
  prod_div.style.flexDirection = "column";

  let singleProdDiv = document.createElement("div");
  singleProdDiv.style.display = "flex";
  singleProdDiv.style.margin = "10px";
  // singleProdDiv.style.border = '1px solid black';
  singleProdDiv.style.alignItems = "center";

  let prod_img = document.createElement("img");
  prod_img.src = el.img;
  prod_img.style.width = "20%";

  let prod_desc = document.createElement("div");
  prod_desc.append(el.title);
  prod_desc.style.width = "60%";
  prod_desc.style.textAlign = "left";
  prod_desc.style.padding = "10px";
  prod_desc.style.textTransform = "capitalize";

  let item_total = document.createElement("div");
  item_total.style.width = "20%";
  item_total.style.textAlign = "right";
  item_total.style.padding = "10px";
  item_total.style.fontWeight = "900";

  let item_total_calculation = el.item_count * el.price;
  item_total.append(`$${item_total_calculation}`);

  singleProdDiv.append(prod_img, prod_desc, item_total);
  prod_div.append(singleProdDiv);

}

function updatePayment() {
  var payment_amt = document.getElementById("total_amount");
  payment_amt.innerHTML = `$${currentUser.cart.total_price + 5}`;

  var subtotal = document.getElementById("total_price");
  subtotal.innerHTML = `$${currentUser.cart.total_price}`;
}

updatePayment();

let apply = document.getElementById("apply_btn");
apply.addEventListener("click", function () {
  var promocode = document.getElementById("promocode_text2").value;
  var payment_amt = document.getElementById("total_amount");
  var pay = document.createElement("span");

  if (promocode == "" || promocode != "masai30") {
    subtotal.innerHTML = `$${final_total}`;
    pay.append(final_total);
    payment_amt.innerHTML = `$${final_total + 5}`;
  }
  if (promocode == "masai30") {
    var new_total = final_total - final_total * 0.3;
    subtotal.innerHTML = ` $${new_total}`;
    pay.append(new_total);
    payment_amt.innerHTML = `$${new_total + 5}`;
  }
});

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}


async function updateUserAllData(currentUser) {
  let { _id, order_history, cart } = currentUser;

  fetch(
    `https://bluemercuryclone.herokuapp.com/users/order/${currentUser._id}`,
    {
      method: "PUT",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        id: _id,
        orderData: order_history,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("current_user", JSON.stringify(...res));
      window.location.href = "thankyou.html";
      return res;
    })
    .catch((err) => console.error(err));

  // localStorage.removeItem("current_selected_prod");
}

async function validatePayment(e) {
  e.preventDefault();

  let currentUser = JSON.parse(localStorage.getItem("current_user"));

  try {
    currentUser = await fetch(
      `https://bluemercuryclone.herokuapp.com/users/${currentUser._id}`
    );
    currentUser = await currentUser.json();
  } catch (error) {
    console.log(error);
  } finally {
      let newId = create_UUID();
      currentUser.order_history.push({ order: currentUser.cart, order_date: Date.now(), order_id: newId })
      updateUserAllData(currentUser);
  }
}