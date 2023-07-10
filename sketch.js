const totalLength = 500;
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
    e.target.style['background-color'] = 'black';
}

function startErasing(e) {
    erase(e);
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.addEventListener('mouseover', erase);
        grid.addEventListener('mouseup', stopErasing);
    });
}

function stopErasing(e) {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.removeEventListener('mouseover', erase);
        grid.classList.remove('nontransition');
    });
}

function erase(e) {
    e.target.classList.add('nontransition');
    e.target.classList.remove('marked');
    e.target.style['background-color'] = 'white';
}

function startRainbowing(e) {
    rainbow(e);
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.addEventListener('mouseover', rainbow);
        grid.addEventListener('mouseup', stopRainbowing);
    });
}

function stopRainbowing(e) {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.removeEventListener('mouseover', rainbow);
    });
}

function rainbow(e) {
    e.target.classList.add('marked');
    e.target.style['background-color'] = "#" + Math.floor(Math.random()*16777215).toString(16);
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

    const currentToggled = document.querySelector('.toggled');
    addGridEventListeners(currentToggled.id);

    /*const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.addEventListener('mousedown', startMarking);
    });*/
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

function clear(e) {
    const markedGrids = document.querySelectorAll('.marked');
    markedGrids.forEach( markedGrid => {
        markedGrid.classList.remove('marked');
        markedGrid.style['background-color'] = 'white';
    });
}

function addGridEventListeners(newMode) {
    const grids = document.querySelectorAll('.grid');
    switch(newMode) {
        case 'dark-mode':
            grids.forEach(grid => {
                grid.addEventListener('mousedown', startMarking);
            });
            break;
        case 'eraser-mode':
            grids.forEach(grid => {
                grid.addEventListener('mousedown', startErasing);
            });
            break;
        case 'rainbow-mode':
            grids.forEach(grid => {
                grid.addEventListener('mousedown', startRainbowing);
            });
            break;            
    }
}

function removeGridEventListeners(oldMode) {
    const grids = document.querySelectorAll('.grid');
    switch(oldMode) {
        case 'dark-mode':
            grids.forEach(grid => {
                grid.removeEventListener('mousedown', startMarking);
            });
            break;
        case 'eraser-mode':
            grids.forEach(grid => {
                grid.removeEventListener('mousedown', startErasing);
            });
            break;
        case 'rainbow-mode':
            grids.forEach(grid => {
                grid.removeEventListener('mousedown', startRainbowing);
            });
            break;
    }
}

function toggle(e) {
    const currentToggled = document.querySelector('.toggled');
    currentToggled.classList.remove('toggled');
    e.target.classList.add('toggled');
    removeGridEventListeners(currentToggled.id);
    addGridEventListeners(e.target.id);
    currentToggled.addEventListener('click', toggle);
    e.target.removeEventListner('click', toggle);
}


const darkModeButton = document.querySelector('#dark-mode');
darkModeButton.classList.add('toggled');
const changeSizeButton = document.querySelector('#change-size');
changeSizeButton.addEventListener('click', changeGrid);
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);
const eraserModeButton = document.querySelector('#eraser-mode');
eraserModeButton.addEventListener('click', toggle);
const rainbowModeButton = document.querySelector('#rainbow-mode');
rainbowModeButton.addEventListener('click', toggle);

generateGrid(16);