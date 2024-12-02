export const devModeGenerator = (()=>{

    const testData = Array.from({ length: 25 }, () => {
      const text = generateRandomText();
      const dueDate = generateRandomDate();
      const priority = generateRandomPriority();
      return { text, dueDate, priority };
    });

    function generateRandomText() {
      const genericTodos = [
        "Buy groceries",
        "Clean the house",
        "Walk the dog",
        "Do laundry",
        "Pay bills",
        "Call mom",
        "Go for a run",
        "Read a book",
        "Write a blog post",
        "Organize closet",
        "Plan vacation",
        "Fix leaking faucet",
        "Study for exam",
        "Attend meeting",
        "Cook dinner",
        "Take out the trash",
        "Water the plants",
        "Mow the lawn",
        "Paint the walls",
        "Repair the car",
        "Renew gym membership",
        "Learn a new skill",
        "Volunteer at local shelter",
        "Watch a movie",
        "Practice meditation"
      ];
      const randomIndex = Math.floor(Math.random() * genericTodos.length);
      return genericTodos[randomIndex];
    }

    function generateRandomDate() {
      const startDate = new Date('2021-01-01');
      const endDate = new Date('2024-06-05');
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      const shouldReturnEmpty = Math.random() < 0.5; // 50% chance of returning an empty string
      return shouldReturnEmpty ? null : randomDate.toISOString().split('T')[0];
    }

    function generateRandomPriority() {
      const priorities = [0, 1, 2];
      const randomIndex = Math.floor(Math.random() * priorities.length);
      return priorities[randomIndex];
    }
    
    console.log(testData);


    const apiUrl = import.meta.env.VITE_API_URL;
    let interval = 100; //waiting time between requests
    let promise = Promise.resolve();
    testData.forEach(function (todo){
      promise = promise.then(function(){
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({text: todo.text, dueDate: todo.dueDate, doneState: false, priority: todo.priority})
        };
        return fetch(apiUrl + '/api/todos', requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if(data.id<=-1){
                alert(data.text);
              }
            });
      });
      promise = promise.then(function(){
        return new Promise(function(resolve){
          setTimeout(resolve, interval);
        });
      });
    } 
    );

    promise.then(function(){
      console.log("All todos added!");
    });
  })