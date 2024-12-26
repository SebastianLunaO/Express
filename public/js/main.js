const output = document.getElementById('output');;
const button = document.getElementById('get-posts-btn');
const form = document.getElementById('add-post-form');
const buttonSub = document.getElementById('newSubmit');
// script.js

async function updateCardTitle(id, newTitle, titleElement) {
  try {
    // Send a PATCH request to update the title
    const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'PUT', // Or 'PUT' depending on your server's implementation
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!response.ok) {
      console.error('Failed to update the card on the server');
      return;
    }

    // Update the title in the DOM
    titleElement.textContent = `Title: ${newTitle}`;
    console.log(`Card with ID ${id} updated successfully`);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteCard(id, cardElement) {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.error('Failed to delete the card on the server');
        return;
      }
  
      // Remove the card from the DOM if the server responds successfully
      cardElement.remove();
      console.log(`Card with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function addPost(e){
    e.preventDefault();
    const formData = new FormData(this);
    console.log(formData);
    const title = formData.get('title'); //selecting the element by the name in HTML File

    try {
        const res = await fetch('http://localhost:8000/api/posts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        });

        if(!res.ok){
            throw new Error('Failed to add post')
        }
        form.reset()
        fetchData();
    } catch (error) {
        console.error('Error adding post',error)
    }
}

async function fetchData() {
    try {
      // Replace with your server's endpoint
      const response = await fetch('http://localhost:8000/api/posts'); 
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      clearPage()
      displayCards(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function clearPage() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear all child elements
  }
  
  // Generate cards dynamically
  function displayCards(data) {
    const cardContainer = document.getElementById('card-container');
  
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
  
      const idElement = document.createElement('h2');
      idElement.textContent = `ID: ${item.id}`;
  
      const titleElement = document.createElement('p');
      titleElement.textContent = `Title: ${item.title}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteCard(item.id, card));
  
      const editButton = document.createElement('button');
      editButton.className = 'edit';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const newTitle = prompt('Enter new title:', item.title); // Prompt for the new title
        if (newTitle) {
          updateCardTitle(item.id, newTitle, titleElement); // Update the title
        }
      });
  
      card.appendChild(idElement);
      card.appendChild(titleElement);
      card.appendChild(deleteButton);
      card.appendChild(editButton);
      cardContainer.appendChild(card);
    });
  }
  
  // Initialize fetching
  fetchData();
 form.addEventListener('submit',addPost)
  // script.js
  // Send a DELETE request to the server
 
  
  
  

  