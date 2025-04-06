let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let msg_cont =  document.querySelector(".msgcont");
let mesg =   document.querySelector("#msg");

let turnO = true ; // O ki turn hai
const winPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const enableBoxes = ()=>{
    for ( let b of boxes){
        b.disabled = false;
   }
}
const clearBox = ()=>{
    for ( let b of boxes){
        b.innerText = "";
   }
}
const resetGame = ()=>{
    console.log("sng");
    turnO = true;
    clearBox();
    enableBoxes();
    msg_cont.classList.remove("hide");
 mesg.innerText = "Mark O";
    resetBtn.classList.remove("hide");
    // msg_cont.classList.add("hide");
    resetBtn.innerText = "Reset Game";
    for(b of boxes){
        b.classList.remove("lose");
    }
    for(b of boxes){
        b.classList.remove("win");
    }
}

resetBtn.addEventListener("click",resetGame);

msg_cont.classList.remove("hide");
 mesg.innerText = "Mark O";
for(let b of boxes){
    b.addEventListener("click",()=>{
        console.log("clicked");
        if(turnO){
            mesg.innerText = "Mark X";
            b.innerText = "O";
            turnO = false;
        }else{
            mesg.innerText = "Mark O";
            b.innerText = "X";
            turnO = true;
        }
        b.disabled = true;
        checkWinner();
        checkDraw();
    })
}

const disableBoxes = ()=>{
    for ( let b of boxes){
         b.disabled = true;
    }
}

const showWinner = (winner)=>{
   mesg.innerText = `'${winner}' Won`;
   disableBoxes();
resetBtn.innerText = "New Game";
}

const winEffect = (a,b,c)=>{
   a.classList.add("win");
   b.classList.add("win");
   c.classList.add("win");
}

const checkWinner = ()=>{
    for(let p of winPattern){
       let p1v = boxes[p[0]].innerText;   // position 1 value
       let p2v = boxes[p[1]].innerText;   // position 2 value
       let p3v = boxes[p[2]].innerText;   // position 3 value
     if(p1v != "" && p2v != "" && p3v != ""){
        if(p1v === p2v && p2v === p3v){
            console.log("winner",p1v);
            winEffect(boxes[p[0]],boxes[p[1]],boxes[p[2]]);
            showWinner(p1v);
            return true;
        }
     }   
    }
    return false;
}

const checkDraw = ()=>{
    let draw = true;
    for(b of boxes){
        if(b.innerText == ""){
            draw = false;
        }
    }
    if(draw && !checkWinner()){
        for(b of boxes){
            b.classList.add("lose");
        }
        mesg.innerText = "Tie";
        resetBtn.innerText = "New Game";
    }
}