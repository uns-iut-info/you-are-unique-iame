import Sphere from "./Sphere.js";
import SuperBall from "./SuperBall.js";
import FollowEnemy from "./FollowEnemy.js";
import FinalBoss from "./FinalBoss.js";

let spheresMesh;
let button4;
let canvas;
let engine;
let scene;
let superball;
let ground;
let otherBallsMesh;
let villainBallsMesh;
let remainingBalls = 20;
let balls = remainingBalls;
let touchedBalls = 0;
let inputStates = {};
let bool = false;
var textblock;
let isPlaying = true;
let startButton;
let restartButton;
let boolOnRestartButton = false;
let lifeHearts = 5;
let liveblock = new BABYLON.GUI.TextBlock();
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let door1;
let door2;
let advancedTexture;
let level = 1;
let enemy = null;
let bonus1;
let bonus2;
let bonus3; 
let healthPercentage;
let counterBoss;
var textblockHealth;
var bossTouched = false;
let time = 90;


window.onload = startGame();

function startGame() {
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = createScene();

    // modify some default settings (i.e pointer events to prevent cursor to go 
    // out of the game window)
    modifySettings();

    superball = scene.getMeshByName("heroSuperball");
    //startButton = createButtonLetsPlay();
    START();
    let finalScreen = false;

    engine.runRenderLoop(() => {
        //console.log(scene.isReady());
 
        let deltaTime = engine.getDeltaTime(); 
            if (bool) {
                if ((isPlaying) && (bool)) {
                    finalScreen = false;
                    superball.move();
                    superball.jump();
                    if(level==3){
                    superball.fireCannonBalls();
                    }
                    /*
                    setTimeout(() => {
                        moveBalls();
                    }, 5000 );*/
                    let enemyBox = scene.getMeshByName("enemyBox");
                    if (level == 2) {
                        if ((superball.position.subtract(enemyBox.position)).length() < 50){ 
                        enemy.move(scene);
                        }
                    }
                    if ((remainingBalls == 0)||(lifeHearts==0)) {
                        isPlaying = false;
                    }

                }
                else {
                    if(finalScreen==false){
                    var textblockWL = WinOrLose();
                    reStartButton = reStartButton();
                    finalScreen = true;
                    }
                    //scene = createScene(); 
                    //startButton = createButtonLetsPlay();
     
                    //scene.render();
                }
            }
            scene.render();
            
    });
    scene.assetsManager.load();

    
}



function moveBalls() {
    if(level!=3){
    for (let i = 0; i < villainBallsMesh.length; i++) {
        let villain =  villainBallsMesh[i];

        let imposter = villain.physicsImpostor;

        if(rand()){
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(0.1, 0 , 0),villain.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(-0.1, 0 , 0),villain.getAbsolutePosition()); 
            }
        }
        else{
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  0.1),villain.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  -0.1),villain.getAbsolutePosition()); 
            }
        }
    }

    for (let i = 0; i < otherBallsMesh.length; i++) {
        let ball =  otherBallsMesh[i];

        let imposter = ball.physicsImpostor;

        if(rand()){
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(0.1, 0 , 0),ball.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(-0.1, 0 , 0),ball.getAbsolutePosition()); 
            }
        }
        else{
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  0.1),ball.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  -0.1),ball.getAbsolutePosition()); 
            }
        }
    }
  }
    else{
        let boss = scene.getMeshByName("finalBoss");
        let imposter = boss.physicsImpostor;
        console.log("here");
        if(rand()){
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(60, 0 , 0),boss.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(-60, 0 , 0),boss.getAbsolutePosition()); 
            }
        }
        else{
            if(rand()){
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  60),boss.getAbsolutePosition()); 
            }
            else{
                imposter.applyImpulse(new BABYLON.Vector3(0, 0 ,  -60),boss.getAbsolutePosition()); 
            }
        }

    }
}

function rand(){
    var r = Math.random();
    return r>=0.5;
}

function erase() {
    scene.dispose();
    superball.dispose();
    otherBallsMesh = null;
    villainBallsMesh = null;
    remainingBalls = 20;
    touchedBalls = 0;
    inputStates = {};
    bool = false;
    isPlaying = false;
    lifeHearts = 5;
}

