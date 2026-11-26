
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Tic Tac Toe', () => {
  it('отображает игровое поле из девяти клеток', () => {
    render(<App />)

    const cells = screen.getAllByRole('button', {
      name: /строка/i,
    })

    expect(cells).toHaveLength(9)
  })

  it('позволяет сделать ход', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: 'Строка 1, столбец 1: пусто',
      }),
    )

    expect(
      screen.getByRole('button', {
        name: 'Строка 1, столбец 1: X',
      }),
    ).toBeTruthy()

    expect(
      screen.getByText('Ход игрока 2 (O)'),
    ).toBeTruthy()
  })

  it('не позволяет поставить символ в занятую клетку', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: 'Строка 1, столбец 1: пусто',
      }),
    )

    const occupiedCell = screen.getByRole('button', {
      name: 'Строка 1, столбец 1: X',
    })

    expect((occupiedCell as HTMLButtonElement).disabled).toBe(true)

    expect(
      screen.getByText('Ход игрока 2 (O)'),
    ).toBeTruthy()
  })

  it('определяет победу первого игрока', async () => {
    const user = userEvent.setup()
    render(<App />)

    const moves = [1, 4, 2, 5, 3]

    for (const index of moves) {
      const row = Math.floor((index - 1) / 3) + 1
      const col = ((index - 1) % 3) + 1

      await user.click(
        screen.getByRole('button', {
          name: `Строка ${row}, столбец ${col}: пусто`,
        }),
      )
    }

    expect(
      screen.getByText('Игрок 1 победил!'),
    ).toBeTruthy()
  })

  it('определяет ничью', async () => {
    const user = userEvent.setup()
    render(<App />)

    const moves = [1, 2, 3, 5, 4, 6, 8, 7, 9]

    for (const index of moves) {
      const row = Math.floor((index - 1) / 3) + 1
      const col = ((index - 1) % 3) + 1

      await user.click(
        screen.getByRole('button', {
          name: `Строка ${row}, столбец ${col}: пусто`,
        }),
      )
    }

    expect(screen.getByText('Ничья!')).toBeTruthy()
  })

  it('блокирует оставшиеся клетки после победы', async () => {
    const user = userEvent.setup()
    render(<App />)

    const moves = [1, 4, 2, 5, 3]

    for (const index of moves) {
      const row = Math.floor((index - 1) / 3) + 1
      const col = ((index - 1) % 3) + 1

      await user.click(
        screen.getByRole('button', {
          name: `Строка ${row}, столбец ${col}: пусто`,
        }),
      )
    }

    const emptyCell = screen.getByRole('button', {
      name: 'Строка 3, столбец 1: пусто',
    })

    expect((emptyCell as HTMLButtonElement).disabled).toBe(true)

    expect(
      screen.getByText('Игрок 1 победил!'),
    ).toBeTruthy()
  })

  it('перезапускает игру', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: 'Строка 1, столбец 1: пусто',
      }),
    )

    await user.click(
      screen.getByRole('button', {
        name: /начать заново/i,
      }),
    )

    expect(
      screen.getByText('Ход игрока 1 (X)'),
    ).toBeTruthy()

    expect(
      screen.getByRole('button', {
        name: 'Строка 1, столбец 1: пусто',
      }),
    ).toBeTruthy()
  })
})
