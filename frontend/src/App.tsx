
import { useState } from 'react'
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

import {
  type Player,
  type Cell,
  getWinningLine,
  getWinner,
  isDraw,
  makeMove,
} from './gameLogic'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6658d3' },
    background: {
      default: '#f5f4fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
})

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')

  const winningLine = getWinningLine(board)
  const winner = getWinner(board)
  const draw = isDraw(board)
  const gameOver = Boolean(winner || draw)

  const handleCellClick = (index: number) => {
    const newBoard = makeMove(board, index, currentPlayer)

    if (newBoard === null) return

    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
  }

  const playerCard = (
    player: Player,
    number: number,
  ) => {
    const active = currentPlayer === player && !gameOver

    return (
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          height: 72,
          minWidth: 0,
          boxSizing: 'border-box',
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: active
            ? player === 'X'
              ? '#eeecff'
              : '#e6f5f4'
            : '#ffffff',
          border: active
            ? `2px solid ${player === 'X' ? '#6658d3' : '#219b91'}`
            : '1px solid #e9e6f3',
          borderRadius: '24px',
          transition: 'background-color 0.2s, border 0.2s',
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            color: '#625b70',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          Игрок {number}
        </Typography>

        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 800,
            lineHeight: 1,
            color: player === 'X' ? '#6658d3' : '#219b91',
            mr: 1.5,
          }}
        >
          {player}
        </Typography>
      </Paper>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2,
          boxSizing: 'border-box',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: '100%',
            maxWidth: 480,
            p: '0 !important',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: '32px',
              border: '1px solid #ebe8f5',
              boxShadow: '0 16px 50px rgba(49, 39, 100, 0.07)',
              bgcolor: '#ffffff',
            }}
          >
            <Stack spacing={2.5}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: '#25223b',
                    lineHeight: 1.2,
                  }}
                >
                  Tic Tac Toe
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: '#898397',
                    fontSize: 16,
                  }}
                >
                  Игра для двух игроков
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  width: '100%',
                  alignItems: 'stretch',
                }}
              >
                {playerCard('X', 1)}
                {playerCard('O', 2)}
              </Stack>

              <Paper
                elevation={0}
                role="status"
                aria-live="polite"
                sx={{
                  py: 1.75,
                  px: 1,
                  textAlign: 'center',
                  borderRadius: '18px',
                  bgcolor: '#f5f4fb',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#6658d3',
                  }}
                >
                  {winner
                    ? `Игрок ${winner === 'X' ? '1' : '2'} победил!`
                    : draw
                      ? 'Ничья!'
                      : `Ход игрока ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'}`}
                </Typography>
              </Paper>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1.25,
                  width: '100%',
                }}
              >
                {board.map((cell, index) => {
                  const isWinningCell = winningLine?.includes(index)

                  return (
                    <ButtonBase
                      key={index}
                      disabled={Boolean(cell) || gameOver}
                      aria-label={`Строка ${Math.floor(index / 3) + 1}, столбец ${(index % 3) + 1}${cell ? `: ${cell}` : ': пусто'}`}
                      onClick={() => handleCellClick(index)}
                      sx={{
                        aspectRatio: '1',
                        borderRadius: '22px',
                        bgcolor: isWinningCell
                          ? '#e4f5e9'
                          : '#fcfbfe',
                        border: isWinningCell
                          ? '2px solid #45a66b'
                          : '2px solid #e5e1f1',
                        color: cell === 'X' ? '#6658d3' : '#219b91',
                        fontSize: 48,
                        fontWeight: 800,
                        transition: 'all 0.15s',
                        '&:hover': {
                          bgcolor: cell ? undefined : '#eeecff',
                          borderColor: '#6658d3',
                        },
                        '&:focus-visible': {
                          outline: '3px solid #25223b',
                          outlineOffset: 3,
                        },
                        '&.Mui-disabled': {
                          color: cell === 'X' ? '#6658d3' : '#219b91',
                        },
                      }}
                    >
                      {cell}
                    </ButtonBase>
                  )
                })}
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<RestartAltIcon />}
                onClick={restartGame}
                sx={{
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '18px',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: '#5749c2',
                  },
                }}
              >
                Начать заново
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
