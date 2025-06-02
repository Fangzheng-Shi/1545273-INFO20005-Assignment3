/* Open side bar */
function openSideBar() {
    document.getElementById("sidebar").classList.add("visible");
    document.getElementById("overlay").classList.add("visible");
}

/* Close side bar */
document.getElementById("closeSidebar").addEventListener("click", function() {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

// click the overplay area to close sidebar
document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});