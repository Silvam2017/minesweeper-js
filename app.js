// wait for all content to load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let squares = []

    //create board
    function createBoard() {


        for(let i =0; i < width*width; i++) {
            //create a div for each square on the board
            const square = document.createElement('div')
            //give each square an id from each increment
            square.setAttribute('id', i)
            //append square to grid
            grid.appendChild(square)
            //push square into empty squares array
            squares.push(square)
        }
    }
    createBoard()
})