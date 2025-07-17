const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const affichageScore = document.querySelector(".score");


const rayonBalle = 10,
    barreHeight = 10,
    barreWidth = 75,
    nbCol = 8,
    nbRow = 5,
    largeurBrique = 75,
    hauteurbrique = 20;
    
let x = canvas.width / 2,
    y = canvas.height - 30,
    barreX = (canvas.width - barreWidth ) / 2,
    fin = false ;
    vitesseX = 1,
    vitesseY = 1,
    score = 0;

function dessineBalle(){
  ctx.beginPath();
  ctx.arc(x,y,rayonBalle,0,Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

function dessineBarre(){
  ctx.beginPath();
  ctx.rect(barreX,canvas.height - barreHeight - 2, barreWidth , barreHeight);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

const briques = [];
for(let i = 0 ; i < nbRow ; i++){
  briques [i] = [];
  for(let j = 0 ; j < nbCol ; j++){
    briques[i][j] = { x: 0 , y: 0, statut: 1};
  }
}

function dessinBriques(){
  for(let i = 0 ; i < nbRow ; i++){
    for(let j = 0 ; j < nbCol ; j++){
      if(briques[i][j]. statut === 1 ){
        let briqueX = j * (largeurBrique + 10 ) + 35;
        let briqueY = i * (hauteurbrique + 10 ) + 30;

        briques[i][j].x = briqueX;
        briques[i][j].y = briqueY;

        ctx.beginPath();
        ctx.rect(briqueX, briqueY ,largeurBrique , hauteurbrique);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function dessine(){
  if( fin === false){
    ctx.clearRect(0,0,canvas.width , canvas.height);
    dessinBriques();
    dessineBalle();
    dessineBarre();

    if( x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle){
      vitesseX = -vitesseX;
    }
    if(y + vitesseY < rayonBalle){
      vitesseY = -vitesseY;
    }
    if(y + vitesseY > canvas.height - rayonBalle){
      if(x > barreX && x < barreX + barreWidth){
        vitesseX += 1;
        vitesseY += 1;
        vitesseY = -vitesseY;
      }
      else {
        fin = true ;
        affichageScore.innerHTML = `<span style ="color:red;">Perdu</span> <br> clique sur le casse brique pour ressayer`;
      }
    }

    x += vitesseX ;
    y += vitesseY ;

    collisionDetection();
    requestAnimationFrame(dessine); 
  }
}
dessine();

function collisionDetection(){
  for(let i = 0 ; i < nbRow ;i++){
    for(let j = 0 ; j < nbCol ;j++ ){
      let b =briques[i][j];
      if(b.statut == 1){
        if(x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurbrique){
          vitesseY = -vitesseY;
          b.statut = 0;
          score++;
          affichageScore.innerHTML = `score : ${score}`;


          if(score === nbCol * nbRow){
            affichageScore.innerHTML =`<span style="color : mediumspringgreen;"> Bravo </span>`;
          }
        }
      }
    }
  }
}
document.addEventListener("mousemove",mouvementSouris);
function mouvementSouris(e){
  let porXbarreCanvas = e.clientX - canvas.offsetLeft;
  console.log("pos souris"+ porXbarreCanvas);
  if(porXbarreCanvas > 35 && porXbarreCanvas < canvas.width - 35){
    barreX = porXbarreCanvas - barreWidth / 2
  }
}
canvas.addEventListener("click",() => {
  if( fin=== true){
    fin = false ;
    document.location.reload();
  }
});
canvas.addEventListener("touchcancel", e =>{
  e.preventDefault();
  var touches = e.changedTouches;
  for(var i = 0; i < touches.length; i++){
    ongoingtouches.splice(i, 1);
    }
  },
  false
);
canvas.addEventListener("touchmove", e => {
  var touch = e.touches[0];
  var mouseEvent = new mouseEvent("mousemove",{clientX: touch.clientX});
  canvas.dispatchEvent(mouseEvent);
  let porXbarreCanvas = touch.clientX - canvas.offsetleft;
  if(postXbarreCanvas > 35 && postXbarreCanvas < canvas.width - 35 ){
    barreX = porXbarreCanvas -barreWidth / 2;
  }
})
function getTouchpos(canvasDom , touchEvent){
   var rect = canvasDom.getBoundingClientRect();
   return{
    x : touchEvent.touches[0].clientX - rect.left,
   };
}
