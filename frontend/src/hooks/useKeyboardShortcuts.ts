import { useEffect } from 'react'

interface ShortcutHandlers {
  onUndo?: () => void
  onRedo?: () => void
  onCopy?: () => void
  onPaste?: () => void
  onDelete?: () => void
}

export function useKeyboardShortcuts({
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onDelete
}: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        onUndo?.()
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
          ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault()
        onRedo?.()
      }

      // Copy: Ctrl/Cmd + C
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        onCopy?.()
      }

      // Paste: Ctrl/Cmd + V
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        onPaste?.()
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        onDelete?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onUndo, onRedo, onCopy, onPaste, onDelete])
} 