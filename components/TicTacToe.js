export const TicTacToe = {
  el: null,

  isGameEnd: false,
  isXTurn: true,
  matrix: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  wonCombinations: [
    [[1, 1], [1, 2], [1, 3]],
    [[2, 1], [2, 2], [2, 3]],
    [[3, 1], [3, 2], [3, 3]],
    [[1, 1], [2, 2], [3, 3]],
    [[1, 3], [2, 2], [3, 1]],
    [[1, 1], [2, 1], [3, 1]],
    [[1, 2], [2, 2], [3, 2]],
    [[1, 3], [2, 3], [3, 3]],
  ],

  init({el, onMove}) {
    this.el = el
    this.onMove = onMove
    this.boxes = el.querySelectorAll('.tic-tac-toe__ceil')

    return this
  },

  initListeners() {
    this.boxes.forEach(box => {
      box.addEventListener('click', event => {
        if (
            this.isGameEnd ||
            !this.isBlockEmpty(event.target)
        ) {
          return
        }

        this.setBlockValue(event.target)
        this.setBlockDom(event.target)
        if (this.checkForWin()) {
          this.setGameEndStatus()
        }

        if (!this.isGameEnd && !this.checkHasEmptyBlocks()) {
          this.setGameEndStatus()

          setTimeout(() => {
            alert('Конец игры')
          })
          return
        }

        if (this.isGameEnd) {
          setTimeout(() => {
            alert('Победил ' + this.getCurrentTurnValue())
          })
        } else {
          this.changeTurnValue()
          if (this.onMove) {
            this.onMove(this.isXTurn)
          }
        }
      })
    })
  },

  checkHasEmptyBlocks() {
    return this.matrix.some(row => row.some(cell => cell === null))
  },

  startGame() {
    this.initListeners()
    this.onMove(this.isXTurn)
  },

  restartGame() {
    this.isGameEnd = false
    this.isXTurn = true
    this.matrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    this.boxes.forEach(box => {
      this.setBlockDom(box, true)
    })

    if (this.onMove) {
      this.onMove(this.isXTurn)
    }
  },

  isBlockEmpty(target) {
    const [row, col] = this.getBlockPosition(target)

    return !this.matrix[row - 1][col - 1]
  },

  getBlockPosition(target) {
    const {row, col} = target.dataset

    return [row, col]
  },

  setBlockValue(target, clear) {
    const [row, col] = this.getBlockPosition(target)
    this.matrix[row - 1][col - 1] = clear ? null : this.getCurrentTurnValue()
  },

  setBlockDom(target, clear) {
    target.innerText = clear ? '' : this.getCurrentTurnValue()
  },

  getCurrentTurnValue() {
    return this.isXTurn ? 'X' : 'O'
  },

  changeTurnValue() {
    this.isXTurn = !this.isXTurn
  },

  checkForWin() {
    for (let i = 0; i < this.wonCombinations.length; i++) {
      const [first, second, third] = this.wonCombinations[i]

      if (
          this.matrix[first[0] - 1][first[1] - 1] &&
          this.matrix[first[0] - 1][first[1] - 1] === this.matrix[second[0] - 1][second[1] - 1] &&
          this.matrix[third[0] - 1][third[1] - 1] === this.matrix[second[0] - 1][second[1] - 1]
      ) {
        return true
      }
    }

    return false
  },

  setGameEndStatus() {
    this.isGameEnd = true
  }
}
