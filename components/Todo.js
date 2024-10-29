class Todo {
    constructor(data, selector, handleCheck, handleDelete) {
        this._data = data;
        this._templateElement = document.querySelector(selector);
        this._handleCheck = handleCheck;
        this._handleDelete = handleDelete;
    }

    _setEventListeners () {
        this._todoDeleteBtn.addEventListener("click", () => {
              this._todoElement.remove();
              
              this._handleDelete(this._data.completed);
            });

        this._todoCheckboxEl.addEventListener("change",  () => {
            this._data.completed = !this._data.completed;
            this._toggleCompleted();
            this._handleCheck(this._data.completed);
        });
    }

    _toggleCompleted() {
        if (this._data.completed) {
          this._todoCheckboxEl.classList.add("todo__completed");
        }
      }

    _generateCheckboxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        this._todoCheckboxEl.checked = this._data.completed;
        this._todoCheckboxEl.id = `todo-${this._data.id}`;
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }

    _dueDate() {
        this._dueDate = new Date(this._data.date);
        if (!isNaN(this._dueDate)) {
            this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            })}`;
        }
    }

    getView () {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);

        this._todoNameEl = this._todoElement.querySelector(".todo__name");
        this._todoDate = this._todoElement.querySelector(".todo__date");
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
        this._todoNameEl.textContent = this._data.name;
        
        this._dueDate();
        this._generateCheckboxEl();
        this._setEventListeners();

        return this._todoElement;
    }
}

export default Todo;