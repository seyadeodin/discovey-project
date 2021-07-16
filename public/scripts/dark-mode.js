// darkmode
let checkbox = document.querySelector('input[name=theme]')

console.log(checkbox)

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans('dark')
    } else {
        trans('light' )
    }
})

let trans = (theme) => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
    document.documentElement.setAttribute('data-theme', `${theme}`)
    
}