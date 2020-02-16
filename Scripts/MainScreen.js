'use strict';

setInterval(function() {
    UpdateBars();
}, 50)


document.getElementById('Equip').addEventListener('mousedown', EquipItem);
document.getElementById('UnEquip').addEventListener('mousedown', UnEquipItem);

// Character Creation happens once at game start.
function CreateChar() {
    document.getElementById('CreateCharacter').style.display = 'none';
    document.getElementById('MainScreen').style.display = 'block';
    CHARS.addEventListener("mouseover", GeneralPopUp);
    document.getElementById('WholeInv').style.display = 'block';
    CreateCharacterStats();
    CreateInvItems();
    SetPName();
    DrawMap();
}

function SetPName() {
    let ND = document.getElementById('NameDisplay');
    ND.textContent = NAME;
    ND.classList.add(Class);
}

function UpdateBars() {
    document.getElementById('EXPbarProg').style.width = PlayerCombatStats.exp / PlayerCombatStats.expneed * (document.getElementById('EXPbar').offsetWidth-10) + 'px';
    document.getElementById('STAbarProg').style.width = PlayerCombatStats.STA / PlayerCombatStats.maxSTA * (document.getElementById('STAbar').offsetWidth-10) + 'px';
    document.getElementById('HPbarProg').style.width = PlayerCombatStats.HP / PlayerCombatStats.maxHP * (document.getElementById('HPbar').offsetWidth-10) + 'px';
    document.getElementById('CombatStaminaBarFill').style.width = PlayerCombatStats.STA / PlayerCombatStats.maxSTA * (document.getElementById('CombatStaminaBar').offsetWidth-0) + 'px';
    document.getElementById('CombatHealthBarFill').style.width = PlayerCombatStats.HP / PlayerCombatStats.maxHP * (document.getElementById('CombatHealthBar').offsetWidth-0) + 'px';
    document.getElementById('CombatManaBarFill').style.width = PlayerCombatStats.MP / PlayerCombatStats.maxMP * (document.getElementById('CombatManaBar').offsetWidth-0) + 'px';
    if(PlayerCombatStats.HP < 0) PlayerCombatStats.HP = 0;
    if(PlayerCombatStats.HP == 0) document.getElementById('CombatHealthBarFill').style.boxShadow = "0 0 0px 0px rgb(7, 161, 28)";
    else document.getElementById('CombatHealthBarFill').style.boxShadow = null;
    if(PlayerCombatStats.STA == 0) document.getElementById('CombatStaminaBarFill').style.boxShadow = "0 0 0px 0px rgb(7, 161, 28)";
    else document.getElementById('CombatStaminaBarFill').style.boxShadow = null;
    if(PlayerCombatStats.MP == 0) document.getElementById('CombatManaBarFill').style.boxShadow = "0 0 0px 0px rgb(7, 161, 28)";
    else document.getElementById('CombatManaBarFill').style.boxShadow = null;
    PlayerCombatStats.maxHP = PlayerStats[2].VALUE * 50 + 50;
    PlayerCombatStats.maxSTA = PlayerStats[3].VALUE * 10 + 100;
    if(PlayerCombatStats.HP > PlayerCombatStats.maxHP) PlayerCombatStats.HP = PlayerCombatStats.maxHP;
    if(PlayerCombatStats.STA > PlayerCombatStats.maxSTA) PlayerCombatStats.STA = PlayerCombatStats.maxSTA;
    if(PlayerCombatStats.MP > PlayerCombatStats.maxMP) PlayerCombatStats.MP = PlayerCombatStats.maxMP;
    document.getElementById('CombatHealthText').textContent = `${PlayerCombatStats.HP}/${PlayerCombatStats.maxHP} HP`
    document.getElementById('CombatStaminaText').textContent = `${PlayerCombatStats.STA}/${PlayerCombatStats.maxSTA} STA`
    document.getElementById('CombatManaText').textContent = `${PlayerCombatStats.MP}/${PlayerCombatStats.maxMP} MP`
    if(WPN1.length !== 0 || (WPN2.length !== 0 && WPN2[0].ItemType != "Shield")) {
        PlayerCombatTable[9].val = PlayerCombatTable[5].val + PlayerCombatTable[6].val + PlayerCombatTable[7].val  + PlayerCombatTable[8].val;
    }
    document.getElementById('HPbarText').textContent = `HP: ${PlayerCombatStats.HP}/${PlayerCombatStats.maxHP}`;
    document.getElementById('STAbarText').textContent = `STA: ${PlayerCombatStats.STA}/${PlayerCombatStats.maxSTA}`;
    document.getElementById('EXPbarText').textContent = `EXP: ${PlayerCombatStats.exp}/${PlayerCombatStats.expneed}`;
    document.getElementById('ClassLevel').textContent = `Lvl ${PlayerCombatStats.level} ${Class}`;
    PlayerCombatStats.expneed = PlayerCombatStats.level < 80 ? PlayerCombatStats.expneed = Math.floor(PlayerCombatStats.level  * 100 * 1.08) : PlayerCombatStats.expneed;
    PlayerCombatStats.expneed = PlayerCombatStats.level >= 80 && PlayerCombatStats.level < 90 ? PlayerCombatStats.expneed = Math.floor(PlayerCombatStats.level  * 100 * 1.86) : PlayerCombatStats.expneed;
    PlayerCombatStats.expneed = PlayerCombatStats.level >= 90 && PlayerCombatStats.level < 100  ? PlayerCombatStats.expneed = Math.floor(PlayerCombatStats.level  * 100 * 3.29) : PlayerCombatStats.expneed;
    PlayerCombatStats.expneed = PlayerCombatStats.level >= 100 && PlayerCombatStats.level < 110  ? PlayerCombatStats.expneed = Math.floor(PlayerCombatStats.level  * 100 * 8.41) : PlayerCombatStats.expneed;
    PlayerCombatStats.expneed = PlayerCombatStats.level >= 110 ? PlayerCombatStats.expneed = Math.floor(PlayerCombatStats.level  * 100 * 23.78) : PlayerCombatStats.expneed;
    CreateCharacterStats();
}


