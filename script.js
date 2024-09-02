window.addEventListener('load', function () {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;  
    
    
    const work = new Work(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        work.update(deltaTime);
        work.draw(ctx);
        lastTime = currentTime;
        requestAnimationFrame(animate);
    }

    animate(0);
})
