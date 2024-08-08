import './styles/main.css';
import { renderContent, Task , renderTasks} from './scripts/tasks';
import { lists} from './scripts/lists';
import { renderSideBar, renderMainContent, setClickedStyle } from './scripts/side-bar';





setClickedStyle('all-btn');
document.getElementById('content').innerHTML = '';
lists.forEach((list) => {
  renderContent(list);
  renderTasks(list);
});
renderMainContent('ALL');
document.querySelectorAll('.list-title').forEach((header) =>{
  header.style.fontWeight = '500';
});
