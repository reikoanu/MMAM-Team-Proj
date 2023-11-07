const apiKey = 'YOUR_API_KEY'; // Replace with SuperHeroAPI key
const hero1Id = 1; // Used to store the ID of the first hero you want to compare
const hero2Id = 2; // Used to store the ID of the second hero you want to compare

//Function to accept user input for Hero IDs would go here

// Function to fetch hero data from the SuperHeroAPI
async function fetchHeroData(heroId) {
  try {
    const response = await fetch(`https://superheroapi.com/api/${apiKey}/${heroId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hero data', error);
  }
}

// Function to compare two heroes (Will be changed according to our project's specifications)
async function compareHeroes() {
  const hero1 = await fetchHeroData(hero1Id);
  const hero2 = await fetchHeroData(hero2Id);

  if (hero1.powerstats.combat > hero2.powerstats.combat) {
    console.log(`${hero1.name} wins!`);
  } else if (hero2.powerstats.combat > hero1.powerstats.combat) {
    console.log(`${hero2.name} wins!`);
  } else {
    console.log('It\'s a tie!');
  }
}

compareHeroes();
