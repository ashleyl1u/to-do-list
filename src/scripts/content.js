import { renderTasks } from "./tasks";
import { lists , renderListHeader} from "./lists";
import { setClickedStyle } from "./side-bar";

import { format } from "date-fns";


export function renderListContent(list){
  document.getElementById('content').innerHTML='';
  renderListHeader(list);
  renderTasks(list);
}

export function renderAllListContent(){
  setClickedStyle('all-btn');

  renderContentHeader('ALL');
  lists.forEach((list) => {
    renderListHeader(list);
    renderTasks(list);
  });

  styleMainListContent();
}


export function renderTodayListContent(){
    setClickedStyle('today-btn');

    renderContentHeader('TODAY');
    lists.forEach((list) => {
      renderListHeader(list);
      renderTasks(list);
      showOnlyTodayTasks(list);
      updateListInfo(list);
    });
    
    styleMainListContent();

}

function styleMainListContent(){
  document.querySelectorAll('.list-title').forEach((header) =>{
    header.style.fontWeight = '500';
  });
}

function renderContentHeader(title){
  resetContentDiv();
  const mainTitle = document.createElement('h1');
  mainTitle.textContent = title;
  mainTitle.setAttribute('id', `main-list-title`);
  mainTitle.classList.add('main-list-title');

  document.getElementById('main-list-header-container').appendChild(mainTitle);

}

function resetContentDiv(){
  document.getElementById('content').innerHTML = '';

  const mainListTitle = document.createElement('div');
  mainListTitle.setAttribute('id', 'main-list-header-container');
  document.getElementById('content').appendChild(mainListTitle);
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

export function updateListInfo(list){
  let taskRemaining = list._tasks.length;
  let taskCompleted = list._completedTasks.length;

  const mainListTitle = document.getElementById('main-list-title');
  if(mainListTitle !== null){
    if(mainListTitle.textContent === 'TODAY'){
      taskRemaining =0;
      taskCompleted = 0;

      const today = new Date();
      const todaysDate = format(today, 'yyyy-MM-dd');
      
      list._tasks.forEach((task) => {
        const taskDate = task._dueDate;
        if (taskDate === todaysDate){
          taskRemaining++;
        }
      })

      list._completedTasks.forEach((task) => {
        const taskDate = task._dueDate;
        if (taskDate === todaysDate){
          taskCompleted++;
        }
      })
    }
  }

  document.getElementById(`list-info-${list._title}`).textContent = `${taskRemaining} Tasks Remaining · ${taskCompleted} Completed`;


}