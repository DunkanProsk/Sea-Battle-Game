// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика

let currentElem = null;
let arrUser = [];
let arrAi = [];
        
function pushArr(arr) {
  for (let i = 0; i < 10; i++){
    arr[i] = [];
    for (var j = 0; j < 10; j++) {
        arr[i][j] = 0;
    };
  };

  return arr;
};

pushArr(arrUser);
pushArr(arrAi);

console.log(arrUser);
console.log(arrAi);

table.onmouseover = function(event) {
  if (currentElem) return;

  let target = event.target.closest('td');

  if (!target) return;
  if (!table.contains(target)) return;

  currentElem = target;
  target.style.background = 'white';
};


table.onmouseout = function(event) {
  if (!currentElem) return;

  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    if (relatedTarget == currentElem) return;
    relatedTarget = relatedTarget.parentNode;
  }

  currentElem.style.background = '';
  currentElem = null;
};

tableAi.onmouseover = function(event) {
  if (currentElem) return;

  let target = event.target.closest('td');

  if (!target) return;
  if (!tableAi.contains(target)) return;

  currentElem = target;
  target.style.background = 'white';
};


tableAi.onmouseout = function(event) {
  if (!currentElem) return;

  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    if (relatedTarget == currentElem) return;
    relatedTarget = relatedTarget.parentNode;
  }

  currentElem.style.background = '';
  currentElem = null;
};