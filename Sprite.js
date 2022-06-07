class Sprite {
    constructor(x, y, w = null, h = null, painter = null) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.painter = painter;

        this.behaviors = [];

    }

    paint(context) {
        this.painter.paint(context, this.x, this.y, this.w, this.h);
    }

    exec() {
        this.behaviors.filter(b => b.enabled).forEach(b => {
            b.exec(this)
        })
    }
}