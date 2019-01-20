let root = document.getElementById('root')
if (root) {
  root.remove()
} else {
  root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
}
