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
        this.fuelMax = fuel

    }
    start(planet) {
        let fuelNeed = planet.distance * 20;

        if (!planet instanceof Planet) {
            console.log("Can't go to something that is not a planet")
            return;
        }
        if (this.dockedPlanet === planet) {
            console.log(" You are already on this planet")
            return;
        }
        if (this.isDamaged != false || this.isDestroyed != false || this.crew == 0 || this.fuel < fuelNeed) {
            this.dockedPlanet.shipsDocked.pop();
            console.log(" Something is wrong with your ship . I can't start the ship ")
            return
        }
        else if (this.isWorking != false) {
            console.log("can't start the ship")
            return
        }
        console.log(this.name + " ready to fly")
        let that = this;
        setTimeout(function () {
            console.log(`${that.name} Started flying`);
            that.dock(planet)
            
        }, ((planet.distance * 1000) / this.speed));


    }
    stats(ship) {
        console.log("------- SHIP STATS -------");
        console.log(`CREW: ${this.crew}`);
        console.log(`FUEL: ${this.fuel}/${this.fuelMax}`);
        console.log(`HULL: ${this.hull}/${this.hullMax}`);
        console.log(`CREDITS: ${this.credits}`);
    }

    dock(planet) {
        let fuelNeed = planet.distance * 20;
        let dockedShips = planet.shipsDocked
        let that = this;
        setTimeout(() => {

            console.log("The Ship started docking")
            dockedShips.push(this);
            that.isWorking = false;
            that.dockedPlanet = planet
            console.log('The Ship is Docked');
            that.fuel = that.fuel - fuelNeed
            that.crew = that.crew - 1;
            that.hull = that.hull - 100;
        }, 2000);


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
            console.log("You can't repair it ")
            return;
        }
        if (ship.hull === ship.hullMax) {
            console.log(" You can't repair it")
            return;
        }
        if (ship.credits < price.repair) {
            console.log(" You can't repair it")
            return
        }
        if (ship.hull < ship.hullMax) {
            ship.hull = ship.hullMax;
            ship.credits = ship.credits - price.repair;
            ship.isDamaged = false;
            console.log(`${ship.name} is repaired`)
        }
    }

    refuel(ship) {
        if (!ship instanceof Starship) {
            console.log(" This is not a Ship ...You can't refuel it ")
            return;
        }
// errorr!!!!!!!!!!!!!
        if(ship.dockedPlanet.name !== this.name){
            console.log(`You are not docked on this planet!`);
            return;
        }

        if (ship.fuel === ship.fuelMax) {
            console.log("You can't refuel it")
            return;
        }
        if (ship.credits < price.fuel) {
            console.log("You can't refuel it")
            return;
        }
        if (ship.fuel < ship.fuelMax) {
            ship.fuel = ship.fuelMax;
            ship.credits = ship.credits - price.fuel
            console.log("Ship fuel is full")
        }
    }
    hireCrewMember(ship) {
        if (!ship instanceof Starship) {
            console.log("you can't add a crew member")
            return;
        }
        if (!ship.dockedPlanet instanceof Planet) {
            console.log("you can't add a crew member")
            return;
        }
        if (ship.credits < price.crew) {
            console.log("you can't add a crew member")
            return;
        }
        if (ship.credits >= price.crew) {
            console.log("New Member in the Ship")
            ship.credits = ship.credits - price.crew
            ship.crew = ship.crew + 1
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
let currentShip;
$("#btnCrushinator").on("click", () => {
    currentShip = crushinator
    $(".containerShips").hide();
    $(".containerPlanets").show();
    $("H1").hide();
    $("#title2").show()

})
$("#btnStarFighter").on("click", () => {
    currentShip = starFighter
    $(".containerShips").hide();
    $(".containerPlanets").show();
    $("H1").hide();
    $("#title2").show()
})
$("#btnScouter").on("click", () => {
    currentShip = scouter
    $(".containerShips").hide();
    $(".containerPlanets").show();
    $("H1").hide();
    $("#title2").show()
})

$(".backToShips").on("click", () => {
    $(".containerShips").show();
    $(".containerPlanets").hide();
})

let chosenPlanet;
$("#btnB18-1").on("click", () => {
    chosenPlanet = b181
    currentShip.start(chosenPlanet);
})
$("#btnDextriaey").on("click", () => {
    chosenPlanet = dextriaey
    currentShip.start(chosenPlanet)
})
$("#btnMagmus").on("click", () => {
    chosenPlanet = magmus
    currentShip.start(chosenPlanet)
})
$("#btnR7").on("click", () => {
  
    chosenPlanet = r7
    currentShip.start(chosenPlanet)
})
$("#btnRubicon9").on("click", () => {
    chosenPlanet = rubicon9
    currentShip.start(chosenPlanet)
})

function repairShip(currentShip) {

    chosenPlanet.repair(currentShip)
}
function hireMember(currentShip) {
    chosenPlanet.hireCrewMember(currentShip)
}
function refuelShip(currentShip) {
    chosenPlanet.refuel(currentShip)
}

$("#repairB18-1").on("click", () => {
    repairShip(currentShip)
})
$("#repairDextriaey").on("click", () => {
    repairShip(currentShip)
})
$("#repairMagmus").on("click", () => {
    repairShip(currentShip)
})
$("#repairR7").on("click", () => {
    repairShip(currentShip)
})
$("#repairRubicon9").on("click", () => {
    repairShip(currentShip)
})

$("#refuelB18-1").on("click", () => {
    refuelShip(currentShip)
})
$("#refuelDextriaey").on("click", () => {
    refuelShip(currentShip)
})
$("#refuelMagmus").on("click", () => {
    refuelShip(currentShip)
})
$("#refuelR7").on("click", () => {
    refuelShip(currentShip)
})
$("#refuelRubicon9").on("click", () => {
    refuelShip(currentShip)
})

$("#hireRubicon9").on("click", () => {
    hireMember(currentShip)
})
$("#hireR7").on("click", () => {
    hireMember(currentShip)
})
$("#hireMagmus").on("click", () => {
    hireMember(currentShip)
})
$("#hireDextriaey").on("click", () => {
    hireMember(currentShip)
})
$("#hireB18-1").on("click", () => {
    hireMember(currentShip)
})

function getStats(currentShip) {
    currentShip.stats(currentShip)

}




$("#statsRubicon9").on("click", () => {
    getStats(currentShip)
})

$("#statsR7").on("click", () => {
    getStats(currentShip)
})

$("#statsMagmus").on("click", () => {
    getStats(currentShip)
})

$("#statsDextriaey").on("click", () => {
    getStats(currentShip)
})

$("#statsB18-1").on("click", () => {
    getStats(currentShip)
})

