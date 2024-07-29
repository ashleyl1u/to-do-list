
import { renderLists , renderNewListForm, lists } from "./lists";
import {openOverlay} from './overlay';
import { renderContent , renderTasks} from "./tasks";
import '../styles/side-bar.css';

export function renderSideBar() {
  const myListHeader = document.createElement('h2');
  myListHeader.textContent = 'My Lists'; 
  document.getElementById('side-bar').appendChild(myListHeader);

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-container');

  const all = document.createElement('div');
  all.setAttribute('id', 'all-btn');
  all.textContent = 'All';

  mainContainer.appendChild(all);
  document.getElementById('side-bar').appendChild(mainContainer);


  const listContainer = document.createElement('div');
  listContainer.setAttribute('id' , 'list-container');
  document.getElementById('side-bar').appendChild(listContainer);

  renderLists();

  const newListBtn = document.createElement('button');
  newListBtn.setAttribute('id', 'new-list-btn');
  newListBtn.textContent = '+ new list';

  document.getElementById('side-bar').appendChild(newListBtn);

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