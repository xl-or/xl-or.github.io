class InputHandler {


    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            //console.log('keydown');
            if (e.key === ' ') {
                this.game.grab();
            }
        });
        window.addEventListener('keyup', (e) => {
            //console.log('keyup');
            if (e.key === ' ') {
                this.game.ungrab();
            }
        });

        window.addEventListener("touchstart", (e) => {this.game.grab();});
        window.addEventListener("touchend", (e) => {this.game.ungrab();});
    }



}