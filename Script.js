let boxes = document.querySelectorAll(".Box");
let reset = document.querySelector(".reset");
let new_game = document.querySelector("#pop-res");
let popup= document.querySelector("#popup");
let main= document.querySelector("main");

let win_possiblitiy = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5], [6,7,8],[0,4,8],[2,4,6]];
let player1 = true;
let win = false;

function disable_boxes(){
    boxes.forEach((box)=>{
        box.disabled = true;
        box.style.pointerEvents = "none";
    })
}

function highlight(boxes,index){
    boxes[index].classList.add("Box-highlight");
    boxes[index].classList.remove("Box");
}

function win_check(){
    for(let comb of win_possiblitiy){
        let first  = boxes[comb[0]].innerText;
        let second = boxes[comb[1]].innerText;
        let third = boxes[comb[2]].innerText;
        if((first === second && second === third) && (first != "" && second != "" && third != "")){
            win = true;
            popup.children[0].innerHTML = `Winner: ${first}`;
            popup.style.visibility="";
            main.style.filter= "blur(10px)";  
            console.log(`Winner is ${first}`);
            for(let i = 0;i<3;i++){
                highlight(boxes,comb[i]);
            }
            disable_boxes();    
        }
    }
}

function onclick(){
    if(player1){
        this.innerHTML = "X";
        player1 = false;
        }
    else{
        this.innerHTML = "O";
        player1 = true;
    }
    this.disabled = true;           
    win_check();
}

function Reset(){
    boxes.forEach((box)=>{
    box.innerHTML="";
    box.disabled = false;
    player1 = true;        
    box.style.pointerEvents = "all";
    box.classList.add('Box');
    box.classList.remove("Box-highlight");
})
}

popup.style.visibility="hidden";

boxes.forEach((box)=>{
    box.addEventListener("click", onclick);
})

reset.addEventListener("click",Reset);

new_game.addEventListener("click",(e)=>{
    Reset(e);
    popup.style.visibility = "hidden";
    main.style.filter= "";  
});