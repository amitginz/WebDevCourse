//--Page to navigate when cliked menu item
// page: from HTML CLICK 
function loadPage(page) {
    //--Get Reference fotr the HTML ELEMENT BY ITS ID
    //--contentFrame is iframe element type 
    let ifameElement = document.getElementById("contentFrame");
    //--Give iframe the HTML ADDRESS
    ifameElement.src = page;

    // Close sidebar on mobile
    document.getElementById("sidebar").classList.remove("show");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}