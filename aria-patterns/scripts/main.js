const tabList = document.querySelector("#tablist");
const tabs = document.querySelectorAll(".tab");
const tabPanelContent = document.querySelectorAll(".tabpanel-content");
let selectedTab = document.querySelector(".tab[aria-selected='true'");
let selectedTabContent = document.querySelector("#tabpanel-content-1");

const getTabNumber = (selectedTab) => {
    return Number(selectedTab.id.substring(selectedTab.id.indexOf("-")+1));
}

const unSelectTab = (element) => {
    element.setAttribute("tabindex", "-1");
}
const selectTab = (element) => {
    element.setAttribute("tabindex", "0");
    element.focus();
} 

const moveFocusToNextTab = (currentTab) => {
    unSelectTab(currentTab);
    const toBeSelectedTab = currentTab;
    const tabNumber = getTabNumber(toBeSelectedTab);
    const nextTabNumber = tabNumber < tabs.length ? tabNumber + 1 : 1;
    const nextTab = document.querySelector("#tab-"+nextTabNumber);
    selectTab(nextTab);
}

const moveFocusToPreviousTab = (currentTab) =>{
    unSelectTab(currentTab);
    const toBeSelectedTab = currentTab;
    const tabNumber = getTabNumber(toBeSelectedTab);
    const previousTabNumber = tabNumber <= 1 ? tabs.length : tabNumber - 1;
    const nextTab = document.querySelector("#tab-"+previousTabNumber);
    selectTab(nextTab);
}

// TO DO - Add a function to check if tab panels 
// have an interactive element as a first child 
// and inject tabindex=0 if not, as per best practices. 


// Roving tabindex in progress
document.addEventListener("keydown", (e) => {
    if(document.activeElement.getAttribute("role") === "tab") {
        if(e.code === "ArrowRight")
        {
            moveFocusToNextTab(e.target);
        }
        if(e.code === "ArrowLeft")
        {
            moveFocusToPreviousTab(e.target);
        }
    }
});
// Activating the tab
tabList.addEventListener("click", (e) => {
       unSelectTab(selectedTab);
       selectedTab.setAttribute("aria-selected", "false");
       selectedTab = e.target;
       selectTab(selectedTab);
       selectedTabContent.toggleAttribute("hidden");
       const tabNumber = getTabNumber(selectedTab);
       selectedTabContent = document.querySelector("#tabpanel-content-"+tabNumber);
       selectedTabContent.toggleAttribute("hidden");
       selectedTab.setAttribute("aria-selected", "true");
});

/* 
    Progressive enhancement:
    Only hide tab content if JS is on
*/
window.addEventListener("DOMContentLoaded", () => {
    tabPanelContent.forEach((tabPanel, index) => {
        if(index > 0) {
            tabPanel.toggleAttribute("hidden");
        }
    });
});


/* Gallery */


const galleryContainer = document.querySelector('#gallery-container');
const nextPrevControls = document.querySelector('#next-prev-controls');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const galleryImagesArray = Array.from(document.querySelectorAll('.gallery-image'));
const dots = document.querySelectorAll('.dot');
const dotsParent = document.querySelector("#dot-navigation");
const numberOfImages = galleryImagesArray.length;

nextButton.addEventListener("click", (e) => {
    const currentImageElement = document.querySelector("img:not([hidden])");
    let currentImageIndex = galleryImagesArray.findIndex(image => !image.hidden);
    let nextImageIndex = (currentImageIndex < (numberOfImages-1)) ? ++currentImageIndex : 0;
    const nextImageElement = document.querySelectorAll(".gallery-image")[nextImageIndex];
    currentImageElement.toggleAttribute("hidden");
    nextImageElement.toggleAttribute("hidden");
});

prevButton.addEventListener("click", (e) => {
    const currentImageElement = document.querySelector("img:not([hidden])");
    let currentImageIndex = galleryImagesArray.findIndex(image => !image.hidden);
    let prevImageIndex = (currentImageIndex > 0) ? --currentImageIndex : (numberOfImages -1);
    const prevImageElement = document.querySelectorAll(".gallery-image")[prevImageIndex];
    currentImageElement.toggleAttribute("hidden");
    prevImageElement.toggleAttribute("hidden");
});


dotsParent.addEventListener("click", (e) => {
    const currentImageElement = document.querySelector("img:not([hidden])");
    let clickedDot = e.target;
    console.log(clickedDot);
});