function createLetsPlayButton() {
    var button0 = BABYLON.GUI.Button.CreateSimpleButton("but0", "LET'S PLAY !");
    button0.width = "150px"
    button0.height = "40px";
    button0.color = "white";
    button0.cornerRadius = 20;
    button0.background = "pink";
    button0.onPointerUpObservable.add(function() {
        button0.dispose();
        bool = true;
        createTimer(time); 
    });
    advancedTexture.addControl(button0);
 }

 function createinputRemainingBallsButton() {
    
    /*INPUT*/ 
    var inputNumber = new BABYLON.GUI.InputText("inputNumber");

    inputNumber.width = "150px"
    inputNumber.height = "40px";
    inputNumber.left = "0px";


    //inputNumber.width = 0.2;
    //inputNumber.maxWidth = 0.3;
    //inputNumber.left = "-37.5%";
    //inputNumber.top = "-44%";
    //inputNumber.height = "40px";
    inputNumber.text = "Number of balls to save";
    inputNumber.color = "#0095B3";
    // inputNumber.highligherOpacity = "0.1";
    inputNumber.background = "white";
    inputNumber.onTextChangedObservable.add((input) => {
        let x = parseInt(input._textWrapper._text);
        if ((!isNaN(x)) && (x>0) && (x<remainingBalls)) {
        remainingBalls = x
        textblock.text = "Remaining balls : " + remainingBalls;
        }
            
    });
    advancedTexture.addControl(inputNumber);
    return inputNumber;

 }

 function createinputTimeButton() {
    
    var inputNumber = new BABYLON.GUI.InputText("inputTime");

    inputNumber.width = "150px"
    inputNumber.height = "40px";
    inputNumber.left = "200px";


    //inputNumber.width = 0.2;
    //inputNumber.maxWidth = 0.3;
    //inputNumber.left = "-37.5%";
    //inputNumber.top = "-44%";
    //inputNumber.height = "40px";
    inputNumber.text = "Set Timer in sec";
    inputNumber.color = "#0095B3";
    // inputNumber.highligherOpacity = "0.1";
    inputNumber.background = "white";
    inputNumber.onTextChangedObservable.add((input) => {
           let x = parseInt(input._textWrapper._text);
           if ((!isNaN(x)) && (x>0)) {
            time = x
            console.log(time);
            }
    });
    advancedTexture.addControl(inputNumber);
    return inputNumber;
 }


 function startButtonCreate() {
    var buttonStart = BABYLON.GUI.Button.CreateSimpleButton("startButton", "CHOOSE LEVEL");
    buttonStart.width = "150px"
    buttonStart.height = "40px";
    buttonStart.left = "-200px";
    buttonStart.color = "white";
    buttonStart.cornerRadius = 20;
    buttonStart.background = "pink";
    buttonStart.onPointerUpObservable.add(function() {
        buttonStart.dispose();
        button4.dispose();
        createButtonLetsPlay()    
    });
    advancedTexture.addControl(buttonStart);
    return buttonStart;
 }

function START() {
    let start = startButtonCreate();


    button4 = BABYLON.GUI.Button.CreateSimpleButton("but4", "settings");
    button4.width = "150px"
    button4.height = "40px";
    button4.left = "400px";
    button4.color = "white";
    button4.cornerRadius = 20;
    button4.background = "red";
    button4.onPointerUpObservable.add(function() 
    { 
        start.dispose()
        let inputButton1 = createinputRemainingBallsButton();
        let inputButton2 = createinputTimeButton();

        button4.dispose();

        var buttonConfirm = BABYLON.GUI.Button.CreateSimpleButton("confirmButton", "confirm");
        buttonConfirm.width = "150px"
        buttonConfirm.height = "40px";
        buttonConfirm.left = "400px";
        buttonConfirm.color = "white";
        buttonConfirm.cornerRadius = 20;
        buttonConfirm.background = "red";
        buttonConfirm.onPointerUpObservable.add(function() 
        { 
            inputButton1.dispose();
            inputButton2.dispose();
            buttonConfirm.dispose();
            startButtonCreate();
        });     
        advancedTexture.addControl(buttonConfirm);
    });
    advancedTexture.addControl(button4);
}

function createButtonLetsPlay() {

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "level 1");
    button1.width = "150px"
    button1.height = "40px";
    button1.left = "-200px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "pink";
    button1.onPointerUpObservable.add(function() {
        level = 1;
        button1.dispose();
        button2.dispose();
        button3.dispose();
        bonus2.dispose();
        bonus3.dispose();        
        createLetsPlayButton();
    });
    advancedTexture.addControl(button1);

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "level 2");
    button2.width = "150px"
    button2.height = "40px";
    button2.left = "0px";
    button2.color = "white";
    button2.cornerRadius = 20;
    button2.background = "purple";
    button2.onPointerUpObservable.add(function() {
        level = 2;
        button1.dispose();
        button2.dispose();
        button3.dispose();
        bonus1.position.x = Math.floor(Math.random()*(180-(-180)+1)+(-180));
        bonus1.position.z = Math.floor(Math.random()*(180-(-180)+1)+(-180));
        bonus1.position.y = 4;
        bonus3.dispose();        
        ground.dispose();
        ground = createGround( 'images/hmap1.png', "images/sol/sol10.jpg", 50, scene);
        door1.position.y = 13;
        door2.position.y = 13;
        enemy = new FollowEnemy(BABYLON.MeshBuilder.CreateBox("enemyBox", {height: 5, width:5, depth: 5}, scene),1,1,1,scene);
    
        createLetsPlayButton();

    });
    advancedTexture.addControl(button2);

   var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "level 3");
    button3.width = "150px"
    button3.height = "40px";
    button3.left = "200px";
    button3.color = "white";
    button3.cornerRadius = 20;
    button3.background = "blue";
    button3.onPointerUpObservable.add(function() {
        level = 3;
        button1.dispose();
        button2.dispose();
        button3.dispose(); 
        textblock.dispose();
        bonus1.position.x = Math.floor(Math.random()*(180-(-180)+1)+(-180));
        bonus1.position.z = Math.floor(Math.random()*(180-(-180)+1)+(-180));
        bonus1.position.y = 4;      
        ground.dispose();
        for(let i = 0; i < otherBallsMesh.length ; i++){
            let ball =  otherBallsMesh[i];
            ball.dispose(); }
        for (let i = 0; i < villainBallsMesh.length ; i++) {
            let villain =  villainBallsMesh[i];
            villain.dispose();
        }
        //ground = createGround( 'images/hmap1.png', "images/sol/sol9.jpg", 10,  scene);
        ground = createGround( 'images/hmap1.png', "images/sol/sol10.jpg", 50, scene);
        let finalBoss = BABYLON.MeshBuilder.CreateSphere("finalBoss", {diameter: 50, segments: 64}, scene);
        let finalBossMesh = new FinalBoss(finalBoss,100,10,scene, "images/spheres/snow.jpg");
        healthPercentage = 100;
        counterBoss = 0;
        door1.position.y = 13;
        door2.position.y = 13;

        var advancedTextureHealth = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Health");
        textblockHealth = new BABYLON.GUI.TextBlock();   
        textblockHealth.text = "■■■■■■■■■■ 100 % "
        textblockHealth.fontSize = 37;
        textblockHealth.top = (screenHeight * 250)/720;
        textblockHealth.left = 0;
        textblockHealth.color = "green";
        advancedTextureHealth.addControl(textblockHealth);

        createLetsPlayButton();


    });
    advancedTexture.addControl(button3);



    return button1;
}



