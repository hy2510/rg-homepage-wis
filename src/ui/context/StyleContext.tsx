'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import findStyle from './css-index'

type ThemeType = 'dark' | 'light'
type ScreenType = 'pc' | 'mobile'
interface StyleContextAttribute {
  themeType?: ThemeType
  screenType?: ScreenType
}
interface StyleContextProps extends StyleContextAttribute {
  updateStyle: (style: StyleContextAttribute) => void
}

const StyleContext = React.createContext<StyleContextProps | undefined>(
  undefined,
)

export default function StyleContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [baseStyles, setBaseStyle] = useState<StyleContextAttribute>({
    themeType: undefined,
    screenType: undefined,
  })
  const baseThemeType: ThemeType | undefined = baseStyles.themeType
  const baseScreenType: ScreenType | undefined = baseStyles.screenType

  const updateStyle = useCallback(
    (style: StyleContextAttribute) => {
      setBaseStyle({
        themeType: style.themeType || baseThemeType,
        screenType: style.screenType || baseScreenType,
      })
    },
    [baseThemeType, baseScreenType],
  )

  useEffect(() => {
    const agent = window?.navigator?.userAgent
    if (agent) {
      const isMobile = isMobileDetect(agent)
      setBaseStyle({ screenType: isMobile ? 'mobile' : 'pc' })
    } else {
      setBaseStyle({ screenType: 'pc' })
    }
  }, [])

  return (
    <StyleContext.Provider value={{ ...baseStyles, updateStyle }}>
      {children}
    </StyleContext.Provider>
  )
}

export function useScreenMode(): ScreenType {
  return useContext(StyleContext)?.screenType || 'pc'
}

export function useThemeMode(): ThemeType {
  return useContext(StyleContext)?.themeType || 'light'
}

export function useUpdateStyle() {
  const context = useContext(StyleContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.updateStyle
}

export function useStyle(id: string) {
  const css = findStyle(id)
  const screenMode = useScreenMode()
  if (screenMode === 'mobile' && css.mobile) {
    return css.mobile
  } else {
    return css.pc
  }
}

function isMobileDetect(userAgent: string) {
  const isMobileDevice =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const screenWidth = screen.width < 1024
  return isMobileDevice && screenWidth
}
