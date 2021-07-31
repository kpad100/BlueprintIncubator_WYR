class IdleTimer {
    constructor({timeout, onTimeout}){
        this.timeout = timeout;
        this.onTimeout = onTimeout;

            // const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
            // if(expiredTime > 0 && expiredTime < Date.now()){
            //     alert("expired")
            //     onExpired();
            //     return;
            // }


        //bind will keep the eventhandler function to current context
        this.eventhandler = this.updateExpiredTime.bind(this);
        this.tracker();
        this.startInterval();
    }


    //initialize timer and check timeout every 1 second, onTimeout is the callback function to be executed after timeout
    startInterval()
    {
        this.updateExpiredTime();

        this.interval = setInterval(() => {
            const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
            if(expiredTime < Date.now())
            {
                if(this.onTimeout)
                {
                    this.onTimeout();
                    // this.cleanUp();
                }
            }
    },1000);
}

    //update timeout time in the local storage whenever user has any movement, keep an additional timeoutTracker so only store expire time to storage after user stops interaction for 300ms
    updateExpiredTime()
    {
        if(this.timeoutTracker){
            clearTimeout(this.timeoutTracker);
        }
        this.timeoutTracker = setTimeout(() => {
            localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
        }, 300);
       
    }

    //track user interactions including mousemove, scroll, keystroke and click
    tracker()
    {
        window.addEventListener("mousemove", this.eventhandler);
        window.addEventListener("scroll", this.eventhandler);
        window.addEventListener("keydown", this.eventhandler);
        window.addEventListener("click", this.eventhandler);
    }

    cleanUp() {
        localStorage.removeItem("_expiredtime");
        clearInterval(this.interval);
        window.removeEventListener("mousemove", this.eventhandler);
        window.removeEventListener("scroll", this.eventhandler);
        window.removeEventListener("keydown", this.eventhandler);
        window.removeEventListener("click", this.eventhandler);
    }
}
export default IdleTimer;