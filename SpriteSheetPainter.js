    

class SpriteSheetPainter {
    constructor(img, cells, pageFlip, ratio = 1) {
        this.img = img;
        this.cells = cells;
        this.pageFlip = pageFlip;

        this.lastUpdateTime = 0;
        this.cellIdx = 0;
        this.hMirror = false;
        this.ratio = ratio;

    }

    paint(context, x, y, w = null, h = null) {
       if (!(w && h)) {
           w = this.cells[this.cellIdx].width * this.ratio;
           h = this.cells[this.cellIdx].height * this.ratio;
       }

       if(!this.hMirror) {
            context.drawImage(this.img,   
                cells[this.cellIdx].x,
                cells[this.cellIdx].y,
                cells[this.cellIdx].width,
                cells[this.cellIdx].height,
                x, y, w, h
            )
        
        } else { 
            context.save(); 
            context.translate(x + w, 0);
            context.scale(-1, 1);
            context.drawImage(this.img,   
                cells[this.cellIdx].x,
                cells[this.cellIdx].y,
                cells[this.cellIdx].width,
                cells[this.cellIdx].height,
                0, y, w, h
            );
            context.restore();
    }
    }

    
    update() {
        
        if (this.lastUpdateTime == 0) this.lastUpdateTime = Date.now();
        if (Date.now() - this.lastUpdateTime >= 1000 / this.pageFlip) {
            this.cellIdx = (this.cellIdx + 1) % this.cells.length; 
            this.lastUpdateTime = Date.now();
        }
    }
  
    

}