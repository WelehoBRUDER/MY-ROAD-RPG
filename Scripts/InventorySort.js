'use strict';

function CreateInvItems() {
    let a = document.getElementById('inventory');
    a.textContent = '';
    a.addEventListener("mouseover", InventoryInfo);
    for (let i = 0; i < Inventory.length; i++) {
        let d = document.createElement('div');
        d.classList.add("Item");
        d.classList.add(`${Inventory[i].Grade}C`);
        a.appendChild(d);
        let img = document.createElement('img');
        img.src = Inventory[i].IMGSRC;
        if(Inventory[i].Type == "Consumable") img.classList.add("ConsumeClass");
        else img.classList.add("ItemClass");
        d.appendChild(img);
        d.id = `Item${i}`;
        d.setAttribute("TAULU", "Inventory");
        let am = document.createElement('p');
        if(Inventory[i].Amount > 1) am.textContent = Inventory[i].Amount;
        if(Inventory[i].Type == "Consumable") am.classList.add("AmountTextCon");
        else am.classList.add("AmountText");
        d.appendChild(am);
        d.addEventListener('mousedown', TargetItem);
    }
}

function TargetItem(e) {
    try {
        document.querySelector(".select").classList.remove("select");
    }
    catch {
    }
    e.target.classList.add("select");
    ItemSelect = e.target.id.substring(4);
}

function TargetEquippedItem(e) {
    try {
        document.querySelector(".select").classList.remove("select");
    }
    catch {
    }
    e.target.classList.add("select");
    ItemSelect = eval(e.target.getAttribute("TAULU"));
}

function InitAlte() { // WARNING: ONLY TO BE USED FOR TESTING, DO NOT RUN DURING REGULAR GAMEPLAY!
    for (let i = 0; i < 3; i++) {
        for (let i = 0; i < Inventory.length; i++) {
            ItemSelect = i;
            console.log(`Running for the ${i} time`);
            EquipItem();
        }
    }
    GetEnemyStats();
}

