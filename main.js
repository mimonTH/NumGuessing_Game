// declare global randomNum variable
let randomNum;
let initialAttemptNum = 5;
let attemptNum;
let btnCheck = document.getElementById('btn_check');
let btnNewGame = document.getElementById('btn_newgame');
let buttons = document.querySelectorAll('.numbers button');
//historylist exist or not
let alreadyExists;

window.onload = function () {
    initGame();
    
}

function initGame() {
    //set the value
    document.getElementById('message_area_id').innerHTML = "推測のフィードバック！"

    document.getElementById('chosen_num_area').value = "";

    document.getElementById('attemptCount').innerHTML = initialAttemptNum;
    attemptNum = initialAttemptNum;

    //generate a random number
    randomNum = Math.round(Math.random() * 40) + 1;
    console.log("the ramdom number is ", randomNum);

    // disable check button
    btnCheck.classList.add('disabled');
    btnCheck.disabled = true;

    //clear history item
    const clearHistoryList = document.getElementById("history_list_id");
    console.log(clearHistoryList);
    clearHistoryList.innerHTML = "";
    alreadyExists = false;
}

// select number buttons
buttons.forEach(button => {
    // take the event of clicking the number button 
    // print the clicked number in the chosen number area
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
            button.classList.remove('active')
            console.log("attempt num is ", attemptNum)
            document.getElementById("chosen_num_area").value = "";
            console.log("alreadyExists  is ", alreadyExists)
            //based on the history data exist or not, check button is enabled or disabled
            if (!alreadyExists) {
                btnCheck.classList.add("disabled");
                btnCheck.disabled = true;
            }
        } else {
            buttons.forEach(btn => btn.classList.remove('active'))
            document.getElementById('chosen_num_area').value = "";
            button.classList.add('active')
            btnCheck.classList.remove('disabled');
            btnCheck.disabled = false;
            document.getElementById('chosen_num_area').value = button.textContent;
        }
    })
})

//CHECK Button Event
btnCheck.addEventListener("click", function () {
    //take the clicked value from chosen number shown area
    const chosenNum = parseInt(document.getElementById("chosen_num_area").value);
    if(!isNaN(chosenNum))  {
        console.log("chosenTextNum in if",chosenNum)
    //decrease the attempts
    if (attemptNum > 0) {
        attemptNum--;
        document.getElementById("attemptCount").innerHTML = attemptNum;
        console.log("your chosen num :", chosenNum);

        //for history area data
        //create a new div sector as a history list
        const historyItem = document.createElement("div");
        alreadyExists = true;
        historyItem.textContent = chosenNum;
        console.log(historyItem);
        console.log(alreadyExists);
        document.getElementById("history_list_id").appendChild(historyItem);

        //checking the chosen number is the same or not with the random number
        if (chosenNum === randomNum) {
            document.getElementById("message_area_id").innerHTML = "正解！数字が一致しました！"
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
                    document.getElementById("message_area_id").innerHTML = "惜しい！少し高すぎます！"
                } else {
                    document.getElementById("message_area_id").textContent = "高すぎ！もっと小さい数字を試してください。";
                }

            } else {
                if (isClose) {
                    document.getElementById("message_area_id").innerHTML = "惜しい！少し低すぎます！"
                } else {
                    document.getElementById("message_area_id").textContent = "低すぎ！もっと大きい数字を試してください。";
                }

            }
        }
    }
    else {
        document.getElementById('attemptCount').innerHTML = attemptNum;
        document.getElementById('message_area_id').innerHTML = "もうチャンスはありません！<br>新しいゲームを始めてください。";

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
    }
     else {
        document.getElementById('message_area_id').innerHTML = "数値を選択してください！";
    }
})

//NEW GAME button
btnNewGame.addEventListener("click", function () {
    //reset all conditions
    initGame();

    //if all number buttons are disabled , remove disable
    buttons.forEach(button => {
        button.classList.remove("disabled");
        button.disabled = attemptNum === 0;
    })

    //clear selected button
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            buttons.forEach(btn => {
                btn.classList.remove('active')
            })
        }
    })

    
})