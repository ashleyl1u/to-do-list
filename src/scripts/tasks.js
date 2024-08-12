
import {  renderTaskForm} from './forms';
import {  updateLocalStorage } from './lists';
import {setClickedStyle, updateTaskCount} from './side-bar';
import { updateListInfo} from './content';

import '../styles/tasks.css';

import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';

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


function renderATask(task, index, list, status){
  const checkboxStatus = status === 'uncomplete' ? 'unchecked' : 'checked';
  const taskStatus = status === 'uncomplete' ? 'uncomplete' : 'complete';

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  if(status === 'complete'){
    taskContent.classList.add('complete');
  }

  taskContent.setAttribute('id', `task-content-${taskStatus}-${index}-${list._title}`);

  const taskContentLeft = document.createElement('div');
  taskContentLeft.classList.add('task-content-left');
  
  const taskContentRight = document.createElement('div');
  taskContentRight.classList.add('task-content-right');

  const taskContentMain = document.createElement('div');
  taskContentMain.classList.add('task-main-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-${checkboxStatus}`);
  checkbox.setAttribute('id', `checkbox-${index}-${checkboxStatus}-${list._title}`);

  taskContentMain.appendChild(checkbox);

  if(status === 'complete'){
    const checkboxChecked = document.createElement('div');
    checkbox.appendChild(checkboxChecked);
    checkboxChecked.classList.add(`${checkboxStatus}`);
  }

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
  btnContainer.setAttribute('id', `btn-container-${list._title}-${taskStatus}-${index}`);

  const taskDeleteBtn = document.createElement('button');
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  taskDeleteBtn.appendChild(deleteImg);
  taskDeleteBtn.classList.add(`task-delete-btn`);
  taskDeleteBtn.setAttribute('id', `task-delete-btn-${checkboxStatus}-${index}-${list._title}`);

  const taskEditBtn = document.createElement('button');
  const editImg = new Image ();
  editImg.src = editIcon;
  taskEditBtn.appendChild(editImg);
  taskEditBtn.classList.add(`task-edit-btn`);
  taskEditBtn.setAttribute('id', `task-edit-btn-${checkboxStatus}-${index}-${list._title}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);

  taskContentRight.appendChild(btnContainer);

  taskContent.appendChild(taskContentLeft);
  taskContent.appendChild(taskContentRight);

  document.getElementById(`${taskStatus}d-task-container-${list._title}`).appendChild(taskContent);

  addListeners(list, checkboxStatus, taskStatus, index)

}


function addListeners(list, checkboxStatus, taskStatus, index){

  document.getElementById(`checkbox-${index}-${checkboxStatus}-${list._title}`).addEventListener('click', () => {
    
    updateCompleteUncompleteTasks(index, checkboxStatus, list);
    updateTaskCount(list);
    updateListInfo(list);

  });

  document.getElementById(`task-delete-btn-${checkboxStatus}-${index}-${list._title}`).addEventListener('click', () => {

    deleteTask(checkboxStatus, list); 
    updateTaskCount(list);
    updateListInfo(list);
  });


  document.getElementById(`task-edit-btn-${checkboxStatus}-${index}-${list._title}`).addEventListener('click', () => {
    const task = checkboxStatus === 'unchecked' ? list._tasks : list._completedTasks;
    renderTaskForm(list, 'update', task[index]);
  });

  document.getElementById(`task-content-${taskStatus}-${index}-${list._title}`).addEventListener('mouseover', (e) => {
    const btnContainer = document.getElementById(`btn-container-${list._title}-${taskStatus}-${index}`);
    btnContainerHoverEffect(e, btnContainer);
  });

  document.getElementById(`task-content-${taskStatus}-${index}-${list._title}`).addEventListener('mouseout', (e) => {
  
    const btnContainer = document.getElementById(`btn-container-${list._title}-${taskStatus}-${index}`);
    btnContainerHoverEffect(e, btnContainer);
  });

}


export function renderTasks (list) {
  const tasks = list._tasks;
  const completedTasks = list._completedTasks;

  document.getElementById(`uncompleted-task-container-${list._title}`).innerHTML = '';
  tasks.forEach((task, index) =>{
    renderATask(task, index, list, 'uncomplete');
    
  });

  document.getElementById(`completed-task-container-${list._title}`).innerHTML = '';
  completedTasks.forEach((completeTask, index) => {
    renderATask(completeTask, index, list, 'complete');
    
  });
  
}

function deleteTask (checkboxStatus, list){
  checkboxStatus === 'unchecked' ? list._tasks.splice(index,1) : list._completedTasks.splice(index,1);

  updateLocalStorage();

  renderTasks(list);
  
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


function updateCompleteUncompleteTasks(index, status, list) {
  let removeArr;
  let addArr;

  if(status === 'unchecked'){
    removeArr = list._tasks;
    addArr = list._completedTasks;
  }
  else{
    removeArr = list._completedTasks ;
    addArr = list._tasks;
  }

  const removedTask = removeArr.splice(index, 1);
  addArr.push(removedTask[0]);

  updateLocalStorage();

  renderTasks(list);

}



function btnContainerHoverEffect(e, btnContainer){
  e.type === 'mouseover' ? btnContainer.style.display = 'flex': btnContainer.style.display = 'none';
}


export function formatDate (dueDate){
  if(dueDate === ''){
    return '';
  }
  const dateInfo = dueDate.split('-');
  
  const date = new Date(dateInfo[0], dateInfo[1]-1, dateInfo[2]);
  return (format(date,'MMM d, yyyy'));
}
