'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCustomerInfo } from '@/client/context/CustomerContext'
import { useLibraryHomeAction } from '@/client/store/library/home/selector'
import { useFetchChangeStudySetting } from '@/client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentInfoAction,
} from '@/client/store/student/info/selector'
import { Button, CheckBox, Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { getUserConfig, updateUserConfig } from './_fn/account-list'

const STYLE_ID = 'global_option_my_rg'

export function SetStudyModeModal({
  onCloseClick,
}: {
  onCloseClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  return (
    <Modal
      compact
      header={true}
      title={'학습 설정'}
      onClickDelete={() => {
        onCloseClick && onCloseClick()
      }}
      onClickLightbox={() => {
        onCloseClick && onCloseClick()
      }}>
      <div className={style.my_rg_modal}>
        <SetStudyMode />
      </div>
    </Modal>
  )
}

// 학습 설정
export function SetStudyMode() {
  const style = useStyle(STYLE_ID)

  const { updateMode } = useLibraryHomeAction()
  const { updateStudySetting } = useStudentInfoAction()

  const customerId = useCustomerInfo().customerId
  const student = useStudentInfo().payload

  const [viewMode, setViewMode] = useState<'level' | 'challenge'>(
    getUserConfig(
      {
        studentId: student.studentId,
        customerId,
      },
      true,
    )!!.mode === 'challenge'
      ? 'challenge'
      : 'level',
  )
  const [isKListenAndRepeat, setKListenAndRepeat] = useState(
    student.eBKListenRepeat,
  )
  const [is1ListenAndRepeat, set1ListenAndRepeat] = useState(
    student.eB1ListenRepeat,
  )
  const [isVocaHint, setVocaHint] = useState(student.viewStep2Skip)
  const [isSummaryChance, setSummaryChance] = useState(student.viewStep3Hint)

  const onClickSaveMode = () => {
    updateUserConfig({
      customerId,
      studentId: student.studentId,
      mode: viewMode,
    })
    updateMode(viewMode)
  }

  const { fetch } = useFetchChangeStudySetting()
  const onChangeStudyOption = (
    type:
      | 'EBKListenRepeat'
      | 'EB1ListenRepeat'
      | 'ViewStep3Hint'
      | 'ViewStep2Skip',
    value: boolean,
  ) => {
    let update: ((value: boolean) => void) | undefined = undefined
    if (type === 'EBKListenRepeat') {
      update = setKListenAndRepeat
    } else if (type === 'EB1ListenRepeat') {
      update = set1ListenAndRepeat
    } else if (type === 'ViewStep2Skip') {
      update = setVocaHint
    } else if (type === 'ViewStep3Hint') {
      update = setSummaryChance
    }
    update && update(value)
    fetch({
      type,
      value,
      callback: (success) => {
        if (success) {
          updateStudySetting(type, value)
        } else {
          update && update(!value)
        }
      },
    })
  }

  return (
    <div className={style.set_study_mode}>
      <div className={style.row_a}>
        <div className={style.txt_h}>학습 화면</div>
        {/* 자유 모드, 코스 모드 */}
        <div className={style.choose_study_mode}>
          <ChooseStudyModeItem
            name="레벨업 모드"
            active={viewMode === 'level'}
            levelUpIcon
            onClick={() => {
              setViewMode('level')
            }}
          />
          <ChooseStudyModeItem
            name="챌린지 모드"
            active={viewMode === 'challenge'}
            challengeIcon
            onClick={() => {
              setViewMode('challenge')
            }}
          />
        </div>
      </div>
      <div className={style.row_c}>
        <div className={style.txt_h}>eBook 읽기</div>
        <SetStudyOptionItem
          title="Listen & Repeat - Level K"
          discription="eBook KA ~ KC 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
          check={isKListenAndRepeat}
          onClick={() =>
            onChangeStudyOption('EBKListenRepeat', !isKListenAndRepeat)
          }
        />
        <SetStudyOptionItem
          title="Listen & Repeat - Level 1"
          discription="eBook 1A ~ 1C 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
          check={is1ListenAndRepeat}
          onClick={() =>
            onChangeStudyOption('EB1ListenRepeat', !is1ListenAndRepeat)
          }
        />
      </div>
      <div className={style.row_b}>
        <div className={style.txt_h}>퀴즈 설정 (Level 2 이상)</div>
        <SetStudyOptionItem
          title="Vocabulary Hint / Skip"
          discription="Vocabulary 퀴즈를 풀다가 막혔을 때 힌트를 보거나 다음 문제로 건너뛸 수
          있습니다."
          check={isVocaHint}
          onClick={() => onChangeStudyOption('ViewStep2Skip', !isVocaHint)}
        />
        <SetStudyOptionItem
          title="Summary Chance"
          discription="Summary 퀴즈를 풀다가 막혔을 때 찬스를 써서 다음 문제로 건너뛸 수 있습니다."
          check={isSummaryChance}
          onClick={() => onChangeStudyOption('ViewStep3Hint', !isSummaryChance)}
        />
      </div>
      <Button shadow width={'100%'} onClick={onClickSaveMode}>
        저장하기
      </Button>
    </div>
  )
}

// 학습 설정 > 학습 모드 선택 아이템
const ChooseStudyModeItem = ({
  name,
  active,
  onClick,
  levelUpIcon,
  challengeIcon,
}: {
  name: string
  active: boolean
  onClick?: () => void
  levelUpIcon?: boolean
  challengeIcon?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.choose_study_mode_item} ${active && style.active}`}
      onClick={onClick}>
      {levelUpIcon &&
        (active ? (
          <Image
            alt=""
            src="/src/images/@set-study-mode/book_icon_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@set-study-mode/book_icon_off.svg"
            width={24}
            height={24}
          />
        ))}
      {challengeIcon &&
        (active ? (
          <Image
            alt=""
            src="/src/images/@set-study-mode/crown_icon_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@set-study-mode/crown_icon_off.svg"
            width={24}
            height={24}
          />
        ))}
      {name}
    </div>
  )
}

// 학습 설정 > 학습 옵션 설정 아이템
const SetStudyOptionItem = ({
  check,
  title,
  discription,
  onClick,
}: {
  check: boolean
  title: string
  discription: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.set_study_option_item} ${check && style.checked}`}
      onClick={onClick}>
      <div className={style.row_a1}>
        <span className={style.txt_h1}>{title}</span>
        <CheckBox check={check} />
      </div>
      <div className={style.row_b}>{discription}</div>
    </div>
  )
}
