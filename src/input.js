class InputHandler {


    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                this.game.grab();
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === ' ') {
                this.game.ungrab();
            }
        });

        window.addEventListener("touchstart", (e) => {this.game.grab();});
        window.addEventListener("touchend", (e) => {this.game.ungrab();});
    }



}