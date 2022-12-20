//CREATING THE DIVS IN THE CONTAINER
const dimensionX = 16;
const dimensionY = 16;
let erase = false;
let randomColor = false;
let shader = false;
let hslColor;
let newColor;
let h;
let s;
let l;
let color = null;

//GETS THE COLOR FROM THE SELECTOR 
const getColor = () => {
    if (color == null){
        color = document.getElementById('color');
    }
    return color.value;
};

const originalGrid = (y, x) => {
    const container = document.getElementById('container'); 
    for (let i = 0; i<y; i++){
        let div = document.createElement('div');
        div.classList.add('vertical');
        container.appendChild(div);
        for(let j = 0; j<x; j++){ 
            let divs = document.createElement('div');
            divs.classList.add('horizontal');
            div.appendChild(divs);
        };
    };
};

//FUNCTION THAT HAS ALL THE BUTTON EVENT LISTENERS 
const listen = () => {
    //CLICK THE BUTTON AND CHANGE DE NUMBER OF SQUARES IN CANVAS
    const grid = document.querySelector('.grid');
    grid.addEventListener('click', () => {
    resizeGrid();
 });

    //CLIK THE BUTTON AND ACTIVATE THE GRID LINES ON THE CANVAS
    const lines = document.getElementById('add-grid');
    lines.addEventListener('click', () =>{
        addLines();
    });

    //clears the board change after
    const clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        clearGrid();
    });

    //TOOGLES THE ERASER
    const eraser = document.querySelector('.eraser');
    eraser.addEventListener('click', () => {
        if (erase == false) {
            eraser.setAttribute('style', `background-color:hsl(0,0%,50%)`);
            erase = true;
        }
        else if (erase == true) {
            eraser.removeAttribute('style', `background-color:hsl(0,0%,50%)`);
            erase = false;
        }
    }); 

    //TOGGLES SHADER
    const shade = document.querySelector('.shader');
    shade.addEventListener('click', () => {
        if (shader == false) {
            shade.setAttribute('style', `background-color:hsl(0,0%,50%)`);
            shader = true;

        } else if (shader == true) {
            shade.removeAttribute('style', `background-color:hsl(0,0%,50%)`);
            shader = false;
        }
    });

    //TOGGLES RAINBOW
    const rainbow = document.querySelector('.rainbow');
    rainbow.addEventListener('click', () => {
        if (randomColor == false) {
            rainbow.setAttribute('style', `background-color:hsl(0,0%,50%)`);
            randomColor = true;

        } else if (randomColor == true) {
            rainbow.removeAttribute('style', `background-color:hsl(0,0%,50%)`);
            randomColor = false;
        }
    });
};

//ADDS OR REMOVES THE GRID LINES 
const addLines = () => {
    const container = document.getElementById('container');
    const lines = document.getElementById('add-grid');
     if(!container.classList.contains('hasgrid')){
        container.classList.add('hasgrid');
        lines.innerHTML = 'Remove Grid';
     }
     else{
        container.classList.remove('hasgrid');
        lines.innerHTML = 'Add Grid';
     }
};


//CREATES A RANDOM NUMBER BETWEEN 0 AND 256
const random = () => {
    return Math.floor(Math.random() * (257));
};

//RGB TO HSL FOUND THIS ON THE INTERNET
function RGBToHSL(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }

    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;

    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    if (delta == 0)
        h = 0;
  // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
  // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
      h += 360;

      l = (cmax + cmin) / 2;

      // Calculate saturation
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
      // Multiply l and s by 100
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
    
      return "hsl(" + h + "," + s + "%," + l + "%)";
};

//gets hsl shade parameter and adds 10% to the whole color
const addShade = (col) => {
    //regular expression that checks the hsl
    const hslMatch = new RegExp(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g);
    let arr = hslMatch.exec(col);

    //TO AVOID TYPE ERRORS
    if (arr == null){
        arr = hslMatch.exec(col)
    };
    console.log(col)
    h = arr[1];
    s = arr[2];
    l = arr[3]; //shade Parameter
    l = parseFloat(l);

    //DON'T ADD NEGATIVE SHADERS
    if (l>0) {
        l -= 10;
    } else if (l<0){
        l = 0;
    }
};

