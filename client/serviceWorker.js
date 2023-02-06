self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "Na batyu kakite prashtat haber", //the body of the push notification
            image: "./sexy-angel-devil-red-colour-260nw-2021287760-modified.png",
            icon: "./sexy-angel-devil-red-colour-260nw-2021287760-modified.png" // icon 
        }
    );
});