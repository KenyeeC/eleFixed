(function(){

    var eleFixed = {
        targets: [],
        push: null,
        distory: null,
        handler: null,
        delete: null
    }

    // push exefixed instance
    eleFixed.push =  function (option) {
        if(typeof option !== 'object') return console.error('eleFixed: push param must be a Object')
        if(!option.target && !isElement(option.target)) return console.error('eleFixed: target must be a HTMLElement')
        if(!option.offsetTop && typeof option.offsetTop !== 'number') return console.error('eleFixed: param\'s offsetTop must be a Number')

        window.eleFixed.targets.push(option)
    }

    // eleFixed handler
    eleFixed.handler = function(){
        var offsetTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        for(var i in eleFixed.targets){
            if(offsetTop > eleFixed.targets[i].offsetTop){
                eleFixed.targets[i].target.style.transform = 'translateY('+ (offsetTop - eleFixed.targets[i].offsetTop) +'px)'
            }else{
                eleFixed.targets[i].target.style.transform = 'translateY(0px)'
            }
        }
    }

    // delete one eleFixed instance
    eleFixed.delete = function (target) {
        if(target && isElement(target)){
            var targets = window.eleFixed.targets
            for(var i in targets){
                if(target.isEqualNode(targets[i].target)){
                    target.style.transform = 'translateY(0px)'
                    targets.splice(i, 1)
                    break
                }
            }
        }
    }

    // distory eleFixed in window
    eleFixed.distory = function () {
        window.removeEventListener('scroll', eleFixed.handler)
        for(var i in window.eleFixed.targets){
            window.eleFixed.targets[i].target.style.transform = 'translateY(0px)'
        }
        window.eleFixed = null
    }

    // helper
    function isElement(value) {
        return (
            typeof HTMLElement === 'object' ? value instanceof HTMLElement :
            value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName==="string"
        )
    }

    // umd expose
    if (typeof exports == "object") {
        module.exports = eleFixed
    } else if (typeof define == "function" && define.amd) {
        define(function(){ return eleFixed })
    } else {
        this.eleFixed = eleFixed
    }

    window.addEventListener('scroll', eleFixed.handler)
})()