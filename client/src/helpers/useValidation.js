import { useEffect, useState } from 'react'

const useValidation = (values, callback, rules) => {
  const [errors, setErrors] = useState({})
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    console.log('validate', isReady, Object.keys(errors).length)

    if (Object.keys(errors).length === 0 && isReady) {
      callback(true)
    }
  }, [values, errors, isReady])

  const handleChange = () => {
    if (!isReady) setIsReady(true)

    setErrors(rules(values))
  }

  return {
    handleChange,
    errors,
  }
}

export default useValidation
