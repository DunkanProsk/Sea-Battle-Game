// Написать классическую игру Морской бой в которой:

// 1) происходит автоматическая или ручная(*) расстановка кораблей

// 2) есть псевдо ИИ, который шмаляет по кораблям игрока

// 3) добавить закрашивание клеток и отключение клика вокруг сбитого кораблика

let arrUser = [],
    arrAi = [],
    checkGetShip = 0,
    shipTwoOne = 1,
    shipTwoTwo = 1,
    shipTwoThree = 1,
    shipThreeOne = 1,
    shipThreeTwo = 1,
    shipFourOne = 1,
    whichShipSelect = '',
    pressAuto = 0;

let table = document.getElementById('table__one');
table.onmouseover = table.onmouseout = handler;
let ships = document.getElementById('ship__tabel');
let buttonReset = document.getElementById('buttonReset');
let buttonAuto = document.getElementById('buttonAuto');
let divShips = document.getElementById('ship__value').innerHTML;

pushArr(arrUser);

function pushArr(arr) {
  for(let i = 0; i < 10; i++){
    arr[i] = [];
    for (var j = 0; j < 10; j++) {
        arr[i][j] = 0;
    };
  };

  return arr;
};

function pushAutoShips() {
  let one = 4,
      two = 3,
      three = 2,
      four = 1;

  function Num() {
    return Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  };

  function pushShips(arr) {
    let x = Num(),
        y = Num(),
        val = 1;

    if(four != 0) {
      if(arr[x][y] == 0) {
        if(checkEmptyFour(x, y, arr)) {
          pushDelShipFour(x, y, arr, val);
          --four;
          pushShips(arrUser);
        } else {
          pushShips(arrUser);
        };
      } else {
        pushShips(arrUser);
      };
    } else if(three != 0) {
      if(arr[x][y] == 0) {
        if(checkEmptyThree(x, y, 'shipThreeOne', arr)) {
          pushDelShipThree(x, y, arr, val);
          --three;
          pushShips(arrUser);
        } else {
          pushShips(arrUser)
        };
      } else {
        pushShips(arrUser);
      };
    } else if(two != 0) {
      if(arr[x][y] == 0) {
        if(checkEmptyTwo(x, y, 'shipTwoOne', arr)) {
          pushDelShipTwo(x, y, arr, val);
          --two;
          pushShips(arrUser);
        } else {
          pushShips(arrUser)
        };
      } else {
        pushShips(arrUser);
      };
    } else if(one != 0) {
      if(arr[x][y] == 0) {
        if(checkEmptyOne(x, y, arr)) {
          pushDelShip(x, y, arr);
          --one;
          pushShips(arrUser);
        } else {
          pushShips(arrUser)
        };
      } else {
        pushShips(arrUser);
      };
    } else {
      return false;
    };
    
    return true;
  };

  return pushShips(arrUser); 
};

function pushDelShip(x, y, arrPush) {
  arrPush[x][y] = 1;
  checkGetShip == 0;
  render();
};

function pushDelShipTwo(x, y, arrPush, val) {
  if(val == 1) {
    arrPush[x][y] = 1;
    arrPush[x - 1][y] = 1;
    
    checkGetShip == 0;
    render();
  } else {
    arrPush[x][y] = 1;
    arrPush[x][y + 1] = 1;
    
    checkGetShip == 0;
    render();
  };
};

function pushDelShipThree(x, y, arrPush, val) {
  if(val == 1) {
    arrPush[x][y] = 1;
    arrPush[x - 1][y] = 1;
    arrPush[x - 2][y] = 1;
    
    checkGetShip == 0;
    render();
  } else {
    arrPush[x][y] = 1;
    arrPush[x][y + 1] = 1;
    arrPush[x][y + 2] = 1;
    
    checkGetShip == 0;
    render();
  };
};

