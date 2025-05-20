const tabs = document.querySelectorAll(".tab");

const toggleAttributeValue = (element, attribute, value) => {
    let customBoolean = "false";
    if (element.getAttribute(attribute) === 'true') {
        customBoolean = false;
      } else {
        customBoolean = true;
      }
    element.setAttribute(attribute, customBoolean);
}


console.log(tabs);

tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {

        toggleAttributeValue(tab, "aria-selected", 'true');
        console.log(e.currentTarget.getAttribute("aria-selected"));
    })
});