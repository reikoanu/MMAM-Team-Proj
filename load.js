window.onload = () => {

  class Hero {
    constructor(name) {
      this.name = name;
    }
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //select one hero from dc and one hero from marvel
  function selectRandomHeroes() {
    var marvelSelected = false;
    var dcSelected = false;
    //hero ids
    var marvelHero = randomInteger(1, 731);

    var dcHero = randomInteger(1, 731);
    while (dcHero == marvelHero) {
      dcHero = randomInteger(1, 731);
    }

    loadDetails(marvelHero, 'Marvel Comics');
    loadDetails(dcHero, 'DC Comics');
    loadWinner(marvelHero, dcHero)

    //set hero ids
    /*     while (!marvelSelected || !dcSelected) {
          var rand = randomInteger(1, 731)
          var publisher = getPublisher(rand);
          if (publisher == "Marvel Comics" && !marvelSelected) {
            marvelHero = rand
            marvelSelected = true;
          }
          if (publisher == "DC Comics" && !dcSelected) {
            dcSelected = true;
            dcHero = rand;
          }
    
        } */
  }

  function getPublisher(heroid) {
    console.log('looking for publisher')
    fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}/biography`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.publisher)

        return data.publisher

      })
      .catch((error) => console.log(error));
  }

  selectRandomHeroes();
  document.getElementById("compareBtn").addEventListener("click", selectRandomHeroes);
}

function loadDetails(heroid, comic) {
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var divid = comic == "Marvel Comics" ? "marvel" : "dc"
      var statid = comic == "Marvel Comics" ? "marvel stats" : "dc stats"


      var div = document.getElementById(divid)

      var name = div.getElementsByTagName('h2')
      for (element in name) {
        name[element].innerHTML = data.name
      }
      console.log(data.name)

      var bio = div.getElementsByTagName('p')
      bio[0].innerHTML = "Occupation : " + data.work.occupation;
      bio[1].innerHTML = "Affiliations : " + data.connections["group-affiliation"]


      var powStatUL = document.getElementById(statid);
      console.log(powStatUL)
      var powStat = powStatUL.getElementsByTagName('li')

      var intelligence = data.powerstats.intelligence == 'null' ? 0 : data.powerstats.intelligence
      powStat[0].innerHTML = "Intelligence : " + intelligence;

      var strength = data.powerstats.strength == 'null' ? 0 : data.powerstats.strength
      powStat[1].innerHTML = "Strength : " + strength

      var speed = data.powerstats.speed == 'null' ? 0 : data.powerstats.speed
      powStat[2].innerHTML = "Speed : " + speed;

      var durability = data.powerstats.durability == 'null' ? 0 : data.powerstats.durability
      powStat[3].innerHTML = "Durability : " + durability

      var power = data.powerstats.power == 'null' ? 0 : data.powerstats.power
      powStat[4].innerHTML = "Power : " + power;

      var combat = data.powerstats.combat == 'null' ? 0 : data.powerstats.combat
      powStat[5].innerHTML = "Combat : " + combat;

      var img = div.getElementsByTagName('img');
      img[0].setAttribute('src', data.image.url)

      return data

    })
    .catch((error) => console.log(error, 'loadDetails error'));
}

function loadWinner(marvelHero, dcHero) {
  var windiv = document.getElementById('winner')
  winner = compareHeroes(marvelHero, dcHero)
    .then(function (winner) {
      if (winner == 0) {
        windiv.innerText = "It's a Tie!"
        return
      }
      console.log(winner)
      fetch(`https://superheroapi.com/api.php/ 3328323083897178/${winner}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('loading winner', data);
          windiv.innerText = data.name

        })
        .catch((error) => console.log(error));
    })

}