let counter = 2;
let counter2 = 2;
let counter3 = 2;
let counter4 = 2;
let counter5 = 2;

document.getElementById("hamburger-menu").onclick = function()
{
    
    if(counter % 2 == 0) document.getElementById("nav-links").style.display = "block";
    else document.getElementById("nav-links").style.display = "none";
    counter++
}

document.getElementById("admnstr").onclick = function()
{
    
    if(counter2 % 2 == 0) document.getElementById("admnstr__list").style.display = "block";
    else document.getElementById("admnstr__list").style.display = "none";
    counter2++
}
document.getElementById("aboutUs").onclick = function()
{
    
    if(counter3 % 2 == 0) document.getElementById("aboutUs__list").style.display = "block";
    else document.getElementById("aboutUs__list").style.display = "none";
    counter3++
}

document.getElementById("admnstr_desct").onclick = function()
{
    
    if(counter4 % 2 == 0) document.getElementById("admnstr__desct-list").style.display = "block";
    else document.getElementById("admnstr__desct-list").style.display = "none";
    counter4++
    if(document.getElementById("aboutUs__desct-list").style.display.valueOf() == "block")
    {
        document.getElementById("aboutUs__desct-list").style.display = "none";
        counter5--;
    }
}
document.getElementById("aboutUs__desct").onclick = function()
{
    
    if(counter5 % 2 == 0) document.getElementById("aboutUs__desct-list").style.display = "block";
    else document.getElementById("aboutUs__desct-list").style.display = "none";
    counter5++
    if(document.getElementById("admnstr__desct-list").style.display.valueOf() == "block")
    {
        document.getElementById("admnstr__desct-list").style.display = "none";
        counter4--;
    }
   
   
}




