// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика

// arr[x - 1][y - 1]  arr[x - 1][y]  arr[x - 1][y + 1]
  
// arr[x][y - 1]        arr[x][y]        arr[x][y + 1]

// arr[x + 1][y - 1]  arr[x + 1][y]  arr[x + 1][y + 1]

let arrUser = [],
    arrAi = [],
    checkGetShip = 0,
    onePalShip = 4,
    twoPalShip = 3,
    threePalShip = 2,
    fourPalShip = 1;

let shipTwoOne = 1,
    shipTwoTwo = 1,
    shipTwoThree = 1,
    shipThreeOne = 1,
    shipThreeTwo = 1,
    shipFourOne = 1;

let whichShipSelect = '';

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

function pushDelShipTwo(x, y, arrPush, val) {
  if(val == 'push') {
    arrPush[x][y] = 1;
    arrPush[x - 1][y] = 1;
  } else {
    arrPush[x][y] = 0;
    arrPush[x - 1][y] = 0;
  };
  
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
  if(checkGetShip == 1) {
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

  if(checkGetShip == 2) {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (event.type == 'mouseover') {
      if(checkEmptyTwo(x, y, whichShipSelect, arrUser)) {
        if(x == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
        } else {
          document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
        };
      } else {
        if(x == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
        } else {
          document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
        };
      };
    };

    if (event.type == 'mouseout') {
      if(target.textContent == 0) {
        if(x == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
        } else {
          document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
        };
      } else {
        if(x == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
        } else {
          document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
        };
      };
    };
  };

  if(checkGetShip == 3) {
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

  if(checkGetShip == 4) {
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
};

table.onclick = function(event) {
  
  if(checkGetShip == 1) {
    if(createNewShipOnTabel()) return checkGetShip = 0;
  };

  if(checkGetShip == 2) {
    if(createNewShipTwoOnTabel()) return checkGetShip = 0;
  };

  if(checkGetShip == 3) {
    if(createNewShipOnTabel()) return checkGetShip = 0;
  };

  if(checkGetShip == 4) {
    if(createNewShipOnTabel()) return checkGetShip = 0;
  };

  if(checkGetShip == 0) return alert('Choose a ship!');
  
  function createNewShipOnTabel() {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (target.tagName != 'TD') return false;
    
    if(arrUser[x][y] == 0) {
      if(checkEmptyOne(x, y, arrUser)) {
        target.style.backgroundColor = 'white';

        pushDelShip(x, y, arrUser, 'push');
        render();
        return true;
      } else {
        alert('The cage does not fit!');
        return false;
      };
    } else {
      target.style.backgroundColor = '';

      pushDelShip(x, y, arrUser, 'del');
      return true;
    };
  };

  function createNewShipTwoOnTabel() {     ////////////111111111
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (target.tagName != 'TD') return false;
    
    if(arrUser[x][y] == 0) {

      if(checkEmptyTwo(x, y, whichShipSelect, arrUser)) {
        document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
        document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';

        pushDelShipTwo(x, y, arrUser, 'push');

        render();
        return true;
      } else {
        alert('The cage does not fit!');
        return false;
      };
    } else {
      target.style.backgroundColor = '';

      pushDelShipTwo(x, y, arrUser, 'del');

      return true;
    };
  };
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

function checkEmptyTwo(x, y, val, arr) {
  switch(val) {
    case 'shipTwoOne':
      if(shipTwoOne = 1) {
        return checkEmptyTwoVertical();
      } else {
        checkEmptyTwoGorizont();
      };
      break;

    case 'shipTwoTwo':
      if(shipTwoTwo = 1) {
        return checkEmptyTwoVertical();
      } else {
        checkEmptyTwoGorizont();
      };
      break;

    case 'shipTwoThree':
      if(shipTwoThree = 1) {
        return checkEmptyTwoVertical();
      } else {
        checkEmptyTwoGorizont();
      };
      break;

    case 'shipThreeOne':
      if(shipThreeOne = 1) {
        checkEmptyThreeVertical();
      } else {
        checkEmptyThreeGorizont();
      };
      break;

    case 'shipThreeTwo':
      if(shipThreeTwo = 1) {
        checkEmptyThreeVertical();
      } else {
        checkEmptyThreeGorizont();
      };
      break;

    case 'shipFourOne':
      if(shipFourOne = 1) {
        checkEmptyFourVertical();
      } else {
        checkEmptyFourGorizont();
      };
      break;

  };

  function checkEmptyTwoVertical() {
    if((x > 1 && y > 0) && (x < 8 && y < 9)) {

      if(checkAll(x, y)) {
        return true;
      };
  
    } else if(x == 1 || x == 0) {

        if(x == 0) {
          return false;
        };
  
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
  
    } else if(x == 8 || x == 9) {
        
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
  };

  function checkAll(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x - 2][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 2][y + 1] != 0) return false;
    
    if(arr[x + 2][y] != 0) return false;

    if(arr[x + 2][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 2][y - 1] != 0) return false;

    return true;
  };

  function checkNullxNully(x, y) {
    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };

  function checkNullxFully(x, y) {
    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    return true;
  };

  function checkFullxFully(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 2][y - 1] != 0) return false;

    return true;
  };

  function checkFullxNully(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x - 2][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    return true;
  };

  function checkFullxNumy(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x - 2][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;
    
    if(arr[x - 2][y - 1] != 0) return false;

    return true;
  };

  function checkNullxNumy(x, y) {
    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    return true;
  };

  function checkNumxNully(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x - 2][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    return true;
  };

  function checkNumxFully(x, y) {
    if(arr[x - 2][y] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 2][y - 1] != 0) return false;

    return true;
  };
};

