
import { renderLists , renderNewListForm, lists } from "./lists";
import {openOverlay} from './overlay';
import { renderContent , renderTasks, updateListInfo} from "./tasks";
import '../styles/side-bar.css';
import addIcon from '../icons/add.svg';
import {format} from 'date-fns';

export function renderSideBar() {
  const sidebarTop = document.createElement('div');
  const sidebarBottom = document.createElement('div');

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

export function setClickedStyle(elementId){
  document.getElementById('side-bar').innerHTML = '';
  renderSideBar();
  document.getElementById(elementId).style.backgroundColor = 'var(--grey-2)';
}


function addSidebarListeners(){
  document.getElementById('new-list-btn').addEventListener('click', () => {
    openOverlay();
    renderNewListForm();
  });


  document.getElementById('all-btn').addEventListener('click', () => {
    setClickedStyle('all-btn');
    document.getElementById('content').innerHTML = '';
    lists.forEach((list) => {
      renderContent(list);
      renderTasks(list);
    });
    renderMainContent('ALL');
  });

  document.getElementById('today-btn').addEventListener('click', () => {
    document.getElementById('content').innerHTML = '';
    setClickedStyle('today-btn');
    lists.forEach((list) => {
      renderContent(list);
      renderTasks(list);
      
      showOnlyTodayTasks(list);
    });
    renderMainContent('TODAY');

    lists.forEach((list) => {
      updateListInfo(list);
    });
    
  });

}


export function showOnlyTodayTasks(list){
  const today = new Date();
  const todaysDate = format(today, 'yyyy-MM-dd');
  
  list._tasks.forEach((task, index) => {
    const taskDate = task._dueDate;
    if(taskDate === ''){
      document.getElementById(`task-content-uncomplete-${index}-${list._title}`).style.display = 'none';
    }
    else if (taskDate !== todaysDate){
      document.getElementById(`task-content-uncomplete-${index}-${list._title}`).style.display = 'none';
    }
    
  })

  list._completedTasks.forEach((task, index) => {
    const taskDate = task._dueDate;
    if(taskDate === ''){
      document.getElementById(`task-content-complete-${index}-${list._title}`).style.display = 'none';
    }
    else if (taskDate !== todaysDate){
      document.getElementById(`task-content-complete-${index}-${list._title}`).style.display = 'none';
    }
  })
}


export function renderMainContent(title){
  
  const mainTitle = document.createElement('h1');
  mainTitle.textContent = title;
  mainTitle.setAttribute('id', `main-list-title`);
  mainTitle.classList.add('main-list-title');

  document.getElementById('main-list-header-container').appendChild(mainTitle);


}