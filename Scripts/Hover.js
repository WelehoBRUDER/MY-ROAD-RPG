'use strict';

let SI = document.getElementById('StatInfo');

function ShowInfo(e) {
    let InfoTable = [];
    InfoTable = Classes;
    SI.classList.remove("HideObject");
    SI.style.top = `${e.y - 50}px`;
    SI.style.left = `${e.x - 300}px`;
    SI.textContent = '';
    let p = document.createElement('p');
    p.textContent = `Class: ${InfoTable[e.target.id.substring(4)].Name}`;
    SI.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = `${InfoTable[e.target.id.substring(4)].Desc}`;
    SI.appendChild(p2);
}

function GeneralPopUp(e) {
    let a = document.getElementById('GeneralPopUP');
    if (e.target.id == "CharacterScreen") {
        a.textContent = '';
        a.classList.add("HideObject");
        return;
    }
    a.textContent = '';
    let table = PlayerCombatTable;
    a.classList.remove("HideObject");
    let p = document.createElement('p');
    a.style.top = `${e.y - 75}px`;
    a.style.left = `${e.x}px`;
    p.textContent = table[e.target.id.substring(5)].desc;
    a.appendChild(p);
}

function ShowEffekts(e) {
    let a = document.getElementById('GeneralPopUP');
    if ((!e.target.id.startsWith("ee") && !e.target.id.startsWith("pe") && !e.target.id.startsWith("Phys") && !e.target.id.startsWith("Mags")) || e.target.id == "Physicals") {
        a.textContent = '';
        a.classList.add("HideObject");
        return;
    }
    let table = [];
    let sub = 0;
    a.textContent = '';
    if (e.target.id.startsWith("Phys")) {
        table = PlayerAbilities;
        sub = e.target.id.substring(4);
    } else if (e.target.id.startsWith("Mags")) {
        table = PlayerSpells;
        sub = e.target.id.substring(4);
    } else if (e.target.id.startsWith("ee")) {
        table = EnemyStatusEffects;
        sub = e.target.id.substring(2);
    } else {
        table = PlayerStatusEffects;
        sub = e.target.id.substring(2);
    }
    console.log('what');
    a.classList.remove("HideObject");
    let p = document.createElement('p');
    a.style.top = `${e.y - 75}px`;
    a.style.left = `${e.x}px`;
    if(e.target.id.startsWith("Phys")) p.textContent = `${table[sub].Desc} ${table[sub].Last} ${table[sub].End}`;
    else if(e.target.id.startsWith("Mags")) p.textContent = `${table[sub].Desc} ${table[sub].Last} ${table[sub].End}`;
    else {
        p.textContent = `${table[sub].EffectDesc} ${table[sub].For} ${table[sub].EffectEnd}`;
    }
    a.appendChild(p);
}

