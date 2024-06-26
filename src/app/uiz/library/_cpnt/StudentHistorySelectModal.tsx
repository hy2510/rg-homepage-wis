import { useState } from 'react'
import {
  Button,
  Modal,
  SelectBox,
  SelectBoxItem,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

type StudentHistorySelectProps = {
  levelRoundId: string
  studentHistoryList: {
    studentHistoryId: string
    classId: string
    className: string
  }[]
  defaultStudentHistoryId: string
  onCloseModal?: () => void
  onStartActivity?: (levelRoundId: string, studentHistoryId: string) => void
}
export default function StudentHistorySelectModal({
  levelRoundId,
  studentHistoryList,
  defaultStudentHistoryId,
  onCloseModal,
  onStartActivity,
}: StudentHistorySelectProps) {
  const styleModal = useStyle('global_option_my_rg')

  const [studentHistoryId, setStudentHistoryId] = useState(
    defaultStudentHistoryId,
  )

  return (
    <Modal
      compact
      header
      title={'소속반 선택'}
      onClickDelete={() => {
        onCloseModal && onCloseModal()
      }}
      onClickLightbox={() => {
        onCloseModal && onCloseModal()
      }}>
      <div className={styleModal.my_rg_modal}>
        <div className={styleModal.set_study_mode}>
          <div className={styleModal.row_a}>
            <SelectBox
              value={studentHistoryId}
              onChange={(e) => {
                const stdHistoryId = e.target.value
                setStudentHistoryId(stdHistoryId)
              }}>
              {studentHistoryList.map((stdHistory) => {
                return (
                  <SelectBoxItem
                    key={stdHistory.studentHistoryId}
                    value={stdHistory.studentHistoryId}>
                    {stdHistory.className}
                  </SelectBoxItem>
                )
              })}
            </SelectBox>
            <Button
              onClick={() => {
                onStartActivity &&
                  onStartActivity(levelRoundId, studentHistoryId)
              }}>
              선택
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
