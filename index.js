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
    console.log(container)
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

//START DRAWING WHEN THE MOUSE IS HOVERING THE SQUARES
const startDraw = (e) => {
    e.preventDefault();
    const squares = e.currentTarget.querySelectorAll('.horizontal');
    squares.forEach(square => square.addEventListener('mouseover', paint));
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


//FUNCTION THAT DETECTS WHEN THE MOUSE IS PRESSED DOWN OR UP
const draw = () => {
    const container = document.querySelector('#container');
    container.addEventListener('mousedown', startDraw);
    container.addEventListener('mouseup', stopDraw);
};

 //CLICK THE BUTTON AND CHANGE DE NUMBER OF SQUARES IN CANVAS
 const grid = document.querySelector('.grid');
 grid.addEventListener('click', () => {
    resizeGrid();
 });

 //FUNCTION THAT REMOVES AND APPENDS THE GRID AGAIN TO THE PAGE
const removeGrid = () =>{
    let container = document.getElementById('container');
    container.remove();
    const addContainer = document.createElement('div');
    addContainer.setAttribute("id", "container");
    addContainer.classList.add('container');
    document.body.insertBefore(addContainer, document.body.firstChild)
};

//FUNCTION THAT RESIZES THE GRID AND CHECKS IF USER INSERTED NUMBER BETWEEN 1-100
//ADD STRIG VERIFICATION LATER
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
    
    removeGrid();
    originalGrid(verticalSquares, horizontalSquares);
    draw();
};


//make the grid mount when the page is loaded
window.onload = originalGrid(dimensionY, dimensionX);
window.onload = draw();


