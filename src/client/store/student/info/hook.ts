import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentInfoAction } from './selector'

export function useOnLoadStudentInfo() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setInfo } = useStudentInfoAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getStudent())

      if (res.isSuccess) {
        setInfo(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
  }
}

export function useFetchStudentInfo() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setInfo } = useStudentInfoAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getStudent())

      if (res.isSuccess) {
        setInfo(res.payload)
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchUpdateStudentName() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { updateStudentName } = useStudentInfoAction()

  const fetch = ({
    studentName,
    callback,
  }: {
    studentName: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putChangeStudentName({ studentName }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
        updateStudentName(studentName)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchChnagePassword() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    newPassword,
    oldPassword,
    callback,
  }: {
    newPassword: string
    oldPassword: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postChangePassword({ newPassword, oldPassword }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchModifySmsReceive() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { updateSmsAgree } = useStudentInfoAction()

  const fetch = ({
    isReceive,
    callback,
  }: {
    isReceive: boolean
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postChangeSmsAgree({ isReceive }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        updateSmsAgree(isReceive)
        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchChangeStudySetting() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    type,
    value,
    callback,
  }: {
    type:
      | 'EBKListenRepeat'
      | 'EB1ListenRepeat'
      | 'ViewStep3Hint'
      | 'ViewStep2Skip'
    value: boolean
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      let isEbkListenRepeat: boolean | undefined = undefined
      let isEb1ListenRepeat: boolean | undefined = undefined
      let isViewStep3Hint: boolean | undefined = undefined
      let isViewStep2Skip: boolean | undefined = undefined
      if (type === 'EBKListenRepeat') {
        isEbkListenRepeat = value
      } else if (type === 'EB1ListenRepeat') {
        isEb1ListenRepeat = value
      } else if (type === 'ViewStep2Skip') {
        isViewStep2Skip = value
      } else if (type === 'ViewStep3Hint') {
        isViewStep3Hint = value
      }
      const res = await fetcher.response(
        repository.postChangeStudySetting({
          type,
          isEbkListenRepeat,
          isEb1ListenRepeat,
          isViewStep3Hint,
          isViewStep2Skip,
        }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false

        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}
