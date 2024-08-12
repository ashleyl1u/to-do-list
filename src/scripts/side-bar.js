
import { renderLists , lists, renderListHeader } from "./lists";
import { renderNewListForm} from './forms';
import {  renderTasks} from "./tasks";
import { renderListContent, renderAllListContent, renderTodayListContent} from "./content";
import '../styles/side-bar.css';
import addIcon from '../icons/add.svg';
import {format} from 'date-fns';

export function renderSideBar() {
  const sidebarTop = document.createElement('div');
  const sidebarBottom = document.createElement('div');

  //main lists 
  const mainHeader = document.createElement('h2');
  mainHeader.setAttribute('id', 'main-list-header');
  mainHeader.textContent = 'Main Lists'
  sidebarTop.appendChild(mainHeader);

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-container');

  const all = document.createElement('div');
  all.setAttribute('id', 'all-btn');
  all.textContent = 'All';

  mainContainer.appendChild(all);

  const today = document.createElement('div');
  today.setAttribute('id', 'today-btn');
  today.textContent = 'Today';
  mainContainer.appendChild(today);

  sidebarTop.appendChild(mainContainer);

  //users lists
  const listHeader = document.createElement('h2');
  listHeader.setAttribute('id', 'my-list-header');
  listHeader.textContent = 'My Lists'
  sidebarTop.appendChild(listHeader);

  const listContainer = document.createElement('div');
  listContainer.setAttribute('id' , 'list-container');
  sidebarTop.appendChild(listContainer);
  document.getElementById('side-bar').appendChild(sidebarTop);

  renderLists();

  

  const newListBtn = document.createElement('button');
  const addImg = new Image ();
  addImg.src = addIcon;
  addImg.classList.add('add-icon');
  newListBtn.setAttribute('id', 'new-list-btn');
  newListBtn.appendChild(addImg);

  newListBtn.innerHTML+= 'Add List';

  sidebarBottom.appendChild(newListBtn);

  
  document.getElementById('side-bar').appendChild(sidebarBottom);
  
  addSidebarListeners();
  
}


function addSidebarListeners(){
  document.getElementById('new-list-btn').addEventListener('click', () => {
    renderNewListForm();
  });


  document.getElementById('all-btn').addEventListener('click', () => {
    renderAllListContent();

  });

  document.getElementById('today-btn').addEventListener('click', () => {
    renderTodayListContent();
  });

}

export function setClickedStyle(elementId){
  document.getElementById('side-bar').innerHTML = '';
  renderSideBar();
  document.getElementById(elementId).style.backgroundColor = 'var(--grey-2)';
}



export function updateTaskCount(list){
  let listIndex;
  const listTitle = list._title;

  lists.forEach((l, index) =>{
    if(l._title === listTitle){
      listIndex = index;
    }
  })
  
  document.getElementById(`list-task-count-${listIndex}`).textContent = list._tasks.length;
}