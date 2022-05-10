const butInstall = document.getElementById("buttonInstall");
// 28 for all
// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    // Store the triggered events
    window.deferredPrompt = event;
    // Remove the hidden class from the button.
    butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    //prompt user
    promptEvent.prompt();
    // reset deferred prompt
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
    // clear
    window.deferredPrompt = null;
});
