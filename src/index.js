import './styles/main.css';
import { renderContent, Task } from './scripts/tasks';
import { renderOverlay, List } from './scripts/lists';
import { renderSideBar } from './scripts/side-bar';



renderSideBar();
const tempTask = new List('Athena');
tempTask.tasks.push(new Task('Complete Homework', 'please'));
tempTask.tasks.push(new Task('Complete grocery', 'please'));
tempTask.tasks.push(new Task('Complete assignment', 'please'));

tempTask.completedTasks.push(new Task('Complete work', 'please'));

renderContent(tempTask);
renderOverlay();