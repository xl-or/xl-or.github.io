
class Worker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.working = true;
        this.image = document.getElementById('working_men');
    }

    set_position(x, y) {
        self.x = x;
        self.y = y;
    }

    set_working_status(status) {
        if (this.working != status) {
            this.working = status;
            if (this.working) {
                this.image = document.getElementById('unworking_men');
            } else {
                this.image = document.getElementById('working_men');
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}



class Object {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.image = img;
    }

    get_x_position() {
        return this.x;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}


class Circle extends Object {
    constructor(x, y) {
        super(x, y, document.getElementById('circle'));
        this.x_speed = 5;
        this.y_speed = 0.2;
        this.remove_flag = false;
        this.grabed = false;
    }


    update() {
        if (this.grabed) return;
        this.x += this.x_speed;
        this.y += this.y_speed;
        if (this.x > 1200) this.remove_flag = true;
    }
}

class Triangle extends Object {
    constructor(x, y) {
        var triangle_img = document.getElementById('triangle_0');
        if (Math.random() > 0.5) {
            triangle_img = document.getElementById('triangle_1');
        }

        super(x, y, triangle_img);
        this.x_speed = 5;
        this.y_speed = 0.2;
        this.remove_flag = false;
        this.grabed = false;
    }


    update() {
        if (this.grabed) return;
        this.x += this.x_speed;
        this.y += this.y_speed;
        if (this.x > 1200) this.remove_flag = true;
    }
}






class Work {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.worker = new Worker(width/2, height/4);
        this.base0 = new Object(324, -95, document.getElementById('base_0'));
        this.base1 = new Object(500, 200, document.getElementById('base_1'));
        this.input = new InputHandler(this);
        this.new_obj_period = 1000;
        this.objects = [];
        this.grabbed_obj = NaN;
        this.grab_status = false;
        this.empty_arm = true;
    }


    add_object() {
        const random_value = Math.random();
        if (random_value < 0.2) {
             this.objects.push(new Circle(320, 320));
        } else { 
            this.objects.push(new Triangle(320, 320));
        }

    }

    grab() {
        this.worker.set_working_status(true);
        if (this.grab_status) return;

        this.grab_status = true;

        for (let i = 0; i < this.objects.length; i++) {
            if ((this.objects[i].x < 900) && (this.objects[i].x > 700)) {

                this.grabbed_obj = this.objects[i];
                this.empty_arm = false;
                break;
            }
        }

        if (this.empty_arm) return;

        this.grabbed_obj.grabed = true;
        this.grabbed_obj.x = 750;
        this.grabbed_obj.y = 150;

    }


    ungrab() {
        this.worker.set_working_status(false);
        console.log(this.grabbed_obj);
        if (!this.grab_status) return;

        this.grab_status = false;

        if (this.empty_arm) return;

        this.grabbed_obj.remove_flag = true;
    }




    update(dt) {

        this.new_obj_period -= dt;
        if (this.new_obj_period <= 0) {
            this.add_object();
            this.new_obj_period = 1000; 
        }

        this.objects.forEach(obj => obj.update());

        this.objects = this.objects.filter(obj => !obj.remove_flag);


    }



    draw(ctx) {
        this.worker.draw(ctx);
        this.base1.draw(ctx);

        this.objects.forEach(obj => obj.draw(ctx));

        this.base0.draw(ctx);
    }


}


