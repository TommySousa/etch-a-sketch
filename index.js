//CREATING THE DIVS IN THE CONTAINER
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