var myNav = document.getElementById('mynav');
window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop >= 200) {
        myNav.classList.add("heading-transparent");
        myNav.classList.remove("heading");

    } else {
        myNav.classList.add("heading");
        myNav.classList.remove("heading-transparent");
    }
};