function checkEmpty(arr) {
  
};

function checkEmpty(arr) {
  
};

ships.onclick = function(event) {
  if(checkGetShip == 0 && event.target.id != 'picture') {
    if((event.target.id == 'ship__tabel') || (event.target.id == 'ship__flex')) return;

    if(event.target.className == 'onePal') {
      whichShipSelect = event.target.id;
      checkGetShip = 1;
    };

    if(event.target.className == 'twoPal') {
      whichShipSelect = event.target.id;
      checkGetShip = 2;
    };

    if(event.target.className == 'threePal') {
      whichShipSelect = event.target.id;
      checkGetShip = 3;
    };

    if(event.target.className == 'fourPal') {
      whichShipSelect = event.target.id;
      checkGetShip = 4;
    };

    
    document.getElementById(event.target.id).remove();
  } else if(event.target.id == 'picture') {
      if(event.target.className == 'pictureTwo') {
        switch(event.target.parentNode.id) {
          case 'shipTwoOne':
            if(shipTwoOne == 1) {
              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoOne = 0;
            } else {
              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '90px';
              return shipTwoOne = 1;
            };

          case 'shipTwoTwo':
            if(shipTwoTwo == 1) {
              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoTwo = 0;
            } else {
              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '90px';
              return shipTwoTwo = 1;
            };

          case 'shipTwoThree':
            if(shipTwoThree == 1) {
              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoThree = 0;
            } else {
              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '90px';
              return shipTwoThree = 1;
            };
        };
      };

      if(event.target.className == 'pictureThree') {
        switch(event.target.parentNode.id) {
          case 'shipThreeOne':
            if(shipThreeOne == 1) {
              event.target.parentNode.style.width = '137px';
              event.target.parentNode.style.height = '48px';
              return shipThreeOne = 0;
            } else {
              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '137px';
              return shipThreeOne = 1;
            };

          case 'shipThreeTwo':
            if(shipThreeTwo == 1) {
              event.target.parentNode.style.width = '137px';
              event.target.parentNode.style.height = '48px';
              return shipThreeTwo = 0;
            } else {
              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '137px';
              return shipThreeTwo = 1;
            };
        };
      };

      if(event.target.className == 'pictureFour') {
        if(shipFourOne == 1) {
          event.target.parentNode.style.width = '185px';
          event.target.parentNode.style.height = '48px';
          return shipFourOne = 0;
        } else {
          event.target.parentNode.style.width = '48px';
          event.target.parentNode.style.height = '185px';
          return shipFourOne = 1;
        };
      };
  } else {
    alert('Post previous ship!');
  };
};

buttonReset.onclick = function(event) {
  ships.innerHTML = '';
  
  ships.innerHTML = `
    <div id="ship__flex">
    <div class='onePal' id='shipOneOne'> </div>
    <div class='onePal' id='shipOneTwo'> </div>
    <div class='onePal' id='shipOneThree'> </div>
    <div class='onePal' id='shipOneFour'> </div>
    <div class='twoPal' id='shipTwoOne'>
        <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureTwo' id='picture'/>
    </div>
    <div class='twoPal' id='shipTwoTwo'>
        <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureTwo' id='picture'/>
    </div>
    <div class='twoPal' id='shipTwoThree'>
        <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureTwo' id='picture'/>
    </div>
    </div>
    <div id="ship__flex">
      <div class='threePal' id='shipThreeOne'>
          <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureThree' id='picture'/>
      </div>
      <div class='threePal' id='shipThreeTwo'>
          <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureThree' id='picture'/>
      </div>
      <div class='fourPal' id='shipFourOne'>
          <img src="https://img.icons8.com/ios-filled/100/000000/rotate.png" class='pictureFour' id='picture'/>
      </div>
    </div>
  `;
  
  onePalShip = 4;
  twoPalShip = 3;
  threePalShip = 2;
  fourPalShip = 1;

  shipTwoOne = 1;
  shipTwoTwo = 1;
  shipTwoThree = 1;
  shipThreeOne = 1;
  shipThreeTwo = 1;
  shipFourOne = 1;

  pushArr(arrUser);
  render();
};