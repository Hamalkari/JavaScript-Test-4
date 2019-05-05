(function(){

  /**
   * board - получайем шахматную доску
   * blockMatrix - создаем матрицу для наших блоков
   */
  let board = document.querySelector('.board');
  let blockMatrix = [];
  let selectedBlock = null;

  drawBoard();
  board.addEventListener('click',blockHandler);

  
  //drawBoard() рисуем нашу шахматную доску и заполняем матрицу blockMatrix 
  function drawBoard(){
    let fragment = document.createDocumentFragment();
    let hor = ['A','B','C','D','E','F','G','H'];
    let block;
    let row = 8;
    let col = 8;
    let flag = true;

    for (let i = 0; i < row; i ++){
      let arrBlock = [];
      for (let j = 0; j < col; j++){
        if (j == 0) flag = !flag;
        
        let pos = `${hor[j]}${col - i}`;

        block = document.createElement('div');

        block.className = 'block';
        // добавляем для каждого блока позицию на доске
        block.setAttribute('data-pos',pos);

        flag ? block.classList.add('black') : block.classList.add('white');

        fragment.appendChild(block);
        arrBlock.push(block);
        flag = !flag; 
      }
      blockMatrix.push(arrBlock);
    }
    blockMatrix = blockMatrix.reverse();
    board.appendChild(fragment);
  }

  // highlightFocus() функция для подсветки элемента в фокусе
  function highlightFocus(target){
    if (selectedBlock){
      selectedBlock.classList.remove('focus');
    }
    selectedBlock = target;
    selectedBlock.classList.add('focus');
  }

  // highlightActive() функция для подсветки активных мест на доске куда может сходить конь
  function highlightActive(arrPosition){
    clearBlocks(blockMatrix);
    let hor = ['A','B','C','D','E','F','G','H'];
    arrPosition = arrPosition.map(pos => {
      let char = pos[0];
      let findIndex = hor.findIndex(ch => ch == char) + 1;
      let resPos = `${findIndex}${pos[1]}`;
      return resPos;
    });
    arrPosition.forEach(pos => {
      let [y,x] = pos.split('').map(ch => +ch);
      blockMatrix[x - 1][y - 1].classList.add("active");
    })
  }

  // clearBlocks() очищаем нашу доску от подсветки активных мест
  function clearBlocks(blockMatrix){
    for (let i = 0; i < blockMatrix.length; i ++){
      for (let j = 0; j < blockMatrix[i].length; j++){
        let block = blockMatrix[i][j];
        block.classList.remove('active');
      }
    }
  }

  // blockHandler() обработчик для доски
  function blockHandler(e){
    let target = e.target;
    if (target.classList.contains('block')){
      highlightFocus(target);
      let arrPositionOfHorse = getPositionsOfHorse(target);
      highlightActive(arrPositionOfHorse);
    }
  }

  function getPositionsOfHorse(block){
    let hor = ['A','B','C','D','E','F','G','H'];
    // всевозможные позиции коня относительно при добавлении к текущей позиции
    let arrPossiblePosition = [
      {x: 2, y: -1},
      {x: 1, y: -2},
      {x: -1,y: -2},
      {x: -2, y: -1},
      {x: -2, y: 1},
      {x: -1, y: 2},
      {x: 1,y: 2},
      {x: 2, y: 1},
    ];
    let resultPos = [];
    let [x,y] = block.dataset.pos.split('');

    // приводим позиция из буквенного в числовую
    x = hor.findIndex(ch => ch == x) + 1;
    y = +y;

    for (let i = 0; i < arrPossiblePosition.length; i ++){
      let posiblePos = arrPossiblePosition[i];
      let tx = x + posiblePos.x;
      let ty = y + posiblePos.y;
      if ((tx >= 1 && tx <= 8) && (ty >= 1 && ty <=8)){
        let resPos = `${hor[tx - 1]}${ty}`;
        resultPos.push(resPos);
      }
    }
    return resultPos;
  }
  
})();