//START DRAWING WHEN THE MOUSE IS HOVERING THE SQUARES
const startDraw = (e) => {
    e.preventDefault();
    const squares = e.currentTarget.querySelectorAll('.horizontal');
    squares.forEach(square => 
    {
         square.addEventListener('mouseover', paint);
         square.addEventListener('click', paint);
    });
};

//STOP DRAWING WHEN THE MOUSE IS HOVERING THE SQUARES
const stopDraw = (e) => {
    e.preventDefault();//to prevent default behaviour of  draggin 
    const squares = e.currentTarget.querySelectorAll('.horizontal');
    squares.forEach(square => square.removeEventListener('mouseover', paint));
};

//FUNCTION THAT PAINTS  THIS REFERS TO THE SQUARE THAT THE MOUSE IS ON CURRENTLY
function paint (e) {
    e.preventDefault();
    if (erase == false && randomColor == false && shader == false){
        this.setAttribute('style', `background-color:${getColor()}`);
    }
    else if (erase == true){
        this.setAttribute('style', `background-color: #FFFFFF`);
    } 
    else if (randomColor == true && erase == false ) {
        this.setAttribute('style', `background-color: rgb(${random()}, ${random()}, ${random()}`)
    } 
    else if (shader == true && randomColor == false && erase == false){   
        if (this.style.backgroundColor == ""){
            this.style.backgroundColor = ('rgb(255,255,255)');
            hslColor = RGBToHSL(this.style.backgroundColor);
            console.log(hslColor)
        } 
        hslColor = RGBToHSL(this.style.backgroundColor);
        hslColor = addShade(hslColor);
        this.setAttribute('style', `background-color: hsl(${h},${s}%,${l}%)`);
    };
};

//FUNCTION THAT DETECTS WHEN THE MOUSE IS PRESSED DOWN OR UP AND DRAWS
const draw = () => {
    const container = document.querySelector('#container');
    container.addEventListener('mousedown', startDraw);
    container.addEventListener('mouseup', stopDraw);
};

//CLEARS THE GRID 
const clearGrid = () => {
    const squares = document.querySelectorAll('.horizontal');
    squares.forEach(square => {
        square.setAttribute('style', null);
    });
};

//ELIMINATES THE GRID ELEMENTS TO CREATE A NEW GRID
const removeGridElements = () => {
    const container = document.querySelector('#container');
    container.replaceChildren();
};

//FUNCTION THAT RESIZES THE GRID AND CHECKS IF USER INSERTED NUMBER BETWEEN 1-100;
//ADD STRIG VERIFICATION LATER;
const resizeGrid = () => {
    let horizontalSquares = document.querySelector('.rows');
    horizontalSquares = horizontalSquares.value;
    horizontalSquares = parseInt(horizontalSquares);
    if(horizontalSquares > 100 || horizontalSquares <= 0){
        alert('Insert a number between 1-100');
        horizontalSquares = querySelector('.rows');
    } else if(isNaN(horizontalSquares)){
        alert('Insert a numeric value between 1-100');
        horizontalSquares = querySelector('.rows');
    }
    
    let verticalSquares = document.querySelector('.columns');
    verticalSquares = verticalSquares.value
    if(verticalSquares > 100 || verticalSquares <= 0){
        alert('Insert a number between 1-100');
        verticalSquares = querySelector('.columns');
    }else if(isNaN(verticalSquares)){
        alert('Insert a numeric value between 1-100');
        verticalSquares = querySelector('.rows');
    }
    removeGridElements();
    originalGrid(verticalSquares, horizontalSquares);
    draw();
};



//make the grid mount when the page is loaded
window.onload = originalGrid(dimensionY, dimensionX);
window.onload = draw();
window.onload = listen();


