

export class Task{
  constructor(title, note = false){
    this.title = title;
    this.note = note;
  }

  setTitle(title){
    this.title = title;
  }

  setNote (note){
    this.note = note;
  }

  getTitle(){
    return this.title;
  }

  getNote(){
    return this.note;
  }

}


export function renderTasks() {
  const newTaskBtn = document.createElement('button');
  newTaskBtn.setAttribute('id', 'new-task-btn');
  newTaskBtn.textContent = '+ new task';

  document.getElementById('content').appendChild(newTaskBtn);

  addListeners();
  
}

function addListeners(){

  document.getElementById('new-task-btn').addEventListener('click', () => {
    console.log('here');
  })
}