function WinOrLose() {
    const nb = otherBallsMesh.length;
    var advancedTextureGameOver = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GAME OVER");
    textblock = new BABYLON.GUI.TextBlock();           
    if (remainingBalls <= balls/2) {
        textblock.text = "Congrats : you win !";
        scene.assets.winGame.setVolume(0.6);
        scene.assets.winGame.play();
    } else {
        scene.assets.loseGame.setVolume(0.6);
        scene.assets.loseGame.play();
        textblock.text = "Mwahaha : you lost !";
    }
    textblock.fontSize = 24;
    textblock.top = (screenHeight * 200)/720;
    textblock.left = (screenWidth * 200)/1280;
    textblock.color = "black";
    advancedTextureGameOver.addControl(textblock);
    return textblock;
}

function reStartButton() {


    var advancedTextureRestart = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("RestartUI");

    var buttonReStart = BABYLON.GUI.Button.CreateSimpleButton("but2", "Another Round ?");
    buttonReStart.width = "150px"
    buttonReStart.height = "40px";
    buttonReStart.color = "white";
    buttonReStart.cornerRadius = 20;
    buttonReStart.background = "purple";
    buttonReStart.onPointerUpObservable.add(function() { 
        buttonReStart.dispose();
        textblock.dispose();
        erase();
        scene = createScene();
        scene.assetsManager.load();
        startButton = createButtonLetsPlay();
        });
    advancedTextureRestart.addControl(buttonReStart);
    return reStartButton;

}

function createTimer(i) { // i seconds
    // GUI

    var textBlock = new BABYLON.GUI.TextBlock("text", "Remaining time : " + new String(i) + " seconds");
    textBlock.color = "black";
    textBlock.fontSize = 24;   
    textBlock.top = (screenHeight * -275) / 720;
    textBlock.left = 0;

    advancedTexture.addControl(textBlock);

    isPlaying = true;
    var timer = window.setInterval(() => {
        if (isPlaying) {
            i--;
            textBlock.text = "Remaining time : " + new String(i) + " seconds";
            if (i <= 0) {
                isPlaying = false;
                window.clearInterval(timer);
                textBlock.dispose();
                advancedTexture.dispose();
            }
            if((i%5==0)&&(level!=3)){
                moveBalls();
            }
            if((i%3==0)&&(level==3)){
                moveBalls();
            }
        }
    }, 1000)
    return timer;
}

function createScene() {
    console.log("create scene")
    scene = new BABYLON.Scene(engine);


    superball = createSuperBall(scene); 

    advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    scene.enablePhysics();
        
   
    scene.assetsManager = configureAssetManager(scene);


    let followCamera = createFollowCamera(scene, superball);
    scene.activeCamera = followCamera; 

   


    //music = new BABYLON.Sound("backgroundMusic", "sounds/sound1.mp3", scene, null, { loop: true, autoplay: true });


    displayLives();
    
    createHeartBonus(scene);
    createTeleportation(scene);

    createBalls(remainingBalls,scene);
    createVillains(remainingBalls/2, scene);

    createLights(scene);
    createSky(scene);
    ground = createGround( 'images/hmap2.jpg',"images/sol/sol19.jpg", 50,  scene);

    //superball.physicsImpostor = new BABYLON.PhysicsImpostor(superball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1,move:true,friction:0.8, restitution: 0.2 }, scene);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);  
    
    loadSounds(scene);
    textblock = new BABYLON.GUI.TextBlock();
    textblock.text = "Remaining balls : " + remainingBalls;
    textblock.fontSize = 24;
    textblock.top = (screenHeight * (-265))/720;
    textblock.left = (screenWidth * 410)/1280;
    textblock.color = "black";
    advancedTexture.addControl(textblock);

    return scene;
}

