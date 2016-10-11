const NAVIGATE_PAGE = 'NAVIGATE_PAGE'

function navigatePage(text) {
  return {
    type: NAVIGATE_PAGE,
    text
  }
}

export {navigatePage};