import { FieldErrors } from "react-hook-form"

interface FormFieldErrorProps {
  errors: FieldErrors
  field: string
}

export function FormFieldError({ errors, field }: FormFieldErrorProps) {

  return errors[field] && (
    <span className="text-red-500">
      {String(errors[field].message)}
    </span>
  )
}

