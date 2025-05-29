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


// document.addEventListener("keydown", (e) => {
//     if(e.code === "ArrowLeft")
//     {
//         console.log(e.code, typeof e.code);
//     }
// });

//  tabs.forEach((tab, index) => {
//     tab.addEventListener("click", (e) => {
//         let previouslySelectedTab = document.querySelector(".tab[aria-selected='true'");
//         console.log(previouslySelectedTab.id.slice(-1));
//         if(e.currentTarget.getAttribute("aria-selected") === "false"){
//             toggleAttributeValue(previouslySelectedTab, "aria-selected");
//         toggleAttributeValue(tab, "aria-selected", 'true');
//         tabPanelContent[index].toggleAttribute("hidden");
//         e.currentTarget.setAttribute("tabindex", "0");
//         console.log(e.currentTarget.getAttribute("aria-selected"));
        
//         previouslySelectedTab.setAttribute("tabindex", "-1");
//         console.log(tabPanelContent);
//         tabPanelContent[previouslySelectedTab.id.slice(-1)-1].toggleAttribute("hidden");

//         }else{
//             console.log("can't disable itself");
//         }
//     })
// });

tabList.addEventListener("click", (e) => {
    if(e.target.getAttribute("role") === "tab" && e.target.getAttribute("aria-selected") === "false"){
       unSelectTab(selectedTab);
       selectedTab = e.target;
       const tabNumber = selectedTab.id.substring(selectedTab.id.indexOf("-")+1);
       selectTab(selectedTab);
       selectedTabContent.toggleAttribute("hidden");
       selectedTabContent = document.querySelector("#tabpanel-content-"+tabNumber);
       selectedTabContent.toggleAttribute("hidden");
       
    }
});