function pushDelShipFour(x, y, arrPush, val) {
  if(val == 1) {
    arrPush[x][y] = 1;
    arrPush[x - 1][y] = 1;
    arrPush[x - 2][y] = 1;
    arrPush[x - 3][y] = 1;
    
    checkGetShip == 0;
    render();
  } else {
    arrPush[x][y] = 1;
    arrPush[x][y + 1] = 1;
    arrPush[x][y + 2] = 1;
    arrPush[x][y + 3] = 1;
    
    checkGetShip == 0;
    render();
  };
};

function render() {
  function createTable(arr) {
    for (let i = 0; i < 10; i++){
      for (var j = 0; j < 10; j++) {
        if(arr[i][j] == 1) {
          document.getElementById(`${i} - ${j}`).textContent = '1';
          document.getElementById(`${i} - ${j}`).style.backgroundColor = 'white';
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

    if(event.type == 'mouseover') {
      if(checkEmptyOne(x, y, arrUser)) {
        target.style.background = '#6cf7aa';
      } else {
        target.style.background = '#fd344fc2';
      };
    };

    if(event.type == 'mouseout') {
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

    if(event.type == 'mouseover') {

      switch(whichShipSelect) {
        case 'shipTwoOne' :
          (shipTwoOne == 1) ? vertical() : garizontal();
          break;

        case 'shipTwoTwo' :
          (shipTwoTwo == 1) ? vertical() : garizontal();
          break;

        case 'shipTwoThree' :
          (shipTwoThree == 1) ? vertical() : garizontal();
          break;
      };
      
      function garizontal() {
        if(checkEmptyTwo(x, y, whichShipSelect, arrUser)) {
          if(y == 9) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(x == 0) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else { 
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };
        } else {
          if(x == 0) {
            if(y != 9) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          } else {
            if(y != 9) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          };
        };
      };
      
      function vertical() {
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
    };

    if(event.type == 'mouseout') {

      switch(whichShipSelect) {
        case 'shipTwoOne' :
          (shipTwoOne == 1) ? vertical() : garizontal();
          break;

        case 'shipTwoTwo' :
          (shipTwoTwo == 1) ? vertical() : garizontal();
          break;

        case 'shipTwoThree' :
          (shipTwoThree == 1) ? vertical() : garizontal();
          break;
      };
      
      function garizontal() {
        if(arrUser[x][y] == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
        };

        if(arrUser[x][y + 1] == 0) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '';
          } else {
            if(y != 9) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
            };
        };
      };
      
      function vertical() {
        if(arrUser[x][y] == 0) {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          };
        } else {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          };
        };
      };
    };
  };

  if(checkGetShip == 3) {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if(event.type == 'mouseover') {

      switch(whichShipSelect) {
        case 'shipThreeOne' :
          (shipThreeOne == 1) ? vertical() : garizontal();
          break;

        case 'shipThreeTwo' :
          (shipThreeTwo == 1) ? vertical() : garizontal();
          break;
      };
      
      function garizontal() {
        if(checkEmptyThree(x, y, whichShipSelect, arrUser)) {
          if(y == 9) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(y == 8) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(x == 0) {
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else {
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };
        } else {
          if(x == 0) {
            if(y != 9 && y != 8) {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else if (y != 9) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          } else {
            if(y != 9 && y != 8) {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else if(y != 9) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            } else {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          };
        };
      };
      
      function vertical() {
        if(checkEmptyThree(x, y, whichShipSelect, arrUser)) {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else { 
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#6cf7aa';
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };
        } else {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          } else {
            document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#fd344fc2';
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          };
        };
      };
    };

    if(event.type == 'mouseout') {

      switch(whichShipSelect) {
        case 'shipThreeOne' :
          (shipThreeOne == 1) ? vertical() : garizontal();
          break;

        case 'shipThreeTwo' :
          (shipThreeTwo == 1) ? vertical() : garizontal();
          break;
      };
      
      function garizontal() {
        if(arrUser[x][y] == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
        } else {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
        };

        if(arrUser[x][y + 1] == 0) {
          document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '';
        } else {
          if(y != 9) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
          };
        };

        if(arrUser[x][y + 2] == 0) {
          document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '';
        } else {
          if(y != 9 && y != 8) {
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = 'white';
          };
        };
      };
      
      function vertical() {
        if(arrUser[x][y] == 0) {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else if(x == 1) {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 2][y] == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '';
            };
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          };
        } else {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 2][y] == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '';
            };

            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          };
        };
      };
    };
  };

  if(checkGetShip == 4) {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if(event.type == 'mouseover') {
      (shipFourOne == 1) ? vertical() : garizontal();
      
      function garizontal() {
        if(checkEmptyFour(x, y, arrUser)) {
          if(y == 9) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(y == 8) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(y == 7) {
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };

          if(x == 0) {
            document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else {
            document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };
        } else {
          if(x == 0) {
            if(y != 9 && y != 8 && y != 7) {
              document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };

            if (y == 9) {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
            
            if (y == 8) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
            
            if (y == 7) {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          } else {
            if(y != 9 && y != 8 && y != 7) {
              document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
            
            if(y == 9) {
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            }
            
            if(y == 8) {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };

            if(y == 7) {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
            };
          };
        };
      };
      
      function vertical() {
        if(checkEmptyFour(x, y, arrUser)) {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else if(x == 2) {
            document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          } else { 
            document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#6cf7aa';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#6cf7aa';
          };
        } else {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          } else if(x == 2) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          } else {
              document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '#fd344fc2';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = '#fd344fc2';
          };
        };
      };
    };

    if(event.type == 'mouseout') {
      (shipFourOne == 1) ? vertical() : garizontal();
      
      function garizontal() {
        if(arrUser[x][y] == 0) {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
        } else {
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
        };

        if(arrUser[x][y + 1] == 0) {
          document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = '';
        } else {
          if(y != 9) {
            document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
          };
        };

        if(arrUser[x][y + 2] == 0) {
          document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = '';
        } else {
          if(y != 9 && y != 8) {
            document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = 'white';
          };
        };

        if(arrUser[x][y + 3] == 0) {
          document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = '';
        } else {
          if(y != 9 && y != 8 && y != 7) {
            document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = 'white';
          };
        };
      };
      
      function vertical() {
        if(arrUser[x][y] == 0) {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else if(x == 1) {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };
            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else if(x == 2) {
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 2][y] == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '';
            };

            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          } else {

            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 2][y] == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 3][y] == 1) {
              document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = '';
            };

            document.getElementById(`${x} - ${y}`).style.backgroundColor = '';
          };
        } else {
          if(x == 0) {
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else if(x == 1) {
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else if(x == 2) {
            document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          } else {
            
            if(arrUser[x - 1][y] == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 2][y] == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = '';
            };

            if(arrUser[x - 3][y] == 1) {
              document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = 'white';
            } else {
              document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = '';
            };

            document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          };
        };
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
    if(createNewShipThreeOnTabel()) return checkGetShip = 0;
  };

  if(checkGetShip == 4) {
    if(createNewShipFourOnTabel()) return checkGetShip = 0;
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

        pushDelShip(x, y, arrUser);
        render();
        return true;
      };
    };
    
    alert('The cage does not fit!');
    return false;
  };

  function createNewShipTwoOnTabel() {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (target.tagName != 'TD') return false;
    
    if(arrUser[x][y] == 0) {
      
      if(checkEmptyTwo(x, y, whichShipSelect, arrUser)) {
        switch(whichShipSelect) {
          case 'shipTwoOne':
            if(shipTwoOne == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser, shipTwoOne);
              render();
              return true;
            } else {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser, shipTwoOne);
              render();
              return true;
            };
      
          case 'shipTwoTwo':
            if(shipTwoTwo == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser, shipTwoTwo);
              render();
              return true;
            } else {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser,shipTwoTwo);
              render();
              return true;
            };
      
          case 'shipTwoThree':
            if(shipTwoThree == 1) {
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser, shipTwoThree);
              render();
              return true;
            } else {
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipTwo(x, y, arrUser, shipTwoThree);
              render();
              return true;
            };
        };
      } else {
        alert('The cage does not fit!');
        return false;
      };
    } return false;
  };

  function createNewShipThreeOnTabel() {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (target.tagName != 'TD') return false;
    
    if(arrUser[x][y] == 0) {
      
      if(checkEmptyThree(x, y, whichShipSelect, arrUser)) {
        switch(whichShipSelect) {
          case 'shipThreeOne':
            if(shipThreeOne == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipThree(x, y, arrUser, shipThreeOne);
              render();
              return true;
            } else {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipThree(x, y, arrUser, shipThreeOne);
              render();
              return true;
            };
      
          case 'shipThreeTwo':
            if(shipThreeTwo == 1) {
              document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipThree(x, y, arrUser, shipThreeTwo);
              render();
              return true;
            } else {
              document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
              document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
              pushDelShipThree(x, y, arrUser,shipThreeTwo);
              render();
              return true;
            };
        };
      } else {
        alert('The cage does not fit!');
        return false;
      };
    } return false;
  };

  function createNewShipFourOnTabel() {
    let target = event.target;
    let idVal = target.id.split(' - ');
    let x = Number(idVal[0]);
    let y = Number(idVal[1]);

    if (target.tagName != 'TD') return false;
    
    if(arrUser[x][y] == 0) {
      if(checkEmptyFour(x, y, arrUser)) {
        if(shipFourOne == 1) {
          document.getElementById(`${x - 3} - ${y}`).style.backgroundColor = 'white';
          document.getElementById(`${x - 2} - ${y}`).style.backgroundColor = 'white';
          document.getElementById(`${x - 1} - ${y}`).style.backgroundColor = 'white';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          pushDelShipFour(x, y, arrUser, shipFourOne);
          render();
          return true;
        } else {
          document.getElementById(`${x} - ${y + 3}`).style.backgroundColor = 'white';
          document.getElementById(`${x} - ${y + 2}`).style.backgroundColor = 'white';
          document.getElementById(`${x} - ${y + 1}`).style.backgroundColor = 'white';
          document.getElementById(`${x} - ${y}`).style.backgroundColor = 'white';
          pushDelShipFour(x, y, arrUser, shipFourOne);
          render();
          return true;
        };
      } else {
        alert('The cage does not fit!');
        return false;
      };
    } return false;
  };
};

