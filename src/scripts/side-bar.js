
import { renderLists, openOverlay } from "./lists";

export function renderSideBar() {

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

