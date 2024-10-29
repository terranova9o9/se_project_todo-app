import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js"
import Todo from "../components/Todo.js"
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from '../components/TodoCounter.js';


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");


const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed)
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};


const section = new Section({ 
  items: initialTodos, 
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  }, 
  containerSelector: ".todos__list" 
});

section.renderItems();

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;
    const id = uuidv4();
    
    const dateObject = new Date(date);
    dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset());

    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    addTodoPopup.close();
    newTodoValidator.resetValidation();

    todoCounter.updateTotal(true);
  }
});

addTodoPopup.setEventListeners()

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    document.addTodoPopup.close();
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});


const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
newTodoValidator.resetValidation();