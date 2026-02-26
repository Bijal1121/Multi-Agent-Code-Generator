// app.js – Core module for Colorful Todo
// This file is loaded with a regular <script> tag (defer),
// so we wrap everything in an IIFE to keep the global scope clean.
// The IIFE exposes an `init` function that is called on DOMContentLoaded.

(() => {
  /**
   * Todo model
   */
  class Todo {
    /**
     * @param {number|string} id
     * @param {string} title
     * @param {string} [description]
     * @param {boolean} [completed]
     * @param {number} [order]
     */
    constructor(id, title, description = "", completed = false, order = 0) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.order = order;
    }

    /**
     * Convert the instance to a plain object suitable for JSON.stringify.
     */
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        completed: this.completed,
        order: this.order,
      };
    }
  }

  /**
   * Simple wrapper around localStorage for persisting todos and theme.
   */
  const StorageManager = {
    /** @returns {Todo[]} */
    loadTodos() {
      const raw = localStorage.getItem("colorful_todos");
      if (!raw) return [];
      try {
        const data = JSON.parse(raw);
        // Re‑hydrate plain objects into Todo instances.
        return data.map(
          (obj) => new Todo(obj.id, obj.title, obj.description, obj.completed, obj.order)
        );
      } catch (e) {
        console.error("Failed to parse stored todos:", e);
        return [];
      }
    },

    /** @param {Todo[]} todos */
    saveTodos(todos) {
      const payload = JSON.stringify(todos.map((t) => t.toJSON()));
      localStorage.setItem("colorful_todos", payload);
    },

    /** @returns {string} */
    loadTheme() {
      return localStorage.getItem("colorful_theme") || "light";
    },

    /** @param {string} theme */
    saveTheme(theme) {
      localStorage.setItem("colorful_theme", theme);
    },
  };

  /** Global mutable state used by the UI. */
  const state = {
    todos: [],
    filter: "all", // all | active | completed
    theme: "light",
  };

  /**
   * Render the todo list based on `state.todos` and the current filter.
   * This is a minimal implementation – later feature tasks will extend it.
   */
  function renderTodos() {
    const listEl = document.getElementById("todo-list");
    if (!listEl) return;
    // Clear existing items
    listEl.innerHTML = "";

    const filtered = state.todos.filter((todo) => {
      if (state.filter === "active") return !todo.completed;
      if (state.filter === "completed") return todo.completed;
      return true; // all
    });

    filtered
      .sort((a, b) => a.order - b.order)
      .forEach((todo) => {
        renderTodoItem(todo);
      });
  }

  /**
   * Render a single todo item and append it to the list respecting the current filter.
   * @param {Todo} todo
   */
  function renderTodoItem(todo) {
    // Respect current filter – if the todo shouldn't be visible, do nothing.
    if (state.filter === "active" && todo.completed) return;
    if (state.filter === "completed" && !todo.completed) return;

    const listEl = document.getElementById("todo-list");
    if (!listEl) return;

    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    li.setAttribute("role", "listitem");

    // Checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete-toggle";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      StorageManager.saveTodos(state.todos);
      // Re‑render to keep ordering/filters consistent.
      renderTodos();
    });

    // Content container
    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-content";

    const titleEl = document.createElement("h3");
    titleEl.className = "todo-title";
    titleEl.contentEditable = "true";
    titleEl.textContent = todo.title;
    // Optional description
    let descEl = null;
    if (todo.description) {
      descEl = document.createElement("p");
      descEl.className = "todo-desc";
      descEl.contentEditable = "true";
      descEl.textContent = todo.description;
    }

    // Edit button (placeholder – future feature)
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✎";
    editBtn.addEventListener("click", () => {
      // Simple inline edit: focus the title element.
      titleEl.focus();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      state.todos = state.todos.filter((t) => t.id !== todo.id);
      StorageManager.saveTodos(state.todos);
      li.remove();
    });

    // Assemble
    contentDiv.appendChild(titleEl);
    if (descEl) contentDiv.appendChild(descEl);

    li.appendChild(checkbox);
    li.appendChild(contentDiv);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    listEl.appendChild(li);
  }

  /**
   * Initialise the application: load persisted data, render UI and bind events.
   */
  function init() {
    // Load persisted data
    state.todos = StorageManager.loadTodos();
    state.theme = StorageManager.loadTheme();

    // Apply theme class to <body>
    document.body.classList.remove("light", "dark");
    document.body.classList.add(state.theme);

    // Initial render
    renderTodos();
    updateFilterButtons();

    // Form submission – add new todo
    const form = document.getElementById("new-todo-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = /** @type {HTMLInputElement} */ (document.getElementById("todo-title"));
        const descInput = /** @type {HTMLTextAreaElement} */ (document.getElementById("todo-desc"));
        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        if (!title) return; // required attribute guards this

        const newTodo = new Todo(
          Date.now(), // simple unique id
          title,
          description,
          false,
          state.todos.length // order at the end
        );
        state.todos.push(newTodo);
        // Ensure ordering is consistent
        state.todos.sort((a, b) => a.order - b.order);
        StorageManager.saveTodos(state.todos);
        renderTodoItem(newTodo);
        // Clear inputs
        form.reset();
      });
    }

    // Filter buttons
    const filterContainer = document.querySelector(".filters");
    if (filterContainer) {
      filterContainer.addEventListener("click", (e) => {
        const target = /** @type {HTMLElement} */ (e.target);
        if (!target.classList.contains("filter")) return;
        const newFilter = target.dataset.filter;
        if (!newFilter) return;
        state.filter = newFilter;
        updateFilterButtons();
        renderTodos();
      });
    }

    // Dark‑mode toggle button
    const toggleBtn = document.getElementById("dark-mode-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        state.theme = state.theme === "light" ? "dark" : "light";
        document.body.classList.toggle("light");
        document.body.classList.toggle("dark");
        StorageManager.saveTheme(state.theme);
      });
    }

    // Clear completed button
    const clearBtn = document.getElementById("clear-completed");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.todos = state.todos.filter((t) => !t.completed);
        StorageManager.saveTodos(state.todos);
        renderTodos();
      });
    }
  }

  /** Update the aria‑pressed attribute of filter buttons to reflect current filter. */
  function updateFilterButtons() {
    const buttons = document.querySelectorAll(".filter");
    buttons.forEach((btn) => {
      const filter = btn.dataset.filter;
      btn.setAttribute("aria-pressed", filter === state.filter ? "true" : "false");
    });
  }

  // Expose init for external use (e.g., manual call) and automatically run on DOM ready.
  window.initTodoApp = init;
  document.addEventListener("DOMContentLoaded", init);
})();