function createHeartBonus(scene){
    bonus1 = new BABYLON.MeshBuilder.CreateCapsule("bonus1", {radius:0.5, height:10, radiusTop:4});
    bonus2 = new BABYLON.MeshBuilder.CreateCapsule("bonus1", {radius:0.5, height:10, radiusTop:4});
    bonus3 = new BABYLON.MeshBuilder.CreateCapsule("bonus1", {radius:0.5, height:10, radiusTop:4});

    let bonusMaterial = new BABYLON.StandardMaterial("bonusMaterial" , scene);
    bonusMaterial.diffuseColor = BABYLON.Color3.Red();  

    bonus1.position.x = -147;
    bonus1.position.z = -174;
    bonus1.position.y = 19;
    bonus1.material = bonusMaterial;

    bonus2.position.x = Math.floor(Math.random()*(180-(-180)+1)+(-180));
    bonus2.position.z = Math.floor(Math.random()*(180-(-180)+1)+(-180));
    bonus2.position.y = 4;
    bonus2.material = bonusMaterial;

    bonus3.position.x = Math.floor(Math.random()*(180-(-180)+1)+(-180));
    bonus3.position.z = Math.floor(Math.random()*(180-(-180)+1)+(-180));
    bonus3.position.y = 4;
    bonus3.material = bonusMaterial;

    var hl = new BABYLON.HighlightLayer("hl1", scene);
	hl.addMesh(bonus1, BABYLON.Color3.Red());
	hl.addMesh(bonus2, BABYLON.Color3.Red());
    hl.addMesh(bonus3, BABYLON.Color3.Red());

    bonus1.touched = false;
    bonus2.touched = false;
    bonus3.touched = false;

}

