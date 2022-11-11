var hero={
    left:550,
    top:570
}
var enemies=[
    // first line
    {left:200,top:100},
    {left:300,top:100},
    {left:400,top:100},
    {left:500,top:100},
    {left:600,top:100},
    {left:700,top:100},
    {left:800,top:100},
    {left:900,top:100},

    // second line
    {left:200,top:175},
    {left:300,top:175},
    {left:400,top:175},
    {left:500,top:175},
    {left:600,top:175},
    {left:700,top:175},
    {left:800,top:175},
    {left:900,top:175},
    
]

var missiles=[]
// hero move left and right--keys

document.onkeydown=function(e){
//  console.log(e.keyCode,e.key)   
 if(e.keyCode===37){
    console.log("left")
    hero.left=hero.left-10;
    console.log(hero.left)
 }
 if(e.keyCode===39){
    console.log("right")
    hero.left=hero.left+10;
    console.log(hero.left)
 }
 if(e.keyCode===32){
    console.log("shoot")
    missiles.push({
        left:hero.left+21,
        top:hero.top-21
    })
    console.log(missiles)
    drawMissiles()
 }
 moveHero()
}
function moveHero(){
    document.getElementById('hero').style.left=hero.left+"px"
    document.getElementById('hero').style.top=hero.top+"px"

}

// enemies-map 

function drawEnemies(){
    document.getElementById('enemies').innerHTML="";
    enemies.map((element)=>{
        document.getElementById('enemies').innerHTML+=`
        <div class='enemy' style="left:${element.left}px;
        top:${element.top}px;"></div>     
    `
})
}

// move Enenmies
function moveEnemies(){
    enemies.map((element)=>{
        element.top=element.top+3;
    })
}


// draw Missiles

function drawMissiles(){
    document.getElementById('missiles').innerHTML="";
    missiles.map((element)=>{
        document.getElementById('missiles').innerHTML+=`
        <div class='missile' style="left:${element.left}px;
        top:${element.top}px;"></div>     
    `
})
}

function moveMissiles(){
    missiles.map((element)=>{
        element.top=element.top-21;
    })
}

function shooting(){
    // missiles+enemies

    for(let enemy=0;enemy<enemies.length;enemy++){
        for(let missile=0;missile<missiles.length;missile++){
            if(
                missiles[missile].left>=enemies[enemy].left &&
                missiles[missile].left<=enemies[enemy].left+50 &&

                missiles[missile].top>=enemies[enemy].top &&
                missiles[missile].top<=enemies[enemy].top+50
            ){
                console.log("hit")
                enemies.splice(enemy,1)
                missiles.splice(missile,1)

            }

        }
    }
}
function gameLoop(){
   
    drawMissiles()
    moveMissiles();
    moveEnemies();
    drawEnemies();
    shooting()
    gameEnd()
  
    console.log("hi")
}
// gameLoop()
let game=setInterval(gameLoop,300)

function gameEnd(){
    let container=document.getElementById('background')
    if(enemies.length===0){
        container.innerHTML=`
        <div class="result">I Won the game</div>
        `
        clearInterval(game)
        disable()
    }
    // lose//loss
    else if(enemyChecker()){
        container.innerHTML+=`
        <div class="result">I Loose the game</div>
        `
        console.log("Loose")
        clearInterval(game)
        disable()
    }

    
}

// some()=>return true and stop the functionality if its true
function enemyChecker(){
    return enemies.some((data)=>data.top==523)
    // console.log(enemies.some((data)=>console.log(data.top)))
}
enemyChecker()

function disable(){
    document.onkeydown=function(e){
        return false;
    }
}



