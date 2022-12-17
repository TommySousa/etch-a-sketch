//CREATING THE DIVS IN THE CONTAINER
const dimensionX = 16;
const dimensionY = 16;

let color = null;
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
    this.classList.add('horizontal_hover');
    this.setAttribute('style', `background-color:${getColor()}`);
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
        square.classList.remove('horizontal_hover');
    });
};

//ELIMINATES THE GRID ELEMENTS TO CREATE A NEW GRID
const removeGridElements = () => {
    const container = document.querySelector('#container');
    console.log(container)
    console.log(container.children)
    container.replaceChildren();
};

//FUNCTION THAT RESIZES THE GRID AND CHECKS IF USER INSERTED NUMBER BETWEEN 1-100;
//ADD STRIG VERIFICATION LATER;
const resizeGrid = () => {
    let horizontalSquares = prompt('How many vertical squares?');
    horizontalSquares = parseInt(horizontalSquares);
    while(horizontalSquares > 100 || horizontalSquares <= 0){
        horizontalSquares = prompt('Insert a number between 1-100')
        horizontalSquares = parseInt(horizontalSquares);
    };

    let verticalSquares = prompt('How many horizontal squares?');
    verticalSquares = parseInt(verticalSquares);
    while(verticalSquares > 100 || verticalSquares <= 0){
        verticalSquares = prompt('Insert a number between 1-100')
        verticalSquares = parseInt(verticalSquares);
    };
    
    removeGridElements();
    originalGrid(verticalSquares, horizontalSquares);
    draw();
};


//make the grid mount when the page is loaded
window.onload = originalGrid(dimensionY, dimensionX);
window.onload = draw();
window.onload = listen();


