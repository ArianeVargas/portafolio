const tabs = document.querySelectorAll('[data-target]'),
tabContent = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target)

        tabContent.forEach(tabContent => {
            tabContent.classList.remove("active-skill")
        })

        target.classList.add('active-skill')

        tabs.forEach(tab => {
            tab.classList.remove("active-skill")
        })

        tab.classList.add('active-skill')
    })
})