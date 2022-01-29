'use strict'


function bildBoard() {
    var mat = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            row.push({
                minesAround: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            })
        }
        mat.push(row)
    }
    return mat
}



function cliggck(ev) {
    console.log(ev)
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function updateCellsAround(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gboard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gboard[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            if (gboard[i][j].isMine) continue
            var currCell = gboard[i][j]
            currCell.minesAround++
        }
    }
}