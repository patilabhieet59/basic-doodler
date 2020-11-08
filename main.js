document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 500
    let platformSpacing = 120
    let platforms = []
    
    
    function createDoodler() {
        const doodler = document.createElement('div');
        this.left = doodlerLeftSpace;
        this.bottom = doodlerBottomSpace;
        doodler.classList.add('doodler');
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
        grid.appendChild(doodler);
    }
    createDoodler();

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
        for(var i=0;i<5;i++) {
            let bottom = platformSpacing * i;
            let platform = new Platform(bottom);
        }
        
    }
    createPlatform();

    function movePlatforms() {
        setInterval(()=>{
            platforms.forEach((p) => {
                p.bottom -= 5;
                p.visual.style.bottom = p.bottom + 'px';
            })
        },300)
    }
    movePlatforms();
})
