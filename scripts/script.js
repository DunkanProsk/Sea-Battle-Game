// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика


table.onmouseover = function(event) {
    let target = event.target;
    target.style.background = 'pink';
    text.value += "mouseover " + target.tagName + "\n";
    text.scrollTop = text.scrollHeight;
  };
  
table.onmouseout = function(event) {
    let target = event.target;
    target.style.background = '';
    text.value += "mouseout " + target.tagName + "\n";
    text.scrollTop = text.scrollHeight;
}