document.querySelector('.control-buttons span').onclick = function (){
  let yourName = prompt('whats your name')

  if (yourName == null || yourName == ""){

    document.querySelector(".name span").innerHTML = 'Unknown';

  }else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector('.control-buttons').remove();
}

let duration = 1000

let blockContainer = document.querySelector('.memory-game-blocks')

let blocks = Array.from(blockContainer.children)

console.log(blocks.length)

//let orderRange = [...Array(blocks.length).keys()]
let orderRange = Array.from(Array(blocks.length).keys())

//console.log(orderRange)
shuffle(orderRange)
//console.log(orderRange)


// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});

//Flip Block Function
function flipBlock(selectedBlock)
{
  //Add Class is-flipped
  selectedBlock.classList.add('is-flipped')

  //Collect all flipped card
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

  if (allFlippedBlocks.length === 2){
    //console.log('Two Flipped Blocks Selected')
    stopClicking()

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//Stop Clicking Function
function stopClicking(){
  //Add Class No Clicking No Main Container
  blockContainer.classList.add('no-clicking');

  setTimeout(() =>{
    blockContainer.classList.remove('no-clicking')
  }, duration)
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector('.tries span')

  if (firstBlock.dataset.animal === secondBlock.dataset.animal){
    firstBlock.classList.remove('is-flipped')
    secondBlock.classList.remove('is-flipped')

    firstBlock.classList.add('has-match')
    secondBlock.classList.add('has-match')

    document.getElementById('success').play();
  }else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() =>{
      firstBlock.classList.remove('is-flipped')
      secondBlock.classList.remove('is-flipped')
    }, duration)
    document.getElementById('failure').play();
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {

    random = Math.floor(Math.random() * current)

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random]

    // [3] Random Element = Get Element From Stash
    array[random] = temp

  }

  return array
}


