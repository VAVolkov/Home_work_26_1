'use strict'

class FoodBin {
    constructor() {
        this.gallery = document.querySelector("#gallery");
        this.galleryImage = this.gallery.querySelectorAll('.galleryImage');

        this.binBlock = document.querySelector('#bin');
        this.tray = document.querySelector('h3');

        this.countInTheTray = 0;
        this.tray.innerText = `Кошик: ${this.countInTheTray}`;

        this.flag__toBin = false;
        this.flag__toGallery = false;

        this.fruit = document.querySelectorAll('.galleryImage');

        this.coord = {};
        this.bin = this.binBlock.getBoundingClientRect();
        this.galleryPropety = this.gallery.getBoundingClientRect();

        this.currentImage;
        this.currentPropetyImage;
        this.currentImageFromBin;
        this.currentImagePropetyFromBin;
        this.indexImage;
        this.propetyImage = [];
        this.imagePropetyFromBin = [];
    }


    getPropetyImage() {
        this.galleryImage.forEach((item) => {
            this.propetyImage.push(item.getBoundingClientRect());
        })
    }




    getCurrentImage() {
        for (let i = 0; i < this.propetyImage.length; i++) {
            if (this.coord.x >= this.propetyImage[i].left && this.coord.x <= this.propetyImage[i].right &&
                this.coord.y >= this.propetyImage[i].top && this.coord.y <= this.propetyImage[i].bottom) {
                return this.galleryImage[i];
            }
        }
    }


    getIndexOfImage() {
        for (let i = 0; i < this.galleryImage.length; i++) {
            if (this.currentImage == this.galleryImage[i]) {
                return i;
            }
        }
    }

    refresh() {
        this.galleryImage = this.gallery.querySelectorAll('.galleryImage');
        this.galleryImageInBin = this.binBlock.querySelectorAll('.galleryImage');
    }

    work() {

        this.gallery.addEventListener('mousedown', (even) => {
            this.flag__toBin = true;
            this.coord = {
                x: even.pageX,
                y: even.pageY
            };
            this.currentImage = this.getCurrentImage();
            console.log(this.currentImage);
        });



        document.addEventListener('mousemove', (even) => {
            if (this.flag__toBin) {
                this.indexImage = this.getIndexOfImage();
                this.currentPropetyImage = this.propetyImage[this.indexImage];

                console.log(this.flag);
                console.dir(this.currentPropetyImage);

                this.currentImage.style.position = 'absolute';
                this.currentImage.style.left = (even.pageX + this.currentPropetyImage.left - this.coord.x) + 'px';
                this.currentImage.style.top = (even.pageY + this.currentPropetyImage.top - this.coord.y) + 'px';
                this.currentImage.style.zIndex = 2;
            };
        });

        document.addEventListener('mouseup', (even) => {
            this.flag__toBin = false;
            if (even.pageX >= this.bin.left && even.pageX <= this.bin.right) {
                this.binBlock.append(this.currentImage);

                if (this.countInTheTray < 7) {
                    this.countInTheTray += 1;
                    //console.log(this.countInTheTray);

                    //this.tray.innerText = `Кошик: ${countInTheTray}`;
                    let copy = this.currentImage.cloneNode(true);
                    copy.removeAttribute('style');
                    this.binBlock.append(copy);
                    this.currentImage.remove();
                    this.currentImage = '';
                    this.refresh();
                }
            }
            else if (even.pageX >= this.galleryPropety.left && even.pageX <= this.galleryPropety.right) {
                this.galleryPropety.append(this.currentImageFromBin);

                if (this.countInTheTray > -1) {
                    this.countInTheTray -= 1;
                    //console.log(this.countInTheTray);

                    //this.tray.innerText = `Кошик: ${countInTheTray}`;
                    let copy = this.currentImageFromBin.cloneNode(true);
                    copy.removeAttribute('style');
                    this.gallery.append(copy);
                    this.currentImageFromBin.remove();
                    this.currentImageFromBin = '';
                    this.refresh();
                }
            }
        });




    }

    init() {
        //  console.dir(this.galleryImage);

        console.log([2, 3, 4, 5].indexOf(3));
        this.getPropetyImage();
        this.work();
        console.dir(this.currentPropetyImage);
    }
}





