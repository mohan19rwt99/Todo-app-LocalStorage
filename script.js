// Sign up and Login JavaScript Code

let uname     = document.getElementById("uname");
let email     = document.getElementById("email");
let password  = document.getElementById("psw");
let loginBtn  = document.getElementById("login")


// function for create a User
function myFunction(event) {
  event.preventDefault();
  if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
    alert("Invalid email");
    return false;
  }

  // if password values length is less then 6 than give the alert
  if (password.value.length < 6) {
    alert("Password length must be greater than 6")
    return false;
  }

  // get the users data from local stroage
  let user = JSON.parse(localStorage.getItem("users")) || [];

  // This checks if the email value and current value match in local storage, if the email value matched, then alert the Message and if the value does not match, the code is run further.
  if (user.some((v) => {
    return v.email == email.value
  })) {
    alert("User email is already Registred")
  } else {
    /// object for store users data 
    const newUser = ({
      "uname"   : uname.value,
      "email"   : email.value,
      "password": password.value,
      "todo"    : []
    });

    // push the data of user from newUser to user
    user.push(newUser)
    // send the user data in localstorage
    localStorage.setItem("users", JSON.stringify(user));

    alert("User Succesfully Sign Up")

    document.getElementById("frm1").reset();
  }

  return true;

}

/// function for User login 
function loginFunction(event) {
  event.preventDefault;

  let loginEmail = document.getElementById("email").value;
  let loginPassword = document.getElementById("psw").value;

  // get the user data from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || []


  // using find method this function check the login users data is avilabele in localstorage.  
  let validUsers = users.find(
    user => user.email === loginEmail && user.password === loginPassword
  );
  // console.log("User Is valid", validUsers);

  /// if users data match in local storage than this if else statment run
  if (validUsers) {
    localStorage.setItem("loogedInUser", loginEmail)
    alert("You Succesfully Login");

    // if statment true than users go to the next todo app 
    window.location.href = "./index1.html";

  }
  else {
    alert("Invalid or Username")
  }

}

// eventListner for registration
submitBtn.addEventListener("click", myFunction);


// // eventListner for Login
login.addEventListener("click", loginFunction)