window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

document.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
}, false);