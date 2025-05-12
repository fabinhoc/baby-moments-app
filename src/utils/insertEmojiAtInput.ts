export function insertEmojiAtInput(options: {
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  modelValue: string;
  emoji: string;
  updateModel: (value: string) => void;
}) {
  const { inputElement, modelValue, emoji, updateModel } = options;

  if (!inputElement) return;

  const start = inputElement.selectionStart ?? 0;
  const end = inputElement.selectionEnd ?? 0;
  const currentValue = modelValue ?? '';

  const newValue = currentValue.slice(0, start) + emoji + currentValue.slice(end);
  const newCursorPos = start + emoji.length;

  // Atualiza diretamente o DOM
  inputElement.value = newValue;

  // Atualiza o modelo reativo após o próximo tick
  queueMicrotask(() => {
    updateModel(newValue);
    inputElement.focus();
    inputElement.setSelectionRange(newCursorPos, newCursorPos);
  });
}
