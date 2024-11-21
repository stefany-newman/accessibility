const firstHeading = document.querySelector(".heading");
    
document.addEventListener("DOMContentLoaded", () => firstHeading.focus());
// Removes tabindex=-1 from the heading due to potentional bugs
firstHeading.addEventListener("blur", () => firstHeading.removeAttribute("tabindex"));