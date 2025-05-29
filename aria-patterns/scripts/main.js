const tabList = document.querySelector("#tablist");
const tabs = document.querySelectorAll(".tab");
const tabPanelContent = document.querySelectorAll(".tabpanel-content");
let selectedTab = document.querySelector(".tab[aria-selected='true'");
let selectedTabContent = document.querySelector("#tabpanel-content-1");

const toggleAttributeValue = (element, attribute) => {
    let customBoolean = "false";
    if (element.getAttribute(attribute) === 'true') {
        customBoolean = false;
      } else {
        customBoolean = true;
      }
    element.setAttribute(attribute, customBoolean);
}

const getTabNumber = (selectedTab) => {
    return selectedTab.id.substring(selectedTab.id.indexOf("-")+1);
}

const unSelectTab = (element) => {
    element.setAttribute("aria-selected", "false");
    element.setAttribute("tabindex", "-1");
}
const selectTab = (element) => {
    element.setAttribute("aria-selected", "true");
    element.setAttribute("tabindex", "0");
}

const toggleTabContentlVisibility = (selectedTab, tabContent) => {
    if(!null(tabContent.getAttribute("hidden"))){
        tabContent.toggleAttribute("hidden");
    }
}


// Roving tabindex in progress
document.addEventListener("keydown", (e) => {
    if(e.code === "ArrowLeft")
    {
        console.log(e.code, typeof e.code);
    }
});

tabList.addEventListener("click", (e) => {
    if(e.target.getAttribute("role") === "tab" && e.target.getAttribute("aria-selected") === "false"){
       unSelectTab(selectedTab);
       selectedTab = e.target;
       selectTab(selectedTab);
       selectedTabContent.toggleAttribute("hidden");
       const tabNumber = getTabNumber(selectedTab);
       selectedTabContent = document.querySelector("#tabpanel-content-"+tabNumber);
       selectedTabContent.toggleAttribute("hidden");
       
    }
});
