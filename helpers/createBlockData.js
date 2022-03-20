/**
 * Это функция позволяет выцепить из контекста данные связанные с дочерним элементом
 * @param context - this - откуда выцепляем данные
 * @param prefixOfElement - название префикса для данных
 * @returns {string} - значения обработчиков событий которые можно присобачить к дочерниму элементу через v-on="resultEvents"
 */
export const createEventsFor = (context, prefixOfElement) => {
  const events = context.$listeners
  return returnDataOf(events, prefixOfElement)
}

export const createSlotsFor = (context, prefixOfElement) => {
  const slots = {
    ...context.$slots,
    ...context.$scopedSlots,
  }
  return returnDataOf(slots, prefixOfElement)
}

const returnDataOf = (elements, prefixOfElement) => {
  const entryEventNames = Object.keys(elements)
    .filter((key) => key.startsWith(prefixOfElement))
    .map((key) => key.substring(prefixOfElement.length))
  return entryEventNames.reduce((acc, entryKey) => {
    acc[entryKey] = elements[`${prefixOfElement}${entryKey}`]
    return acc
  }, {})
}