function CreateCharacterStats() {
    CHARS.textContent = '';
    for(let i = 0; i<PlayerCombatTable.length; i++) {
        let p = document.createElement('p');
        p.textContent = `${PlayerCombatTable[i].Name}: ${PlayerCombatTable[i].val}`;
        p.classList.add("CharTextStat");
        p.id = `CStat${i}`;
        CHARS.appendChild(p);
    }
}

let AreaNameCon = "Fields";

function DrawMap() {
    document.getElementById('AreaNameTEXT').textContent = `Area: ${AreaNameCon}`;
    Area = Fields;
    document.getElementById('MainMap').textContent = '';
    for(let i = 0; i<400; i++) {
        let d = document.createElement('div');
        d.id = `map${i}`;
        d.classList.add("map");
        for(let b = 0; b<Area.length; b++) {
            if(i == Area[b].LOC && i !== loc) {
                d.classList.add(Area[b].BG);
            }
        }
        if(i == loc) {
            d.classList.add("mapLoc")
        }
        document.getElementById('MainMap').appendChild(d);
    }
}

window.addEventListener('keydown', Move);

function Move(e) {
    if((e.code == "KeyS" || e.code == "ArrowDown") && loc < 376) {
        loc += 20;
        GenBattle();
        DrawMap();
    } else if((e.code == "KeyW" || e.code == "ArrowUp") && loc > 19) {
        loc -= 20;
        GenBattle();
        DrawMap();
    } else if((e.code == "KeyA" || e.code == "ArrowLeft") && loc > 0) {
        loc -= 1;
        GenBattle();
        DrawMap();
    } else if((e.code == "KeyD" || e.code == "ArrowRight") && loc < 399) {
        loc += 1;
        GenBattle();
        DrawMap();
    }
    updateSit();
}

function GenBattle() {
    if(Math.random() < 2 / 100) {
        RandomizeEnemy();
    }
}


function updateSit() {
    if(loc == spec) {
        console.log('You found village!');
    }
}

function StartFight() {
    document.getElementById('MainScreen').style.display = 'none';
    document.getElementById('Combat').style.display = 'block';
    document.getElementById('WholeInv').style.display = 'none';
    GetEnemyStats();
}

console.log('%c YEET', 'color: orange;');

function RandomizeEnemy() {
    document.getElementById('CombatActionTexts').textContent = '';
    ManageMusic();
    sortItemsCombat();
    PlayerCombatStats.HP = PlayerCombatStats.maxHP;
    PlayerCombatStats.STA = PlayerCombatStats.maxSTA;
    PlayerCombatStats.MP = PlayerCombatStats.maxMP;
    SelectedEnemy = Math.floor(Math.random() * (3 - 0) + 0);
    EqMin = 0;
    EqMax = 2;
    StartFight();
}
