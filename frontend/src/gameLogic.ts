
export type Player = 'X' | 'O'
export type Cell = Player | null

export const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function getWinningLine(board: Cell[]): number[] | null {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination

    if (
      board[a] !== null &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return combination
    }
  }

  return null
}

export function getWinner(board: Cell[]): Player | null {
  const winningLine = getWinningLine(board)

  return winningLine ? board[winningLine[0]] : null
}

export function isDraw(board: Cell[]): boolean {
  return getWinner(board) === null &&
    board.every((cell) => cell !== null)
}

export function makeMove(
  board: Cell[],
  index: number,
  player: Player,
): Cell[] | null {
  if (
    index < 0 ||
    index >= 9 ||
    !Number.isInteger(index) ||
    board[index] !== null ||
    getWinner(board) !== null ||
    isDraw(board)
  ) {
    return null
  }

  const newBoard = [...board]
  newBoard[index] = player

  return newBoard
}
