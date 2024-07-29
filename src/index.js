import './styles/main.css';
import { renderContent, Task , renderTasks} from './scripts/tasks';
import {  List , lists} from './scripts/lists';
import { renderSideBar } from './scripts/side-bar';





const tempTask = new List('Athena');
tempTask.tasks.push(new Task('Homework', 'please'));
tempTask.tasks.push(new Task('grocery', 'please'));
tempTask.tasks.push(new Task('assignment', 'please'));

tempTask.completedTasks.push(new Task('Complete work', 'please'));

const tempTask2 = new List('Alvin');
tempTask2.tasks.push(new Task('twp', 'WORK'));


lists.push(tempTask);
lists.push(tempTask2);

renderSideBar();

document.getElementById('content').innerHTML='';
lists.forEach((list) => {
  renderContent(list);
  renderTasks(list);
});

/*
  create an all page 
 get item --> if null --> create a list
*/ 