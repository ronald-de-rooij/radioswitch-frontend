export function useToastPrime() {
  const toast = useToast()

  interface ToastAdd {
    severity: 'error' | 'success' | 'secondary' | 'info' | 'contrast' | 'warn'
    summary?: string
    detail?: string
    closable?: boolean
    life?: number
    group?: string
    styleClass?: string
    contentStyleClass?: string
  }

  function toastAdd({
    severity = 'success',
    summary,
    detail,
    closable = true,
    life = 5000,
    group,
    styleClass,
    contentStyleClass,
  }: ToastAdd) {
    toast.add({ severity, summary, detail, closable, life, group, styleClass, contentStyleClass })
  }

  return {
    toastAdd,
  }
}
