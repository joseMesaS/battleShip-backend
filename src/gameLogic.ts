const battleShips = {
    'Aircraft_Carrier': {'name': 'AC', 'length': 5},
    'Battleship': {'name': 'BS', 'length': 4},
    'Cruiser': {'name': 'CR', 'length': 3},
    'Submarine': {'name': 'SB', 'length': 3},
    'Minesweeper': {'name': 'MS', 'length': 2}
}

const directions = ['horizontal', 'vertical']

const randomCoord = () => {
 return [Math.floor(Math.random() * Math.floor(12)),Math.floor(Math.random() * Math.floor(12)) ]
} 
const randomInitSetup = () => {
    return {
        initCoord: randomCoord(),
        direction: directions[Math.floor(Math.random()*directions.length)]
    }
}

const generateField = (rows,columns) => {
    let field = []
    for (let i = 0; i < rows; i++) {
        field.push([])
        for (let j = 0; j < columns; j++) {
            field[i].push(null)
        }
    }
    return field
}

const checkCollisions = (initCoord, direction, boat, field) => {
    if (direction === 'horizontal') {
        if (initCoord[1] + boat.length > 12) return false 
        for (let i = initCoord[1]; i < initCoord[1] + boat.length; i++) {
            if( field[initCoord[0]][i] !== null ) return false  
        }
    }else {
        if (initCoord[0] + boat.length > 12 ) return false 
        for (let i = initCoord[0]; i < initCoord[0] + boat.length; i++) {
            if( field[i][initCoord[1]] !== null ) return false  
        }
    }
    return true
}

const placeBoat = (initCoord, direction, boat, field) => {
    if (direction === 'horizontal') {
        for (let i = initCoord[1]; i < initCoord[1] + boat.length; i++) {
            field[initCoord[0]][i] = boat.name 
        }
    }else {
        for (let i = initCoord[0]; i < initCoord[0] + boat.length; i++) {
            field[i][initCoord[1]] = boat.name 
        }
    }
    return field
} 

export const generateBattleshipField = () => {
    let field = generateField(12,12)
    Object.values(battleShips).forEach(boat => {
        let coordinates = randomInitSetup()
        while (!checkCollisions(coordinates.initCoord,coordinates.direction,boat,field)) {
            coordinates = randomInitSetup()
        }
        placeBoat(coordinates.initCoord,coordinates.direction,boat,field)
    })
   return field
}

export const shot = (enemyField, coords) => {
    if (enemyField[coords[0]][coords[1]] !== null && enemyField[coords[0]][coords[1]] !== 'hit' && enemyField[coords[0]][coords[1]] !== 'miss') {
        enemyField[coords[0]][coords[1]] = 'hit'
        return true
    } else {
        enemyField[coords[0]][coords[1]] = 'miss'
        return false
    }
}

export const pcShots = (enemyField) => {
    let pcShotCoord = randomCoord()
    while(enemyField[pcShotCoord[0]][pcShotCoord[1]] === 'hit' || enemyField[pcShotCoord[0]][pcShotCoord[1]] === 'miss') {
        pcShotCoord = randomCoord()
    }
    if (enemyField[pcShotCoord[0]][pcShotCoord[1]] === null) {
        enemyField[pcShotCoord[0]][pcShotCoord[1]] = 'miss'
        return false
    }else {
        enemyField[pcShotCoord[0]][pcShotCoord[1]] = 'hit'
        return true
    }
}


// let fieldg = generateBattleshipField()
// console.log(fieldg, 'init')
// for (let index = 0; index < 20; index++) {
//     pcShots(fieldg)
// }
// console.log(fieldg)









