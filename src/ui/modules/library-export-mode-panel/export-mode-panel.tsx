'use client'

import { ReactNode } from 'react'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'export_mode_panel'

// 내보내기(일괄작업) 콘테이너
export const ExportModePanel = ({
  children,
  buttonName,
}: {
  children?: ReactNode
  buttonName?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.export_mode_panel} ${style.bounce_top}`}>
      <div className={style.export_mode_panel_container}>
        {/* <div>이호열반</div> */}
        <div className={style.selected_books}>선택한 도서 0</div>
        <div className={style.export_items}>
          {children && (
            <div className={style.export_items_container}>{children}</div>
          )}
          <Button shadow roundFull color={'red'}>
            {buttonName ? buttonName : '내보내기'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// 내보내기(일괄작업) 아이템
export const ExportItem = ({
  active,
  children,
  onClick,
  isVocaSelected,
  isListSelected,
  isTodoSelected,
  isFavSelected,
}: {
  active?: boolean
  children?: ReactNode
  onClick?: () => void
  isVocaSelected?: boolean
  isListSelected?: boolean
  isTodoSelected?: boolean
  isFavSelected?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.export_item} ${isVocaSelected && style.active} ${
        isListSelected && style.active
      } ${isTodoSelected && style.active} ${isFavSelected && style.active}`}
      onClick={onClick}>
      {children}
    </div>
  )
}
