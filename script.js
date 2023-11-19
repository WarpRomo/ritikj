addEventListener("scroll", scroll)

function scroll(e){

  aspectratio = window.innerWidth / window.innerHeight;

  if(aspectratio > 7/9){
    oceanparallax(e);
    skybackgroundparallax(e);
    cloudparallax(e);
    submarineparallax(e);
    caveparallax(e);
  }

  console.log(aspectratio);

}

let aspectratio = null;

function bodyload(){

  oceans.push(document.getElementById("ocean1"));
  oceans.push(document.getElementById("ocean2"));
  oceans.push(document.getElementById("ocean3"));

  for(var i = 1; i < 9; i++){
    clouds.push(document.getElementById("cloud" + i));
  }

  for(var i = 1; i <= 5; i++){
    caves.push(document.getElementById("cave" + i));
  }

  caves.push(document.getElementById("cavetext"));

  aspectratio = window.innerWidth / window.innerHeight

  setTimeout(() => {

    let loading = document.getElementById("loading");
    let html = document.body.parentElement
    console.log(html);
    html.style.overflowY = "scroll";
    loading.style.opacity = 0;
    console.log("DONE");

  }, 2000)

}

let oceans = [];
let clouds = [];
let caves = [];

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: 1920*(rect.left)/window.innerWidth,
    top: 1920*(rect.top)/window.innerWidth
  };
}

function getOffsetHeight(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: 1920*(rect.left)/window.innerWidth,
    top: 1920*(rect.top+rect.height)/window.innerWidth
  };
}

function scrollTop(){
  let scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return 1920* ( scroll / window.innerWidth );
}

function skybackgroundparallax(e){
  let scroll = scrollTop();

  let sky = document.getElementById("skybackground");

}

function windowHeight(){
  return 1920*(window.innerHeight / window.innerWidth);
}


function caveparallax(e){
  let scrollAdjust = Math.max((getOffsetHeight(document.getElementById("caves")).top-windowHeight()), 0);
  let c = 0.005;
  let oppose = [0, -1 * c, -2 * c, -3 * c, -4 * c, -4 * c];

  for(var i = 0; i < oppose.length; i++){

    let movementY = oppose[i] * scrollAdjust;

    caves[i].style.transform = `translate(0vw, ${movementY}vw)`


  }


}

function openUrl(url){
  window.open(url, '_blank');
}

function submarineparallax(e){

  let oppose = -0.015;
  let rotspeed = 1;

  let scroll = scrollTop();
  let sub = document.getElementsByClassName("projecttitle")[0];
  let propeller = document.getElementById("propeller");
  let scrollAdjust = Math.max(-(getOffset(sub).top-windowHeight()), 0);
  let movementX = (scrollAdjust * oppose) + "vw";

  sub.style.transform = `translate(${movementX}, 0vw)`
  propeller.style.rotate = (rotspeed * scroll) + "deg"

}

function cloudparallax(e){

  let scroll = scrollTop();

  let oppose = [[0.001,0], [0.003,0], [0.005,0], [0.007,0], [0.002,0], [-0.005,0], [-0.003,0], [-0.005,0]];

  for(var i = 0; i < oppose.length; i++){

    let movementY = oppose[i][1]*scroll + "vw";
    let movementX = oppose[i][0]*scroll + "vw";

    clouds[i].style.transform = `translate(${movementX}, ${movementY})`

  }

}

function oceanparallax(e){

  let scroll = scrollTop();

  let oppose = [[0.01,0], [-0.01,0], [0.015,0]];

  for(var i = 0; i < oppose.length; i++){

    let movementY = oppose[i][1]*scroll + "vw";
    let movementX = oppose[i][0]*scroll + "vw";

    oceans[i].style.transform = `translate(${movementX}, ${movementY})`

  }

}
