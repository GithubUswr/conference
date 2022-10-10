document.addEventListener("DOMContentLoaded", () => {
  changeEvent(generateTalk())
  
  document.querySelector(".next-button").addEventListener("click", () => {
    changeEvent(generateTalk());
  })
  
  document.querySelector(".share-button").addEventListener("click", () => {
    handleClickShare();
  });
  
  document.querySelector(".popup-close").addEventListener("click", () => {
    handlePopupClose();
  });
  
  document.querySelector(".scrim").addEventListener("click", () => {
    handlePopupClose();
  });
  
  document.querySelector("#img-save").addEventListener("click", () => {
      handleImageDownload();
  });
});

const MISLEADING_SPINNER_TIMEOUT = 333;

function changeEvent(string){
  //show fake spinner then the headline
  let spinner = document.querySelector(".lds-dual-ring");
  let headline = document.querySelector("#headline");
  let timeInfo = document.querySelector("#session-time");
  let locationInfo = document.querySelector("#session-location");
  let separator = document.querySelector(".article-separator");
  let button = document.querySelector(".next-button");
  
  headline.textContent = "";
  timeInfo.textContent = "";
  locationInfo.textContent = "";
  separator.style.display = "none";
  spinner.classList.add("visible");
  button.classList.add("disabled"); //prevent multiple fast clicks from messing up spinner
  
  window.setTimeout(() => {
    spinner.classList.remove("visible");
    button.classList.remove("disabled");
    separator.style.display = "block";
    headline.textContent = string; 
    
    //add extra information
    timeInfo.textContent = "Time: " + grabTime();
    locationInfo.textContent = "Location: " + grabVenue();
  }, MISLEADING_SPINNER_TIMEOUT);
  
}

// Image rendering
function handleClickShare(){
   document.querySelector(".scrim").classList.add("visible");
   document.querySelector("#image-popup").classList.add("visible");
   renderImage(); 
}

function handlePopupClose(){
  document.querySelector(".scrim").classList.remove("visible");
   document.querySelector("#image-popup").classList.remove("visible");
}

function handleImageDownload(){
  var link = document.createElement('a');
  link.download = LAST_GENERATED_SESSION.toLowerCase() + '.png';
  link.href = document.querySelector("#image-holder").src;
  link.click();
}

var LAST_DATA_URL = "";

function renderImage(){
  var site = document.querySelector("#meat-and-potatoes");
  var maincontent = document.querySelector(".fake-page-content");
  maincontent.classList.add("capture");
  
  DomToImage.toPng(site)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.querySelector("#image-holder").setAttribute('src', dataUrl);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
        
    })
    .finally(() => {
        maincontent.classList.remove("capture");
    });
} 
        
