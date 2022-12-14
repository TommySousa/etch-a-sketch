//CREATING THE DIVS IN THE CONTAINER
//TURN INTO A FUNCTION LATER 
const container = document.querySelector('.container');
for (let i = 0; i<16; i++){
    let div = document.createElement('div');
    div.classList.add('vertical');
    container.appendChild(div);
    for(let j = 0; j<16; j++){ 
        let divs = document.createElement('div')
        divs.classList.add('horizontal');
        div.appendChild(divs);
    }
};

//MAKING THE CLASS HOVER ACTIVE WHEN THE MOUSE HOOVERS IN THE HTML SQUARES
const hover = document.getElementsByClassName('horizontal');
for (let i = 0; i < hover.length; i++){
     hover[i].addEventListener('mouseover', (el) => {
        el.target.classList.add('horizontal_hover')
     })
 };

