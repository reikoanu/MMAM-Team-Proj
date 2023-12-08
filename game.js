window.onload = () => {

  var marvelHero = randomInteger(1, 731);
  var dcHero = randomInteger(1, 731);

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //select one hero from dc and one hero from marvel
  function selectRandomHeroes() {

    //hero ids
    marvelHero = randomInteger(1, 731);

    dcHero = randomInteger(1, 731);
    while (dcHero == marvelHero) {
      dcHero = randomInteger(1, 731);
    }

    loadDetails(marvelHero, 'Marvel Comics');
    loadDetails(dcHero, 'DC Comics');

    //reset correct/wrong text
    var windiv = document.getElementById('result').innerText = ""

  }

  function loadWinner(button) {
    console.log(button + ' button pressed')
    var windiv = document.getElementById('result')
    winner = compareHeroes(marvelHero, dcHero)
      .then(function (winner) {
        if (winner == 0) {
          if (button == winner) {
            windiv.innerText = "Correct!"
          }
          else {
            windiv.innerText = "Wrong!"
          }
        }
        console.log(winner)
        fetch(`https://superheroapi.com/api.php/ 3328323083897178/${winner}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('loading winner', data);
            if (button == winner){
              windiv.innerText = "Correct!"
            }
            else {
              windiv.innerText = "Wrong!"
            }
  
          })
          .catch((error) => console.log(error));
      })
  
  }

  selectRandomHeroes();
  document.getElementById("reset").addEventListener("click", selectRandomHeroes);


  var dcBtn = document.getElementById("dcBtn")
  dcBtn.addEventListener("click", function() {loadWinner(dcBtn.getAttribute('name'))}, true);
  var marvelBtn = document.getElementById("marvelBtn")
  marvelBtn.addEventListener("click",  function() {loadWinner(marvelBtn.getAttribute('name'))}, false);
  var marvelTie = document.getElementById("marvelTie")
  marvelTie.addEventListener("click",  function() {loadWinner(marvelTie.getAttribute('name'))}, false);
  var dcTie = document.getElementById("dcTie")
  dcTie.addEventListener("click",  function() {loadWinner(dcTie.getAttribute('name'))}, false);


}

function loadDetails(heroid, comic) {
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var divid = comic == "Marvel Comics" ? "marvel" : "dc"

      var div = document.getElementById(divid)

      var name = div.getElementsByTagName('h2')
      for (element in name) {
        name[element].innerHTML = data.name
      }
      console.log(data.name)

      var bio = div.getElementsByTagName('p')
      bio[0].innerHTML = "Name : " + data.biography['full-name'];
      bio[1].innerHTML = "Occupation : " + data.work.occupation;
      bio[2].innerHTML = "Affiliations : " + data.connections["group-affiliation"]

      var img = div.getElementsByTagName('img');
      img[0].setAttribute('src', data.image.url)

      var btn = div.getElementsByTagName('button');
      btn[0].setAttribute('name', heroid)
      console.log(btn[0])

      
      return data

    })
    .catch((error) => console.log(error, 'loadDetails error'));
}