function checkEmptyFour(x, y, arr) {
  
  if(shipFourOne == 1) {
    return checkEmptyFourVertical();
  } else {
    return checkEmptyFourGorizont();
  };

  function checkEmptyFourVertical() {
    if((x > 3 && y > 0) && (x < 9 && y < 9)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) return false;
    if(x == 1) return false;
    if(x == 2) return false;

    if(x == 3) {
      if(y == 0) {
        if(checkThreexNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        if(checkThreexFully(x, y)) return true;
        return false;
      };

      if(checkThreexNumy(x, y)) return true;
      return false;
    };

    if(x == 8 || x == 9) { 
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
    };
  
    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };

    if(y == 9) {
      if(checkNumxFully(x, y)) return true;
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 4][y + 1] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 4][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };

    function checkThreexNully(x, y) {
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };

    function checkThreexFully(x, y) {
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };

    function checkThreexNumy(x, y) {
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };

    function checkFullxFully(x, y) {
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };
  
    function checkFullxNumy(x, y) {
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };
  
    function checkNumxNully(x, y) {
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };
  
    function checkNumxFully(x, y) {
      if(arr[x - 4][y] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      if(arr[x - 3][y] == 1) return false;
      return true;
    };
  };

  function checkEmptyFourGorizont() {
    if((x > 0 && y > 0) && (x < 9 && y < 6)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) {
      if(y == 0) {
        if(checkNullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        return false;
      };

      if(y == 7) {
        return false;
      };

      if(y == 6) {
        if(checkNullxSixy(x, y)) return true;
        return false;
      };

      if(checkNullxNumy(x, y)) return true;
      return false;
    };
    
    if(x == 9) {
      if(y == 0) {
        if(checkFullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        return false;
      };

      if(y == 7) {
        return false;
      };

      if(y == 6) {
        if(checkFullxSixy(x, y)) return true;
        return false;
      };

      if(checkFullxNumy(x, y)) return true;
      return false;
    };

    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };

    if(y == 6) {
      if(checkNumxSixy(x, y)) return true;
      return false;
    };

    if(y == 7) { 
      return false;
    };

    if(y == 8) { 
      return false;
    };
    
    if(y == 9) {
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x - 1][y + 4] != 0) return false;
      if(arr[x][y + 4] != 0) return false;
      if(arr[x + 1][y + 4] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };

    function checkNullxSixy(x, y) {
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };

    function checkFullxSixy(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };

    function checkNumxSixy(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };

    function checkNumxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  
    function checkNullxNully(x, y) {
      if(arr[x][y + 4] != 0) return false;
      if(arr[x + 1][y + 4] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x - 1][y + 4] != 0) return false;
      if(arr[x][y + 4] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };
  
    function checkFullxNumy(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x - 1][y + 4] != 0) return false;
      if(arr[x][y + 4] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };
  
    function checkNullxNumy(x, y) {
      if(arr[x][y + 4] != 0) return false;
      if(arr[x + 1][y + 4] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      if(arr[x][y + 3] == 1) return false;
      return true;
    };
  };
};

