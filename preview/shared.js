document.querySelectorAll('.theme-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-toggle button').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    if (btn.dataset.mode === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', btn.dataset.mode)
    }
  })
})
