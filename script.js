addEventListener("scroll", scroll)

function scroll(e){

  if(!pageLoaded) return;

  aspectratio = window.innerWidth / window.innerHeight;

  if(aspectratio > 7/9){
    oceanparallax(e);
    //skybackgroundparallax(e);
    cloudparallax(e);
    submarineparallax(e);
    caveparallax(e);
  }

}

let aspectratio = null;
let pageLoaded = false;

async function bodyload(){

  console.log("loaded");

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
    html.style.overflowY = "scroll";
    loading.style.opacity = 0;
    pageLoaded = true;

    setTimeout(() => {
      loading.remove();
    }, 1000)

  }, 1500)

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

    if(i != oppose.length-1 && !onscreen(caves[i], 0)) continue;

    let movementY = oppose[i] * scrollAdjust;

    caves[i].style.transform = `translate3d(0vw, ${movementY}vw, 0vw)`


  }


}

function onscreen(e, leeWay = 1/6){

  let scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  const rect = e.getBoundingClientRect();

  let eTop = rect.top;
  let eBottom = rect.top + rect.height;

  let top = scroll;
  let bottom = scroll + window.innerHeight;

  leeWay *= window.innerHeight;

  return ((rect.top+rect.height+leeWay) > 0 && rect.top-leeWay < window.innerHeight)

}


function openUrl(url){
  window.open(url, '_blank');
}

function submarineparallax(e){

  let oppose = -0.015;
  let rotspeed = 1;

  let scroll = scrollTop();
  let sub = document.getElementById("projecttitle");

  if(!onscreen(sub)) return;

  let propeller = document.getElementById("propeller");
  let scrollAdjust = Math.max(-(getOffset(sub).top-windowHeight()), 0);
  let movementX = (scrollAdjust * oppose) + "vw";

  sub.style.transform = `translate3d(${movementX}, 0vw, 0vw)`
  propeller.style.rotate = (rotspeed * scroll) + "deg"

}

function cloudparallax(e){

  let scroll = scrollTop();

  let oppose = [[0.001,0], [0.003,0], [0.005,0], [0.007,0], [0.002,0], [-0.005,0], [-0.003,0], [-0.005,0]];

  for(var i = 0; i < oppose.length; i++){

    if(!onscreen(clouds[i])) continue;

    let movementY = oppose[i][1]*scroll + "vw";
    let movementX = oppose[i][0]*scroll + "vw";

    clouds[i].style.transform = `translate3d(${movementX}, ${movementY}, 0vw)`

  }

}

function oceanparallax(e){

  let scroll = scrollTop();

  let oppose = [[0.01,0, 20, 19], [-0.01,0, 19], [0.015,0, 19]];

  for(var i = 0; i < oppose.length; i++){

    if(!onscreen(oceans[i], 0)) continue;

    let movementX = oppose[i][0]*scroll;

    if(Math.abs(movementX) > oppose[i][2] ){
      movementX *= oppose[i][2] / Math.abs(movementX);
    }

    oceans[i].style.transform = `translate3d(${movementX}vw, 0vw, 0vw)`

  }

}
