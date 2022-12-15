//CREATING THE DIVS IN THE CONTAINER
//TURN INTO A FUNCTION LATER 
const dimensionX = 16;
const dimensionY = 16;

const originalGrid = (y, x) => {
    const container = document.querySelector('.container'); 
    for (let i = 0; i<y; i++){
        let div = document.createElement('div');
        div.classList.add('vertical');
        container.appendChild(div);
        for(let j = 0; j<x; j++){ 
            let divs = document.createElement('div')
            divs.classList.add('horizontal');
            div.appendChild(divs);
        }
    };
};

//let mouseDown = false;
//document.body.onmousedown = () => (mouseDown = true);
//document.body.onmouseup = () => (mouseDown = false);

// //INSTEAD OF MOUSEOVER I WILL TRY AND MAKE A MOUSEDOWN APPROACH
const container = document.querySelector('.container');
//const hover = document.getElementsByClassName('horizontal');

// for (let i = 0; i<hove.length; i++){
//     hove[i].addEventListener('click', (el) => {
//         console.log(el.target);
//         ismouseDown = true;
//         console.log(hove[i]);
//     })
// }



// container.addEventListener('mousedown', (event) => {
//     console.log(event)
//     ismouseDown = true;
// })
// container.addEventListener('mouseup', (event) => {
//     ismouseDown = false;
//     console.log(event)
// })

// setInterval(() => {
//     if(ismouseDown) {
//         console.log(container)   
//     }
// }, 500)


 //container[0].addEventListener('mousedown', () => {
   // console.log('click');


//FUNCTION THAT MAKES THE ELEMENTS WITH CLASS HORIZONTAL BE PAINTED
//   const hoverSquares = () => {
//        const hover = document.getElementsByClassName('horizontal');
//        for (let i = 0; i < hover.length; i++){
//            hover[i].addEventListener('mouseover', (el) => {
//               el.target.classList.add('horizontal_hover')
//               console.log(hover[i])
//            });
//        };
//    };



 //CLICK THE BUTTON AND CHANGE DE NUMBER OF SQUARES IN CANVAS
 const grid = document.querySelector('.grid');
 grid.addEventListener('click', () => {
    resizeGrid();
 })

 //FUNCTION THAT REMOVES AND APPENDS THE GRID AGAIN TO THE PAGE
const removeGrid = () =>{
    let container = document.querySelector('.container');
    container.remove();
    const addContainer = document.createElement('div');
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
    hoverSquares();
};

//make the grid mount when the page is loaded
window.onload = originalGrid(dimensionY, dimensionX);
//window.onload = hoverSquares();
let mouseDown;
let target;
//document.body.onmousedown = () => (mouseDown = true);
//document.body.onmouseup = () => (mouseDown = false);


