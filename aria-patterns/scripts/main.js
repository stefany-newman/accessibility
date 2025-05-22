const tabs = document.querySelectorAll(".tab");
const tabPanelContent = document.querySelectorAll(".tabpanel-content");


const toggleAttributeValue = (element, attribute) => {
    let customBoolean = "false";
    if (element.getAttribute(attribute) === 'true') {
        customBoolean = false;
      } else {
        customBoolean = true;
      }
    element.setAttribute(attribute, customBoolean);
}
tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
        let previouslySelectedTab = document.querySelector(".tab[aria-selected='true'");
        console.log(previouslySelectedTab.id.slice(-1));
        if(e.currentTarget.getAttribute("aria-selected") === "false"){
            toggleAttributeValue(previouslySelectedTab, "aria-selected");
        toggleAttributeValue(tab, "aria-selected", 'true');
        tabPanelContent[index].toggleAttribute("hidden");
        e.currentTarget.setAttribute("tabindex", "0");
        console.log(e.currentTarget.getAttribute("aria-selected"));
        
        previouslySelectedTab.setAttribute("tabindex", "-1");
        console.log(tabPanelContent);
        tabPanelContent[previouslySelectedTab.id.slice(-1)-1].toggleAttribute("hidden");

        }else{
            console.log("can't disable itself");
        }
    })
});