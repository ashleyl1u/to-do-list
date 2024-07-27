
import '../styles/tasks.css';
import { openOverlay, closeOverlay} from './overlay';

export class Task{
  constructor(title, note = ''){
    this.title = title;
    this.note = note;
  }

  set title(title){
    this._title = title;
  }

  set note (note){
    this._note = note;
  }

  get title(){
    return this._title;
  }

  get note(){
    return this._note;
  }

}


export function renderContent(list) {
  const tasksHeader = document.createElement('div');
  tasksHeader.setAttribute('id', 'tasks-header');

  const listName = document.createElement('h1');
  listName.textContent = list.title;

  const newTaskBtn = document.createElement('button');
  newTaskBtn.setAttribute('id', 'new-task-btn');
  newTaskBtn.textContent = '+ new task';

  tasksHeader.appendChild(listName);
  tasksHeader.appendChild(newTaskBtn);

  document.getElementById('content').appendChild(tasksHeader);

  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('id', 'task-container');

  const completedTaskContainer = document.createElement('div');
  completedTaskContainer.setAttribute('id', 'completed-task-container');

  document.getElementById('content').appendChild(taskContainer);
  document.getElementById('content').appendChild(completedTaskContainer);

  addContentListeners(list);

  
  renderTasks(list);

}

function addContentListeners(list){

  document.getElementById('new-task-btn').addEventListener('click', () => {
    openOverlay();
    renderNewTaskForm(list);
  })
}




function renderTasks (list) {
  const tasks = list.tasks;
  const completedTasks = list.completedTasks;

  document.getElementById('task-container').innerHTML = '';
  tasks.forEach((task, index) =>{
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox-unchecked');
    checkbox.setAttribute('id', index);

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskTitle = document.createElement('h4');
    taskTitle.textContent = task.title;

    const taskNote = document.createElement('h5');
    taskNote.textContent = task.note;

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskNote);

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskInfo);

    document.getElementById('task-container').appendChild(taskContent);
    
  });

  document.getElementById('completed-task-container').innerHTML = '';
  completedTasks.forEach((completeTask, index) => {
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox-checked');
    checkbox.setAttribute('id', index);

    const checkboxStatus = document.createElement('div');
    checkbox.appendChild(checkboxStatus);
    checkboxStatus.classList.add('checked');

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskTitle = document.createElement('h4');
    taskTitle.textContent = completeTask.title;

    const taskNote = document.createElement('h5');
    taskNote.textContent = completeTask.note;

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskNote);

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskInfo);

    document.getElementById('completed-task-container').appendChild(taskContent);
  });

  
  addTaskListeners(list);
}

function addTaskListeners(list){
  document.querySelectorAll('.checkbox-unchecked').forEach((uncheckedCheckbox) => {
    uncheckedCheckbox.addEventListener('click', () => {
      updateTaskLists(uncheckedCheckbox.getAttribute('id'), list.tasks, list.completedTasks);
      renderTasks(list);
      
    });
  });

  document.querySelectorAll('.checkbox-checked').forEach((checkedCheckbox) => {
    checkedCheckbox.addEventListener('click', () => {

      updateTaskLists( checkedCheckbox.getAttribute('id'), list.completedTasks, list.tasks);
      renderTasks(list);
    });
  });
}

function updateTaskLists(index, removeArr, addArr) {
  const removedTask = removeArr.splice(index, 1);
  addArr.push(removedTask[0]);

}


function renderNewTaskForm(list){
  const newTaskForm = document.createElement('form');
  newTaskForm.setAttribute('id', 'new-task-form');

  const taskTitleInput = document.createElement('input');
  taskTitleInput.placeholder = 'Task Title';
  taskTitleInput.setAttribute('id', 'task-title-input');

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'task-title-error-msg');

  const taskNoteInput = document.createElement('input');
  taskNoteInput.placeholder = 'Note';
  taskNoteInput.setAttribute('id', 'task-note-input');

  const btnContainer = document.createElement('div');
  

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.setAttribute('id', 'task-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  const formBtn = document.createElement('button');
  formBtn.textContent = 'Enter';
  formBtn.setAttribute('id', 'task-submit-btn');

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(formBtn);

  newTaskForm.appendChild(taskTitleInput);
  newTaskForm.appendChild(taskNoteInput);
  newTaskForm.appendChild(errorMsg);
  newTaskForm.appendChild(btnContainer);


  document.getElementById('overlay').innerHTML ='';
  document.getElementById('overlay').appendChild(newTaskForm);

  addNewTaskListeners(list);
}

function addNewTaskListeners(list){
  document.getElementById('task-cancel-btn').addEventListener('click',() => {
    closeOverlay();
  })

  document.getElementById('new-task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById('task-title-input').value;
    const taskNote = document.getElementById('task-note-input').value;

    if(taskTitle === ''){
      document.getElementById('task-title-error-msg').textContent = '*Required';
    }
    else{
      list.tasks.push(new Task(taskTitle, taskNote));
      renderTasks(list);
      resetNewTaskForm();
      closeOverlay();
    }
    
  })
}

function resetNewTaskForm(){
  document.getElementById('new-task-form').reset();
}



