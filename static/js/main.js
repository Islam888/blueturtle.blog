(window.onload = function() {
    console.log(localStorage.getItem("mood"))
    const moon = document.querySelector('.moon')
    const sun = document.querySelector('.sun')
    const switchArea = document.getElementsByClassName('switch-area')
    const wrapper = document.querySelector('.wrapper')
    const articlesWrappers = document.getElementsByClassName('article-wrapper')
    const hrElems = document.getElementsByTagName('hr')
    const setMood = function(mood) {
            if (mood === "day_mood") {
                sun.classList.add('hidden')
                moon.classList.remove('hidden')
                document.body.classList.add('light-theme-body')
                wrapper.classList.add('light-theme-wrapper')
                Array.prototype.forEach.call(articlesWrappers, function(articleWrapper) {
                    articleWrapper.classList.add('light-theme-article-wrapper')
                })
                Array.prototype.forEach.call(hrElems, function(hrElem) {
                    hrElem.classList.add('light-theme-hr')
                })
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("mood", "day_mood")
                    console.log(localStorage.getItem("mood"))
                }
            } else {
                sun.classList.remove('hidden')
                moon.classList.add('hidden')
                document.body.classList.remove('light-theme-body')
                wrapper.classList.remove('light-theme-wrapper')
                Array.prototype.forEach.call(hrElems, function(hrElem) {
                    hrElem.classList.remove('light-theme-hr')
                })
                Array.prototype.forEach.call(articlesWrappers, function(articleWrapper) {
                    articleWrapper.classList.remove('light-theme-article-wrapper')
                })
                if (typeof(Storage) !== "undefined") {
                    
                    localStorage.setItem("mood", "night_mood")
                    console.log(localStorage.getItem("mood"))
                }
            }
    }
    Array.prototype.forEach.call(switchArea, function(area) {
        area.addEventListener('click', function(e) {
            if (e.target.parentElement.parentElement === sun ||e.target === sun) {
                setMood("day_mood")
                
            } else if (e.target.parentElement.parentElement === moon || e.target === moon) {
                setMood("night_mood")
                
            }
        })
    })  
    if (typeof(Storage) !== "undefined") {
        setMood(localStorage.getItem("mood"))
    }
})()