// Showing product Grids
function showItems(l) {
  let items = l;
  let items_div = document.getElementById("items");

  items_div.innerHTML = null;

  items.forEach(function (el) {
    let div = document.createElement("div");
    let p_name = document.createElement("p");
    p_name.innerText = el.name;

    let span_title = document.createElement("span");
    span_title.innerText = el.title;

    let p_price = document.createElement("p");
    p_price.innerHTML = `$${el.price}`;

    let img = document.createElement("img");
    img.src = el.img;

    let wish = document.createElement("p");
    wish.innerHTML = "<i class='far fa-heart'></i>";
    wish.setAttribute("id", "wish-btn");
    wish.style.width = "22px";
    wish.style.height = "21px";
    wish.style.float = "left";
    wish.style.marginBottom = "0px";

    p_name.setAttribute(
      "style",
      " font-family: Montserrat Medium,sans-serif; font-weight: 400;letter-spacing: .2px;line-height: 24px;text-transform: uppercase;color: #12284c;font-size: 14px;"
    );
    span_title.setAttribute(
      "style",
      " font-family: Montserrat Light,sans-serif; font-weight: 300;letter-spacing: .18px;line-height: 20px;color: #12284c;font-size: 14px; text-transform: capitalize;"
    );
    p_price.setAttribute(
      "style",
      " font-family: Montserrat Light,sans-serif; font-weight: 400;line-height: 1.65;color: #12284c;font-size: 14px;"
    );

    img.style.width = "80%";
    img.style.height = "80%"

    img.addEventListener("click", function () {
      addtoVisited(el);
    });
    
    var i = 0;
    function switchArrayColor() {
      if (i % 2 == 0) {
        wish.innerHTML = "<i class='fas fa-heart'></i>";
        if (localStorage.getItem("wishlist") == null) {
          let wishlistArr = [];
          localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
        }
        let temp = JSON.parse(localStorage.getItem("wishlist"));
        temp.push(el);
        localStorage.setItem("wishlist", JSON.stringify(temp));
      } else {
        wish.innerHTML = "<i class='far fa-heart'></i>";
        let temp = JSON.parse(localStorage.getItem("wishlist"));
        temp.forEach((element, index, temp) => {
          if (element.prod_id_num == el.prod_id_num) {
            temp.splice(index, 1);
          }
        });
        localStorage.setItem("wishlist", JSON.stringify(temp));
      }
      i++;
    }
    wish.addEventListener("click", switchArrayColor);

    div.append(wish, img, p_name, span_title, p_price);
    items_div.append(div);
  });
}


