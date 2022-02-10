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
  card.classList.add("list-item", "active", "draggable");
  card.draggable = true;
  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  let checkBtn = document.createElement("button");
  checkBtn.classList.add("list-item__check");
  checkBtn.addEventListener("click", markTodo);
  let cardText = document.createElement("span");
  cardText.classList.add("list-item__text", "text--clickable");
  cardText.addEventListener("click", markTodo);
  cardText.innerText = text;
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("list-item__delete");
  deleteBtn.addEventListener("click", deleteTodo);
  card.appendChild(checkBtn);
  card.appendChild(cardText);
  card.appendChild(deleteBtn);
  return card;
};

addTodoElement.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addTodo();
    addTodoElement.value = "";
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
  if (e.target.parentElement.firstElementChild.classList.toggle("checked")) {
    e.target.parentElement.classList.remove("active");
    e.target.parentElement.classList.add("completed");
    itemsLeft.innerHTML = parseInt(itemsLeft.textContent) - 1;
  } else {
    e.target.parentElement.classList.remove("completed");
    e.target.parentElement.classList.add("active");
    itemsLeft.innerHTML = parseInt(itemsLeft.textContent) + 1;
  }
};

//Filter todo
const btnFilterAll = document.getElementById("btnFilterAll");
const btnFilterActive = document.getElementById("btnFilterActive");
const btnFilterCompleted = document.getElementById("btnFilterCompleted");

btnFilterActive.addEventListener("click", (e) => {
  filterTodo("active");
  markFilterSelected(e.target);
});

btnFilterCompleted.addEventListener("click", (e) => {
  filterTodo("completed");
  markFilterSelected(e.target);
});

btnFilterAll.addEventListener("click", (e) => {
  filterTodo("all");
  markFilterSelected(e.target);
});

const markFilterSelected = (element) => {
  let siblings = getAllSiblings(element);
  siblings.forEach((element) => {
    element.classList.remove("content__options__filters__btn--selected");
  });
  element.classList.add("content__options__filters__btn--selected");
};

function getAllSiblings(elem) {
  let siblings = [];
  let sibling = elem.parentNode.firstElementChild;
  do {
    if (sibling != elem) {
      siblings.push(sibling);
    }
  } while ((sibling = sibling.nextElementSibling));

  return siblings;
}

function filterTodo(state) {
  let cards = todoList.querySelectorAll(".list-item");

  if (state == "all") {
    cards.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    cards.forEach((element) => {
      if (!element.classList.contains(state)) {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    });
  }
}

//Clear completed
const btnClearCompleted = document.getElementById("btnClearCompleted");
btnClearCompleted.addEventListener("click", clearCompleted);

function clearCompleted() {
  let cards = todoList.querySelectorAll(".list-item");
  cards.forEach((element) => {
    if (element.classList.contains("completed")) {
      todoList.removeChild(element);
    }
  });
}

//Toggle Light/Dark Mode
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.documentElement.classList.add("dark-mode");
} else {
  document.documentElement.classList.remove("dark-mode");
}

const btnToggleMode = document.getElementById("btnToggleMode");
const prefersDarkScheme = window.matchMedia("(prefered-color-scheme: dark)");

btnToggleMode.addEventListener("click", () => {
  var theme = document.documentElement.classList.contains("dark-mode")
    ? "light"
    : "dark";
  document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", theme);
});
