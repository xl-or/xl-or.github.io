
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
                this.image = document.getElementById('working_men');
            } else {
                this.image = document.getElementById('unworking_men');
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

    set_img(img) {
        this.image = img;
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


    update(dx) {
        if (this.grabed) return;
        this.x += dx;
        this.y += dx * 0.04;
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


    update(dx) {
        if (this.grabed) return;
        this.x += dx;
        this.y += dx * 0.04;
    }
}




class Machine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.part_0 = new Object(x, y, document.getElementById('base_0'));   
        this.part_1 = new Object(x + 176, y + 295, document.getElementById('base_1'));
        this.objects = [];
        this.alarm = false;
        this.fail = false;
        this.speed = 1;
    }


    reset_alarm(instance) {
        if (!instance.alarm) return;
        instance.part_0.set_img(document.getElementById('base_0'));
        instance.alarm = false;
    }

    set_alarm() {
        if (this.alarm) return;
        this.alarm = true;
        this.fail = true;
        this.part_0.set_img(document.getElementById('base_0_alarm')); 
        setTimeout(this.reset_alarm, 250, this);   
    }


    create_object() {
        const random_value = Math.random();
        if (random_value < 0.2) {
             this.objects.push(new Circle(this.x, this.y + 415));
        } else { 
            this.objects.push(new Triangle(this.x, this.y + 415));
        }
    }


    grab_object() {
        for (let i = 0; i < this.objects.length; i++) {
            if ((this.objects[i].x < (this.x + 576)) && (this.objects[i].x > (this.x + 376))) {
                return this.objects[i];
            }
        }

        return null;
    }




    update(dt) {
        this.objects.forEach(obj => {
            obj.update(this.speed * dt / 10);
            if (obj.x > this.x + 876) {
                obj.remove_flag = true;
                if (obj instanceof Circle) {
                    this.set_alarm();
                }
            }

        });
        this.objects = this.objects.filter(obj => !obj.remove_flag);
    }


    draw(ctx) {
        this.part_1.draw(ctx);
        this.objects.forEach(obj => obj.draw(ctx));
        this.part_0.draw(ctx);
    }
}






class Work {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.worker = new Worker(width/2, height/4);
        this.machine = new Machine(324, -95);
        this.input = new InputHandler(this);
        this.ui = new UI(700, 45);
        this.grabbed_obj = null;
        this.grab_status = false;
        this.empty_arm = true;
        this.new_obj_period = 3000 / this.machine.speed;
    }

    grab() {

        this.worker.set_working_status(false);
        if (this.grab_status) return;
        this.grab_status = true;

        this.grabbed_obj = this.machine.grab_object();

        if (this.grabbed_obj == null) {
            this.empty_arm = true;
            return;
        }

        this.empty_arm = false;

        if (this.grabbed_obj instanceof Circle) {
            this.ui.save_counter += 1;
            if (this.ui.save_counter % 5 == 0) {
                this.ui.machine_speed += 1;
                this.machine.speed += 1;
            }
        }

        this.grabbed_obj.grabed = true;
        this.grabbed_obj.x = 750;
        this.grabbed_obj.y = 150;
    }


    ungrab() {
        this.worker.set_working_status(true);
        if (!this.grab_status) return;

        this.grab_status = false;

        if (this.empty_arm) return;

        this.grabbed_obj.remove_flag = true;
    }




    update(dt) {
        this.new_obj_period -= dt;
        if (this.new_obj_period <= 0) {
            this.machine.create_object();
            this.new_obj_period = 3000 / this.machine.speed; 
        }

        this.machine.update(dt);

        if (this.machine.fail) {
            this.machine.fail = false;
            this.ui.fail_counter += 1;
            if ((this.ui.fail_counter % 5 == 0) && (this.machine.speed > 1)) {
                this.ui.machine_speed -= 1;
                this.machine.speed -= 1;
            }
        }
    }



    draw(ctx) {
        this.worker.draw(ctx);
        this.machine.draw(ctx);
        this.ui.draw(ctx);
    }


}


