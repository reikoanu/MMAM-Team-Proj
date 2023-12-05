window.onload = () =>  {
	
  // 	jQuery.ajaxPrefilter(function(options) {
  //     if (options.crossDomain && jQuery.support.cors) {
  //         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  //     }
  // });
    
  //   function askSuperheroApi() {
  //   let query = $("#one").val().toLowerCase();
    
  //   fetch(`https://superheroapi.com/api/10219361869334047/search/${query}`)
  //     .then(res => res.json())
  //     .then((out) => {
  //      console.log(out)
  //      name = out.results[0].name;
  //      pic = out.results[0].image.url;
      
  //      document.getElementById("photo").src = pic;
  //      document.getElementById("name").innerHTML = name;
  //   })
  //   }
    
  //       document.getElementById('submit').addEventListener("click", function() {
        
  //       askSuperheroApi();
  //     })
  // }

  function loadDetails(heroid) {
    fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        var details = document.getElementById('details');
        details.setAttribute("style","background-color:rgba(0,0,0,0.8);")
  
        var img = document.getElementById("img");
        img.setAttribute("src", data.image.url);
  
        var name = document.getElementById("name");
        name.innerHTML = data.name;
  
        var bio = document.getElementById("bio");
        bio.innerHTML =   " Relatives :" +  data.connections.relatives ;
  
          var good = document.getElementById("good");
          good.innerText = "Nature :" + data.biography.alignment;
  
        var base = document.getElementById("base");
        base.innerHTML = "Work :" + data.work.base;
  
        var occ = document.getElementById("occupation");
        occ.innerHTML = "Occupation :" + data.work.occupation;
  
        var powestat = document.getElementById("powerstats");
        powestat.innerHTML =
          "Intelligence : " +
          data.powerstats.intelligence +
          ", Combat : " +
          data.powerstats.combat +
          ", Power : " +
          data.powerstats.power +
          ", Speed : " +
          data.powerstats.speed +
          ", Strength : " +
          data.powerstats.strength;
  
          var favv= document.getElementById("favbtn");
          favv.setAttribute("style","display:flex;");
          favv.setAttribute('value',data.id)
  
      })
      .catch((error) => console.log(error));
  }
}