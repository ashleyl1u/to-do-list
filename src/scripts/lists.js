import { setClickedStyle } from "./side-bar";
import { renderListContent, renderAllListContent } from "./content";
import { renderTaskForm } from "./forms";

import deleteIcon from '../icons/delete.svg';
import addIcon from '../icons/add.svg';


export class List {
  constructor(title){
    this.title = title;
    this.tasks = [];
    this.completedTasks = [];
  }

  get tasks(){
    return this._tasks;
  }

  set tasks(tasks){
    this._tasks = tasks;
  }

  get title(){
    return this._title;
  }

  set title(title){
    this._title = title;
  }

  get completedTasks(){
    return this._completedTasks;
  }

  set completedTasks(completedTasks){
    this._completedTasks = completedTasks;
  }
}


export let lists = JSON.parse(localStorage.getItem('lists')) === null ? [] : JSON.parse(localStorage.getItem('lists'));

export function updateLocalStorage(){
  localStorage.setItem('lists', JSON.stringify(lists));
}







export function renderLists() {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';

  lists.forEach((list, index) =>{
    const listContent = document.createElement('div');
    listContent.classList.add('list-content');
    listContent.setAttribute('id', index);

    const listBtn = document.createElement('div');
    listBtn.textContent = list._title;

    const listDeleteBtn = document.createElement('button');
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;
    listDeleteBtn.appendChild(deleteImg);
    listDeleteBtn.classList.add('delete-list-btn');
    listDeleteBtn.setAttribute('id', `delete-list-btn-${index}`);

    const listTaskCount = document.createElement('h6');
    listTaskCount.textContent = list._tasks.length;
    listTaskCount.classList.add('list-task-count');
    listTaskCount.setAttribute('id', `list-task-count-${index}`);

    listContent.appendChild(listBtn);
    listContent.appendChild(listDeleteBtn);
    listContent.appendChild(listTaskCount);

    listContainer.appendChild(listContent);
  });

  addListListeners();
}

function addListListeners(){
  document.querySelectorAll('.delete-list-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const listIndex = btn.getAttribute('id').split('-')[3];
      removeList(listIndex);
    });
  });

  document.querySelectorAll('.list-content').forEach((list, index) => {
    list.addEventListener('click', () => {
      setClickedStyle(index);
      
      const clickedList = lists[list.getAttribute('id')];
      renderListContent(clickedList);
    });

    list.addEventListener('mouseover', () =>  {
      const deletebtn = document.getElementById(`delete-list-btn-${list.getAttribute('id')}`);
      deletebtn.style.display = 'block';

      const taskCount = document.getElementById(`list-task-count-${list.getAttribute('id')}`);
      taskCount.style.display = 'none';
    });
    list.addEventListener('mouseout', () =>  {
      const deletebtn = document.getElementById(`delete-list-btn-${list.getAttribute('id')}`);
      deletebtn.style.display = 'none';

      const taskCount = document.getElementById(`list-task-count-${list.getAttribute('id')}`);
      taskCount.style.display = 'block';
    });
  });
}

function removeList(index) {
  lists.splice(index,1);
  renderLists();
  updateLocalStorage();

  renderAllListContent();
}


export function addNewList (listName){
  const newList = new List(listName); 
  lists.push(newList);
  localStorage.setItem('lists', JSON.stringify(lists));
  renderListContent(newList);
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
    showHideTasks(list);
  });
 
}


function showHideTasks(list){
  const completedTaskContainer = document.getElementById(`completed-task-container-${list._title}`);
  const showHideBtn = document.getElementById(`show-hide-btn-${list._title}`);
  const listStatus = showHideBtn.textContent;

  listStatus === 'show' ? completedTaskContainer.style.display = 'block' : completedTaskContainer.style.display = 'none';
  listStatus === 'show' ? showHideBtn.textContent = 'hide': showHideBtn.textContent = 'show';
}