// THIS IS A VERY RIGID FUNCTION. DO NOT TOUCH!
function EquipItem(e) {
    if (ItemSelect == "") {
        try {
            document.querySelector(".select").classList.remove("select");
        }
        catch {
        }
        return;
    }
    if (Inventory[ItemSelect].ItemType == "Weapon") {
        if (WPN1.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                WPN1.push(Inventory[ItemSelect]);
                PlayerCombatTable[7].val = CalcScale();
                DmgType = Inventory[ItemSelect].DMGType;
                Inventory.splice(ItemSelect, 1);
                PlayerCombatTable[5].val = WPN1[0].Damage;
            }
        } else if (WPN2.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                WPN2.push(Inventory[ItemSelect]);
                PlayerCombatTable[8].val = CalcScale();
                DmgType = Inventory[ItemSelect].DMGType;
                Inventory.splice(ItemSelect, 1);
                PlayerCombatTable[6].val = WPN2[0].Damage;
            }
        } else {
            return;
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Torso") {
        if (TORSO.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                TORSO.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Head") {
        if (HEAD.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                HEAD.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Legs") {
        if (LEGS.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                LEGS.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Gloves") {
        if (GLOVES.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                GLOVES.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Feet") {
        if (FEET.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq) {
                FEET.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Shield") {
        if (WPN2.length == 0) {
            if (PlayerStats[0].VALUE >= Inventory[ItemSelect].STRreq && PlayerStats[1].VALUE >= Inventory[ItemSelect].DEXreq && PlayerSkills[3].Level >= Inventory[ItemSelect].ShieldReq) {
                WPN2.push(Inventory[ItemSelect]);
                IncreaseDefense();
                Inventory.splice(ItemSelect, 1);
            }
        }
    }
    else if (Inventory[ItemSelect].ItemType == "Ring0") {
        if (RNG1.length == 0) {
            RNG1.push(Inventory[ItemSelect]);
            Inventory.splice(ItemSelect, 1);
        } else if (RNG2.length == 0) {
            RNG2.push(Inventory[ItemSelect]);
            Inventory.splice(ItemSelect, 1);
        } else {
            return;
        }
    }
    function CalcScale() {
        let a = 0;
        let b = 0;
        let c = 0;
        b = (Inventory[ItemSelect].STRscaleNUM / 10) * PlayerStats[0].VALUE;
        c = (Inventory[ItemSelect].DEXscaleNUM / 10) * PlayerStats[1].VALUE;
        b = b > Inventory[ItemSelect].STRscaleNUM ? b = Inventory[ItemSelect].STRscaleNUM : b;
        c = c > Inventory[ItemSelect].DEXscaleNUM ? c = Inventory[ItemSelect].DEXscaleNUM : c;
        a = Inventory[ItemSelect].Damage * b;
        a += Inventory[ItemSelect].Damage * c;
        a = +Math.floor(a * 0.75);
        return a;
    }
    function IncreaseDefense() {
        PlayerCombatTable[0].val += Inventory[ItemSelect].SlashDef;
        PlayerCombatTable[1].val += Inventory[ItemSelect].BluntDef;
        PlayerCombatTable[2].val += Inventory[ItemSelect].PierceDef;
        PlayerCombatTable[3].val += Inventory[ItemSelect].LightDef;
        PlayerCombatTable[4].val += Inventory[ItemSelect].DarkDef;
    }
    CreateEquipItems();
    CreateInvItems();
}

document.getElementById('equip').addEventListener('mouseover', InventoryInfo);

function CreateEquipItems() {
    let nodes = document.getElementById('Slots').childNodes;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].textContent = '';
    }
    if (WPN1.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${WPN1[0].Grade}C`);
        document.getElementById('Wep1').appendChild(d);
        let img = document.createElement('img');
        img.src = WPN1[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "WPN1");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (WPN2.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${WPN2[0].Grade}C`);
        document.getElementById('Wep2').appendChild(d);
        let img = document.createElement('img');
        img.src = WPN2[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "WPN2");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (TORSO.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${TORSO[0].Grade}C`);
        document.getElementById('torsoslot').appendChild(d);
        let img = document.createElement('img');
        img.src = TORSO[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "TORSO");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (HEAD.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${HEAD[0].Grade}C`);
        document.getElementById('headslot').appendChild(d);
        let img = document.createElement('img');
        img.src = HEAD[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "HEAD");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (LEGS.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${LEGS[0].Grade}C`);
        document.getElementById('legs').appendChild(d);
        let img = document.createElement('img');
        img.src = LEGS[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "LEGS");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (GLOVES.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${GLOVES[0].Grade}C`);
        document.getElementById('gloves1').appendChild(d);
        let img = document.createElement('img');
        img.src = GLOVES[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "GLOVES");
        d.addEventListener('mousedown', TargetEquippedItem);
        let d2 = document.createElement('div');
        d2.classList.add("ItemE");
        d2.classList.add(`${GLOVES[0].Grade}C`);
        document.getElementById('gloves2').appendChild(d2);
        let img2 = document.createElement('img');
        img2.src = GLOVES[0].IMGSRC;
        img2.classList.add("ItemClass");
        d2.appendChild(img2);
        d2.setAttribute("TAULU", "GLOVES");
        d2.addEventListener('mousedown', TargetEquippedItem);
    }
    if (FEET.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${FEET[0].Grade}C`);
        document.getElementById('legslot1').appendChild(d);
        let img = document.createElement('img');
        img.src = FEET[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "FEET");
        d.addEventListener('mousedown', TargetEquippedItem);
        let d2 = document.createElement('div');
        d2.classList.add("ItemE");
        d2.classList.add(`${FEET[0].Grade}C`);
        document.getElementById('legslot2').appendChild(d2);
        let img2 = document.createElement('img');
        img2.src = FEET[0].IMGSRC;
        img2.classList.add("ItemClass");
        d2.appendChild(img2);
        d2.setAttribute("TAULU", "FEET");
        d2.addEventListener('mousedown', TargetEquippedItem);
    }
    if (RNG1.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${RNG1[0].Grade}C`);
        document.getElementById('Ring1').appendChild(d);
        let img = document.createElement('img');
        img.src = RNG1[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "RNG1");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    if (RNG2.length > 0) {
        let d = document.createElement('div');
        d.classList.add("ItemE");
        d.classList.add(`${RNG2[0].Grade}C`);
        document.getElementById('Ring2').appendChild(d);
        let img = document.createElement('img');
        img.src = RNG2[0].IMGSRC;
        img.classList.add("ItemClass");
        d.appendChild(img);
        d.setAttribute("TAULU", "RNG2");
        d.addEventListener('mousedown', TargetEquippedItem);
    }
    ItemSelect = "";
}

function UnEquipItem() {
    if (typeof ItemSelect === 'string' || ItemSelect instanceof String) {
        return;
    }
    else {
        let a = document.getElementById('inventory');
        let b = document.getElementById('Slots');
        if(ItemSelect[0].ItemType != "Weapon")DecreaseDefense();
        Inventory.push(ItemSelect[0]);
        ItemSelect.splice(0, 1);
        CheckDmgType();
        CheckPlayerWeps() 
        CreateCharacterStats();
        CreateEquipItems();
        CreateInvItems();
    }
    function DecreaseDefense() {
        PlayerCombatTable[0].val -= ItemSelect[0].SlashDef;
        PlayerCombatTable[1].val -= ItemSelect[0].BluntDef;
        PlayerCombatTable[2].val -= ItemSelect[0].PierceDef;
        PlayerCombatTable[3].val -= ItemSelect[0].LightDef;
        PlayerCombatTable[4].val -= ItemSelect[0].DarkDef;
    }
    function CheckDmgType() {
        if(WPN1.length == 0 && WPN2.length == 0) DmgType = "Blunt";
        if(WPN1.length == 0) {
        PlayerCombatTable[7].val = 0;
        PlayerCombatTable[5].val = 0;
        }
        if(WPN2.length == 0) {
            PlayerCombatTable[8].val = 0;
            PlayerCombatTable[6].val = 0;
        }
    }
}