// <-------------------------------Fetching the data from online database -------------------------->
async function getData() {
  try {
    let res = await fetch("http://localhost:3000/products/");
    let data = await res.json();
    localStorage.setItem("items", JSON.stringify(data));
    showItems(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
getData();


/***************************
Filtering
****************************/
// default filteredArr in localstorage
localStorage.setItem("filteredArr", JSON.stringify([]));

// Filter By Brands
async function filterBrand() {
  var modelCbs = document.querySelectorAll(".models input[type='checkbox']");
  var filters = {
    models: getClassOfCheckedCheckboxes(modelCbs),
  };

  let res = await fetch("http://localhost:3000/products/");
  let items = await res.json();

  let filterArr = [];

  for (let i = 0; i < items.length; i++) {
    filters.models.forEach((el) => {
      let itemNameArr = items[i].name.split(" ");
      if (el == itemNameArr[0]) {
        filterArr.push(items[i])
        return true;
      }
    });
  }

  localStorage.setItem("filteredArr", JSON.stringify(filterArr));

  if (filterArr != null && filterArr.length != 0) {
    showItems(filterArr);
  } else {
    showItems(items);
  }

  myFunction();
}

// Filter by priceBracket

async function filterPrice() {
  var modelCbs = document.querySelectorAll(".priceBracket input[type='checkbox']");
  var filters = {
    models: getClassOfCheckedCheckboxes(modelCbs),
  };

  let res = await fetch("http://localhost:3000/products/");
  let items = await res.json();
  let filterArr = []; //JSON.parse(localStorage.getItem('filteredArr'));

  for (let i = 0; i < items.length; i++) {
    
    filters.models.forEach((el) => {
      switch (el) {
        case "price1":
          if (items[i].price >= 0 && items[i].price <= 500) {
            filterArr.push(items[i]);
            break;
          }
        case "price2":
          if (items[i].price > 500 && items[i].price <= 1000) {
            filterArr.push(items[i]);
            break;
          }
        case "price3":
          if (items[i].price >= 1000 && items[i].price <= 1500) {
            filterArr.push(items[i]);
            break;
          }
        case "price4":
          if (items[i].price <= 1500 && items[i].price <= 2000) {
            filterArr.push(items[i]);
            break;
          }
        case "price5":
          if (items[i].price <= 2000) {
            filterArr.push(items[i]);
            break;
          }
        default: break;
      }
    });
  }
  localStorage.setItem("filteredArr", JSON.stringify(filterArr));

  if (filterArr != null && filterArr.length != 0) {
    showItems(filterArr);
  } else {
    showItems(items);
  }

  myFunction();
}

// Filter By Option / Availability
async function checkOption() {
  var modelCbs = document.querySelectorAll(".availability input[type='checkbox']");
  var filters = {
    models: getClassOfCheckedCheckboxes(modelCbs),
  };

  //let items = JSON.parse(localStorage.getItem('items'));

  let res = await fetch("http://localhost:3000/products/");
  let items = await res.json();
  let filterArr = []//JSON.parse(localStorage.getItem('filteredArr'));

  for (let i = 0; i < items.length; i++) {
    filters.models.forEach((el) => {
      let itemNameArr = items[i].category;
      if (el == itemNameArr) {
        filterArr.push(items[i])
        return true;
      }
    });
  }
  localStorage.setItem("filteredArr", JSON.stringify(filterArr));

  if (filterArr != null && filterArr.length != 0) {
    showItems(filterArr);
  } else {
    showItems(items);
  }

  myFunction();
}

async function showCategory() {
  var modelCbs = document.querySelectorAll(".category input[type='checkbox']");
  var filters = {
    models: getClassOfCheckedCheckboxes(modelCbs),
  };

  //let items = JSON.parse(localStorage.getItem('items'));

  let res = await fetch("http://localhost:3000/products/");
  let items = await res.json();

  let filterArr = []//JSON.parse(localStorage.getItem('filteredArr'));

  for (let i = 0; i < items.length; i++) {
    filters.models.forEach((el) => {
      let itemNameArr = items[i].option;
      if (el == itemNameArr) {
        filterArr.push(items[i])
        return true;
      }
    });
  }
  localStorage.setItem("filteredArr", JSON.stringify(filterArr));

  if (filterArr != null && filterArr.length != 0) {
    showItems(filterArr);
  } else {
    showItems(items);
  }

  myFunction();
}

function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = [];

  if (checkboxes && checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i];
      if (cb.checked) {
        classes.push(cb.getAttribute("name"));
      }
    }
  }
  return classes;
}

// Sorting Functions for Low to high and High to low
async function sortLH() {
  let res = await fetch("http://localhost:3000/products/");
  let data = await res.json();

  let filterArr = JSON.parse(localStorage.getItem("filteredArr"));

  if (filterArr != null && filterArr.length != 0) {
    filterArr = filterArr.sort((a, b) => {
      return a.price - b.price;
    });
    showItems(filterArr);
  } else {
    data = data.sort(function (a, b) {
      return a.price - b.price;
    });
    showItems(data);
  }
}

async function sortHL() {
  let res = await fetch("http://localhost:3000/products/");
  let data = await res.json();
  let filterArr = JSON.parse(localStorage.getItem("filteredArr"));

  if (filterArr != null && filterArr.length != 0) {
    filterArr = filterArr.sort((a, b) => {
      return b.price - a.price;
    });
    showItems(filterArr);
  } else {
    data = data.sort(function (a, b) {
      return b.price - a.price;
    });
    showItems(data);
  }
}



// Feature and sorting seletive function

function myFunction() {
  var x = document.getElementById("mySelect").value;
  if (x == "Price, Low to High") {
    sortLH();
  } else if (x == "Price, High to Low") {
    sortHL();
  }
}

let dropDown_type = document.getElementById("dropdown_type");

dropDown_type.addEventListener("click", function () {
  document.getElementById("myDropdown_type").classList.toggle("show");
});

let dropDown_brand = document.getElementById("dropdown_brand");

dropDown_brand.addEventListener("click", function () {
  document.getElementById("myDropdown_brand").classList.toggle("show");
});

let dropdown_shopby = document.getElementById("dropdown_shopby");

dropdown_shopby.addEventListener("click", function () {
  document.getElementById("myDropdown_shopby").classList.toggle("show");
});

let dropdown_price = document.getElementById("dropdown_price");

dropdown_price.addEventListener("click", function () {
  document.getElementById("myDropdown_price").classList.toggle("show");
});


function addtoVisited(obj) {
  console.log("Obj: ", obj);
  let singleProdArr = [];
  singleProdArr.push(obj);

  localStorage.setItem('current_selected_prod', JSON.stringify(singleProdArr));
  window.location.href = "product.html";
}