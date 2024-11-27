document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todoForm');
  const taskInput = document.getElementById('taskInput');
  const todoList = document.getElementById('todoList');

  // Lataa tehtävät localStorage:sta
  loadTasks();

  // Lomakkeen lähetyksen käsittely
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const taskText = taskInput.value.trim();

      if (taskText === '') {
          showError('Tehtävä ei voi olla tyhjä!');
          return;
      }

      if (taskText.length < 3) {
          showError('Tehtävän tulee olla vähintään 3 merkkiä pitkä!');
          return;
      }

      addTask(taskText); // Lisää uusi tehtävä
      taskInput.value = ''; // Tyhjennä syötekenttä
      taskInput.classList.remove('error'); // Poista virhetyyli
  });

  // Lisää tehtävä listalle
  function addTask(taskText, completed = false) {
      const li = document.createElement('li');
      li.textContent = taskText;

      // Jos tehtävä on merkitty hoidetuksi, lisää "completed"-luokka
      if (completed) {
          li.classList.add('completed');
      }

      // Merkitse tehtävä hoidetuksi -nappi
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Merkitse hoidetuiksi';
      completeButton.classList.add('complete');
      completeButton.addEventListener('click', () => {
          li.classList.add('completed'); // Lisää "completed"-luokka
          saveTasks(); // Päivitä tallennus
      });

      // Poista tehtävä -nappi
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Poista';
      removeButton.classList.add('remove');
      removeButton.addEventListener('click', () => {
          li.remove(); // Poista tehtävä listalta
          saveTasks(); // Päivitä tallennus
      });

      // Lisää napit tehtäväelementtiin
      li.appendChild(completeButton);
      li.appendChild(removeButton);
      todoList.appendChild(li);

      saveTasks(); // Päivitä tallennus
  }

  // Tallenna kaikki tehtävät localStorageen
  function saveTasks() {
      const tasks = [];
      const taskItems = todoList.querySelectorAll('li');
      taskItems.forEach(item => {
          const taskText = item.childNodes[0].textContent.trim(); // Hae vain tekstisisältö (ei nappeja)
          const isCompleted = item.classList.contains('completed'); // Tarkista onko tehtävä hoidettu
          tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Tallenna JSON-muotoisena
  }

  // Lataa tehtävät localStorage:sta
  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed)); // Lisää jokainen tallennettu tehtävä
  }

  // Näytä virheilmoitus
  function showError(message) {
      taskInput.classList.add('error'); // Lisää virhetyyli syötekenttään
      alert(message); // Näytä ilmoitus
  }
});
