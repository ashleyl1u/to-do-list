
class List {
  constructor(title){
    this._title = title;
    this._tasks = [];
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
}

export let lists = [new List('Athena')];


export function renderLists() {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';

  lists.forEach((list, index) =>{
    const listContent = document.createElement('div');
    listContent.classList.add('list-content');

    const listBtn = document.createElement('div');
    listBtn.textContent = list.title;

    const listDeleteBtn = document.createElement('button');
    listDeleteBtn.textContent = 'x';
    listDeleteBtn.classList.add('delete-list-btn');
    listDeleteBtn.setAttribute('id', index);


    listContent.appendChild(listBtn);
    listContent.appendChild(listDeleteBtn);

    listContainer.appendChild(listContent);
  });

  addListListeners();
}

function addListListeners(){
  document.querySelectorAll('.delete-list-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeList(btn.getAttribute('id'));
    });
  });
}

function removeList(index) {
  lists.splice(index,1);
  renderLists();
}



export function renderOverlay () {
  const newListForm = document.createElement('form');
  newListForm.setAttribute('id','new-list-form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'List Name:';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'list-name-input');

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'error');

  const formBtn = document.createElement('button');
  formBtn.textContent = 'Enter';
  formBtn.setAttribute('id', 'list-submit-btn');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.setAttribute('id', 'list-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  
  newListForm.appendChild(nameLabel);
  newListForm.appendChild(nameInput);
  newListForm.appendChild(errorMsg);
  newListForm.appendChild(formBtn);
  newListForm.appendChild(cancelBtn);


  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  overlay.appendChild(newListForm);

  document.body.appendChild(overlay);

  addOverlayListeners();
  
}


function addOverlayListeners() {
  document.getElementById('list-cancel-btn').addEventListener('click', () => {
    closeOverlay();
    resetForm();
  });

  document.getElementById('new-list-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = document.getElementById('list-name-input').value;
    
    if(listName === ''){
      document.getElementById('error').textContent = '*Required';
    }
    else{
      resetForm();
      closeOverlay();
      addList(listName);
      renderLists();
    }
    
  });


  document.getElementById('list-name-input').addEventListener('focus', () => {
    document.getElementById('error').textContent = '';
  });
}

export function openOverlay(){
  document.querySelector('.overlay').style.display = 'block';
}

function closeOverlay(){
  document.querySelector('.overlay').style.display = 'none';
}


function addList (listName){
  lists.push(new List(listName));
  
}

function resetForm(){
  document.getElementById('list-name-input').value = '';
  document.getElementById('error').textContent= '';
}