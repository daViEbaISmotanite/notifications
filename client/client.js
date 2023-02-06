const publicVapidKey = 'BMj-xaKrqOER3-CUjC8yhuHXV1mPbHeLQsoZl9v9je6yr5C2ht0yz92ZGODpNcK-RMOAUYa5siz6c5T8YMJwl2M';

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);

    return outputArray;
}

//check if the serveice worker can work in the current browser
if ('serviceWorker' in navigator) send().catch(err => console.error(err));

//register the service worker, register our push api, send the notification
async function send() {
    //register service worker
    const register = await navigator.serviceWorker.register('./serviceWorker.js', {scope: '/'});

    //register push
    const macki = await register.pushManager.subscribe({
        userVisibleOnly: true,
        //public vapid key
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    //Send push notification
    await fetch("/macki", {
        method: "POST",
        body: JSON.stringify(macki),
        headers: {
            "content-type": "application/json"
        }
    });
}