function InventoryInfo(e) {
    let inf = document.getElementById('itemInfo');
    if (!e.target.getAttribute("TAULU")) {
        inf.textContent = '';
        return;
    }
    let Taulu = eval(e.target.getAttribute("TAULU"));
    let tar = !e.target.id ? 0 : e.target.id.substring(4);
    inf.textContent = '';
    let p = document.createElement('p');
    p.textContent = Taulu[tar].Name;
    p.classList.add("ItemName");
    inf.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = `Grade: `;
    p2.classList.add("InvText");
    let s1 = document.createElement('span');
    s1.textContent = Taulu[tar].Grade;
    s1.classList.add(Taulu[tar].Grade);
    p2.appendChild(s1);
    inf.appendChild(p2);
    if (Taulu[tar].STRscale) {
        let p2 = document.createElement('p');
        p2.textContent = `Strength-scaling: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        s1.textContent = Taulu[tar].STRscale;
        s1.classList.add(Taulu[tar].STRscale);
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].DEXscale) {
        let p2 = document.createElement('p');
        p2.textContent = `Dexterity-scaling: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        s1.textContent = Taulu[tar].DEXscale;
        s1.classList.add(Taulu[tar].DEXscale);
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].STRreq > 0) {
        let p2 = document.createElement('p');
        p2.textContent = `Strength-requirement: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        if (PlayerStats[0].VALUE < Taulu[tar].STRreq) s1.classList.add("ACCESSDENIED");
        s1.textContent = Taulu[tar].STRreq;
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].DEXreq > 0) {
        let p2 = document.createElement('p');
        p2.textContent = `Dexterity-requirement: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        if (PlayerStats[1].VALUE < Taulu[tar].DEXreq) s1.classList.add("ACCESSDENIED");
        s1.textContent = Taulu[tar].DEXreq;
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].Damage > 0) {
        let p2 = document.createElement('p');
        p2.textContent = `Damage: ${Taulu[tar].Damage}`
        p2.classList.add("InvText");
        if (PlayerStats[0].VALUE >= Taulu[tar].STRreq && PlayerStats[1].VALUE >= Taulu[tar].DEXreq) {
            let s1 = document.createElement('span');
            s1.classList.add("DAMAGEGIVEN");
            s1.textContent = ` + ${ItemScale()}`;
            p2.appendChild(s1);
        }
        inf.appendChild(p2);
    }
    let p3 = document.createElement('p')
    p3.textContent = `Item Type: ${Taulu[tar].Type}`;
    p3.classList.add("InvText");
    inf.appendChild(p3);
    if (Taulu[tar].CRT > 0) {
        let p2 = document.createElement('p');
        p2.textContent = `Critical Damage: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        s1.classList.add("CRITICAL");
        s1.textContent = `${Math.floor(Taulu[tar].CRT * 100)}%`;
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].DMGType) {
        let p3 = document.createElement('p')
        p3.textContent = `Damage Type: ${Taulu[tar].DMGType}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].SlashDef) {
        let p3 = document.createElement('p')
        p3.textContent = `Slash Defense: ${Taulu[tar].SlashDef}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].PierceDef) {
        let p3 = document.createElement('p')
        p3.textContent = `Pierce Defense: ${Taulu[tar].PierceDef}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].BluntDef) {
        let p3 = document.createElement('p')
        p3.textContent = `Blunt Defense: ${Taulu[tar].BluntDef}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].LightDef) {
        let p3 = document.createElement('p')
        p3.textContent = `Light Defense: ${Taulu[tar].LightDef}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].DarkDef) {
        let p3 = document.createElement('p')
        p3.textContent = `Dark Defense: ${Taulu[tar].DarkDef}`;
        p3.classList.add("InvText");
        inf.appendChild(p3);
    }
    if (Taulu[tar].ShieldReq) {
        let p2 = document.createElement('p');
        p2.textContent = `Shield Skill Req: `
        p2.classList.add("InvText");
        let s1 = document.createElement('span');
        if (PlayerSkills[3].Level < Taulu[tar].ShieldReq) s1.classList.add("ACCESSDENIED");
        s1.textContent = Taulu[tar].ShieldReq;
        p2.appendChild(s1);
        inf.appendChild(p2);
    }
    if (Taulu[tar].Block) {
        let p2 = document.createElement('p');
        p2.textContent = `Block Amount: ${(1 - Taulu[tar].Block) * 100}%`;
        p2.classList.add("InvText");
        inf.appendChild(p2);
    }
    function ItemScale() {
        if (PlayerStats[0].VALUE >= Taulu[tar].STRreq && PlayerStats[1].VALUE >= Taulu[tar].DEXreq) {
            let a = 0;
            let b = 0;
            let c = 0;
            b = (Taulu[tar].STRscaleNUM / 10) * PlayerStats[0].VALUE;
            c = (Taulu[tar].DEXscaleNUM / 10) * PlayerStats[1].VALUE;
            b = b > Taulu[tar].STRscaleNUM ? b = Taulu[tar].STRscaleNUM : b;
            c = c > Taulu[tar].DEXscaleNUM ? c = Taulu[tar].DEXscaleNUM : c;
            a = Taulu[tar].Damage * b;
            a += Taulu[tar].Damage * c;
            a = +Math.floor(a * 0.75);
            return a;
        } else {
            return 0;
        }
    }
}



