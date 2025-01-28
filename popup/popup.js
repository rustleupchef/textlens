hasTyped = false
lastTime = 0

const inputField = document.getElementById("test");

window.onload = function() {
    document.getElementById("forward").innerHTML = ">";
    document.getElementById("backward").innerHTML = "<";
    
    setInterval(check, 1000);
}

inputField.addEventListener('input', function (event) {
    const now = new Date();
    hasTyped = true;
    lastTime = now.getSeconds()
});



function check() {
    browser.tabs.sendMessage(tabs[0].id, {
        find: "testing"
    });
    const now = new Date()
    if (now.getSeconds() - lastTime < 1 || !hasTyped) return;
    hasTyped = false
}