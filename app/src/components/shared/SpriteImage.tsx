import spriteUrl from '../../assets/sprite.webp'

// Sprite: 765x1024, 3 cols x 4 rows, 2px gap
// Each cell approximately 255x256 (accounting for gaps)
const COLS = 3
const ROWS = 4
const SPRITE_W = 765
const SPRITE_H = 1024
const GAP = 2
const CELL_W = (SPRITE_W - GAP * (COLS - 1)) / COLS  // ~253.67
const CELL_H = (SPRITE_H - GAP * (ROWS - 1)) / ROWS  // ~254.5

// Grid positions (left-to-right, top-to-bottom):
// 0: 桂花乌龙  1: 麻辣烫    2: 黄焖鸡米饭
// 3: 冰美式    4: 鸡排饭    5: 柠檬水
// 6: 番茄鸡蛋面 7: 手表     8: 蓝月亮洗衣液
// 9: Type-C线  10: 收纳盒   11: 手机壳

export type SpriteIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export const SPRITE_NAMES: Record<SpriteIndex, string> = {
  0: 'milk-tea',
  1: 'mala-tang',
  2: 'huangmenji',
  3: 'americano',
  4: 'chicken-rice',
  5: 'lemon-water',
  6: 'tomato-noodle',
  7: 'watch',
  8: 'detergent',
  9: 'usb-cable',
  10: 'storage-box',
  11: 'phone-case',
}

interface Props {
  index: SpriteIndex
  className?: string
}

export default function SpriteImage({ index, className = '' }: Props) {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  const bgSizeX = (SPRITE_W / CELL_W) * 100
  const bgSizeY = (SPRITE_H / CELL_H) * 100
  const bgPosX = col === 0 ? 0 : (col / (COLS - 1)) * 100
  const bgPosY = row === 0 ? 0 : (row / (ROWS - 1)) * 100

  return (
    <div
      className={`bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${spriteUrl})`,
        backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
      }}
    />
  )
}
