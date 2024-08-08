
import '../styles/tasks.css';
import { openOverlay, closeOverlay, renderTaskForm} from './forms';
import { lists, renderLists } from './lists';
import {format} from 'date-fns';

import {setClickedStyle, updateTaskCount} from './side-bar';
import { showOnlyTodayTasks, updateListInfo} from './content';
import '../styles/task-form.css';
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';
import addIcon from '../icons/add.svg';

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


export function renderListHeader(list) {
  const listContentContainer = document.createElement('div');

  const mainListTitle = document.createElement('div');
  mainListTitle.setAttribute('id', 'main-list-header-container');
  listContentContainer.appendChild(mainListTitle);
  
  const tasksHeader = document.createElement('div');
  tasksHeader.classList.add('tasks-header');

  const listName = document.createElement('h1');
  listName.textContent = list._title;
  listName.classList.add('list-title');


  const newTaskBtn = document.createElement('button');
  const addImg = new Image();
  addImg.src = addIcon;
  addImg.classList.add('add-icon');
  newTaskBtn.setAttribute('id',`new-task-btn-${list._title}`);
  newTaskBtn.classList.add('new-task-btn');
  newTaskBtn.textContent += '+';

  tasksHeader.appendChild(listName);
  tasksHeader.appendChild(newTaskBtn);

  listContentContainer.appendChild(tasksHeader);

  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('id',  `uncompleted-task-container-${list._title}`);

  const completedTaskContainer = document.createElement('div');
  completedTaskContainer.setAttribute('id', `completed-task-container-${list._title}`);
  completedTaskContainer.style.display = 'none';

  
  const listInfoContainer = document.createElement('div');
  listInfoContainer.classList.add('list-info-container');
  
  const listInfo = document.createElement('div');
  listInfo.setAttribute('id', `list-info-${list._title}`);
  listInfo.textContent = `${list._tasks.length} Tasks Remaining · ${list._completedTasks.length} Completed`;
  listInfo.classList.add('list-info');


  const showHideBtn = document.createElement('button');
  showHideBtn.textContent = 'show';
  showHideBtn.setAttribute('id',`show-hide-btn-${list._title}`);
  showHideBtn.classList.add('show-hide-btn');

  listInfoContainer.appendChild(listInfo);
  listInfoContainer.appendChild(showHideBtn);
  listContentContainer.appendChild(listInfoContainer);

  listContentContainer.appendChild(taskContainer);
  listContentContainer.appendChild(completedTaskContainer);

  document.getElementById('content').appendChild(listContentContainer);



  addContentListeners(list);


}



function addContentListeners(list){

  document.getElementById(`new-task-btn-${list._title}`).addEventListener('click', () => {
    renderTaskForm(list, 'add', 'n/a');
  });

  document.getElementById(`show-hide-btn-${list._title}`).addEventListener('click', () => {
    const completedTaskContainer = document.getElementById(`completed-task-container-${list._title}`);

    const showHideBtn = document.getElementById(`show-hide-btn-${list._title}`);
    const listStatus = showHideBtn.textContent;
     listStatus === 'show' ? completedTaskContainer.style.display = 'block' : completedTaskContainer.style.display = 'none';
     listStatus === 'show' ? showHideBtn.textContent = 'hide': showHideBtn.textContent = 'show';
  });


 
}

export function formatDate (dueDate){
  if(dueDate === ''){
    return '';
  }
  const dateInfo = dueDate.split('-');
  
  const date = new Date(dateInfo[0], dateInfo[1]-1, dateInfo[2]);
  return (format(date,'MMM d, yyyy'));
}

