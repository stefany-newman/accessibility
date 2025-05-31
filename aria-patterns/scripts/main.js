const tabList = document.querySelector("#tablist");
const tabs = document.querySelectorAll(".tab");
const tabPanelContent = document.querySelectorAll(".tabpanel-content");
let selectedTab = document.querySelector(".tab[aria-selected='true'");
let selectedTabContent = document.querySelector("#tabpanel-content-1");

const getTabNumber = (selectedTab) => {
    return Number(selectedTab.id.substring(selectedTab.id.indexOf("-")+1));
}

const unSelectTab = (element) => {
    element.setAttribute("aria-selected", "false");
    element.setAttribute("tabindex", "-1");
}
const selectTab = (element) => {
    element.setAttribute("aria-selected", "true");
    element.setAttribute("tabindex", "0");
    element.focus();
}

const toggleTabContentlVisibility = (selectedTab, tabContent) => {
    if(!null(tabContent.getAttribute("hidden"))){
        tabContent.toggleAttribute("hidden");
    }
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

tabList.addEventListener("click", (e) => {
       unSelectTab(selectedTab);
       selectedTab = e.target;
       selectTab(selectedTab);
       selectedTabContent.toggleAttribute("hidden");
       const tabNumber = getTabNumber(selectedTab);
       selectedTabContent = document.querySelector("#tabpanel-content-"+tabNumber);
       selectedTabContent.toggleAttribute("hidden");
});

// Progressive enhancement
window.addEventListener("DOMContentLoaded", () => {
    tabPanelContent.forEach((tabPanel, index) => {
        if(index > 0) {
            console.log(tabPanel, typeof tabPanel);
            tabPanel.toggleAttribute("hidden");
        }
    });
});
