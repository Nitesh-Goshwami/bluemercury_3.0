async function check(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  var res = await fetch("https://bluemercuryclone.herokuapp.com/users/login", {
    // Adding method type
    method: "POST",

    // Adding body or content to send
    body: JSON.stringify({
      email,
      password,
    }),

    // Adding headers to request
    headers: {
      "Content-type": "application/json",
    },
  });

  var current_user = await res.json();

  if (res.status === 402) {
    alert("Invalid Credentials");
  } else if (res.status === 201) {
    localStorage.setItem("current_user", JSON.stringify(current_user));
    window.location.href = "myaccount.html";
  } else if (res.status === 401) {
    alert("User does not exist, please signup first");
    window.location.href = "signup.html";
  }
}

function checkUserAlreadyLogin() {
  let user = localStorage.getItem("current_user");

  if (user !== null) {
    console.log("User is already logged in, please logout first");
    window.location.href = "myaccount.html";
  }
}

checkUserAlreadyLogin();