function createTeleportation(scene){
    let doorMaterial1 = new BABYLON.StandardMaterial("doorMaterial1" , scene);
    let doorMaterial2 = new BABYLON.StandardMaterial("doorMaterial2" , scene);
    /* FIRST DOOR */ 
    door1 = BABYLON.MeshBuilder.CreateBox("door1", {height: 25, width: 25, depth: 1}, scene);
    door1.position = new BABYLON.Vector3(-70,16,191);

    doorMaterial1.diffuseColor = BABYLON.Color3.Blue();
    doorMaterial1.alpha = 0.4;

    door1.material = doorMaterial1;

    var blueLight =  new BABYLON.SpotLight("blueLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), -Math.PI/3, 2, scene);
    blueLight.diffuse = new BABYLON.Color3.Blue();
    blueLight.position = new BABYLON.Vector3(door1.position.x, 40, door1.position.z);

    /* SECOND DOOR */
    door2 = BABYLON.MeshBuilder.CreateBox("door1", {height: 25, width: 25, depth: 1}, scene);
    door2.position = new BABYLON.Vector3(167,19,-71);

    doorMaterial2.diffuseColor = BABYLON.Color3.Red();
    doorMaterial2.alpha = 0.4;

    door2.material = doorMaterial2;

    var redLight =  new BABYLON.SpotLight("redLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), -Math.PI/3, 2, scene);
    redLight.diffuse = new BABYLON.Color3.Red();
    redLight.position = new BABYLON.Vector3(door2.position.x, 40, door2.position.z);

}

function detectTeleportation(scene){
    let player = scene.getMeshByName("heroSuperball");

    if(player.intersectsMesh(door1)){
        scene.assets.teleportation.setPosition(player.position);
        scene.assets.teleportation.setVolume(2);
        scene.assets.teleportation.play();
        player.position = new BABYLON.Vector3(169,10,-53);
    }
    if(player.intersectsMesh(door2)){
        scene.assets.teleportation.setPosition(player.position);
        scene.assets.teleportation.setVolume(2);
        scene.assets.teleportation.play();
        player.position = new BABYLON.Vector3(-68,6,161);
    }

}


function loadSounds(scene) {
    var assetsManager = scene.assetsManager;
    let binaryTask = assetsManager.addBinaryFileTask(
      "eatBall",
      "sounds/eatBall.wav"
    );
    binaryTask.onSuccess = function (task) {
      scene.assets.eatBall = new BABYLON.Sound(
        "eatBall",
        task.data,
        scene,
        null,
        {
            loop: false,
            spatialSound: true,
            autoplay: false
        }
      );
    };

    binaryTask = assetsManager.addBinaryFileTask(
        "teleportation",
        "sounds/teleportation.wav"
      );
      binaryTask.onSuccess = function (task) {
        scene.assets.teleportation = new BABYLON.Sound(
          "teleportation",
          task.data,
          scene,
          null,
          {
              loop: false,
              spatialSound: true,
              autoplay: false
          }
        );
      };



    binaryTask = assetsManager.addBinaryFileTask(
        "enemy",
        "sounds/enemy.wav"
      );
      binaryTask.onSuccess = function (task) {
        scene.assets.enemy = new BABYLON.Sound(
          "enemy",
          task.data,
          scene,
          null,
          {
              loop: false,
              spatialSound: true,
              autoplay: false
          }
        );
      };

    binaryTask = assetsManager.addBinaryFileTask(
        "winGame",
        "sounds/winGame.wav"
      );
      binaryTask.onSuccess = function (task) {
        scene.assets.winGame = new BABYLON.Sound(
          "winGame",
          task.data,
          scene,
          null,
          {
              loop: false,
              autoplay: false
          }
        );
      };

      binaryTask = assetsManager.addBinaryFileTask(
        "loseGame",
        "sounds/loseGame.wav"
      );
      binaryTask.onSuccess = function (task) {
        scene.assets.loseGame = new BABYLON.Sound(
          "loseGame",
          task.data,
          scene,
          null,
          {
              loop: false,
              autoplay: false
          }
        );
      };

    binaryTask = assetsManager.addBinaryFileTask(
        "permanentMusic",
        "sounds/sound1.mp3"
      );
      binaryTask.onSuccess = function (task) {
        scene.assets.permanentMusic = new BABYLON.Sound(
          "permanentMusic",
          task.data,
          scene,
          null,
          {
            loop: true,
            autoplay: true,
            volume: 0.4
          }
        );
      };

    
  }

function configureAssetManager(scene) {
    // useful for storing references to assets as properties. i.e scene.assets.cannonsound, etc.
    scene.assets = {};
  
    let assetsManager = new BABYLON.AssetsManager(scene);
  
    assetsManager.onProgress = function (
      remainingCount,
      totalCount,
      lastFinishedTask
    ) {
      engine.loadingUIText =
        "We are loading the scene. " +
        remainingCount +
        " out of " +
        totalCount +
        " items still need to be loaded.";
      console.log(
        "We are loading the scene. " +
          remainingCount +
          " out of " +
          totalCount +
          " items still need to be loaded."
      );
    };
  
    assetsManager.onFinish = function (tasks) {
      engine.runRenderLoop(function () {
        scene.render();
      });
    };
  
    return assetsManager;
  }


function displayLives(){
    let string = "❤❤❤❤❤";
    liveblock.text = string.substring(0,lifeHearts);
    liveblock.fontSize = 24;
    liveblock.top = (screenHeight * -275) / 720;
    liveblock.left = (screenWidth * -400) / 1280;
    liveblock.color = "black";
    advancedTexture.addControl(liveblock);
}

function createGround(hmap, sol,maxH, scene) {
    console.log("create ground");
    let width = 600;
    let height = 600;
    const groundOptions = { width:width, height:height, subdivisions:50, minHeight:0, maxHeight:maxH, onReady: onGroundCreated};
    //scene is optional and defaults to the current scene
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", hmap , groundOptions, scene); 

    function onGroundCreated() {
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture(sol);
        groundMaterial.diffuseTexture.uScale = 100;
        groundMaterial.diffuseTexture.vScale = 100;
        ground.material = groundMaterial;
        // to be taken into account by collision detection
        ground.checkCollisions = true;
        //groundMaterial.wireframe=true;
        //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground,
            BABYLON.PhysicsImpostor.HeightmapImpostor,
            { mass: 0 },
            scene
          );
    }
    createWalls(scene,width,height)
    return ground;
}

function createSky(scene){
    console.log("create sky");
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:2000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('images/skybox2/skybox', scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

	skybox.material = skyboxMaterial;	
    skybox.infiniteDistance = true;
    //skyboxMaterial.disableLighting = true;

    return skybox;
}

function createLights(scene) {
    console.log("create light");
    // i.e sun light with all light rays parallels, the vector is the direction.
    //let light0 = new BABYLON.DirectionalLight("dir0", new BABYLON.Vector3(-1, -1, 0), scene);
    let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.85;

    /*light1.diffuse = new BABYLON.Color3(1, 0, 0);
	light1.specular = new BABYLON.Color3(0,1,0);
	light1.groundColor = new BABYLON.Color3(0,0,1);*/
}



function createFollowCamera(scene, target) {
    console.log("create camera");
    let camera = new BABYLON.FollowCamera("superballFollowCamera", new BABYLON.Vector3(0,50,0), scene, target);
    camera.radius = 50; // how far from the object to follow
	camera.heightOffset = 14; // how high above the object to place the camera
	camera.rotationOffset = 180; // the viewing angle
	camera.cameraAcceleration = .1; // how fast to move
	camera.maxCameraSpeed = 5; // speed limit

    console.log(camera.position);
    return camera;
}

function createWalls(scene, size1, size2) {
    console.log("create walls");
    var faceColors = new Array(6);
    faceColors[0] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    faceColors[1] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    faceColors[2] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    faceColors[3] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    faceColors[4] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    faceColors[5] = (new BABYLON.Color4(0.62, 0.14, 0.14))
    

    var options1 = {
    width: size1,
    height: size2/2 + 500,
    depth: 0.1,
    //faceColors : faceColors
    };

      
    var options2 = {
        width: 0.1,
        height: size2/2 + 500,
        depth: 2*size1,
        //faceColors : faceColors
        };
    
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", options1);
    let box1Material = new BABYLON.StandardMaterial("box1Material", scene);
    box1Material.alpha = 0;
    box1.material = box1Material;
    box1.position = new BABYLON.Vector3(0,100,-(size1/2));
    const boxImpostor1 = new BABYLON.PhysicsImpostor( box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0}, scene);

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", options1);
    box2.position = new BABYLON.Vector3(0,100,(size1/2));
    let box2Material = new BABYLON.StandardMaterial("box2Material", scene);
    box2Material.alpha = 0;
    box2.material = box2Material;
    const boxImpostor2 = new BABYLON.PhysicsImpostor( box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0}, scene);
  
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", options2);
    box3.position = new BABYLON.Vector3((size1/2),100,-(size1/2));
    let box3Material = new BABYLON.StandardMaterial("box3Material", scene);
    box3Material.alpha = 0;
    box3.material = box3Material;
    const boxImpostor3 = new BABYLON.PhysicsImpostor( box3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0}, scene);
    
    const box4 = BABYLON.MeshBuilder.CreateBox("box4", options2);
    box4.position = new BABYLON.Vector3(-(size1/2),100,-(size1/2));
    let box4Material = new BABYLON.StandardMaterial("box4Material", scene);
    box4Material.alpha = 0;
    box4.material = box4Material;
    const boxImpostor4 = new BABYLON.PhysicsImpostor( box4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0}, scene);
}

