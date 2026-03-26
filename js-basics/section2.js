//1 . A Cricket Team has 11 players. Create a list with the names of all players.
const cricketPlayers = [];
for (let i = 1; i <= 11; i++) {
  cricketPlayers.push("Player " + i);
}
console.log("List of Cricket Players:",cricketPlayers);

// 2. Unfortunately, the first player had an injury. Remove him from the list of players.
cricketPlayers.shift();
console.log("After remove the first player",cricketPlayers);

// 3. Now, find out the number of players
console.log("Number Of players:", cricketPlayers.length);

//4. Add another player to the above list of players to make the count 11.
cricketPlayers.unshift("Another Player 1");
console.log("After adding new Player 1",cricketPlayers);

// 5. The cricket board has decided to take photographs of all players and so they would need the players list in sorted format.
cricketPlayers.sort();
console.log("Arranged players for photograph",cricketPlayers);

// 6. Display all the Players name and assign a random jersey number. For example. MS Dhoni-7
let jerseyNumbers = [];
console.log("Players with their jersey number")
cricketPlayers.forEach(player =>{
let isJerseyNumberGot = false;
while(!isJerseyNumberGot){
    const jerseyNumber = Math.floor(Math.random()*99)+1
    if(!jerseyNumbers.includes(jerseyNumber)){
        console.log(player+"-"+jerseyNumber);
        jerseyNumbers.push(jerseyNumber);
        isJerseyNumberGot = true;
    }
}
})

// 7. The cricket board wants to print the names of all players in uppercase and store it in a different location for printing jerseys. Do not modify the existing players list.
const uppercasePlayers = cricketPlayers.map(player =>{
    return player.toUpperCase();
})
console.log("Players with their uppercase Name",uppercasePlayers);
