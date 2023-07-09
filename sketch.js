const totalLength = 400;
const gridContainer = document.querySelector('.grid-container');
const dimInitial = totalLength/16;

function startMarking(e) {
    mark(e);
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.addEventListener('mouseover', mark);
        grid.addEventListener('mouseup', stopMarking);
    });
}

function stopMarking(e) {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.removeEventListener('mouseover', mark);
    });
}

function mark(e) {
    e.target.classList.add('marked');
}

function generateGrid(numPerSide) {
    const dim = totalLength / numPerSide;
    for(let i = 0; i < numPerSide; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        gridRow.style.height = dim +'px';
    
        for(let j = 0; j < numPerSide; j ++) {
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
        grid.addEventListener('mousedown', startMarking);
    });
}

function changeGrid(e) {
    newNumPerSide = prompt('Please enter the new number of squares per side between 1 to 100');
    if(isNaN(newNumPerSide)){
        console.log('Invalid input');
        return;
    }
    if(newNumPerSide < 1 || newNumPerSide > 100){
        console.log('Input out of range');
        return;
    }

    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }

    generateGrid(newNumPerSide);
}


generateGrid(16);
const changeSizeButton = document.querySelector('#change-size');
changeSizeButton.addEventListener('click', changeGrid);

/* for(let i = 0; i < 16; i++) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    gridRow.style.height = dimInitial +'px';

    for(let j = 0; j < 16; j ++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.style.width = dimInitial + 'px';
        grid.style.height = dimInitial + 'px';
        gridRow.appendChild(grid);
    }

    gridContainer.appendChild(gridRow);
} */


/* const grids = document.querySelectorAll('.grid');
grids.forEach(grid => {
    grid.addEventListener('mouseover', mark);
}); */