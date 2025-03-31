// Todo app code with localStorage


let inputBox = document.getElementById("inputBox");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let removeLocal = document.getElementById("removeData");

let loggedInUser = localStorage.getItem("loogedInUser");

// Function to add a new todo item to the list and local storage
const addTodo = () => {
  if (!loggedInUser) {
    alert("Please log in first.");
    return;
  }

  const inputText = inputBox.value.trim();
  if (inputText === "") {
    alert("Write Something");
    return false;
  }

  let userData = JSON.parse(localStorage.getItem("users")) || [];

  let userIndex = userData.findIndex(user => user.email === loggedInUser);
  console.log("User Data", userData);

  if (userIndex === -1) return;
``
  if (addBtn.value === "Edit") {
    // If in edit mode, update the existing todo item
    editLocalTodo(editTodo.target.previousElementSibling.innerHTML); // Update in local storage
    editTodo.target.previousElementSibling.innerHTML = inputText;// Update displayed text
    addBtn.value = "Add";// reset button text
    inputBox.value = ""; // Clear input fild
  }
  else {
    // If in add mode, create and add a new todo item
    let li = document.createElement("li"); // Create list item
    let p = document.createElement("p"); // Create paragraph for todo text
    p.className = "ptag"; // Add class to paragraph
    p.innerText = inputText; // Set todo text
    li.appendChild(p); // Add paragraph to list item


    const editBtn = document.createElement("button"); // Create edit button
    li.appendChild(editBtn); // Add edit button to list item
    editBtn.className = "editButton"; // Add class to edit button
    editBtn.textContent = "Edit"; // Set edit button text


    const remBtn = document.createElement("button"); // Create remove button
    li.appendChild(remBtn); // Add remove button to list item
    remBtn.className = "removeButton"; // Add class to remove button
    remBtn.textContent = "Remove"; // Set remove button text

    todoList.appendChild(li); // Add list item to todo list
    inputBox.value = "";// clear the input field

    // Add todo to local storage
    userData[userIndex].todo.push(inputText); // Add todo to user's todo array
    localStorage.setItem("users", JSON.stringify(userData)); // Update local storage

  }
};

// Function to retrieve and display todos from local storage for the logged-in user
const getLocalTodos = () => {
  if (!loggedInUser) return;

  let userData = JSON.parse(localStorage.getItem("users")) || [];
  let user = userData.find(user => user.email === loggedInUser);

  if (!user) return;

  todoList.innerHTML = "";// Clear existing todo list items
  user.todo.forEach((todo) => {  // Iterate through user's todos

    let li = document.createElement("li");
    let p = document.createElement("p");
    p.className = "ptag";
    p.innerText = todo;
    li.appendChild(p);


    const editBtn = document.createElement("button");
    li.appendChild(editBtn);
    editBtn.className = "editButton";
    editBtn.textContent = "Edit";

    const remBtn = document.createElement("button");
    li.appendChild(remBtn);
    remBtn.className = "removeButton";
    remBtn.textContent = "Remove";

    todoList.appendChild(li); // Add list item to todo list
  });
};

// Function to delete a todo item from local storage
const deleteLocalTodos = (todo) => {
  if (!loggedInUser) return;

  let userData = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = userData.findIndex(user => user.email === loggedInUser);
  if (userIndex === -1) return;

  let todoText = todo.children[0].innerHTML; // Get text of todo to delete
  let todoIndex = userData[userIndex].todo.indexOf(todoText); // Find index of todo in array

  if (todoIndex !== -1) {
    userData[userIndex].todo.splice(todoIndex, 1); // Remove todo from array
    localStorage.setItem("users", JSON.stringify(userData)); // Update local storage
  }
};


// Function to edit a todo item in local storage
const editLocalTodo = (todo) => {
  if (!loggedInUser) return;

  let userData = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = userData.findIndex(user => user.email === loggedInUser);
  if (userIndex === -1) return;

  let todoIndex = userData[userIndex].todo.indexOf(todo); // Find index of todo to edit
  if (todoIndex !== -1) {
    userData[userIndex].todo[todoIndex] = inputBox.value; // Update todo text in array
    localStorage.setItem("users", JSON.stringify(userData)); // Update local storage
  }
};

// Function to handle click events on todo items (edit/remove)
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    // If remove button clicked
    todoList.removeChild(e.target.parentElement); // Remove todo item from list
    deleteLocalTodos(e.target.parentElement); // Remove todo from local storage
  }

  if (e.target.innerHTML === "Edit") {
    // If edit button clicked
    inputBox.value = e.target.previousElementSibling.innerHTML; // Populate input field with todo text
    inputBox.focus(); // Focus on input field
    addBtn.value = "Edit"; // Change button text to "Edit"
    editTodo = e; // Store the clicked element for later editing
  }
};

// Function to log out the user and clear the logged-in user data
const remLocal = () => {
  localStorage.removeItem("loogedInUser"); // Remove logged-in user session
  alert("You have logged out successfully!");
  window.location.href = "index.html"; // Redirect to login page (index.html)
}

document.addEventListener("DOMContentLoaded", getLocalTodos);// Load todos when DOM is ready

removeLocal.addEventListener("click", remLocal);
todoList.addEventListener("click", updateTodo);
addBtn.addEventListener("click", addTodo);
