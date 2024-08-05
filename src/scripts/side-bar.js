
import { renderLists , renderNewListForm, lists } from "./lists";
import {openOverlay} from './overlay';
import { renderContent , renderTasks} from "./tasks";
import '../styles/side-bar.css';
import addIcon from '../icons/add.svg';

export function renderSideBar() {
  const sidebarTop = document.createElement('div');
  const sidebarBottom = document.createElement('div');


  const todoHeader = document.createElement('h1');
  todoHeader.textContent = 'To-Do'; 
  sidebarTop.appendChild(todoHeader);

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-container');

  const all = document.createElement('div');
  all.setAttribute('id', 'all-btn');
  all.textContent = 'All';

  mainContainer.appendChild(all);
  sidebarTop.appendChild(mainContainer);

  const listHeader = document.createElement('h2');
  listHeader.setAttribute('id', 'list-header');
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
    openOverlay();
    renderNewListForm();
  });


  document.getElementById('all-btn').addEventListener('click', () => {
    document.getElementById('content').innerHTML='';
    lists.forEach((list) => {
      renderContent(list);
      renderTasks(list);
    })
  });
}