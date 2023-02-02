let notified = [];

function notifier() {
    DB.forEach(async (mace) => {
        try {
            let temp = await axios(`https://stripchat.com/api/external/v4/widget?sortOrder=asc&modelsList=${mace}&strict=1`);
            //console.log(temp.data.models[0]);
            if (temp.data.models[0] && !notified.includes(mace)) {
                notified.push(mace);
                let prms = Notification.requestPermission();
                let notification = new Notification(`${temp.data.models[0].username} is online`);
                notification.onclick = function(e) {
                    e.preventDefault();
                    window.open(`https://xhamsterlive.com/${mace}`, '_blank');
                };
            }

            if(!temp.data.models[0] && notified.includes(mace)) {
                notified.splice(notified.indexOf(mace), 1);
                console.log(`Iztri ${mace}`);
            }
        } catch (error) {
            throw Error(error);
        }
    });

    setTimeout(notifier, "60000");
}

notifier();
