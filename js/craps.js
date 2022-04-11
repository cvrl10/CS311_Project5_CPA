"use strict";

const image = ["img\\1.png",
            "img\\2.png",
            "img\\3.png",
            "img\\4.png",
            "img\\5.png",
            "img\\6.png"];

const images = document.querySelectorAll("img");
let balance = 100.00;
let firstRoll = true;
let myPoint;

function calculate_score()
{
    let wager = document.getElementById("textbox");
    let status = document.getElementById("status");
    
    if ((balance-parseFloat(wager.value)) < 0 || balance === 0)
    {
        status.style.display = "block";
        status.textContent = "You don't have enough money in your balance";
        return;
    }
        
    let label = document.getElementById("balance"); 
    let roll1 = Math.ceil(Math.random()*6);
    let roll2 = Math.ceil(Math.random()*6);
    let total = roll1 + roll2;
    

    images[0].setAttribute("src", image[roll1-1]);
    images[1].setAttribute("src", image[roll2-1]);

    if (firstRoll)
    {
        status.style.display = "block";
        switch(total)
        {
            case 2:
            case 3:
            case 12:
                balance -= parseFloat(wager.value);
                label.textContent = "Balance: $"+balance.toFixed(2);
                status.textContent = "You lose!"
                break;
            case 7:
            case 11:
                balance += parseFloat(wager.value);
                label.textContent = "Balance: $"+balance.toFixed(2);
                status.textContent = "You win!"
                break;
            default:
                myPoint = total;
                firstRoll = false;
                status.textContent = "Point is "+myPoint;
                wager.readOnly = true;
        }
    }
    else
    {
        if (total === myPoint)
        {
            balance += parseFloat(wager.value);
            label.textContent = "Balance: $"+balance.toFixed(2);
            status.textContent = "You win!";
            firstRoll = true;
            wager.readOnly = false;
        }
        else if (total === 7)
        {
            balance -= parseFloat(wager.value);
            label.textContent = "Balance: $"+balance.toFixed(2);
            status.textContent = "You lose!";
            firstRoll = true;
            wager.readOnly = false;
        }
    }
}