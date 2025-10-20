// declare global randomNum variable
let randomNum;
let attemptNum = 5;
let btnCheck = document.getElementById('btn_check');
let btnNewGame = document.getElementById('btn_newgame');
let buttons = document.querySelectorAll('.numbers button');
//historylist exist or not
let alreadyExists = false;

window.onload = function () {
    //set the value
    document.getElementById('message_area_id').innerHTML = "Feedback for your guess!"

    document.getElementById('chosen_num_area').value = "";

    document.getElementById('attemptCount').innerHTML = attemptNum;

    //generate a random number
    randomNum = Math.round(Math.random() * 40) + 1;
    console.log("the ramdom number is ", randomNum);

    // disable check button
    btnCheck.classList.add('disabled');
    btnCheck.disabled = true;
}

// select all number buttons
buttons.forEach(button => {
    // catch the event of clicking the number button 
    // print the clicked number in the chosen number area
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
            button.classList.remove('active')
            if (!alreadyExists) {
                btnCheck.classList.add("disabled");
                btnCheck.disabled = true;
                document.getElementById("chosen_num_area").value = "";
            }
        } else {
            buttons.forEach(btn => btn.classList.remove('active'))
            document.getElementById('chosen_num_area').value = "";
            btnCheck.classList.add('disabled');
            button.classList.add('active')
            btnCheck.classList.remove('disabled');
            btnCheck.disabled = false;
            document.getElementById('chosen_num_area').value = button.textContent;
        }
    })
})

//CHECK Button Event
btnCheck.addEventListener("click", function () {
    //decrease the attempts
    if (attemptNum > 0) {
        attemptNum--;
        document.getElementById("attemptCount").innerHTML = attemptNum;




        //take the clicked value from chosen number shown area
        const chosenNum = parseInt(document.getElementById("chosen_num_area").value);
        console.log("your chosen num :", chosenNum);

        //for history area data
        //create a new div sector as a history list
        const historyItem = document.createElement("div");
        historyItem.textContent = chosenNum;
        alreadyExists = true;
        console.log(historyItem);
        console.log(alreadyExists);
        document.getElementById("history_list_id").appendChild(historyItem);

        //checking the chosen number is the same or not with the random number
        if (chosenNum === randomNum) {
            document.getElementById("message_area_id").innerHTML = "Correct! You matched the Number."
            //when correct no need to continue the game! so start a new game 
            //but attempts left as count,
            btnCheck.classList.add("disabled");
            btnCheck.disabled = true;
            //disable all number buttons
            buttons.forEach(button => {
                button.classList.add("disabled")
                button.disabled = true;
            })

        } else {
            //determine the number range(1~10,11~20,21~30,31~40)
            const chosenNumRange = Math.ceil(chosenNum / 10)
            const randomNumRange = Math.ceil(randomNum / 10)

            const isClose = chosenNumRange === randomNumRange

            if (chosenNum > randomNum) {
                if (isClose) {
                    document.getElementById("message_area_id").innerHTML = "Close, but a bit high!"
                } else {
                    document.getElementById("message_area_id").textContent = "Too high! Try a lower number.";
                }

            } else {
                if (isClose) {
                    document.getElementById("message_area_id").innerHTML = "Close, but a bit low!"
                } else {
                    document.getElementById("message_area_id").textContent = "Too low! Try a higher number.";
                }

            }
        }
    }
    else {
        document.getElementById('attemptCount').innerHTML = attemptNum;
        document.getElementById('message_area_id').innerHTML = "You have no chance to try!<br>Please start a new game.";

        btnCheck.classList.add('disabled');
        btnCheck.disabled = true;
        //disable all number buttons
        buttons.forEach(button => {
            button.classList.add("disabled")
            button.disabled = attemptNum === 0;
        })

        //set the chosen number show area as clear
        document.getElementById('chosen_num_area').value = "";
    }
})

//NEW GAME button
btnNewGame.addEventListener("click", function () {
    //set the value
    document.getElementById('message_area_id').innerHTML = "Feedback for your guess!"

    document.getElementById('chosen_num_area').value = "";

    document.getElementById('attemptCount').innerHTML = attemptNum;

    //generate a random number
    randomNum = Math.round(Math.random() * 40) + 1;
    console.log("the ramdom number is ", randomNum);

    // disable check button
    btnCheck.classList.add('disabled');
    btnCheck.disabled = true;

    //clear selected button
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            buttons.forEach(btn => {
                btn.classList.remove('active')
            })
        }
    })

    //clear history item
    const clearHistoryList = document.getElementById("history_list_id");
    console.log(clearHistoryList);

    clearHistoryList.innerHTML = "";


})