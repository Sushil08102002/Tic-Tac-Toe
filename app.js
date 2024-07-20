//First, select all boxes to write our logic
document.addEventListener("DOMContentLoaded", function() {
let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("resetbtn");
let newbtn=document.querySelector("#newbtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg")
// We have to track the turn of the variable
let turnO = true; // This keeps track of whether the turn is O or X. If turnO is true, then the turn is O; if false, then the turn is X.

// We store all winning patterns in 2D arrays
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const isFull=()=>{
    for(let box of boxes){
        if (box.innerText===""){
            return false
        }
    }
    return true;
}
//now add event listners to all the boxes as given
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{

        if(turnO===true){
            box.innerText="X"
            turnO=false
        }
        else{
            box.innerText="O"
            turnO=true
        }
        box.disabled=true
        checkresult()
    })
})

const resetGame=()=>{
    turnO=true
    enableBoxes();
    msgContainer.classList.add("hide");

}

function disableBoxes(){  //this is used to disable all boxes when result is declared
    for (let box of boxes){
        box.disabled=true;
    }

}

const enableBoxes=()=>{  //used to enable all boxes when new game starts
    boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
}

function showWinner(winner){
    msg.innerText=`Congratulations Winner is ${winner}`;
    disableBoxes();   //after showing results we disable all buttons
    msgContainer.classList.remove("hide");
}
function showTie() {
    msg.innerText = "It's a Tie!";
    disableBoxes(); // Disable all buttons
    msgContainer.classList.remove("hide");
}

function checkresult(){
    //we will check all win patterns in a box first we take position of boxes
    for(pattern of winPatterns){  //this logic is of 
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
                return
            }
        }
    }
    if(isFull()){
        showTie();
    }
}

resetbtn.addEventListener("click",resetGame)
newbtn.addEventListener("click",resetGame)
})