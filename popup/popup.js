document.addEventListener("DOMContentLoaded", () => {
    let hasTyped = false
    let lastTime = 0
    const inputField = document.getElementById("find");

    document.getElementById("forward").innerHTML = ">";
    document.getElementById("backward").innerHTML = "<";
    
    setInterval(check, 1000);

    inputField.addEventListener('input', function (event) {
        const now = new Date();
        hasTyped = true;
        lastTime = now.getSeconds()
    });

    window.addEventListener("unload", function() {
        browser.runtime.sendMessage({type: "CLOSE"});
    });
    
    document.getElementById("backward").addEventListener("click", function() {
        message("MOVE", "BACKWARDS");
    });

    document.getElementById("forward").addEventListener("click", function() {
        message("MOVE", "FORWARDS");
    });
    
    function check() {
        const now = new Date()
        if (now.getSeconds() - lastTime < 1 || !hasTyped) return;
        message("FIND", inputField.value);
        hasTyped = false
    }

    function message(Type, Data) {
        browser.runtime.sendMessage({type: Type, data: Data});
    }
});