'use strict';

for (let i = 0; i < 4; i++) {
    document.getElementById(`clas${i}`).addEventListener('mousedown', Target);
    document.getElementById(`clas${i}`).addEventListener('mouseover', ShowInfo);
    document.getElementById(`clas${i}`).addEventListener('mouseout', HideInfo);
}

function HideInfo(e) {
    SI.classList.add("HideObject");
}

function Target(e) {
    try {
        document.querySelector(".select").classList.remove("select");
    }
    catch {
    }
    e.target.classList.add("select");
    Class = Classes[e.target.id.substring(4)].Name;
    SelectClass();
}

document.getElementById('NameInput').addEventListener('input', getName);

function ResetAll() {
    for (let i = 0; i < PlayerStats.length; i++) {
        PlayerStats[i].VALUE = 4;
    }
    for (let i = 0; i < PlayerSkills.length; i++) {
        PlayerSkills[i].Level = 0;
    }
    PlayerMisc.STAT = 8;
    PlayerMisc.SKILL = 4;
    Initialize();
}

Initialize();

function Initialize() {
    document.getElementById('StatPoints').textContent = '';
    document.getElementById('Skills').textContent = '';
    document.getElementById('REM').textContent = `REM: ${PlayerMisc.STAT}`;
    document.getElementById('REM2').textContent = `RAM: ${PlayerMisc.SKILL}`;
    for (let i = 0; i < PlayerStats.length; i++) {
        let p = document.createElement('p');
        p.textContent = `${PlayerStats[i].NAME}: ${PlayerStats[i].VALUE} `;
        p.id = `stap${i}`;
        p.addEventListener('mouseover', ShowStat);
        p.addEventListener('mouseout', HideStat);
        if (PlayerStats[i].VALUE <= 98 && PlayerMisc.STAT > 0) {
            let b = document.createElement('button');
            b.textContent = '+';
            b.classList.add("PlusButton");
            b.id = `stat${i}`;
            b.addEventListener('mousedown', UpgradeStat);
            p.appendChild(b);
        }
        document.getElementById('StatPoints').appendChild(p);
    }
    for (let i = 0; i < PlayerSkills.length; i++) {
        let p = document.createElement('p');
        p.textContent = `${PlayerSkills[i].Name}: ${PlayerSkills[i].Level} `;
        p.id = `skip${i}`;
        p.addEventListener('mouseover', ShowStat2);
        p.addEventListener('mouseout', HideStat);
        if (PlayerSkills[i].Level <= 9 && PlayerMisc.SKILL > 0) {
            let b = document.createElement('button');
            b.textContent = '+';
            b.id = `skil${i}`;
            b.addEventListener('mousedown', UpgradeSkill);
            b.classList.add("PlusButton");
            p.appendChild(b);
        }
        document.getElementById('Skills').appendChild(p);
    }
    if (PlayerMisc.SKILL == 0 && PlayerMisc.SKILL == 0 && NAME !== "" && Class !== "") {
        document.getElementById('Finish').classList.remove("grayed");
        document.getElementById('Finish').classList.add("ready");
    } else {
        document.getElementById('Finish').classList.remove("ready");
        document.getElementById('Finish').classList.add("grayed");
    }
}

function UpgradeStat(e) {
    if (PlayerStats[e.target.id.substring(4)].VALUE <= 98 && PlayerMisc.STAT > 0) {
        let a = e.target.id.substring(4);
        PlayerStats[a].VALUE++;
        PlayerMisc.STAT--;
        Initialize();
    }
}

function UpgradeSkill(e) {
    let a = e.target.id.substring(4);
    if (PlayerSkills[a].Level <= 9 && PlayerMisc.SKILL > 0) {
        let needs;
        for (let i = 0; i < PlayerStats.length; i++) {
            if (PlayerStats[i].NAME == PlayerSkills[a].Needs) {
                needs = PlayerStats[i].VALUE;
            }
        }
        if (PlayerSkills[a].Level < needs / 4) {
            PlayerSkills[a].Level++;
            PlayerMisc.SKILL--;
            Initialize();
        }
    }
}

function SelectClass() {
    ResetAll();
    if (Class == "Rogue") {
        PlayerStats[1].VALUE += 4;
        PlayerSkills[0].Level += 3;
        PlayerSkills[4].Level += 2;
        PlayerSkills[5].Level += 2;
        PlayerSkills[11].Level += 3;
    } else if (Class == "Warrior") {
        PlayerStats[0].VALUE += 4;
        PlayerStats[2].VALUE += 4;
        PlayerSkills[1].Level += 3;
        PlayerSkills[2].Level += 3;
        PlayerSkills[3].Level += 3;
    } else if (Class == "Ranger") {
        PlayerStats[1].VALUE += 4;
        PlayerStats[3].VALUE += 4;
        PlayerSkills[1].Level += 3;
        PlayerSkills[4].Level += 3;
        PlayerSkills[5].Level += 3;
    } else if (Class == "Mage") {
        PlayerStats[0].VALUE += 1;
        PlayerStats[1].VALUE += 1;
        PlayerStats[2].VALUE += 1;
        PlayerStats[3].VALUE += 1;
        PlayerSkills[9].Level += 3;
        PlayerSkills[10].Level += 3;
        PlayerSkills[8].Level += 3;
        PlayerSkills[6].Level += 2;
    }
    Initialize();
}

function ShowStat(e) {
    document.getElementById('Info1').textContent = PlayerStats[e.target.id.substring(4)].DESC;
}

function ShowStat2(e) {
    document.getElementById('Info1').textContent = PlayerSkills[e.target.id.substring(4)].Desc;
}

function HideStat() {
    document.getElementById('Info1').textContent = '';
}


function getName() {
    NAME = document.getElementById('NameInput').value;
    Initialize();
}