let zMovement = 5;
function createSuperBall(scene) {
    console.log("create superball");
    let superballMesh = new BABYLON.MeshBuilder.CreateSphere("heroSuperball", {diameter: 7, segments: 64}, scene);
    let superball = new SuperBall(superballMesh,1,0.2,scene, null);

    superballMesh.speed = 1;
    superballMesh.frontVector = new BABYLON.Vector3(0, 0, 1);

    superballMesh.move = () => {
        //console.log(superballMesh.position.x, superballMesh.position.y, superballMesh.position.z );

        if(inputStates.up) {
            superballMesh.moveWithCollisions(superballMesh.frontVector.multiplyByFloats(superballMesh.speed, superballMesh.speed, superballMesh.speed));
            detectCollision(scene);
        }    
        if(inputStates.down) {
            superballMesh.moveWithCollisions(superballMesh.frontVector.multiplyByFloats(-superballMesh.speed, -superballMesh.speed, -superballMesh.speed));
            detectCollision(scene);
        }    
        if(inputStates.left) {
            superballMesh.rotation.y -= 0.02;
            superballMesh.frontVector = new BABYLON.Vector3(Math.sin(superballMesh.rotation.y), 0, Math.cos(superballMesh.rotation.y));
            detectCollision(scene);
        }    
        if(inputStates.right) {
            superballMesh.rotation.y += 0.02;
            superballMesh.frontVector = new BABYLON.Vector3(Math.sin(superballMesh.rotation.y), 0, Math.cos(superballMesh.rotation.y));
            detectCollision(scene);
        }

        //superballMesh.position = new BABYLON.Vector3(boxMesh.position.x, boxMesh.position.y, boxMesh.position.z);
        superball.updateParticles();
        detectTeleportation(scene);

    }


       
    superballMesh.canJump = true;
    superballMesh.isJumping = false;
    superballMesh.jumpAfter = 0.1; // in seconds


    superballMesh.jump = function(){

        if(!inputStates.space) {
            updatePosition()
            return;
        }

        if(!superballMesh.canJump){ 
            updatePosition()
            //console.log("notjump2");
            return ; 
        }

        else{
           

        //superballMesh.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 17, 1), superballMesh.getAbsolutePosition());
        let origin = new BABYLON.Vector3(superballMesh.position.x, 1000, superballMesh.position.z);
        let direction = new BABYLON.Vector3(0, -1, 0);
        let ray = new BABYLON.Ray(origin, direction, 10000);  
            
        // compute intersection point with the ground
        let pickInfo = scene.pickWithRay(ray, (mesh) => { return(mesh.name === "gdhm"); });



        if(pickInfo.pickedPoint!=null){
            let groundHeight = pickInfo.pickedPoint.y;
            if(superballMesh.position.y<=groundHeight+25){
                superballMesh.position.y = superballMesh.position.y + 1;
                superballMesh.isJumping=true;
            }
        }
        else{ // if the superball is reaching on of the borders (ie. the walls)
            if(superballMesh.position.x >= 297){       
                  superballMesh.position.x = superballMesh.position.x - 10;
            }
            else if (superballMesh.position.x <= -297){
                superballMesh.position.x = superballMesh.position.x + 10;
            }
            else if (superballMesh.position.z >= 297){
                superballMesh.position.z = superballMesh.position.z - 10;
            }
            else if(superballMesh.position.z <= -297){
                superballMesh.position.z = superballMesh.position.z + 10;
            }
        }

      
        //else { superballMesh.canJump=false; }
     
        detectCollision(scene);
     
    }



    setTimeout(() => {
        this.canJump = false;
        //console.log("NOW");
      }, 10000 * this.jumpAfter);
    
    setTimeout(()=> {
        this.canJump = true;
        //console.log("NOW2")
    }, 18000 * this.jumpAfter)
    }


    superballMesh.canFireCannonBalls = true;
    superballMesh.fireCannonBallsAfter = 0.2; // in seconds

    superballMesh.fireCannonBalls = () => {
        if(!inputStates.enter) return;

        if(!superballMesh.canFireCannonBalls) return;

        // ok, we fire, let's put the above property to false
        superballMesh.canFireCannonBalls = false;

        // let's be able to fire again after a while
        
        setTimeout(() => {
            superballMesh.canFireCannonBalls = true;
        }, 1000 * superballMesh.fireCannonBallsAfter);


        let canonMaterial = new BABYLON.StandardMaterial("canonMaterial" , scene);
        


        canonMaterial.glossiness = 3;
        canonMaterial.metallic = 5;
        canonMaterial.roughness = 0.5;    
        canonMaterial.specularPower = 8;
        
        canonMaterial.diffuseTexture = new BABYLON.Texture("images/spheres/marble.jpg", scene); 
        canonMaterial.alpha = Math.random()*(1-0.7+1)+0.7; // niveau de transparence
        
        canonMaterial.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        canonMaterial.reflectivityColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        canonMaterial.reflectionColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        canonMaterial.albedoColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

        // Create a canonball
        let cannonball = BABYLON.MeshBuilder.CreateSphere("cannonball", {diameter: 4, segments: 32}, scene);
        cannonball.material = canonMaterial;

        let pos = superballMesh.position;
        // position the cannonball above the superballMesh
        cannonball.position = new BABYLON.Vector3(pos.x, pos.y+1, pos.z);
        // move cannonBall position from above the center of the superballMesh to above a bit further than the frontVector end (5 meter s further)
        cannonball.position.addInPlace(superballMesh.frontVector.multiplyByFloats(5, 5, 5));

        // add physics to the cannonball, mass must be non null to see gravity apply
        cannonball.physicsImpostor = new BABYLON.PhysicsImpostor(cannonball,
            BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);    

        // the cannonball needs to be fired, so we need an impulse !
        // we apply it to the center of the sphere
        let powerOfFire = 100;
        let azimuth = 0.1; 
        let aimForceVector = new BABYLON.Vector3(superballMesh.frontVector.x*powerOfFire, (superballMesh.frontVector.y+azimuth)*powerOfFire,superballMesh.frontVector.z*powerOfFire);
        
        cannonball.physicsImpostor.applyImpulse(aimForceVector,cannonball.getAbsolutePosition());

        cannonball.actionManager = new BABYLON.ActionManager(scene);
        let boss = scene.getMeshByName("finalBoss");



        cannonball.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            {trigger : BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter : boss}, 
                                            
            () => {
                cannonball.dispose(); 
                //console.log("here");
                counterBoss++; 
                if(counterBoss%10==0){ // update of the health bar
                    healthPercentage = healthPercentage - 10;
                    let string = "■■■■■■■■■■";
                    textblockHealth.text = string.substring(0,healthPercentage/10) + " " + healthPercentage + "%";
                    if(healthPercentage<=70 && healthPercentage>=40){
                        textblockHealth.color = "orange";
                    }
                    if(healthPercentage<40){
                        textblockHealth.color = "red";
                    }
                }
               
                if(healthPercentage==0){ // the player wins
                    boss.material = cannonball.material;
                    remainingBalls = 0;
                    textblockHealth.dispose();
                }
                else{
                    boss.material = cannonball.material;
                    boss.material.diffuseTexture = new BABYLON.Texture("images/spheres/snow.jpg", scene); 
                }
            }
        ));

     }
 
 
    return superballMesh;
}

