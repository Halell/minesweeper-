'use strict'

const gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    shownCount: 0, //neaded?  hint?
    markedCount: 0,//neaded?  hint?
    secsPassed: 0
}


var gboard
var gClick
var gMines = []

function init() {
    gboard = bildBoard()
    renderBoard()
    // renderCell(0, 0)
}




function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gboard.length; i++) {
        strHTML += '<tr class="game-row">\n'
        for (var j = 0; j < gboard[0].length; j++) {
            var currCell = gboard[i][j]
            strHTML += `\t<td class="game-cell" 
                    onmousedown="clickEv(${i}, ${j}, event)" 
                    id="${i},${j}"  
                    title="${i}, ${j}" >\n`//for develop purposes
            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.game-board')

    elBoard.innerHTML = strHTML
}

function clickEv(row, col, ev) {
    var isLeft = (ev.which === 1) ? true : false
    var currClick = gboard[row][col]
    // check in the end if we cen spare gClick
    gClick = {
        i: +row,
        j: +col,
        isLeft: isLeft
    }
    if (!isLeft) {
        if (currClick.isShown) return
        currClick.isMarked = (!currClick.isMarked) ? true : false
        var display = (currClick.isMarked) ? '🚩' : ''

        var elCell = document.getElementById(`${row},${col}`)
        elCell.innerText = display
        elCell.classList.add('flagged')

    }


    if (isLeft) {
        if (!gGame.isOn) minesPlanting()
        if (currClick.isMarked) return
        if (currClick.isShown) return
        if (currClick.isMine) {
            currClick.isShown = true
            gameOver(false)
            return // neaded?
        }
        openCell()
    }




}

function minesPlanting() {

    gMines = getMines(gLevel.MINES)
    console.log(gMines)//temp
    for (var i = 0; i < gMines.length; i++) {
        var currCell = gboard[gMines[i].i][gMines[i].j]
        if (currCell.isMine ||
            gMines[i].i === gClick.i && gMines[i].j === gClick.j) {
            var newMine = getMines(1)
            gMines.splice(i, 1, newMine[0])
            i--
            continue
        }

        currCell.isMine = true
        updateCellsAround(gMines[i].i, gMines[i].j)
    }
    console.log(gboard)//temp
    gGame.isOn = true
}


function getMines(mineAmount) {
    var mines = []
    for (var i = 0; i < mineAmount; i++) {
        var currCell = {
            i: getRandomInt(0, gLevel.SIZE),
            j: getRandomInt(0, gLevel.SIZE)
        }
        // in case the exact same object randomly came out we wil chek that in the
        //push to 'gboard' stage. in that case we wil initiate the 'getMines()' agien withe
        // parameter of 1
        mines.push(currCell)
    }
    return mines
}

function openCell() {
    var currCell = gboard[gClick.i][gClick.j]
    if (currCell.minesAround) {
        renderCell(gClick.i, gClick.j)
        currCell.isShown = true
        return
    }

    getNgs(gClick.i, gClick.j)

}

function renderCell(row, col) {

    var currCell = gboard[row][col]
    var elCell = document.getElementById(`${row},${col}`)

    var numOfMines = '' + currCell.minesAround
    elCell.classList.add('open')
    elCell.innerText = (!currCell.minesAround) ? '' : numOfMines

    switch (currCell.minesAround) {
        case 1:
            elCell.style.color = '#0000ff'
            break
        case 2:
            elCell.style.color = '#028500'
            break
        case 3:
            elCell.style.color = '#ff0000'
            break
        case 4:
            elCell.style.color = '#0a007a'
            break
        case 5:
            elCell.style.color = '#7a0000'
            break
        case 6:
            elCell.style.color = '#00a2ab'
            break
        case 7:
            elCell.style.color = '#000000'
            break
    }
}


function getNgs(rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gboard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gboard[0].length - 1) continue
            if (gboard[i][j].isMarked) continue
            renderCell(i, j)
        }
    }
}

function gameOver(win) {
    console.log(gMines)
    if (!win) {
        for (var i = 0; i < gMines.length; i++) {
            var currCell = gboard[gMines[i].i][gMines[i].j]
            var elCell = document.getElementById(`${gMines[i].i},${gMines[i].j}`)
            elCell.classList.add('open')
            elCell.innerText = '💣'
            if (currCell.isShown) {
                elCell.style.backgroundColor = '#ed0000'
            }
            else { currCell.isShown = true }
        }
    }

}










