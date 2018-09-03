// flow
'use strict'

import Color from '../Color'

export const BORDER_STYLE = {
  NONE: 0,
  SOLID: 1
}

// eslint-disable-next-line no-undef
export type BorderStyle = $Values<typeof BORDER_STYLE>

export type Border = {
  borderColor: Color,
  BorderStyle: BorderStyle,
  borderWidth: number
}

export const BORDER_SIDES = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
}

// eslint-disable-next-line no-undef
export type BorderSide = $Values<typeof BORDER_SIDES>

const SIDES = Object.keys(BORDER_SIDES).map(s => s.toLowerCase())

const parseBorderStyle = (style: string): BorderStyle => {
  switch (style) {
    case 'none':
      return BORDER_STYLE.NONE
  }
  return BORDER_STYLE.SOLID
}

// eslint-disable-next-line no-undef
export const parseBorder = (style: CSSStyleDeclaration): Array<Border> => {
  return SIDES.map(side => {
    const borderColor = new Color(style.getPropertyValue(`border-${side}-color`))
    const borderStyle = parseBorderStyle(style.getPropertyValue(`border-${side}-style`))
    const borderWidth = parseFloat(style.getPropertyValue(`border-${side}-width`))
    return {
      borderColor,
      borderStyle,
      borderWidth: isNaN(borderWidth) ? 0 : borderWidth
    }
  })
}
