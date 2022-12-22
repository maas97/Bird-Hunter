class Birds {
  static count = 0;
  static score = 0;
  constructor(_top, _src) {
    let newBird = document.createElement("img");
    this.bird = newBird;
    this.positionValue = -130;
    console.log(this.positionValue);
    this.bird.src = _src;
    this.bird.style.position = "absolute";
    this.bird.style.transform = "scaleX(-1)";
    this.bird.style.top = _top + "px";
    this.bird.style.left = this.positionValue + "px";
    // this.bird.style.width = "130px";
    // this.bird.style.height = "130px";
    document.querySelector("body").appendChild(this.bird);
  }

  run() {
    console.log(this);
    setInterval(() => {
      //console.log(this);
      this.positionValue += 50;
      //console.log(this.newBird);
      this.bird.style.left = this.positionValue + "px";
      if (this.positionValue >= window.innerWidth - 130) {
        this.bird.style.display = "none";
      }
      //console.log(this.positionValue.);
    }, 100);
  }
}

class BrownBird extends Birds {
  constructor(_top, _src) {
    super(_top, _src);
    this.bird.style.width = "130px";
    this.bird.style.height = "130px";
  }
}

class BlackBird extends Birds {
  constructor(_top, _src) {
    super(_top, _src);
    this.bird.style.width = "70px";
    this.bird.style.height = "70px";
  }
}

class CyanBird extends Birds {
  constructor(_top, _src) {
    super(_top, _src);
    this.bird.style.width = "170px";
    this.bird.style.height = "170px";
    this.bird.style.transform = "scaleX(1)";
  }
}

class Bomb {
  constructor(_left) {
    let newBomb = document.createElement("img");
    this.bomb = newBomb;
    this.bomb.src = "images/bomb.gif";
    this.bomb.style.position = "absolute";
    this.positionBomb = 0;
    this.bomb.style.top = "0px";
    this.bomb.style.left = _left + "px";
    this.bomb.style.width = "120px";
    this.bomb.style.height = "120px";
    document.querySelector("body").appendChild(this.bomb);
  }
  move() {
    setInterval(() => {
      this.positionBomb += 20;
      this.bomb.style.top = this.positionBomb + "px";
      if (this.positionBomb >= window.innerHeight - 120) {
        this.bomb.style.display = "none";
      }
    }, 100);
  }
}

window.onload = function () {
  let query = window.location.search;
  let urlUser = new URLSearchParams(query);
  let userName = urlUser.get("user");
  console.log(userName);
  let audioGame = document.querySelector("audio");
  audioGame.setAttribute("src", "audio/music.mp3");
  let shotVoice = document.querySelector("#shooteffect");
  shotVoice.setAttribute("src", "audio/shot.mp3");
  let bombVoice = document.querySelector("#bombeffect");
  bombVoice.setAttribute("src", "audio/explode1.mp3");
  let userElement = document.querySelector(".name");
  let timeElement = document.querySelector(".time");
  let scoreElement = document.querySelector(".score");
  let birdsElement = document.querySelector(".birds");
  let buttonElement = document.querySelector("button");
  let welcomeElement = document.querySelector(".welcome");
  let winElement = document.querySelector(".win");
  let loseElement = document.querySelector(".lose");
  let redirectButton = document.querySelectorAll(".redirect");
  console.log(redirectButton);
  redirectButton[0].onclick = function () {
    location.href = "index.html";
  };
  redirectButton[1].onclick = function () {
    location.href = "index.html";
  };
  let srcBrown = "../images/brown.gif";
  let srcBlack = "../images/black.gif";
  let srcCyan = "../images/cyan.gif";
  console.log(userElement);
  userElement.textContent = userName;
  console.log(buttonElement);

  buttonElement.onclick = function start() {
    console.log(audioGame);
    audioGame.play();

    welcomeElement.style.display = "none";
    timeElement.textContent = ``;

    const sleep = async (milliseconds) => {
      await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
      });
    };

    // let brown = new BrownBird(200, srcBrown);
    // brown.run();

    // let black = new BlackBird(400, srcBlack);
    // black.run();

    // let cyan = new CyanBird(300, srcCyan);
    // cyan.run();

    // let bomb1 = new Bomb(1200);
    // bomb1.move();

    let time = async () => {
      for (let i = 59; i >= 0; i--) {
        timeElement.textContent = `00:${i}`;
        console.log(i);

        let birdsArray = ["brown", "black", "cyan"];

        let randomBird = Math.floor(Math.random() * 3);
        let randomHight = Math.floor(80 + Math.random() * 350);
        let randomWidth = Math.floor(50 + Math.random() * 1200);
        if (i % 5 == 0) {
          function createBomb() {
            let bombObj = new Bomb(randomWidth);
            bombObj.move();
            bombObj.bomb.onclick = function explodeBomb() {
              bombVoice.play();
              bombObj.bomb.style.display = "none";
              let bombBrown = document.querySelectorAll(
                '[src="../images/brown.gif"]'
              );
              let bombBlack = document.querySelectorAll(
                '[src="../images/black.gif"]'
              );
              let bombCyan = document.querySelectorAll(
                '[src="../images/cyan.gif"]'
              );
              bombBrown.forEach((element) => {
                element.click();
              });

              bombBlack.forEach((element) => {
                element.click();
              });

              bombCyan.forEach((element) => {
                element.click();
              });
            };
          }
          createBomb();
        }
        console.log("random= ", randomBird);
        switch (randomBird) {
          case 0:
            let brown = new BrownBird(randomHight, srcBrown);
            brown.run();
            // if (brown.bird.positionValue > window.innerWidth) {
            //   console.log("lolololololllllllllllllllllll", brown.bird.left);
            //   brown.bird.positionValue = -130;
            // }
            //console.log("this is object brown",brown);
            brown.bird.addEventListener("click", function () {
              shotVoice.play();
              brown.bird.style.display = "none";
              Birds.count++;
              birdsElement.textContent = Birds.count;
              Birds.score += 5;
              scoreElement.textContent = Birds.score;
            });
            //console.log("brown aaaaaaaaaa ",window.innerWidth);
            // console.log("0000000000000000 ",brown.bird.positionValue);

            break;
          case 1:
            let black = new BlackBird(randomHight, srcBlack);
            black.run();
            black.bird.addEventListener("click", function () {
              shotVoice.play();
              black.bird.style.display = "none";
              Birds.count++;
              birdsElement.textContent = Birds.count;
              Birds.score += 10;
              scoreElement.textContent = Birds.score;
            });
            break;
          case 2:
            let cyan = new CyanBird(randomHight, srcCyan);
            cyan.run();
            cyan.bird.addEventListener("click", function () {
              shotVoice.play();
              cyan.bird.style.display = "none";
              Birds.count++;
              birdsElement.textContent = Birds.count;
              Birds.score -= 10;
              if (Birds.score < 0) Birds.score = 0;
              scoreElement.textContent = Birds.score;
            });
            break;
        }

        await sleep(1000);

        if (i == 0) {
          console.log("value of i is  ", i);
          console.log("Value of score is ", Birds.score);
          if (Birds.score >= 50) {
            await sleep(2500);
            winElement.style.display = "block";
          } else if (Birds.score < 50) {
            await sleep(2500);
            loseElement.style.display = "block";
          }
        }
      }
    };
    time();
  };
};