function updatePosition(){
    let superballMesh = scene.getMeshByName("heroSuperball");
    //console.log(superballMesh.position);
    
    let origin = new BABYLON.Vector3(superballMesh.position.x, 1000, superballMesh.position.z);
    let direction = new BABYLON.Vector3(0, -1, 0);
    let ray = new BABYLON.Ray(origin, direction, 10000);  


        
    // compute intersection point with the ground
    let pickInfo = scene.pickWithRay(ray, (mesh) => { return(mesh.name === "gdhm"); });
    if(pickInfo.pickedPoint!=null){
        let groundHeight = pickInfo.pickedPoint.y;
        if(superballMesh.position.y>=groundHeight+4.5){
            superballMesh.position.y = superballMesh.position.y - 0.5;
        }
    }
    else{ // if the superball is reaching on of the borders (ie. the walls)
        if(superballMesh.position.x >= 297){       
              superballMesh.position.x = superballMesh.position.x - 10;
        }
        else if (superballMesh.position.x <= -297){
            superballMesh.position.x = superballMesh.position.x + 10;
        }
        else if (superballMesh.position.z >= 297){
            superballMesh.position.z = superballMesh.position.z - 10;
        }
        else if(superballMesh.position.z <= -297){
            superballMesh.position.z = superballMesh.position.z + 10;
        }
    }
    
}

function createBalls(nbBall,scene){
    spheresMesh = [];
    let spheres = [];
    for(let i = 0; i < nbBall; i++) {
        spheresMesh[i] = BABYLON.MeshBuilder.CreateSphere("mySphere" +i, {diameter: 7, segments: 64}, scene);
        spheresMesh[i].physicsImpostor = new BABYLON.PhysicsImpostor(spheresMesh[i], BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.01, restitution: 0.2 }, scene);
        spheres[i] = new Sphere(spheresMesh[i],i,0.2,scene, "images/spheres/marble.jpg");
    }
    otherBallsMesh = spheresMesh;
    return spheres;
}

function createVillains(nbBall,scene, target){
    let spheresMesh = [];
    let spheres = [];
    
    for(let i = 0; i < nbBall; i++) {
        spheresMesh[i] = BABYLON.MeshBuilder.CreateSphere("villain" +i, {diameter: 7, segments: 64}, scene);
        spheresMesh[i].physicsImpostor = new BABYLON.PhysicsImpostor(spheresMesh[i], BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.01, restitution: 0.2 }, scene);
        spheresMesh[i].touched = false;
        spheresMesh[i].frontVector = new BABYLON.Vector3(0, 0, 1);


        
        //spheres[i] = new FollowSphere(spheresMesh[i],i,0.2,scene, "images/spheres/snow.jpg");
        spheres[i] = new Sphere(spheresMesh[i],i,0.2,scene, "images/spheres/snow.jpg", target);
        spheresMesh[i].material.alpha = 1;
    }
    villainBallsMesh = spheresMesh;
    return spheres;
}

