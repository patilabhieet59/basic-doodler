document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    let doodler;
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 500
    let platformSpacing = 120
    let platforms = []
    let gameover = false
    let landedPlatform = -1
    
    class Doodler {
        constructor() {
            this.left = platforms[0].left + 10;
            this.bottom = platforms[0].bottom + 15;
            let visual = document.createElement('div');
            this.visual = visual;
            visual.classList.add('doodler');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }
    
    function createDoodler() {
        doodler = new Doodler();
       
    }
    

    class Platform {
        constructor(bottom){
            this.left = 400 * Math.random();
            this.bottom = bottom; 
            let visual = document.createElement('div');
            this.visual = visual; 
            visual.classList.add('platform');
            
            visual.style.left =  this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);            
            platforms.push(this);
        }
    }

    function createPlatform() {
        for(var i=1;i<=5;i++) {
            let bottom = platformSpacing * i;
            let platform = new Platform(bottom);
        }
        
    }
   

    function movePlatforms() {
        setInterval(()=>{
            let modify = false;
            platforms.forEach((p,i) => {
                p.bottom -= 5;
                p.visual.style.bottom = p.bottom + 'px';
                if(p.bottom < 0) {
                    modify = true;
                }
                if(landedPlatform === i) {
                    console.log('matched');
                    doodler.bottom = p.bottom
                }
            })
            
            if(modify) {
                let visual = platforms[0].visual;
                visual.classList.remove('platform');
                platforms.shift();
                let bottom = platformSpacing * 5;
                let platform = new Platform(bottom);
                modify = false;
                landedPlatform += 1;
            }
        },300)
    }
    
    function control(e){
        
        if(e.key === 'ArrowUp') {
            landedPlatform = -1;
            if(doodler.bottom + 100 < 550){
                doodler.bottom += 100;
                doodler.visual.style.bottom = doodler.bottom + 'px';
            }
        }
        if(e.key === 'ArrowLeft') {
            landedPlatform = -1;
            if(doodler.left - 30 > 0 ){
                doodler.left -= 30;
                doodler.visual.style.left = doodler.left + 'px';
            }
        }
        if(e.key === 'ArrowRight') {
            landedPlatform = -1;
            if(doodler.left + 30 < 460) {
                doodler.left += 30;
                doodler.visual.style.left = doodler.left + 'px';
            }
        }
    }

    function fall() {
        setInterval(()=>{
            
            if(landedPlatform < 0 && !isLanded(doodler.left,doodler.bottom) && doodler.bottom - 1 > 0){
                doodler.bottom -= 1;
                doodler.visual.style.bottom = doodler.bottom + 'px';
            }
        },20);
    }

    function isLanded(left,bottom) {
        let result = false;
        platforms.forEach((p,i) => {
            if(p.left < left && p.left + 100 > left + 40 && 
               p.bottom + 10 < bottom && p.bottom + 20 > bottom && !result) {
                console.log('landed on: ' + i);
                landedPlatform = i;
                result = true;
            }
        })
        return result;
    }

    function start(){
        if(!gameover) {
            createPlatform();
            createDoodler();
            movePlatforms();
            fall();
            document.addEventListener('keyup',control);
        }
    }
    start();
})