function renderUncompletedTasks(task, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.classList.add(`task-content-${list._title}`);
  taskContent.setAttribute('id', `task-content-uncomplete-${index}-${list._title}`);
  

  const taskContentLeft = document.createElement('div');
  taskContentLeft.classList.add('task-content-left');
  
  const taskContentRight = document.createElement('div');
  taskContentRight.classList.add('task-content-right');

  const taskContentMain = document.createElement('div');
  taskContentMain.classList.add('task-main-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-unchecked-${list._title}`);
  checkbox.classList.add( `checkbox-unchecked`);
  checkbox.setAttribute('id', index);

  taskContentMain.appendChild(checkbox);

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  taskTitle.textContent = task._title;

  const taskNote = document.createElement('h6');
  taskNote.textContent = task._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(task._dueDate);

  taskContentMain.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);

  taskContentLeft.appendChild(taskContentMain);
  taskContentLeft.appendChild(taskInfo);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');
  btnContainer.setAttribute('id', `btn-container-${list._title}-uncomplete-${index}`);

  const taskDeleteBtn = document.createElement('button');
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  taskDeleteBtn.appendChild(deleteImg);
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.classList.add(`task-delete-btn`);
  taskDeleteBtn.setAttribute('id', `unchecked-${index}`);

  const taskEditBtn = document.createElement('button');
  const editImg = new Image ();
  editImg.src = editIcon;
  taskEditBtn.appendChild(editImg);
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.classList.add(`task-edit-btn`);
  taskEditBtn.setAttribute('id', `unchecked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);
  

  taskContentRight.appendChild(btnContainer);

  taskContent.appendChild(taskContentLeft);
  taskContent.appendChild(taskContentRight);

  document.getElementById(`uncompleted-task-container-${list._title}`).appendChild(taskContent);
}

function renderCompletedTasks(completeTask, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.classList.add(`task-content-${list._title}`);
  taskContent.classList.add('complete');
  taskContent.setAttribute('id', `task-content-complete-${index}-${list._title}`);

  const taskContentLeft = document.createElement('div');
  taskContentLeft.classList.add('task-content-left');
  
  const taskContentRight = document.createElement('div');
  taskContentRight.classList.add('task-content-right');

  const taskContentMain = document.createElement('div');
  taskContentMain.classList.add('task-main-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-checked-${list._title}`);
  checkbox.classList.add( `checkbox-checked`);
  checkbox.setAttribute('id', index);

  taskContentMain.appendChild(checkbox);

  const checkboxStatus = document.createElement('div');
  checkbox.appendChild(checkboxStatus);
  checkboxStatus.classList.add('checked');

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  
  taskTitle.textContent = completeTask._title;

  const taskNote = document.createElement('h6');
  taskNote.textContent = completeTask._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(completeTask._dueDate);

  taskContentMain.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);

  taskContentLeft.appendChild(taskContentMain);
  taskContentLeft.appendChild(taskInfo);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');
  btnContainer.setAttribute('id', `btn-container-${list._title}-complete-${index}`);

  const taskDeleteBtn = document.createElement('button');
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  taskDeleteBtn.appendChild(deleteImg);
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.classList.add(`task-delete-btn`);
  taskDeleteBtn.setAttribute('id', `checked-${index}`);

  const taskEditBtn = document.createElement('button');
  const editImg = new Image ();
  editImg.src = editIcon;
  taskEditBtn.appendChild(editImg);
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.classList.add(`task-edit-btn`);
  taskEditBtn.setAttribute('id', `checked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);

  taskContentRight.appendChild(btnContainer);

  taskContent.appendChild(taskContentLeft);
  taskContent.appendChild(taskContentRight);

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
  
}



function addTaskListeners(list){
  document.querySelectorAll(`.checkbox-unchecked-${list._title}`).forEach((uncheckedCheckbox) => {
    uncheckedCheckbox.addEventListener('click', () => {
      updateTaskLists(uncheckedCheckbox.getAttribute('id'), list._tasks, list._completedTasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      
      updateTaskCount(list);
      updateListInfo(list);
    });
  });

  document.querySelectorAll(`.checkbox-checked-${list._title}`).forEach((checkedCheckbox) => {
    checkedCheckbox.addEventListener('click', () => {

      updateTaskLists( checkedCheckbox.getAttribute('id'), list._completedTasks, list._tasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      updateTaskCount(list);
      updateListInfo(list);
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
      updateTaskCount(list);
      
      updateListInfo(list);
    });
  });


  document.querySelectorAll(`.task-edit-btn-${list._title}`).forEach((btn) =>{
    btn.addEventListener('click', () => {
      const btnInfo = btn.getAttribute('id').split('-');
      const taskList = btnInfo[0] === 'unchecked' ? list._tasks : list._completedTasks;
      const taskIndex = btnInfo[1];

     
      renderTaskForm(list, 'update', taskList[taskIndex]);
      fillInUpdateTaskForm(taskList[taskIndex]);
    })
  })

  document.querySelectorAll(`.task-content-${list._title}`).forEach((task) =>{
    task.addEventListener('mouseover', () => {
      const taskInfo = task.getAttribute('id').split('-');
      const taskType = taskInfo[2];
      const taskIndex = taskInfo[3];

      const btnContainer = document.getElementById(`btn-container-${list._title}-${taskType}-${taskIndex}`);
      btnContainer.style.display = 'flex';


    })
  })

  document.querySelectorAll(`.task-content-${list._title}`).forEach((task) =>{
    task.addEventListener('mouseout', () => {
      const taskInfo = task.getAttribute('id').split('-');
      const taskType = taskInfo[2];
      const taskIndex = taskInfo[3];

      const btnContainer = document.getElementById(`btn-container-${list._title}-${taskType}-${taskIndex}`);
      btnContainer.style.display = 'none';


    })
  })
  
  
}

export function addNewTask(list, newTask){
  list._tasks.push(newTask);
  renderTasks(list);
  updateTaskCount(list);
  updateListInfo(list);
}

export function updateTask(task, newTaskTitle, newTaskNote, newTaskDueDate, list){
  task._title = newTaskTitle;
  task._note = newTaskNote;
  task._dueDate = newTaskDueDate;
  renderTasks(list);
  updateTaskCount(list);

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






