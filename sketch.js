var background, backgroundImage;
var author, authorImage;
var hannah, hannahImage;
var magicalBooks, magicalBooksImage;
var magicalPens, magicalPensImage;
var magicalPages, magicalPagesImage;
var magicalBookGrp, magicalPenGrp, magicalPageGrp;
var keyGrp;
var score = 0;
var keyCount = 10;
var edges;
var lifeHeartImg, keyImg, resetImg;
var numLives = 3;
var livesGrp;
var maxScore = 40;

function preload(){
  //load backgroundImage here
  backgroundImage = loadImage("Images/BGImage.png");
  //load authorImage here
  authorImage = loadImage("Images/author.png");
  //load hannahImage here
  hannahImage = loadImage("Images/hannah.png");
  //load magicalBooksImage here
  magicalBooksImage = loadImage("Images/magicalBook.png");
  //load magicalPensImage here
  magicalPensImage = loadImage("Images/magicalPen.png");
  //load magicalPagesImage here
  magicalPagesImage = loadImage("Images/magicalPage.png");
  //load lifeHeartImg here
  lifeHeartImg = loadImage("Images/lifeHeart.png");
  //load keyImg here
  keyImg = loadImage("Images/key.png");
  //load resetImg here
  resetImg = loadImage("Images/resetButton.png");
}


function setup(){
  //create canvas
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  console.log(windowHeight);

  //create background
  background = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  background.shapeColor = "lightBlue";
  background.addImage(backgroundImage);
  background.scale = 1.5;
  //create author
  author = createSprite(windowWidth-920, windowHeight-185, 20, 60);
  author.shapeColor = "yellow";
  author.addImage(authorImage);
  author.scale = 0.5
  ;
  //create hannah
  hannah = createSprite(windowWidth-1150, windowHeight-225, 20, 60);
  hannah.shapeColor = "red";
  hannah.addImage(hannahImage);
  hannah.scale = 0.8;
 
  //create Obstacle Groups
  magicalBookGrp = createGroup();
  magicalPenGrp = createGroup();
  magicalPageGrp = createGroup();
  keyGrp = createGroup();
  livesGrp = createGroup();

  //creating lives
  for(var i = 0; i < numLives; i++){
      var heart = createSprite(i*70 + 150, 50, 30, 30);
      heart.addImage(lifeHeartImg);
      heart.scale = 0.1;
      livesGrp.add (heart);
    }
}


function draw(){
 
  if (keyCount > 0 && numLives > 0) {
    //calling the functions
    spawnMagicalBooks();
    spawnMagicalPens();
    spawnMagicalPages();


    handlePlayerControls();

    magicalBookGrp.overlap (keyGrp,booklock);
    magicalPenGrp.overlap (keyGrp,penlock);
    magicalPageGrp.overlap (keyGrp,pagelock);
    
    magicalBookGrp.overlap (hannah,handleLife);
    magicalPenGrp.overlap (hannah,handleLife);
    magicalPageGrp.overlap (hannah,handleLife);
    //creating edge sprites
    edges = createEdgeSprites();
    author.bounceOff(edges);
}   
drawSprites();

displayScore ();

if(keyCount <= 0 || numLives <= 0){
    textSize(50);
    text("YOU LOSE", 500, 300);
    magicalBookGrp.setVelocityXEach(0);
    magicalPenGrp.setVelocityXEach(0);
    magicalPageGrp.setVelocityXEach(0);

}

if(score >= maxScore){
  textSize(50);
  text("YOU WIN AND HANNAH IS SAFE!", 300, 300);
  magicalBookGrp.setVelocityXEach(0);
  magicalPenGrp.setVelocityXEach(0);
  magicalPageGrp.setVelocityXEach(0);

}
  //displaying score
   // text("Score: "+ score, 320,50);

  //increase score if key is touching book
  /*
    if(magicalBookGrp.isTouching(key)){
      magicalBookGrp.destroyEach();
        score = score + 2;
      }

      //increase score if key is touching pen
    if(magicalPenGrp.isTouching(key)){
      magicalPenGrp.destroyEach();
      score = score + 3;
    }

    //increase score if key is touching page
    if(magicalPageGrp.isTouching(key)){
      magicalPageGrp.destroyEach();
      score = score + 5;
    }
    */
 
  
  }

function displayScore () {
 //displaying score
    textSize(20);
    fill("white");
    text("Score : "+ score, 450,50);
    text("Keys : "+ keyCount, 320,50);
}

function handleLife (enemy, girl) {
  if (numLives > 0)   {
    enemy.destroy ();
    numLives = numLives - 1;
    livesGrp[numLives].destroy();
    hannah.y = hannah.y - 20; 
  }
  
  
}

function booklock (book, booklock) {
  book.destroy();
  booklock.destroy();
  score = score + 5;
}

function penlock (pen, penlock) {
  pen.destroy();
  penlock.destroy();
  score = score + 10;
}

function pagelock (page, pagelock) {
  page.destroy();
  pagelock.destroy();
  score = score + 15;
}

function handlePlayerControls () {
  if (keyDown ("UP_ARROW")) {
      author.y = author.y - 10;
  }
  if (keyDown ("DOWN_ARROW")) {
      author.y = author.y + 10;
  }
  if (keyWentDown ("SPACE")) {
    var key = createSprite(windowWidth-920, author.y + 20, 30, 10 );
    key.addImage(keyImg);
    key.scale = 0.09;
    keyGrp.add(key);
    key.velocityX = 4;
    if (keyCount > 0) {
      keyCount = keyCount - 1;
    }
  }
}

function spawnMagicalBooks(){
  if (frameCount%150 == 0){
    magicalBooks = createSprite(1200 ,random(50,600));
    magicalBooks.addImage(magicalBooksImage);
    magicalBooks.velocityX = -4;
    magicalBooks.scale = 0.3;
    
  //add each magicalBook to the group
    magicalBookGrp.add(magicalBooks);
  }

}

function spawnMagicalPens(){
  if (frameCount%250 == 0){
    magicalPens = createSprite(1200 ,random(50,600));
    magicalPens.addImage(magicalPensImage);
    magicalPens.velocityX = -4;
    magicalPens.scale = 0.1;
  
  //add each magicalPen to the group
   magicalPenGrp.add(magicalPens);
  }

}

function spawnMagicalPages(){
  if (frameCount%350 == 0){
    magicalPages = createSprite(1200 ,random(50,600));
    magicalPages.addImage(magicalPagesImage);
    magicalPages.velocityX = -4;
    magicalPages.scale = 0.1;
  
  //add each magicalPage to the group
   magicalPageGrp.add(magicalPages);
  }

}