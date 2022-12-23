import Vue from 'vue';
import router from '../router';
Vue.directive('permission', {
    inserted(element, binding) {
        const action = binding.value.action;
        const effect = binding.value.effect;

        if (router.currentRoute.meta.indexOf(action) == -1) {
            if (effect === 'disabled') {
                element.disabled = true;
                element.classList.add('is-disabled')
            } else {
                element.parentNode.removeChild(element);
            }
        }
    }
})