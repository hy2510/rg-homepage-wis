'use client'

import { ReactNode, useState } from 'react'
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  ExportItem,
  ExportModePanel,
} from '../library-export-mode-panel/export-mode-panel'

const STYLE_ID = 'library_find_book_list'

// 학습메인 > 사용자의 학습레벨의 도서 리스트
export function BookList({
  count,
  children,
  isHideExportMode,
  isExportMode,
  _isExportMode,
}: {
  count?: number
  children?: ReactNode
  isHideExportMode?: boolean
  isExportMode?: boolean
  _isExportMode: (isMode: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const [isVocaSelected, _isVocaSelected] = useState(true)
  const [isListSelected, _isListSelected] = useState(false)
  const [isTodoSelected, _isTodoSelected] = useState(false)
  const [isFavSelected, _isFavSelected] = useState(false)

  return (
    <>
      <div className="flex dir-col gap-m">
        <div className={style.book_counter}>
          <div className={style.book_counter_container}>
            <Dropdown title={`총 ${count}권`}>
              <DropdownItem>목록 다운로드</DropdownItem>
            </Dropdown>
          </div>
          {!isHideExportMode && (
            <div
              className={style.edit}
              onClick={() => {
                isExportMode ? _isExportMode(false) : _isExportMode(true)
              }}>
              {isExportMode ? '작업 취소' : '내보내기'}
            </div>
          )}
        </div>
        <div className={style.book_list}>
          <div className={style.row_b}>{children}</div>
        </div>
      </div>
      {isExportMode && (
        <ExportModePanel>
          <ExportItem
            isVocaSelected={isVocaSelected}
            onClick={() => {
              _isVocaSelected(true)
              _isListSelected(false)
              _isTodoSelected(false)
              _isFavSelected(false)
            }}>
            Vocabulary
          </ExportItem>
          <ExportItem
            isListSelected={isListSelected}
            onClick={() => {
              _isVocaSelected(false)
              _isListSelected(true)
              _isTodoSelected(false)
              _isFavSelected(false)
            }}>
            Book List
          </ExportItem>
          <ExportItem
            isTodoSelected={isTodoSelected}
            onClick={() => {
              _isVocaSelected(false)
              _isListSelected(false)
              _isTodoSelected(true)
              _isFavSelected(false)
            }}>
            To-Do
          </ExportItem>
          <ExportItem
            isFavSelected={isFavSelected}
            onClick={() => {
              _isVocaSelected(false)
              _isListSelected(false)
              _isTodoSelected(false)
              _isFavSelected(true)
            }}>
            Favorite
          </ExportItem>
        </ExportModePanel>
      )}
    </>
  )
}
