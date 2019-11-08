function toggleDark() {
  const body = document.getElementById('body');
  const codeBlocks = document.getElementsByClassName('code-container');
  if (body.classList.contains('body-dark')) {
    body.classList.remove('body-dark');
    for (let i = 0; i < codeBlocks.length; i++) {
      codeBlocks[i].classList.remove('code-dark');
    }
  } else {
    body.classList.add('body-dark');
    for (let i = 0; i < codeBlocks.length; i++) {
      codeBlocks[i].classList.add('code-dark');
    }
  }
}
