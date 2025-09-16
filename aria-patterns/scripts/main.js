const tabList = document.querySelector("#tablist");
const tabs = document.querySelectorAll(".tab");
const tabPanelContent = document.querySelectorAll(".tabpanel-content");
let selectedTab = document.querySelector(".tab[aria-selected='true'");
let selectedTabContent = document.querySelector("#tabpanel-content-1");

const getTabNumber = (selectedTab) => {
    return Number(selectedTab.id.substring(selectedTab.id.indexOf("-")+1));
};

const unSelectTab = (element) => {
    element.setAttribute("tabindex", "-1");
};
const selectTab = (element) => {
    element.setAttribute("tabindex", "0");
    element.focus();
};

const moveFocusToNextTab = (currentTab) => {
    unSelectTab(currentTab);
    const toBeSelectedTab = currentTab;
    const tabNumber = getTabNumber(toBeSelectedTab);
    const nextTabNumber = tabNumber < tabs.length ? tabNumber + 1 : 1;
    const nextTab = document.querySelector("#tab-"+nextTabNumber);
    selectTab(nextTab);
};

const moveFocusToPreviousTab = (currentTab) =>{
    unSelectTab(currentTab);
    const toBeSelectedTab = currentTab;
    const tabNumber = getTabNumber(toBeSelectedTab);
    const previousTabNumber = tabNumber <= 1 ? tabs.length : tabNumber - 1;
    const nextTab = document.querySelector("#tab-"+previousTabNumber);
    selectTab(nextTab);
};

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
const nextPrevControls = document.querySelector('#next-prev-controls');
const galleryImagesArray = Array.from(document.querySelectorAll('.gallery-image'));
const dots = document.querySelectorAll('.dot');
const dotsParent = document.querySelector("#dot-navigation");
const numberOfImages = galleryImagesArray.length;

dotsParent.addEventListener("click", (e) => {
    let isDotClicked = e.target;
    if(!isDotClicked.classList.contains("dot")){
        return;
    }
    const activeDot = document.querySelector(".dot[aria-current='true'");
    const currentImageElement = document.querySelector("img:not([hidden])");
    const dotsArray = Array.from(dots);
    let nextDotIndex = dotsArray.findIndex(dot => dot === isDotClicked);
        deactivateDot(activeDot);
        deactivateImage(currentImageElement);
        activate(nextDotIndex, "image");
        activate(nextDotIndex, "dot");
});

nextPrevControls.addEventListener("click", (e) => {
    const currentImageElement = document.querySelector("img:not([hidden])");
    const activeDot = document.querySelector(".dot[aria-current='true'");
    let currentImageIndex = galleryImagesArray.findIndex(image => !image.hidden);
    const isAButtonClicked = (e.target.tagName === "BUTTON") ? true : false;
    const buttonType = (type) => (type === e.target.id);
    const switchImageIndex = (type) => {
        if(type === "next"){
            return currentImageIndex < (numberOfImages-1) ? ++currentImageIndex : 0;
        }
        if(type === "prev"){
            return (currentImageIndex > 0) ? --currentImageIndex : (numberOfImages -1);
        }
    };
    if(isAButtonClicked) {
        let differentImageIndex = (buttonType("next")) ? switchImageIndex("next") : switchImageIndex("prev");
        deactivateDot(activeDot);
        deactivateImage(currentImageElement);
        activate(differentImageIndex, "image");
        activate(differentImageIndex, "dot");
    }

});

const activate = (index, type) => {
    if(type === "image")
    {
        document.querySelectorAll(".gallery-image")[index].toggleAttribute("hidden");
    }
    if(type === "dot")
    {
        dots[index].setAttribute("aria-current", "true");
    }
};
const deactivateDot = (dot) => {
        dot.setAttribute("aria-current", "false");
};
const deactivateImage = (image) => {
        image.toggleAttribute("hidden");

};