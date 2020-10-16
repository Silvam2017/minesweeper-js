// wait for all content to load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []
    let isGameOver = false

    //create board
    function createBoard() {
        //shuffle array of bombs throughout grid
        // create array of 20 strings that say bomb
        const bombArray = Array(bombAmount).fill('bomb')
        // remaining squares filled by array of strings that say valid
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        // concatenate both arrays together
        const gameArray = emptyArray.concat(bombArray)
        // randomize order of strings within new gameArray each time function is called
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)


        for(let i =0; i < width*width; i++) {
            //create a div for each square on the board
            const square = document.createElement('div')
            //give each square an id from each increment
            square.setAttribute('id', i)
            // add class to each square within iteration matching the spot in shuffledArray
            square.classList.add(shuffledArray[i])
            //append square to grid
            grid.appendChild(square)
            //push square into empty squares array
            squares.push(square)

            //left mouse click
            square.addEventListener('click', function(e) {
                click(square)
            })
        }
        //count number of bombs surrounding each square
        for(let i = 0; i < squares.length; i++) {
            let total = 0
            // exclude counting numbers to left of numbers on left edge or numbers to right of numbers on right edge
            // numbers divisible by width = (10) with remainer 0 are all on left edge
            const isLeftEdge = i % width === 0
            // numbers divisble by width = (10) with remainer -1 are all on right edge
            const isRightEdge = i % width === -1

            if (squares[i].classList.contains('valid')) {
                //if we are not clicking the top left corner, and not on left edge, and the square to the left contains a bomb, add one to total
                if (i>0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
                // squares i +1 -width is up/right (northeast)
                if (i>9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
                // squares i-width is above (north)
                if (i>10 && squares[i - width].classList.contains('bomb')) total ++
                // squares i -1 -width is up/left (northwest)
                if (i>11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
                // squares i +1 is to the right(east)
                if (i<98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
                // squares i -1 + width is down/left (southwest)
                if (i<90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
                // squares i + 1 + width is down/right (southeast)
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
                // squares i + width is down (south)
                if (i<89 && squares[i + width].classList.contains('bomb')) total ++
                squares[i].setAttribute('data', total)
                console.log(squares[i])
            }
        }
    }
    createBoard()

    //click on square actions
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            console.log('Game Over')
        } else {
            let total = square.getAttribute('data')
            if (total !=0) {
                square.classList.add('checked')
                square.innerHtml = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    // check neighboring squares once square is linked
    
})
