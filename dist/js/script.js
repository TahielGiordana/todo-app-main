const todoList = document.querySelector(".content__list");
const addTodoElement = document.getElementById("addNewTodo");

//Create a new todo
const addTodo = () => {
  let text = addTodoElement.value;
  todoList.innerHTML += `<div class="list-item">
  <button class="uncheck"></button>
  <span class="list-item__text" />${text}</span>
</div>`;
  addTodoElement.value = "";
};

addTodoElement.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addTodo();
  }
});
