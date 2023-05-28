/*
    The following is javaScript program for the functionalities of a todo list application. The program contains an todo list object 
    and two event listener implemmentations to run the nessacery object functions upon user action (button click).

    Todo List object. The object contains the todo list array that houses the todo inputs and date. 
    The fillTodoListArray gets the inputs from the item input and due-date input and pushes it into a object and stores it in the todo List Array.
    The displayTodoList uses forEach function to loop through the array and renders the contents to the paragraph division. 
    The deleteTodoItem deletes a todo list entry from the array and display when the delete button is clicked. The clearTodoList function clears  all array and
    the todo list that was rendered.
*/

const todoList = {
    // Todo List Array to houses inputs
    todoListArray : [],

    // Function to fill todoListArray with user input of todo item and duedate.
    fillTodoListArray(){

        // Using querySelector to bind input entry to variables name and duedate.
        let listItemName = document.querySelector(".todoListItem_Js");
            let name = listItemName.value;
        let listItemDuedate = document.querySelector(".todoListDate");
            let duedate = listItemDuedate.value;

        // Push variables into an object and house in the todoListArray
        this.todoListArray.push({name, duedate});
    
        // Clean varaible after use
        listItemName.value = null;
        listItemDuedate.value = null; 
    },

    // Function to render the todo items on the page 
    displayTodoList(){
        // Creating todoListHTML varaible to store contents to be rendered.
        let todoListHTML = "";

        // Using forEach funtion to callbacck a arrow function to loop throught the todoListArray and binding the values to paragraph variable
        //that will be later used to render to the page.
        this.todoListArray.forEach((todoArrayObject, index)=>{
            const {name, duedate} = todoArrayObject;
            const paragraph = `
                <div>${name}</div>
                <div>${duedate}</div>
                <button class="todoItemDelBtn-css todoItemDelBtn-js"
                ">Delete</button>
        `;
            todoListHTML += paragraph;
        })

        /*
        // Using a for loop to archieve what forEach function above did.
        for (let i=0;i<this.todoListArray.length;i++){
            const todoArrayObject = this.todoListArray[i];
            const {name, duedate} = todoArrayObject;
            const paragraph = `
                <div>${name}</div>
                <div>${duedate}</div>
                <button class="todoItemDelBtn" onclick="
                    todoList.deleteTodoItem(${i});
                ">Delete</button>
        `;
            todoListHTML += paragraph;
        }*/

        // Adding the contents to  the page using dom query Selector.
        document.querySelector('.todoListParagraphs-js')
            .innerHTML = todoListHTML;
        
        // Event Listener Implementation for delete todo item button.
        document.querySelectorAll('.todoItemDelBtn-js')
            .forEach((deleteItem, index)=>{
                deleteItem.addEventListener('click', ()=> {
                    this.deleteTodoItem(index); 
                })
        });
    },

    // Function to delet the todo list item from the page.
    deleteTodoItem(index) {
        // Using splice mehtod to delete the contents of the item to be deleted from the array.
        this.todoListArray.splice(index, 1);
        // Calling the display function to diplay the updated contents of  the array.
        this.displayTodoList();
        
    },

    //Function to clear all contents rendered
    clearTodoList(){
        // On call, the array is emptied out.
        this.todoListArray = [];
        // Contents to be rendered is also set to and empty string
        let todoListHTML = null;
        document.querySelector('.todoListParagraphs-js')
            .innerHTML = todoListHTML;

    },
    handleCostKey(event){
        if(event.key ==='Enter'){
            this.fillTodoListArray();
            this.displayTodoList();
        }
    }
    
}

// Event Listener Implemention for Add button.
document.querySelector('.todoListAddBtn_Js')
    .addEventListener('click', ()=>{
    todoList.fillTodoListArray();
    todoList.displayTodoList();
})
    

// Event Listener Implemention for Clear Todo List button.
document.querySelector('.todoListClear-Btn-js').addEventListener('click', ()=>{
    todoList.clearTodoList();
})

