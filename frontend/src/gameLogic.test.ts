
import { describe, it, expect } from 'vitest'
import {
  getWinningLine,
  getWinner,
  isDraw,
  makeMove,
  type Cell,
} from './gameLogic'

describe('Game logic', () => {
  it('определяет победу по строкам', () => {
    const board: Cell[] = [
      'X', 'X', 'X',
      'O', null, 'O',
      null, null, null,
    ]

    expect(getWinner(board)).toBe('X')
    expect(getWinningLine(board)).toEqual([0, 1, 2])
  })

  it('определяет победу по столбцам', () => {
    const board: Cell[] = [
      'O', 'X', null,
      'O', 'X', null,
      'O', null, 'X',
    ]

    expect(getWinner(board)).toBe('O')
    expect(getWinningLine(board)).toEqual([0, 3, 6])
  })

  it('определяет победу по диагонали', () => {
    const board: Cell[] = [
      'X', 'O', null,
      'O', 'X', null,
      null, null, 'X',
    ]

    expect(getWinner(board)).toBe('X')
    expect(getWinningLine(board)).toEqual([0, 4, 8])
  })

  it('определяет ничью', () => {
    const board: Cell[] = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X',
    ]

    expect(isDraw(board)).toBe(true)
    expect(getWinner(board)).toBeNull()
  })

  it('не считает пустое поле ничьей', () => {
    const board: Cell[] = Array(9).fill(null)

    expect(isDraw(board)).toBe(false)
  })

  it('выполняет допустимый ход', () => {
    const board: Cell[] = Array(9).fill(null)
    const result = makeMove(board, 0, 'X')

    expect(result?.[0]).toBe('X')
    expect(board[0]).toBeNull()
  })

  it('запрещает ход в занятую клетку', () => {
    const board: Cell[] = [
      'X', null, null,
      null, null, null,
      null, null, null,
    ]

    expect(makeMove(board, 0, 'O')).toBeNull()
  })

  it('запрещает ход за пределами поля', () => {
    const board: Cell[] = Array(9).fill(null)

    expect(makeMove(board, -1, 'X')).toBeNull()
    expect(makeMove(board, 9, 'X')).toBeNull()
  })

  it('запрещает ход после победы', () => {
    const board: Cell[] = [
      'X', 'X', 'X',
      'O', 'O', null,
      null, null, null,
    ]

    expect(makeMove(board, 5, 'O')).toBeNull()
  })
})
