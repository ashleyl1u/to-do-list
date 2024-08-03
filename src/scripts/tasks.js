
import '../styles/tasks.css';
import { openOverlay, closeOverlay} from './overlay';
import { lists } from './lists';
import {format} from 'date-fns';

export class Task{
  constructor(title, note = '', dueDate = ''){
    this.title = title;
    this.note = note;
    this.dueDate = dueDate; 
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

  get dueDate() {
    return this._dueDate;
  }

  set dueDate (dueDate) {
    this._dueDate = dueDate;
  }

}


export function renderContent(list) {
  const listContentContainer = document.createElement('div');
  
  const tasksHeader = document.createElement('div');
  tasksHeader.classList.add('tasks-header');

  const listName = document.createElement('h1');
  listName.textContent = list._title;


  const newTaskBtn = document.createElement('button');
  newTaskBtn.setAttribute('id',`new-task-btn-${list._title}`);
  newTaskBtn.classList.add('new-task-btn');
  newTaskBtn.textContent = '+ new task';

  tasksHeader.appendChild(listName);
  tasksHeader.appendChild(newTaskBtn);

  listContentContainer.appendChild(tasksHeader);

  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('id',  `uncompleted-task-container-${list._title}`);

  const completedTaskContainer = document.createElement('div');
  completedTaskContainer.setAttribute('id', `completed-task-container-${list._title}`);

  
  listContentContainer.appendChild(taskContainer);
  listContentContainer.appendChild(completedTaskContainer);

  document.getElementById('content').appendChild(listContentContainer);

  addContentListeners(list);


}

function addContentListeners(list){

  document.getElementById(`new-task-btn-${list._title}`).addEventListener('click', () => {
    openOverlay();
    renderTaskForm(list, 'add', 'n/a');
  });


 
}

function formatDate (dueDate){
  const dateInfo = dueDate.split('-');
  const date = new Date(dateInfo[0], dateInfo[1], dateInfo[2]);
  return (format(date,'MMM d, yyyy'));
}

function renderUncompletedTasks(task, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-unchecked-${list._title}`);
  checkbox.classList.add( `checkbox-unchecked`);
  checkbox.setAttribute('id', index);

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  taskTitle.textContent = task._title;

  const taskNote = document.createElement('h5');
  taskNote.textContent = task._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(task._dueDate);

  taskInfo.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);


  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');

  const taskDeleteBtn = document.createElement('button');
  taskDeleteBtn.textContent = 'x';
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.setAttribute('id', `unchecked-${index}`);

  const taskEditBtn = document.createElement('button');
  taskEditBtn.textContent = 'E';
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.setAttribute('id', `unchecked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);
  



  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskInfo);
  taskContent.appendChild(btnContainer);

  document.getElementById(`uncompleted-task-container-${list._title}`).appendChild(taskContent);
}

function renderCompletedTasks(completeTask, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-checked-${list._title}`);
  checkbox.classList.add( `checkbox-checked`);
  checkbox.setAttribute('id', index);

  const checkboxStatus = document.createElement('div');
  checkbox.appendChild(checkboxStatus);
  checkboxStatus.classList.add('checked');

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  
  taskTitle.textContent = completeTask._title;

  const taskNote = document.createElement('h5');
  taskNote.textContent = completeTask._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(completeTask._dueDate);

  taskInfo.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);


  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');

  const taskDeleteBtn = document.createElement('button');
  taskDeleteBtn.textContent = 'x';
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.setAttribute('id', `checked-${index}`);

  const taskEditBtn = document.createElement('button');
  taskEditBtn.textContent = 'E';
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.setAttribute('id', `checked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);

  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskInfo);
  taskContent.appendChild(btnContainer);

  document.getElementById(`completed-task-container-${list._title}`).appendChild(taskContent);
}


export function renderTasks (list) {
  const tasks = list._tasks;
  const completedTasks = list._completedTasks;

  document.getElementById(`uncompleted-task-container-${list._title}`).innerHTML = '';
  tasks.forEach((task, index) =>{

    renderUncompletedTasks(task, index, list);
    
  });

  document.getElementById(`completed-task-container-${list._title}`).innerHTML = '';
  completedTasks.forEach((completeTask, index) => {
    renderCompletedTasks(completeTask, index, list);
    
  });

  
  addTaskListeners(list);
  //addCompleteTaskListeners(list.tasks);
}

