const words =
  "apple chair river galaxy computer sunshine elephant puzzle blanket waterfall chocolate zebra pencil volcano bicycle rainbow notebook tomato skyscraper guitar spaceship candle ocean wizard blanket forest dragon calculator submarine balloon camera desert piano cookie island mountain laptop flower bridge dinosaur skateboard planet comet book train kangaroo painting lightning tiger photograph guitar volcano suitcase dolphin mirror glasses storm bottle helmet tree carpet dog hat microphone keyhole cloud vase turtle alarm clock rocket cake piano window suitcase starfish headphones drumstone fish curtain painting stove balloon chair apple keyboard sunglasses mosquito camera tree clock notebook spaceship brush guitar computer ladder pineapple unicorn jellyfish paper tiger pillow ice cream guitar rainbow shoes photograph dragon castle elephant volcano camera ball ocean rocket painting keyboard apple carpet calculator fish turtle cloud alarm clock suitcase flower painting turtle laptop ocean moon chair balloon helmet starfish dog submarine apple starfish tree carpet vase bottle blanket chair elephant ocean mirror mosquito bicycle microphone tree chair book ladder cake keyboard window hat clock keyhole hat planet kangaroo apple skateboard vase comet glasses clock flower apple mirror ocean ball hat tiger guitar notebook curtain book planet fish keyhole dragon ocean dinosaur vase ocean clock chair fish flower drumstone paper bridge hat keyboard apple mosquito castle comet mirror apple starfish apple paper curtain ladder clock alarm clock starfish dog ball photograph planet notebook computer paper vase turtle ice cream paper notebook tree suitcase painting pencil dragon ocean bridge starfish jellyfish castle cake alarm clock dog tree book ladder dolphin book vase carpet elephant moon vase hat cloud mirror carpet clock ocean chair apple hat clock apple hat ladder ocean comet turtle bottle castle mosquito computer planet dragon curtain computer computer laptop notebook ball rainbow tree flower ocean ladder bottle blanket hat mirror comet elephant carpet dog chair moon ladder laptop hat turtle vase skateboard carpet mosquito book starfish pillow vase turtle flower vase castle guitar rainbow blanket vase clock laptop skateboard ocean glasses vase apple unicorn clock book rocket elephant starfish ball dog ocean dragon vase fish paper moon vase skateboard ocean ball ladder ball vase elephant clock clock mirror ocean tree castle mosquito cloud vase cake tree fish tree vase fish tree fish elephant clock ocean vase hat laptop dog curtain starfish hat unicorn vase dolphin chair skateboard mosquito vase hat apple bridge vase ocean fish paper vase cake hat turtle clock rocket fish ocean tree castle tree paper vase ball paper chair book vase clock turtle ladder starfish bridge dolphin vase unicorn ocean hat apple rainbow vase apple guitar castle fish vase fish dog hat vase elephant chair tree paper ladder starfish vase ocean chair blanket turtle vase ocean apple hat ocean chair castle guitar ocean clock vase unicorn vase castle vase book vase tree vase hat paper dog vase starfish vase tree blanket vase clock dolphin vase ocean vase blanket vase fish ocean turtle tree hat fish vase guitar vase chair hat blanket ocean vase blanket vase hat tree ocean vase starfish vase blanket vase fish vase fish paper";
const wordsArray = words.split(" ");
const noofwords = wordsArray.length;
const time = 30000;

function randomWord() {
  const randomIndex = Math.floor(Math.random() * noofwords);
  return wordsArray[randomIndex];
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span></div>`;
}

function add(element, name) {
  element.className += " " + name;
}

function remove(element, name) {
  element.className = element.className.replace(name, "");
}

function start() {
  document.querySelector(".text").innerHTML = "";
  for (let i = 0; i < 100; i++) {
    document.querySelector(".text").innerHTML += formatWord(randomWord());
  }
  add(document.querySelector(".word"), "currentWord");
  add(document.querySelector(".letter"), "currentLetter");

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const currentWord = document.querySelector(".word.currentWord");
    const currentLetter = document.querySelector(".letter.currentLetter");
    const expected = currentLetter?.innerHTML || " ";
    const isLetter = key.length === 1 && key !== " ";
    const isSpace = key === " ";
    const isBackspace = key === "Backspace";
    const isFirstLetter = currentLetter === currentWord.firstChild;

    console.log({ key, expected });

    if (isLetter) {
      if (currentLetter) {
        add(currentLetter, key === expected ? "correct" : "incorrect");
        remove(currentLetter, "currentLetter");
        if (currentLetter.nextSibling) {
          add(currentLetter.nextSibling, "currentLetter");
        }
      }
    }

    if (isSpace) {
      if (expected !== " ") {
        const lettersToInvalidate = [
          ...document.querySelectorAll(
            ".word.currentWord .letter:not(.correct)"
          ),
        ];
        lettersToInvalidate.forEach((letter) => {
          add(letter, "incorrect");
        });
      }
      remove(currentWord, "currentWord");
      add(currentWord.nextSibling, "currentWord");
      if (currentLetter) {
        remove(currentLetter, "currentLetter");
      }
      add(currentWord.nextSibling.firstChild, "currentLetter");
    }

    if (isBackspace) {
      if (!currentLetter) {
        add(currentWord.lastChild, "currentLetter");
        remove(currentWord.lastChild, "incorrect");
        remove(currentWord.lastChild, "correct");
      }

      if (currentLetter && !isFirstLetter) {
        remove(currentLetter, "currentLetter");
        add(currentLetter.previousSibling, "currentLetter");
        remove(currentLetter.previousSibling, "incorrect");
        remove(currentLetter.previousSibling, "correct");
      }

      if (currentLetter && isFirstLetter) {
        remove(currentWord, "currentWord");
        add(currentWord.previousSibling, "currentWord");
        remove(currentLetter, "currentLetter");
        add(currentWord.previousSibling.lastChild, "currentLetter");
        remove(currentWord.previousSibling.lastChild, "incorrect");
        remove(currentWord.previousSibling.lastChild, "correct");
      }
    }
  });

  timer(30);
}

let started = false;

function newGame() {
  document.addEventListener("keydown", (e) => {
    if (!started && e.key === "Enter") {
      start();
      started = true;
      document.querySelector(".howtostart").style.visibility = "hidden";
    }
  });
}

let timerInterval;

function timer(duration) {
  let timeRemaining = duration;
  document.querySelector(".timer").innerHTML = timeRemaining;

  timerInterval = setInterval(() => {
    timeRemaining -= 1;
    document.querySelector(".timer").innerHTML = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert("Time's up! Game over.");
}

newGame();

document.querySelector(".restart-btn").addEventListener("click", (e) => {
  location.reload();
});
