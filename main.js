// переключатель состояния меню
// document.querySelector(".hamburger-menu").addEventListener("click", () => {
//     document.querySelector(".nav-links").classList.toggle("show-menu");
//     document.querySelector(".hamburger-menu").classList.toggle("show-menu");
// });


// Реализация переключений акардиона, секция FAQ
var panelItem = document.querySelectorAll('.panel-title'),
  active = document.getElementsByClassName('panel-active');

Array.from(panelItem).forEach(function(item, i, panelItem) {
  item.addEventListener('click', function(e) {
    if (active.length > 0 && active[0] !== this) { // если есть активный элемент, и это не тот по которому кликнули
      active[0].parentElement.classList.remove('faq_wrapper_active'); // убрать класс panel-active
      active[0].classList.remove('panel-active');
    }

    // изменить состояние класса panel-active на текущем элементе: добавить если не было, убрать если было.
    this.parentElement.classList.toggle('faq_wrapper_active');
    this.classList.toggle('panel-active');
  });
});