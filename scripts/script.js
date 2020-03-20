// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика

// arr[x - 1][y - 1]  arr[x - 1][y]  arr[x - 1][y + 1]
  
// arr[x][y - 1]        arr[x][y]        arr[x][y + 1]

// arr[x + 1][y - 1]  arr[x + 1][y]  arr[x + 1][y + 1]

let arrUser = [];
let arrAi = [];
let checkGetShip = 1;

let table = document.getElementById('table__one');
table.onmouseover = table.onmouseout = handler;

let ships = document.getElementById('ship__tabel');
let buttonReset = document.getElementById('buttonReset');
let divShips = document.getElementById('ship__value').innerHTML;

pushArr(arrUser);

function pushArr(arr) {
  for (let i = 0; i < 10; i++){
    arr[i] = [];
    for (var j = 0; j < 10; j++) {
        arr[i][j] = 0;
    };
  };

  return arr;
};

function pushDelShip(x, y, arrPush, val) {
  (val == 'push') ? arrPush[x][y] = 1 : arrPush[x][y] = 0;
  checkGetShip == 0;
  render();
};

function render() {
  function createTable(arr) {
    for (let i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++) {
        if(arr[i][j] == 1) {
          document.getElementById(`${i} - ${j}`).textContent = '1';
        } else {
          document.getElementById(`${i} - ${j}`).textContent = '0';
          document.getElementById(`${i} - ${j}`).style.backgroundColor = '#4b77a8';
        };
      };
    };
  };

  createTable(arrUser);
};

function handler(event) {
  let target = event.target;
  let idVal = target.id.split(' - ');
  let x = Number(idVal[0]);
  let y = Number(idVal[1]);

  if (event.type == 'mouseover') {
    if(checkEmptyOne(x, y, arrUser)) {
      target.style.background = '#6cf7aa';
    } else {
      target.style.background = '#fd344fc2';
    };
  };

  if (event.type == 'mouseout') {
    if(target.textContent == 0) {
      target.style.background = ''
    } else {
      target.style.background = 'white';
    };
  };
};

table.onclick = function(event) {
  let target = event.target;
  let idVal = target.id.split(' - ');
  let x = Number(idVal[0]);
  let y = Number(idVal[1]);

  if (target.tagName != 'TD') return;
  
  if(target.textContent == 0) {
    if(checkEmptyOne(x, y, arrUser)) {
      target.style.backgroundColor = 'white';

      pushDelShip(x, y, arrUser, 'push');
      render();
    } else {
      alert('Клетка не подходит!');
    };
  } else {
    target.style.backgroundColor = '';

    pushDelShip(x, y, arrUser, 'del');
  };
};

buttonReset.onclick = function(event) {
  ships.innerHTML = '';
  
  ships.innerHTML = `
    <div id="ship__flex">
    <div class="onePal" id="shipOneOne"> </div>
    <div class="onePal" id="shipOneTwo"> </div>
    <div class="onePal" id="shipOneThree"> </div>
    <div class="onePal" id="shipOneFour"> </div>
    <div class="twoPal" id="shipTwoOne"> </div>
    <div class="twoPal" id="shipTwoTwo"> </div>
    <div class="twoPal" id="shipTwoThree"> </div>
    </div>
    <div id="ship__flex">
      <div class="threePal" id="shipThreeOne"> </div>
      <div class="threePal" id="shipThreeTwo"> </div>
      <div class="fourPal" id="shipFourOne"> </div>
    </div>
  `;
  
  pushArr(arrUser);
  render();
};

ships.onclick = function(event) {
  if((event.target.id == 'ship__tabel') || (event.target.id == 'ship__flex')) return;

  if(event.target.className == 'onePal') {
    checkGetShip = 1;
  };

  if(event.target.className == 'twoPal') {
    checkGetShip = 2;
  };

  if(event.target.className == 'threePal') {
    checkGetShip = 3;
  };

  if(event.target.className == 'fourPal') {
    checkGetShip = 4;
  };

  document.getElementById(event.target.id).remove();
};

function checkEmptyOne(x, y, arr) {
  
  if((x > 0 && y > 0) && (x < 9 && y < 9)) {

    if(checkAll(x, y)) {
      return true;
    };

  } else if(x == 0) {

      if(y == 0) {
        if(checkNullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        if(checkNullxFully(x, y)) return true;
        return false;
      };

      if(checkNullxNumy(x, y)) return true;
      return false;

  } else if(x == 9) {
      
      if(y == 0) {
        if(checkFullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        if(checkFullxFully(x, y)) return true;
        return false;
      };

      if(checkFullxNumy(x, y)) return true;
      return false;

  } else if(y == 0) {

    if(checkNumxNully(x, y)) return true;
    return false;

  } else if(y == 9) {

    if(checkNumxFully(x, y)) return true;
    return false;

  };

  function checkAll(x, y) {
    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    return true;
  };

  function checkNullxNully(x, y) {
    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };

  function checkNullxFully(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };

  function checkFullxFully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    return true;
  };

  function checkFullxNully(x, y) {
    if(arr[x][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x - 1][y] != 0) return false;

    return true;
  };

  function checkFullxNumy(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    return true;
  };

  function checkNullxNumy(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    return true;
  };

  function checkNumxNully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };

  function checkNumxFully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };
};

function checkEmpty(arr) {
  
};

function checkEmpty(arr) {
  
};

function checkEmpty(arr) {
  
};

// ships.onmousedown = function(event) {                                                //попытка drag&drop для кораблей  
//   let value = document.getElementById(event.target.id);

//   if((event.target.id == 'ship__tabel') || (event.target.id == 'ship__flex')) return;

//   value.style.position = 'absolute';
//   value.style.zIndex = 1000;
    
//   document.body.append(value);

//   moveAt(event.pageX, event.pageY);

//   function moveAt(pageX, pageY) {
//     value.style.left = pageX - value.offsetWidth / 2 + 'px';
//     value.style.top = pageY - value.offsetHeight / 2 + 'px';
//   };

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   };

//   document.addEventListener('mousemove', onMouseMove);

//   value.onclick = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     checkGetShip == 1;
//     value.onmousedown = null;
//   };
// };