// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика

let arrUser = [];
let arrAi = [];
let table = document.getElementById('table__one');
let ships = document.getElementById('ship__tabel');

pushArr(arrUser);

function render() {
  function createTable(arr) {
    for (let i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++) {
          if(arr[i][j] == 1) {
            document.getElementById(`${i} - ${j}`).textContent = '1';
          } else {
            document.getElementById(`${i} - ${j}`).textContent = '0';
          };
      };
    };
  };

  createTable(arrUser);
};


function pushArr(arr) {
  for (let i = 0; i < 10; i++){
    arr[i] = [];
    for (var j = 0; j < 10; j++) {
        arr[i][j] = 0;
    };
  };

  return arr;
};

function pushDelShip(arr, arrPush, val) {
  (val == 'push') ? arrPush[arr[0]][arr[1]] = 1 : arrPush[arr[0]][arr[1]] = 0;
  render();
};

function deleteShip(arr, arrDelete) {
  arrDelete[arr[0]][arr[1]] = 0;
  render();
};

table.onclick = function(event) {
  let target = event.target; // где был клик?
  let idVal = target.id.split(' - '); // координаты ячейки

  if (target.tagName != 'TD') return; // не на TD? тогда не интересует

  if(target.textContent == 0) {
    target.style.backgroundColor = 'white';

    pushDelShip(idVal, arrUser, 'push');
  } else {
    target.style.backgroundColor = '';

    pushDelShip(idVal, arrUser, 'del');
  };
};

ships.onclick = function(event) {
  let target = event.target;
  console.log(target); // где был клик?

  if (target.id != 'checkShip') return; // не на TD? тогда не интересует

  target.textContent = target.textContent - 1;
};