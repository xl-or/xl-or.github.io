class UI {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.fail_counter = 0;
        this.save_counter = 0;
        this.machine_speed = 0;
    }


    draw(ctx) {
        ctx.font="30px Comic Neue";
        ctx.fillText('i guess we doing circle now:', this.x,  this.y);
        ctx.fillText('' + this.fail_counter,         this.x + 500, this.y);

        ctx.fillText('a circle?? in the triangle factory??:', this.x,  this.y + 30);
        ctx.fillText('' + this.save_counter,                  this.x + 500, this.y + 30);

        ctx.fillText('machine speed:',               this.x,  this.y + 60);
        ctx.fillText('' + this.machine_speed,        this.x + 500, this.y + 60);
    }
}