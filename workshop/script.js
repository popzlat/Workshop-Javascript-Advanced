class Starship {
    constructor(name, crew, fuel, hullMax, speed, img) {
        this.name = name;
        this.crew = crew;
        this.fuel = fuel;
        this.hullMax = hullMax;
        this.hull = hullMax;
        this.speed = speed;
        this.credits = 500;
        this.img = img;
        this.isWorking = false;
        this.isDamaged = false;
        this.isDestroyed = false;
        this.dockedPlanet = null;

    }
    start(planet) {
        let fuelNeed = planet.distance * 20;

        if (!planet instanceof Planet) {
            console.log("Can't go to something that is not a planet")
            return;
        }
        if (this.dockedPlanet === planet) {
            console.log(" You can't go to this planet ")
            return;
        }
        if (this.isDamaged != false || this.isDestroyed != false || this.crew == 0 || this.fuel < fuelNeed) {
            this.dockedPlanet.shipsDocked.pop();
            console.log("can't start the ship")
        }
        else if (this.isWorking != false) {
            console.log("can't start the ship")
        }

        let that = this;
        setTimeout(function () {

            console.log('Started working');
            that.dock(planet)
            console.log('Finished working');
        }, ((planet.distance * 1000) / this.speed));

    }

    dock(planet) {

        setTimeout(() => {
            console.log("The Ship started docking")
            planet.shipsDocked.push(this);
            this.isWorking = false;
            this.dockedPlanet = planet
            console.log('Docked');
        }, 2000)


    }
}



let price = {
    fuel: 50,
    repair: 60,
    crew: 80
}
class Planet {
    constructor(name, size, population, distance, development, img) {
        this.name = name;
        this.size = size;
        this.population = population;
        this.distance = distance;
        this.development = development;
        this.img = img;
        this.shipsDocked = [];

    }
    getMarketPrice(price) {
        return (this.development * price) / Math.floor(this.population / this.size)
    }
    repair(ship) {
        if (!ship instanceof Starship) {
            console.log(" This is not a Ship ...You can't repair it ")
            return;
        }
        if (!ship.dockedPlanet instanceof Planet) {
            console.log("You can't repair it")
        }
        if (ship.hullMax == ship.hull) {
            console.log(" You can't repair it")
        }
        if (ship.credits < price.repair) {
            console.log(" You can't repair it")
        }
        //When the ship is repaired it's hull is changed to maximum value, 
        //the price is subtracted from the ship credits and the property isDamaged is set to false

    }

    refuel(ship) {
        if (!ship instanceof Starship) {
            console.log(" This is not a Ship ...You can't refuel it ")
            return;
        }

        if (!ship.dockedPlanet instanceof Planet) {
            console.log("You can't refuel it")
        }
        //if the fuel is already at max capacity you can't refuel it
        if (ship.credits < price.fuel) {
            console.log("You can't refuel it")
        }
        //When the ship is refueled it's fuel is changed to maximum value and the price is subtracted from the ship credits
    }
    hireCrewMember(ship) {
        if (!ship instanceof Starship) {
            console.log("you can't add a crew member")
        }
        if (!ship.dockedPlanet instanceof Planet) {
            console.log("you can't add a crew member")
        }
        if (ship.credits < price.crew) {
            console.log("you can't add a crew member")
        }

    }
}

let rubicon9 = new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png");
let r7 = new Planet("R7", 120000, 4000000, 7, 3, "https://github.com/sedc-codecademy/sedc7-04-ajs/blob/master/g3/Workshop/Workshop/img/R7.png?raw=true")
let magmus = new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png")
let dextriaey = new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png")
let b181 = new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")

let planets = [rubicon9, r7, magmus, dextriaey, b181]


let starFighter = new Starship("StarFighter", 3, 380, 500, 0.5, "img/StarFighter.png")
let crushinator = new Starship("Crushinator", 5, 540, 400, 0.2, "https://github.com/sedc-codecademy/sedc7-04-ajs/blob/master/g3/Workshop/Workshop/img/Crushinator.png")
let scouter = new Starship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png")

let ships = [starFighter, crushinator, scouter]


$(".btn").on("click",()=>{
        $(".containerShips").hide();
        $(".containerPlanets").show();
        $("H1").hide();
        $("#title2").show()
})
$(".backToShips").on("click",()=>{
    $(".containerShips").show();
    $(".containerPlanets").hide();
})

