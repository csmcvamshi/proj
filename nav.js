function toPoll(){
    window.location.href='poll.html';
}

function toggleSidebar() {
    var sidebar = document.querySelector(".sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-200px" : "0px";
}

function closeSidebar(event) {
    let sidebar = document.querySelector(".sidebar");
    if (!event.target.closest('.sidebar') && !event.target.closest('.hamburger-container')) {
        sidebar.classList.remove("active");
    }
}

function redirectToHome() {
    window.location.href = 'home.html';
}

document.addEventListener('click', closeSidebar);