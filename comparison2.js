function compareHeroes(hero1Id, hero2Id) {
    const hero1 = fetch(`https://superheroapi.com/api.php/ 3328323083897178/${hero1Id}`)
        .then((response) => response.json())
    const hero2 = fetch(`https://superheroapi.com/api.php/ 3328323083897178/${hero2Id}`)
        .then((response) => response.json())

    //fetch hero 1

    return Promise.all([hero1, hero2])
        .then(([hero1, hero2]) => {
            console.log(hero1, hero2)

            if (hero1.powerstats.combat > hero2.powerstats.combat) {
                console.log(`${hero1.name} wins!`);
                return hero1Id
            } else if (hero2.powerstats.combat > hero1.powerstats.combat) {
                console.log(`${hero2.name} wins!`);
                return hero2Id
            } else {
                console.log('It\'s a tie!');
                //0 doesn't exist as an id, indicates that it's a tie
                return 0
            }
        })
        .catch(error => {
            console.log('error loading heroes', error)
        })

    return

}