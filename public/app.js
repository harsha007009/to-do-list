const form = document.getElementById('newTaskForm');
const todoList = document.getElementById('todoList');
const tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title) {
    alert('Please enter a title');
    return;
  }

  tasks.push({ title, description });
  updateTodoList();
  form.reset();
  closeModal();
});

function updateTodoList() {
  todoList.innerHTML = '';
  tasks.forEach(({ title, description }, index) => {
    const newToDoItem = createToDoList({ title, description }, index);
    todoList.append(newToDoItem);
  });
  addDeleteListeners();
  addToggleListener();
}

function createToDoList({ title, description }, index) {
  const newToDoElement = document.createElement('li');
  newToDoElement.classList.add('task-card');
  newToDoElement.id = `todo-${index}`;

  newToDoElement.innerHTML = `
    <div class="task-header">
      <div class="task-main">
        <div class="task-checkbox-wrapper">
          <input type="checkbox" id="checkbox-${index}" class="peer hidden" />
          <label for="checkbox-${index}" class="task-checkbox-label">
            <i class="ph-fill ph-check-circle opacity-0 transition-all duration-300 transform checkmark-svg text-white text-2xl"></i>
          </label>
        </div>
        <div class="task-title">${title}</div>
      </div>
      <div class="task-buttons">
        <div class="task-button-group">
          <button type="button" class="task-btn-delete" data-index="${index}">
            <i class="ph ph-trash text-base"></i>
            <span class="text-xs sm:text-sm font-medium">Delete</span>
          </button>
          <button type="button" class="task-btn-toggle">
            <i class="ph ph-caret-down text-base"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="task-description-wrapper" style="max-height: 0; overflow: hidden; opacity: 0;">
      <div class="task-description">
        <p>${description}</p>
      </div>
    </div>
  `;

  return newToDoElement;
}

function addDeleteListeners() {
  document.querySelectorAll('.task-btn-delete').forEach(btn => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      const taskElement = btn.closest('li.task-card');

      gsap.to(taskElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "linear",
        onComplete: () => {
          tasks.splice(index, 1);
          updateTodoList();
        }
      });
    };
  });
}

function addToggleListener() {
  document.querySelectorAll('.task-btn-toggle').forEach((btn) => {
    btn.onclick = () => {
      const taskCard = btn.closest('.task-card');
      const descWrapper = taskCard.querySelector('.task-description-wrapper');
      const caretIcon = btn.querySelector('i.ph-caret-down');

      const isExpanded = descWrapper.classList.contains('expanded');

      if (!isExpanded) {
        // OPEN IT
        descWrapper.style.display = 'block';
        descWrapper.style.maxHeight = 'none';
        const height = descWrapper.scrollHeight + 'px';
        descWrapper.style.maxHeight = '0px';

        gsap.to(descWrapper, {
          maxHeight: height,
          opacity: 1,
          duration: 0.3,
          ease: 'easeInOut',
          onStart: () => {
            descWrapper.classList.add('expanded');
            caretIcon.classList.add('rotate-180');
          },
          onComplete: () => {
            descWrapper.style.maxHeight = 'none'; // natural height
          }
        });
      } else { 
        // CLOSE IT
        const height = descWrapper.scrollHeight + 'px';
        descWrapper.style.maxHeight = height;

        gsap.to(descWrapper, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'easeInOut',
          onStart: () => {
            descWrapper.style.overflow = 'hidden';
          },
          onComplete: () => {
            descWrapper.classList.remove('expanded');
            caretIcon.classList.remove('rotate-180');
            descWrapper.style.display = 'none';
          }
        });
      }
    };
  });
}

document.getElementById('clearCompleted')?.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]');
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (checkboxes[i].checked) {
      tasks.splice(i, 1);
    }
  }
  updateTodoList();
});