function addTaskListeners(list){
  document.querySelectorAll(`.checkbox-unchecked-${list._title}`).forEach((uncheckedCheckbox) => {
    uncheckedCheckbox.addEventListener('click', () => {
      updateTaskLists(uncheckedCheckbox.getAttribute('id'), list._tasks, list._completedTasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      
    });
  });

  document.querySelectorAll(`.checkbox-checked-${list._title}`).forEach((checkedCheckbox) => {
    checkedCheckbox.addEventListener('click', () => {

      updateTaskLists( checkedCheckbox.getAttribute('id'), list._completedTasks, list._tasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
    });
  });

  document.querySelectorAll(`.task-delete-btn-${list._title}`).forEach((btn) =>{
    btn.addEventListener('click', () => {
      const btnId = btn.getAttribute('id');
      const btnInfo = btnId.split('-');

      if(btnInfo[0] === 'unchecked'){
        list._tasks.splice(btnInfo[1],1);
      }
      else{
        list._completedTasks.splice(btnInfo[1],1);
      }
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
    });
  });


  document.querySelectorAll(`.task-edit-btn-${list._title}`).forEach((btn) =>{
    btn.addEventListener('click', () => {
      const btnInfo = btn.getAttribute('id').split('-');
      const taskList = btnInfo[0] === 'unchecked' ? list._tasks : list._completedTasks;
      const taskIndex = btnInfo[1];

      openOverlay();
      renderTaskForm(list, 'update', taskList[taskIndex]);
      fillInUpdateTaskForm(taskList[taskIndex]);
    })
  })

  
  
}

function fillInUpdateTaskForm (taskInfo){
  document.getElementById('task-title-input').value = taskInfo._title;
  document.getElementById('task-note-input').value = taskInfo._note;
  document.getElementById('task-date-input').value = taskInfo._dueDate;
}




function updateTaskLists(index, removeArr, addArr) {
  const removedTask = removeArr.splice(index, 1);
  addArr.push(removedTask[0]);

}


function renderTaskForm(list, type, taskInfo){
  const newTaskForm = document.createElement('form');
  newTaskForm.setAttribute('id', 'task-form');

  const taskTitleInput = document.createElement('input');
  taskTitleInput.placeholder = 'Task Title';
  taskTitleInput.setAttribute('id', 'task-title-input');

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'task-title-error-msg');

  const taskNoteInput = document.createElement('input');
  taskNoteInput.placeholder = 'Note';
  taskNoteInput.setAttribute('id', 'task-note-input');

  const taskDateInput = document.createElement('input');
  taskDateInput.setAttribute('type', 'date');
  taskDateInput.setAttribute('id', 'task-date-input');
  

  const btnContainer = document.createElement('div');
  

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.setAttribute('id', 'task-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Enter';
  submitBtn.setAttribute('id', 'task-submit-btn');
  submitBtn.setAttribute('name', 'action');
  submitBtn.setAttribute('value', 'add');

  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update';
  updateBtn.setAttribute('id', 'task-update-btn');
  updateBtn.setAttribute('name', 'action');
  updateBtn.setAttribute('value', 'update');

  if(type === 'add'){
    submitBtn.style.display = 'block';
    updateBtn.style.display = 'none';
  }
  if (type === 'update'){
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'block';
  }

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(updateBtn);

  newTaskForm.appendChild(taskTitleInput);
  newTaskForm.appendChild(errorMsg);
  newTaskForm.appendChild(taskNoteInput);
  newTaskForm.appendChild(taskDateInput);
  newTaskForm.appendChild(btnContainer);


  document.getElementById('overlay').innerHTML ='';
  document.getElementById('overlay').appendChild(newTaskForm);

  addTaskFormListeners(list, taskInfo);
}

function addTaskFormListeners(list, taskInfo){
  document.getElementById('task-cancel-btn').addEventListener('click',() => {
    closeOverlay();
  })

  document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const action = e.submitter.value;

    const taskTitle = document.getElementById('task-title-input').value;
    const taskNote = document.getElementById('task-note-input').value;
    const taskDueDate = document.getElementById('task-date-input').value;

    if(taskTitle === ''){
      document.getElementById('task-title-error-msg').textContent = '*Required';
    }
    else{
      if(action === 'add'){
      
        list._tasks.push(new Task(taskTitle, taskNote, taskDueDate));
        renderTasks(list);
        resetTaskForm();
        closeOverlay();
      
      }

      if (action === 'update'){
        taskInfo._title = taskTitle;
        taskInfo._note = taskNote;
        taskInfo._dueDate = taskDueDate;
        renderTasks(list);
        resetTaskForm();
        closeOverlay();
      }

      localStorage.setItem('lists', JSON.stringify(lists));
    }
    
  });

}

function resetTaskForm(){
  document.getElementById('task-form').reset();
}



