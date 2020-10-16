// wait for all content to load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []

    //create board
    function createBoard() {
        //shuffle array of bombs throughout grid
        const bombArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        console.log(shuffledArray)


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