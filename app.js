const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');

const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');

const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');

const listUl = listDiv.querySelector('ul');

/*
  Hide/show listDiv
*/
toggleList.addEventListener('click', () => {
  if (listDiv.style.display == 'none') {
    toggleList.textContent = 'Hide List';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  }
});

/*
  Update paragraph
*/
descriptionButton.addEventListener('click', () => {
  descriptionP.innerText = descriptionInput.value + ':';
  descriptionInput.value = '';
});


/*
  Add a new item to list
*/
addItemButton.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = addItemInput.value;
  attachListItemButtons(li);
  listUl.appendChild(li);
  addItemInput.value = '';
});

/*
  Handle events when Up, Down, Remove buttons are clicked
*/
listUl.addEventListener('click', (event) => {
  const li = event.target.parentNode;
  const ul = li.parentNode;
  const prevLi = li.previousElementSibling;
  const nextLi = li.nextElementSibling;

  if (event.target.tagName === 'BUTTON') {
    switch (event.target.className) {
      case 'remove':
        li.remove();
        break;
      case 'up':
        if (prevLi) {
          ul.insertBefore(li, prevLi);
          updateListItemDisplay(li);
          updateListItemDisplay(prevLi);
        }
        break;
      case 'down':
        if (nextLi) {
          ul.insertBefore(nextLi, li);
          updateListItemDisplay(li);
          updateListItemDisplay(nextLi);
        }
        break;
    }
  }
});

/*
  Attach Up, Down, Remove buttons to the list item
*/
function attachListItemButtons(li) {
  const up = document.createElement('button');
  up.className = 'up';
  up.textContent = 'Up';
  li.appendChild(up);

  const down = document.createElement('button');
  down.className = 'down';
  down.textContent = 'Down';
  li.appendChild(down);

  const remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);
}

/*
  Update display properties depending on if the list item is
  first, last, or middle in the list
*/
function updateListItemDisplay(li) {
  // Set background colors of first and last items
  if (li === listUl.firstElementChild)
    li.style.backgroundColor = 'lightskyblue';
  else if (li === listUl.lastElementChild)
    li.style.backgroundColor = 'lightsteelblue';
  else
    li.style.backgroundColor = 'white';
  // Toggle visibility of first and last items' buttons
  const up = li.querySelector('button.up');
  const down = li.querySelector('button.down');
  up.style.display = (li === listUl.firstElementChild) ? 'none' : 'block';
  down.style.display = (li === listUl.lastElementChild) ? 'none' : 'block';  
}

/*
  Attach Up, Down, Remove buttons for list items in the original html
*/
for (const li of listUl.children) {
  attachListItemButtons(li);
  updateListItemDisplay(li);
}
