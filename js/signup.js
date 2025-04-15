var inputAddName = document.querySelector("#registerName");
var inputAddEmail = document.querySelector("#registerEmail");
var inputAddPassword = document.querySelector("#registerPassword");
var btnSignUp = document.querySelector("#signUp");
var messageValidation = document.querySelector(".textToValidation");

var users;

if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

inputAddName.addEventListener("input", function () {
  inputValidation(inputAddName);
});
inputAddEmail.addEventListener("input", function () {
  inputValidation(inputAddEmail);
});
inputAddPassword.addEventListener("input", function () {
  inputValidation(inputAddPassword);
});

btnSignUp.addEventListener("click", function () {
  if (
    inputValidation(inputAddName) &&
    inputValidation(inputAddEmail) &&
    inputValidation(inputAddPassword)
  ) {
    signUp();
    messageValidation.classList.remove("d-none");
    messageValidation.classList.add("d-block");
    messageValidation.style.color = "#28a745";
    messageValidation.innerHTML = "Success";

    window.location.href = "login.html";
  } else {
    messageValidation.classList.remove("d-none");
    messageValidation.classList.add("d-block");
    messageValidation.style.color = "red";
    messageValidation.innerHTML = "Please input the valid data";
  }
});

function signUp() {
  var name = inputAddName.value;
  var email = inputAddEmail.value;
  var password = inputAddPassword.value;

  var user = {
    name: name,
    email: email,
    password: password,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  inputAddName.value = null;
  inputAddEmail.value = null;
  inputAddPassword.value = null;
  inputAddName.classList.remove("is-valid", "is-invalid");
  inputAddEmail.classList.remove("is-valid", "is-invalid");
  inputAddPassword.classList.remove("is-valid", "is-invalid");
}

function inputValidation(element) {
  var text = element.value;
  var regex = {
    registerName: /^\w{3,30}$/,
    registerEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    registerPassword: /^[0-9a-zA-Z]{6,}$/,
  };

  // Check for duplicate email
  if (element.id === "registerEmail") {
    var isDuplicateEmail = users.some(function (user) {
      return user.email.toLowerCase() === text.toLowerCase();
    });

    if (isDuplicateEmail) {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      messageValidation.classList.remove("d-none");
      messageValidation.classList.add("d-block");
      messageValidation.style.color = "red";
      messageValidation.innerHTML = "This email already exists";
      return false;
    }
  }

  // Check for duplicate name
  if (element.id === "registerName") {
    var isDuplicateName = users.some(function (user) {
      return user.name.toLowerCase() === text.toLowerCase();
    });

    if (isDuplicateName) {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      messageValidation.classList.remove("d-none");
      messageValidation.classList.add("d-block");
      messageValidation.style.color = "red";
      messageValidation.innerHTML = "This username already exists";
      return false;
    }
  }

  // Password validation
  if (element.id === "registerPassword" && !regex.registerPassword.test(text)) {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    messageValidation.classList.remove("d-none");
    messageValidation.classList.add("d-block");
    messageValidation.style.color = "red";
    messageValidation.innerHTML = "Password must contain at least 6 characters";
    return false;
  }

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    messageValidation.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
