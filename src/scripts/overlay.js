import '../styles/overlay.css';


export function openOverlay(){
  document.getElementById('overlay').style.display = 'block';
}

export function closeOverlay(){
  document.getElementById('overlay').style.display = 'none';
}