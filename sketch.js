function mark(e) {
    e.target.style.backgroundColor = 'black';
}




const gridContainer = document.querySelector('.grid-container');
const dim = 400/16;

/*for(let i = 0; i < 64; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.width = dim + 'px';
    grid.style.height = dim + 'px';
    gridContainer.appendChild(grid);
}*/

for(let i = 0; i < 16; i++) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    gridRow.style.height = dim +'px';

    for(let j = 0; j < 16; j ++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.style.width = dim + 'px';
        grid.style.height = dim + 'px';
        gridRow.appendChild(grid);
    }

    gridContainer.appendChild(gridRow);
}


const grids = document.querySelectorAll('.grid');
grids.forEach(grid => {
    grid.addEventListener('mouseover', mark);
});