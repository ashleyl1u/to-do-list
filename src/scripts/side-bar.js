
import { renderLists, openOverlay } from "./lists";
import '../styles/side-bar.css';

export function renderSideBar() {
  const myListHeader = document.createElement('h2');
  myListHeader.textContent = 'My Lists'; 
  document.getElementById('side-bar').appendChild(myListHeader);
  const listContainer = document.createElement('div');
  listContainer.setAttribute('id' , 'list-container');
  document.getElementById('side-bar').appendChild(listContainer);

  renderLists();

  const newListBtn = document.createElement('button');
  newListBtn.setAttribute('id', 'new-list-btn');
  newListBtn.textContent = '+ new list';

  document.getElementById('side-bar').appendChild(newListBtn);

  document.getElementById('new-list-btn').addEventListener('click', () => {
    openOverlay();
  });
  
}

