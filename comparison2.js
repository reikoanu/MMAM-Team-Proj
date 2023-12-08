function compareHeroes(hero1Id, hero2Id) {
    const fetchHero = async (heroId) => {
      try {
        const response = await fetch(`https://superheroapi.com/api.php/3328323083897178/${heroId}`);
        const data = await response.json();
        // Convert null values to 0
        for (const stat in data.powerstats) {
          if (data.powerstats[stat] === null) {
            data.powerstats[stat] = 0;
          }
        }
        return data;
      } catch (error) {
        console.error(`Error fetching hero data for hero ${heroId}`, error);
      }
    };
  
    return Promise.all([fetchHero(hero1Id), fetchHero(hero2Id)])
      .then(([hero1, hero2]) => {
        console.log(hero1, hero2);
  
        // Calculate average powerstats for each hero
        const averagePowerstat = (hero) => {
          const totalStats = Object.values(hero.powerstats).reduce((acc, stat) => acc + stat, 0);
          return totalStats === 0 ? 0 : totalStats / 6; // Avoid division by zero
        };
  
        const averageHero1 = averagePowerstat(hero1);
        const averageHero2 = averagePowerstat(hero2);
  
        if (averageHero1 > averageHero2) {
          console.log(`${hero1.name} wins!`);
          return hero1Id;
        } else if (averageHero2 > averageHero1) {
          console.log(`${hero2.name} wins!`);
          return hero2Id;
        } else {
          console.log("It's a tie!");
          return 0; // 0 indicates a tie
        }
      })
      .catch((error) => {
        console.log('Error loading heroes', error);
      });
  }
  
  // Example usage:
  //compareHeroes(1, 2);  