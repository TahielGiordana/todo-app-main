const todoList = document.querySelector(".content__list");
const addTodoElement = document.getElementById("addNewTodo");
const itemsLeft = document.getElementById("itemsLeft");

//Create a new todo
const addTodo = () => {
  let text = addTodoElement.value;
  todoList.appendChild(createCard(text));
  itemsLeft.innerHTML = parseInt(itemsLeft.textContent) + 1;
};

const createCard = (text) => {
  let card = document.createElement("div");
  card.classList.add("list-item", "active");
  let checkBtn = document.createElement("button");
  checkBtn.classList.add("list-item__check");
  checkBtn.addEventListener("click", markTodo);
  let cardText = document.createElement("span");
  cardText.classList.add("list-item__text");
  cardText.innerText = text;
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("list-item__delete");
  deleteBtn.addEventListener("click", deleteTodo);
  card.appendChild(checkBtn);
  card.appendChild(cardText);
  card.append(deleteBtn);
  return card;
};

addTodoElement.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addTodo();
  }
});

//Delete a todo
const deleteTodo = (e) => {
  let card = e.target.parentElement;
  todoList.removeChild(card);
  if (card.classList.contains("active")) {
    itemsLeft.innerHTML = parseInt(itemsLeft.textContent) - 1;
  }
};

//Mark a todo
const markTodo = (e) => {
  if (e.target.classList.toggle("checked")) {
    e.target.parentElement.classList.remove("active");
    e.target.parentElement.classList.add("completed");
    itemsLeft.innerHTML = parseInt(itemsLeft.textContent) - 1;
  } else {
    e.target.parentElement.classList.remove("completed");
    e.target.parentElement.classList.add("active");
    itemsLeft.innerHTML = parseInt(itemsLeft.textContent) + 1;
  }
};