function checkEmptyThree(x, y, val, arr) {
  switch(val) {
    case 'shipThreeOne':
      if(shipThreeOne == 1) {
        return checkEmptyThreeVertical();
      } else {
        return checkEmptyThreeGorizont();
      };

    case 'shipThreeTwo':
      if(shipThreeTwo == 1) {
        return checkEmptyThreeVertical();
      } else {
        return checkEmptyThreeGorizont();
      };
  };

  function checkEmptyThreeVertical() {
    if((x > 2 && y > 0) && (x < 9 && y < 9)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) return false;
    if(x == 1) return false;

    if(x == 2) {
      if(y == 0) {
        if(checkTwoxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        if(checkTwoxFully(x, y)) return true;
        return false;
      };

      if(checkTwoxNumy(x, y)) return true;
      return false;
    };

    if(x == 8 || x == 9) { 
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
    };
  
    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };

    if(y == 9) {
      if(checkNumxFully(x, y)) return true;
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };

    function checkTwoxFully(x, y) {
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };

    function checkTwoxNumy(x, y) {
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };

    function checkTwoxNully(x, y) {
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };

    function checkFullxFully(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };
  
    function checkFullxNumy(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };
  
    function checkNumxNully(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y + 1] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };
  
    function checkNumxFully(x, y) {
      if(arr[x - 3][y] != 0) return false;
      if(arr[x - 3][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      if(arr[x - 2][y] == 1) return false;
      return true;
    };
  };

  function checkEmptyThreeGorizont() {
    if((x > 0 && y > 0) && (x < 9 && y < 7)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) {
      if(y == 0) {
        if(checkNullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        return false;
      };

      if(y == 7) {
        if(checkNullxSeveny(x, y)) return true;
        return false;
      };

      if(checkNullxNumy(x, y)) return true;
      return false;
    };
    
    if(x == 9) {
      if(y == 0) {
        if(checkFullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        return false;
      };

      if(y == 7) {
        if(checkFullxSeveny(x, y)) return true;
        return false;
      };

      if(checkFullxNumy(x, y)) return true;
      return false;
    };

    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };

    if(y == 7) {
      if(checkNumxSeveny(x, y)) return true;
      return false;
    };

    if(y == 8) { 
      return false;
    };
    
    if(y == 9) {
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };

    function checkNullxSeveny(x, y) {
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };

    function checkFullxSeveny(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };

    function checkNumxSeveny(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };

    function checkNumxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  
    function checkNullxNully(x, y) {
      if(arr[x][y + 3] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  
    function checkFullxNumy(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x - 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  
    function checkNullxNumy(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 3] != 0) return false;
      if(arr[x][y + 3] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      if(arr[x][y + 2] == 1) return false;
      return true;
    };
  };
};

function checkEmptyTwo(x, y, val, arr) {
  switch(val) {
    case 'shipTwoOne':
      if(shipTwoOne == 1) {
        return checkEmptyTwoVertical();
      } else {
        return checkEmptyTwoGorizont();
      };

    case 'shipTwoTwo':
      if(shipTwoTwo == 1) {
        return checkEmptyTwoVertical();
      } else {
        return checkEmptyTwoGorizont();
      };

    case 'shipTwoThree':
      if(shipTwoThree == 1) {
        return checkEmptyTwoVertical();
      } else {
        return checkEmptyTwoGorizont();
      };
  };

  function checkEmptyTwoVertical() {
    if((x > 1 && y > 0) && (x < 8 && y < 9)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) return false;

    if(x == 1) {
      if(y == 0) {
        if(checkOnexNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        if(checkOnexFully(x, y)) return true;
        return false;
      };

      if(checkOnexNumy(x, y)) return true;
      return false;
    };

    if(x == 8 || x == 9) { 
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
    };
  
    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };

    if(y == 9) {
      if(checkNumxFully(x, y)) return true;
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y -1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };

    function checkOnexFully(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };

    function checkOnexNumy(x, y) {
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y -1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };

    function checkOnexNully(x, y) {
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };

    function checkFullxFully(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };
  
    function checkFullxFully(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
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
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };
  
    function checkNumxNully(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x - 2][y + 1] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };
  
    function checkNumxFully(x, y) {
      if(arr[x - 2][y] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 2][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x - 1][y] == 1) return false;
      return true;
    };
  };

  function checkEmptyTwoGorizont() {
    if((x > 0 && y > 0) && (x < 9 && y < 8)) {
      if(checkAll(x, y)) return true;
    };

    if(x == 0) {
      if(y == 0) {
        if(checkNullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        if(checkNullxEighty(x, y)) return true;
        return false;
      };

      if(checkNullxNumy(x, y)) return true;
      return false;
    };
    
    if(x == 9) {
      if(y == 0) {
        if(checkFullxNully(x, y)) return true;
        return false;
      };

      if(y == 9) {
        return false;
      };

      if(y == 8) {
        if(checkFullxEighty(x, y)) return true;
        return false;
      };

      if(checkFullxNumy(x, y)) return true;
      return false;
    };

    if(y == 8) { 
      if(checkNumxEighty(x, y)) return true;
      return false;
    };
    
    if(y == 0) {
      if(checkNumxNully(x, y)) return true;
      return false;
    };
    
    if(y == 9) {
      return false;
    };

    function checkAll(x, y) {
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x][y + 2] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };

    function checkNullxEighty(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };

    function checkFullxEighty(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };

    function checkNumxEighty(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x][y + 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };
  
    function checkNullxNully(x, y) {
      if(arr[x][y + 2] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };
  
    function checkFullxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x][y + 2] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };
  
    function checkFullxNumy(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x - 1][y - 1] != 0) return false;
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x][y + 2] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };
  
    function checkNullxNumy(x, y) {
      if(arr[x][y - 1] != 0) return false;
      if(arr[x + 1][y - 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x][y + 2] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
      return true;
    };
  
    function checkNumxNully(x, y) {
      if(arr[x - 1][y] != 0) return false;
      if(arr[x - 1][y + 1] != 0) return false;
      if(arr[x - 1][y + 2] != 0) return false;
      if(arr[x][y + 2] != 0) return false;
      if(arr[x + 1][y + 2] != 0) return false;
      if(arr[x + 1][y + 1] != 0) return false;
      if(arr[x + 1][y] != 0) return false;
      if(arr[x][y] == 1) return false;
      if(arr[x][y + 1] == 1) return false;
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

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkNullxNully(x, y) {
    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkNullxFully(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkFullxFully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkFullxNully(x, y) {
    if(arr[x][y + 1] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x - 1][y] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkFullxNumy(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkNullxNumy(x, y) {
    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkNumxNully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y + 1] != 0) return false;

    if(arr[x][y + 1] != 0) return false;

    if(arr[x + 1][y + 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };

  function checkNumxFully(x, y) {
    if(arr[x - 1][y] != 0) return false;

    if(arr[x - 1][y - 1] != 0) return false;

    if(arr[x][y - 1] != 0) return false;

    if(arr[x + 1][y - 1] != 0) return false;

    if(arr[x + 1][y] != 0) return false;

    if(arr[x][y] == 1) return false;

    return true;
  };
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
              document.getElementById("shipTwoOne").animate([
                { width: '48px' }, 
                { width: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });
          
              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoOne = 0;
            } else {
              document.getElementById("shipTwoOne").animate([
                { height: '48px' }, 
                { height: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '90px';
              return shipTwoOne = 1;
            };

          case 'shipTwoTwo':
            if(shipTwoTwo == 1) {
              document.getElementById("shipTwoTwo").animate([
                { width: '48px' }, 
                { width: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoTwo = 0;
            } else {
              document.getElementById("shipTwoTwo").animate([
                { height: '48px' }, 
                { height: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '90px';
              return shipTwoTwo = 1;
            };

          case 'shipTwoThree':
            if(shipTwoThree == 1) {
              document.getElementById("shipTwoThree").animate([
                { width: '48px' }, 
                { width: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '90px';
              event.target.parentNode.style.height = '48px';
              return shipTwoThree = 0;
            } else {
              document.getElementById("shipTwoThree").animate([
                { height: '48px' }, 
                { height: '90px' }
              ], {
                duration: 250,
                iterations: 1,
              });

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
              document.getElementById("shipThreeOne").animate([
                { width: '48px' }, 
                { width: '137px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '137px';
              event.target.parentNode.style.height = '48px';
              return shipThreeOne = 0;
            } else {
              document.getElementById("shipThreeOne").animate([
                { height: '48px' }, 
                { height: '137px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '137px';
              return shipThreeOne = 1;
            };

          case 'shipThreeTwo':
            if(shipThreeTwo == 1) {
              document.getElementById("shipThreeTwo").animate([
                { width: '48px' }, 
                { width: '137px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '137px';
              event.target.parentNode.style.height = '48px';
              return shipThreeTwo = 0;
            } else {
              document.getElementById("shipThreeTwo").animate([
                { height: '48px' }, 
                { height: '137px' }
              ], {
                duration: 250,
                iterations: 1,
              });

              event.target.parentNode.style.width = '48px';
              event.target.parentNode.style.height = '137px';
              return shipThreeTwo = 1;
            };
        };
      };

      if(event.target.className == 'pictureFour') {
        if(shipFourOne == 1) {
          document.getElementById("shipFourOne").animate([
            { width: '48px' }, 
            { width: '185px' }
          ], {
            duration: 250,
            iterations: 1,
          });

          event.target.parentNode.style.width = '185px';
          event.target.parentNode.style.height = '48px';
          return shipFourOne = 0;
        } else {
          document.getElementById("shipFourOne").animate([
            { height: '48px' }, 
            { height: '185px' }
          ], {
            duration: 250,
            iterations: 1,
          });

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

  shipTwoOne = 1;
  shipTwoTwo = 1;
  shipTwoThree = 1;
  shipThreeOne = 1;
  shipThreeTwo = 1;
  shipFourOne = 1;

  checkGetShip = 0;

  pushArr(arrUser);
  render();
};

buttonAuto.onclick = function(event) {
  ships.innerHTML = `
    <div id="ship__flex">
    </div>
  `;

  shipTwoOne = 1;
  shipTwoTwo = 1;
  shipTwoThree = 1;
  shipThreeOne = 1;
  shipThreeTwo = 1;
  shipFourOne = 1;

  checkGetShip = 0;
  pressAuto = 1;
  
  pushAutoShips();
  render();
};