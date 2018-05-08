const lazyLoadImage = (el, src) => {
    let img = new Image()
    img.onload = () => {
      el.style.backgroundImage = `url(${src})`
    }
    img.src = src
}

export default {
    KelvToCelcius:{
      bind(el, binding, vnode){
        el.innerHTML = Math.round(binding.value -273.15) + "°C";
      }
    },
    round:{
      bind(el, binding, vnode){
        el.innerHTML = Math.round(binding.value);
      }
    },
    lazyimg: {
        bind(el, binding) {
          //console.log(el.tagName);
          //lazyLoadImage(el, binding.value)
        },
        update(el, binding){
          if (binding.value !== binding.oldValue) {
            lazyLoadImage(el, binding.value)
          }
        },
        unbind(el){}
    }
}
