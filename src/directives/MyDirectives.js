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
      },
      update(el, binding, vnode){
        el.innerHTML = Math.round(binding.value);
      }
    },
    lazyimg: {
        bind(el, binding) {
          //console.log(el.tagName);
          //lazyLoadImage(el, binding.value)
        },
        update(el, binding){
          lazyLoadImage(el, binding.value)
        },
        unbind(el){}
    },
    getDayFromDate: {
      bind(el, binding, vnode){
        let temp = new Date(binding.value).getDay();
        let day = "";
        switch (temp) {
          case 0:
              day = "Sunday";
              break;
          case 1:
              day = "Monday";
              break;
          case 2:
              day = "Tuesday";
              break;
          case 3:
              day = "Wednesday";
              break;
          case 4:
              day = "Thursday";
              break;
          case 5:
              day = "Friday";
              break;
          case 6:
              day = "Saturday";
        }
        el.innerHTML = day;
      }
    }
}
