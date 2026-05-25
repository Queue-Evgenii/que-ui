const toggle = document.getElementById('theme-toggle')
if (toggle) {
  const current = document.documentElement.getAttribute('data-theme') || 'light'
  const initial = toggle.querySelector(`input[value="${current}"]`)
  if (initial) initial.checked = true

  toggle.addEventListener('change', e => {
    const value = e.target.value
    if (value === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', value)
    }
  })
}
