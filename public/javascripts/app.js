// IIFE --> Immediately invoked function expression
(function(){
    function Start() {
        console.log("App Started");
    }
    
    // Event listener, if the delete button is pressed a confirmation message will appear, confirming that the user wants to delete the assignment.
    window.addEventListener("load", Start);
    let deleteButtons = document.querySelectorAll('.btn-danger');
    for (button of deleteButtons) {
        button.addEventListener('click', (event) => {
            if(!confirm("Are you sure?")) {
                event.preventDefault();
                window.location.assign('/assignment-list');
            }
        });
    }
})();