function detectCollision(scene){
    
    let player = scene.getMeshByName("heroSuperball");

if (level != 3) {
    for(let i = 0; i < otherBallsMesh.length ; i++){
        let ball =  otherBallsMesh[i];

        if(player.intersectsMesh(ball)){

            player.material = ball.material;
            otherBallsMesh.splice(i,1);  
            ball.dispose();
            remainingBalls--;
            touchedBalls++;

            if (player.speed<3) {
                player.speed += 0.1;
            }

            //console.log("Balles restantes : " + remainingBalls);
            //console.log("Balles touchées : " + touchedBalls);
            
            textblock.text = "Remaining balls : " + remainingBalls;
            scene.assets.eatBall.setPosition(player.position);
            scene.assets.eatBall.setVolume(0.6);
            scene.assets.eatBall.play();

            player.scaling = new BABYLON.Vector3(player.scaling.x+0.05,player.scaling.y+0.05,player.scaling.z+0.05);
     
        }
    }

    for(let i = 0; i < villainBallsMesh.length ; i++){
        let ball =  villainBallsMesh[i];

        if(player.intersectsMesh(ball)){
            
            touchedBalls--;
            if(ball.touched == false){
                lifeHearts--;
                ball.touched = true;
                player.material.diffuseTexture = new BABYLON.Texture("images/spheres/red.jpg", scene);
                player.material.alpha = 1;
                otherBallsMesh.splice(i,1);  
                scene.assets.enemy.setPosition(player.position);
                scene.assets.enemy.setVolume(0.8);
                scene.assets.enemy.play();
            }
            
            //console.log(lifeHearts);
            let string = "❤❤❤❤❤";
            liveblock.text = string.substring(0,lifeHearts);

            //ball.material = temporaryMaterial;


            player.speed = 1;

            setTimeout(() => {
                ball.touched = false;
                villainBallsMesh.push(ball);
                //player.material.diffuseTexture = new BABYLON.Texture("images/spheres/snow.jpg", scene); 
            }, 5000 );
          
        }
    }

    /* DETECTION OF A FollowEnemy : */
if (level == 2) {
    let enemyBox = scene.getMeshByName("enemyBox")
    if  (player.intersectsMesh(enemyBox)) {
        enemyBox.position.x = Math.floor(Math.random()*(300-(-300)+1)+(-300));
        enemyBox.position.z = Math.floor(Math.random()*(300-(-300)+1)+(-300));
        if (touchedBalls > 0) {
        touchedBalls--;
        remainingBalls++;
        textblock.text = "Remaining balls : " + remainingBalls;

        let newBallSphere = BABYLON.MeshBuilder.CreateSphere("mySphere" +otherBallsMesh.length, {diameter: 7, segments: 64}, scene);
        newBallSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newBallSphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.01, restitution: 0.2 }, scene);
        let newBall = new Sphere(newBallSphere,otherBallsMesh.length,0.2,scene, "images/spheres/white.jpg");
        otherBallsMesh.push(newBallSphere);
        }
    }
}

}

if (level==3){
    let boss = scene.getMeshByName("finalBoss");
    if(player.intersectsMesh(boss)){
        if(!bossTouched){
    
        lifeHearts--;
        let string = "❤❤❤❤❤";
        liveblock.text = string.substring(0,lifeHearts);
        bossTouched = true;
        
        setTimeout(() => {
            bossTouched = false;
        }, 5000 );
        }
    }


}



    /* DETECTION WITH A BONUS : */

    if(player.intersectsMesh(bonus1)){
        if(!bonus1.touched){
            bonus1.dispose();
            if(lifeHearts!=5){
                console.log(lifeHearts);
                lifeHearts++;
                let string = "❤❤❤❤❤";
                liveblock.text = string.substring(0,lifeHearts);
            }
            bonus1.touched = true;
        }
    }

    if(player.intersectsMesh(bonus2)){
        if(!bonus2.touched){
            bonus2.dispose();
            if(lifeHearts!=5){
                console.log(lifeHearts);
                lifeHearts++;
                let string = "❤❤❤❤❤";
                liveblock.text = string.substring(0,lifeHearts);
            }
            bonus2.touched = true;
      }
    }
    
    if(player.intersectsMesh(bonus3)){
        if(!bonus3.touched){
            bonus3.dispose();
            if(lifeHearts!=5){
                console.log(lifeHearts);
                lifeHearts++;
                let string = "❤❤❤❤❤";
                liveblock.text = string.substring(0,lifeHearts);
            }
            bonus3.touched = true;
        }
  }
}


window.addEventListener("resize", (event) => {
    screenWidth = event.target.innerWidth;
    screenHeight = event.target.innerHeight;
    engine.resize()
});

function modifySettings() {
    // as soon as we click on the game window, the mouse pointer is "locked"
    // you will have to press ESC to unlock it
    scene.onPointerDown = () => {
        if(!scene.alreadyLocked) {
            console.log("requesting pointer lock");
            canvas.requestPointerLock();
        } else {
            console.log("Pointer already locked");
        }
    }

    document.addEventListener("pointerlockchange", () => {
        let element = document.pointerLockElement || null;
        if(element) {
            // lets create a custom attribute
            scene.alreadyLocked = true;
        } else {
            scene.alreadyLocked = false;
        }
    })

    // key listeners for the superball
    inputStates.left = false;
    inputStates.right = false;
    inputStates.up = false;
    inputStates.down = false;
    inputStates.space = false;
    inputStates.enter = false;
    
    //add the listener to the main, window object, and update the states
    window.addEventListener('keydown', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
           inputStates.left = true;
        } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
           inputStates.up = true;
        } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
           inputStates.right = true;
        } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
           inputStates.down = true;
        } else if (event.key === "Enter") {
            inputStates.enter = true;
        }  else if (event.key === " ") {
           inputStates.space = true;
        }
    }, false);

    //if the key will be released, change the states object 
    window.addEventListener('keyup', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
           inputStates.left = false;
        } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
           inputStates.up = false;
        } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
           inputStates.right = false;
        } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
           inputStates.down = false;
        }  else if (event.key === "Enter") {
            inputStates.enter = false;
        }  else if (event.key === " ") {
           inputStates.space = false;
        }
    }, false);
}


