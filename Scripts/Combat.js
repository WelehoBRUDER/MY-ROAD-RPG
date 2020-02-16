'use strict';

function CalculateDamage(atk, def) {
    let dmg = Math.floor(atk * atk / (atk + def));
    return dmg;
}

window.addEventListener('mouseover', ShowEffekts);

let music = document.getElementById('audio');

// This function manages music
function ManageMusic() {
    music.src = BGMusics[0].SRC;
    music.volume = 0.01;
    music.play();
    music.loop = true;
}

function EnemyDead() {
    document.getElementById('BattleEndPOP').style.display = "block";
    // The timeout is needed, because javascript loads both commands at the same tick without it.
    setTimeout(() => { document.getElementById('BattleEndPOP').style.opacity = "1" }, 10);
    document.body.classList.remove('EndWinText');
    document.body.classList.remove('EndDefeatText');
    document.getElementById('EndBattleBut').removeEventListener('click', EndBattleVictor);
    document.getElementById('EndBattleBut').removeEventListener('click', EndBattleLoser);
    document.getElementById('EndTitleText').classList.add('EndWinText')
    document.getElementById('EndTitleText').textContent = "VICTORY!"
    document.getElementById('EndText1').textContent = `You vanquished the ${EnemyStats[0].Name}!`;
    document.getElementById('EndText2').textContent = `You gain ${EnemyStats[0].xp} EXP for your victory!`;
    document.getElementById('EndBattleBut').addEventListener('click', EndBattleVictor);

}

function EndBattleVictor() {
    PlayerCombatStats.exp += EnemyStats[0].xp;
    DrawMap();
    FadeAway();
}

function EndBattleLoser() {
    PlayerCombatStats.exp = Math.floor(PlayerCombatStats.exp / 2);
    DrawMap();
    FadeAway();
}

function FadeAway() {
    document.getElementById('Combat').style.display = 'none';
    document.getElementById('BattleEndPOP').style.opacity = "0";
    setTimeout(() => { document.getElementById('BattleEndPOP').style.display = "none" }, 1500);
    document.getElementById('MainScreen').style.display = "block";
    document.getElementById('WholeInv').style.display = "block";
}

function PlayerDead() {
    document.getElementById('BattleEndPOP').style.display = "block";
    // The timeout is needed, because javascript loads both commands at the same tick without it.
    setTimeout(() => { document.getElementById('BattleEndPOP').style.opacity = "1" }, 10);
    document.body.classList.remove('EndWinText');
    document.body.classList.remove('EndDefeatText');
    document.getElementById('EndBattleBut').removeEventListener('click', EndBattleVictor);
    document.getElementById('EndBattleBut').removeEventListener('click', EndBattleLoser);
    document.getElementById('EndTitleText').classList.add('EndDefeatText')
    document.getElementById('EndTitleText').textContent = "DEFEAT"
    document.getElementById('EndText1').textContent = `You were vanquished by the ${EnemyStats[0].Name}.`;
    document.getElementById('EndText2').textContent = `You've lost ${PlayerCombatStats.exp / 2} EXP due to your defeat.`;
    document.getElementById('EndBattleBut').addEventListener('click', EndBattleLoser);

}

function GetEnemyStats() {
    let enc = document.getElementById('EnemyNameCombat');
    try {
        enc.classList.remove("Normal");
        enc.classList.remove("Wary");
        enc.classList.remove("Danger");
        enc.classList.remove("Death");
    }
    catch {
    }
    EnemyStats = [];
    EnemyArmour = [];
    EnemyWeapon = [];
    EnemyShield = [];
    DeepCopyEnemies = deepCopy(StaticEnemies);
    EnemyStats.push(DeepCopyEnemies[SelectedEnemy]);
    EnemyStats[0].Lvl += Math.floor(Math.random() * 4); 
    if (EnemyStats[0].Lvl - PlayerCombatStats.level < 4) enc.classList.add("Normal");
    if (EnemyStats[0].Lvl - PlayerCombatStats.level >= 4 && EnemyStats[0].Lvl - PlayerCombatStats.level < 10) enc.classList.add("Wary");
    if (EnemyStats[0].Lvl - PlayerCombatStats.level >= 10 && EnemyStats[0].Lvl - PlayerCombatStats.level < 20) enc.classList.add("Danger");
    if (EnemyStats[0].Lvl - PlayerCombatStats.level >= 20) enc.classList.add("Death");
    enc.textContent = `${EnemyStats[0].Name} - Lvl ${EnemyStats[0].Lvl}`;
    EquipEnemy();
    CheckPlayerWeps();
    timer = setInterval(CheckEnemyBars, 50);
}

function CheckEnemyBars() {
    if (EnemyStats[0].HP < 0) EnemyStats[0].HP = 0;
    document.getElementById('EnemyCombatStaminaBarFill').style.width = EnemyStats[0].STA / EnemyStats[0].maxSTA * (document.getElementById('EnemyCombatStaminaBar').offsetWidth - 0) + 'px';
    document.getElementById('EnemyCombatHealthBarFill').style.width = EnemyStats[0].HP / EnemyStats[0].maxHP * (document.getElementById('EnemyCombatHealthBar').offsetWidth - 0) + 'px';
    document.getElementById('EnemyCombatHealthText').textContent = `${EnemyStats[0].HP}/${EnemyStats[0].maxHP} HP`
    document.getElementById('EnemyCombatStaminaText').textContent = `${EnemyStats[0].STA}/${EnemyStats[0].maxSTA} STA`
    if (EnemyStats[0].HP == 0) document.getElementById('EnemyCombatHealthBarFill').style.boxShadow = "0 0 0px 0px rgb(7, 161, 28)";
    else document.getElementById('EnemyCombatHealthBarFill').style.boxShadow = null;
    if (EnemyStats[0].STA == 0) document.getElementById('EnemyCombatStaminaBarFill').style.boxShadow = "0 0 0px 0px rgb(7, 161, 28)";
    else document.getElementById('EnemyCombatStaminaBarFill').style.boxShadow = null;
}

function CheckPlayerWeps() {
    console.log('EEEX');
    if (WPN1.length == 0 && (WPN2.length == 0 || WPN2[0].ItemType == "Shield")) {
        console.log('excuse me wtf');
        PlayerCombatTable[9].val = Math.floor((5 * PlayerSkills[7].Level) + 5 + (PlayerStats[0].VALUE + PlayerStats[1].VALUE) * (1 + PlayerStats[0].VALUE / 100 + PlayerStats[1].VALUE / 150));
        DmgType = "Blunt";
        console.log(PlayerCombatTable[9].val);
    }
}

function EquipEnemy() {
    let equp = 0;
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyArmour.push(EnemyTorso[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyArmour.push(EnemyHead[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyArmour.push(EnemyLegs[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyArmour.push(EnemyHands[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyArmour.push(EnemyFeet[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyWeapon.push(EnemyWeapons[equp]);
    equp = Math.floor(Math.random() * (EqMax - EqMin) + EqMin);
    EnemyShield.push(EnemyShields[equp]);
    CalcEnemyStats();
}

function CalcEnemyStats() {
    let multi = 1 + EnemyStats[0].Lvl / 10;
    EnemyStats[0].maxHP = Math.floor(EnemyStats[0].maxHP * multi);
    EnemyStats[0].maxSTA = Math.floor(EnemyStats[0].maxSTA * multi);
    EnemyStats[0].HP = EnemyStats[0].maxHP;
    EnemyStats[0].STA = EnemyStats[0].maxSTA;
    for (let i = 0; i < EnemyArmour.length; i++) {
        EnemyStats[0].SlashDef += EnemyArmour[i].SlashDef;
        EnemyStats[0].PierceDef += EnemyArmour[i].PierceDef;
        EnemyStats[0].BluntDef += EnemyArmour[i].BluntDef;
        EnemyStats[0].LightDef += EnemyArmour[i].LightDef;
        EnemyStats[0].DarkDef += EnemyArmour[i].DarkDef;
    }
    if (EnemyShields.length > 0) {
        EnemyStats[0].SlashDef += EnemyShield[0].SlashDef;
        EnemyStats[0].PierceDef += EnemyShield[0].PierceDef;
        EnemyStats[0].BluntDef += EnemyShield[0].BluntDef;
        EnemyStats[0].LightDef += EnemyShield[0].LightDef;
        EnemyStats[0].DarkDef += EnemyShield[0].DarkDef;
    }
    EnemyStats[0].TotalDMG += Math.floor(EnemyWeapon[0].DMG * multi);
}

function LightAtk() {
    CheckEnemyResist();
    if (PlayerCombatStats.STA >= 8) {
        if (!Dodged(EnemyStats[0].dodge)) {
            if (!Blocked(EnemyStats[0].block)) {
                if (!Kritikal(CritChance)) {
                    let atk = PlayerCombatTable[9].val;
                    PlayerCombatStats.STA -= 8;
                    let FinalDMG = +CalculateDamage(atk, defUsed);
                    EnemyStats[0].HP -= FinalDMG;
                    CreateCombatText(FinalDMG, NAME, WPN1[0].Action, EnemyStats[0].Name, "Player", "Enemy");
                    if (EnemyStats[0].HP >= 1) EnemyAttacks();
                    else EnemyDead();
                } else {
                    let atk = PlayerCombatTable[9].val * WPN1[0].CRT;
                    PlayerCombatStats.STA -= 8;
                    let FinalDMG = +CalculateDamage(atk, defUsed);
                    EnemyStats[0].HP -= FinalDMG;
                    CreateCombatText(FinalDMG, NAME, "Critically " + WPN1[0].Action, EnemyStats[0].Name, "Player", "Enemy");
                    if (EnemyStats[0].HP >= 1) EnemyAttacks();
                    else EnemyDead();
                }
            } else {
                let dmg = Math.floor(PlayerCombatTable[9].val * EnemyShield[0].Block);
                EnemyStats[0].HP -= dmg;
                CreateCombatText(dmg, NAME, WPN1[0].Action, EnemyStats[0].Name + ", but they block the attack", "Player", "Enemy")
                if (EnemyStats[0].HP >= 1) EnemyAttacks();
                else EnemyDead();
            }
        } else {
            NonCombatText(NAME, "", "misses their attack! Be glad it was just a light attack..", "", "Player", "");
            PlayerCombatStats.STA -= 8;
            if (EnemyStats[0].HP >= 1) EnemyAttacks();
            else EnemyDead();
        }
    }
}

function HeavyAtk() {
    CheckEnemyResist();
    if (PlayerCombatStats.STA >= 20) {
        if (!Dodged(EnemyStats[0].dodge)) {
            if (!Blocked(EnemyStats[0].block)) {
                if (!Kritikal(CritChance)) {
                    let atk = PlayerCombatTable[9].val * 1.2;
                    PlayerCombatStats.STA -= 20;
                    let FinalDMG = +CalculateDamage(atk, defUsed);
                    EnemyStats[0].HP -= FinalDMG;
                    CreateCombatText(FinalDMG, NAME, WPN1[0].Action, EnemyStats[0].Name, "Player", "Enemy");
                    if (EnemyStats[0].HP >= 1) EnemyAttacks();
                    else EnemyDead();
                } else {
                    let atk = (PlayerCombatTable[9].val * 1.2) * WPN1[0].CRT;
                    PlayerCombatStats.STA -= 8;
                    let FinalDMG = +CalculateDamage(atk, defUsed);
                    EnemyStats[0].HP -= FinalDMG;
                    CreateCombatText(FinalDMG, NAME, "Critically " + WPN1[0].Action, EnemyStats[0].Name, "Player", "Enemy");
                    if (EnemyStats[0].HP >= 1) EnemyAttacks();
                    else EnemyDead();
                }
            } else {
                let dmg = Math.floor((PlayerCombatTable[9].val * 1.2) * EnemyShield[0].Block);
                EnemyStats[0].HP -= dmg;
                PlayerCombatStats.STA -= 20;
                CreateCombatText(dmg, NAME, WPN1[0].Action, EnemyStats[0].Name + ", but they block the attack", "Player", "Enemy")
                if (EnemyStats[0].HP >= 1) EnemyAttacks();
                else EnemyDead();
            }
        } else {
            NonCombatText(NAME, "", "misses their attack! Way to go novice adventurer! Next time do it in a goblin cave...", "", "Player", "");
            PlayerCombatStats.STA -= 20;
            if (EnemyStats[0].HP >= 1) EnemyAttacks();
            else EnemyDead();
        }
    }
}

function Dodged(chance) {
    if (Math.random() < chance / 100) {
        return true;
    }
    else return false;
}

function Blocked(chance) {
    if (Math.random() < chance / 100) {
        return true;
    }
    else return false;
}

function Kritikal(chance) {
    if (Math.random() < chance / 100) {
        return true;
    }
    else return false;
}


function Rest() {
    PlayerCombatStats.STA += PlayerCombatStats.maxSTA * 0.35;
    NonCombatText(NAME, Math.floor(PlayerCombatStats.maxSTA * 0.35), "rests", "stamina", "Player", "restoring");
    if (EnemyStats[0].HP >= 1) EnemyAttacks();
}

function CheckEnemyResist() {
    if (DmgType == "Blunt") defUsed = EnemyStats[0].BluntDef;
    if (DmgType == "Slash") defUsed = EnemyStats[0].SlashDef;
    if (DmgType == "Pierce") defUsed = EnemyStats[0].PierceDef;
    if (DmgType == "Light") defUsed = EnemyStats[0].LightDef;
    if (DmgType == "Dark") defUsed = EnemyStats[0].DarkDef;
}

// This is the enemy AI function. It is very beautiful.
function EnemyAttacks() {
    CheckOwnStatuses();
    if (CheckIfDead()) {
        EnemyDead();
        return;
    }
    if (AmIStunned()) {
        NonCombatText(EnemyStats[0].Name, "", "", "", "Enemy", "is stunned");
        CheckPlayerStatuses();
        CreateBuffer();
        return;
    }
    let playDef;
    let enemDef;
    let Type = EnemyWeapon[0].Type;
    GetType();
    if (TestLethality()) {
        AttackPlayer();
    } else if (TestDeath() && EnemyStats[0].STA >= UniversalMoves[2].Cost) {
        HealMePls();
    } else if (ArtificialTuppuIQ()) Rest();
    else {
        AttackPlayer();
    }
    // This function tests what move deals the most damage. It must also be usable this turn.
    function TestDamage() {
        let damage = 0;
        let ID = 0;
        for (let i = 0; i < UniversalMoves.length; i++) {
            if (damage < UniversalMoves[i].Power && UniversalMoves[i].Cost <= EnemyStats[0].STA) {
                damage = UniversalMoves[i].Power;
                ID = i;
            }
        }
        return ID;
    }

    // This function tests if the enemy's best move can kill the player that turn. If true it will use that move.
    function TestLethality() {
        if (PlayerCombatStats.HP - CalculateDamage(UniversalMoves[TestDamage()].Power * EnemyStats[0].TotalDMG, playDef) <= 0) return true;
    }
    function TestDeath() {
        let dmg = +GetPlayerMaximumDamage();
        console.log(dmg);
        if (EnemyStats[0].HP - CalculateDamage(dmg, enemDef) <= 0) {
            return true;
        }
    }

    // This function tells the ai not to waste stamina if health is dangerously low.
    function ArtificialTuppuIQ() {
        let dmg = 0;
        if (EnemyStats[0].BRAIN == "Genius") {
            dmg = +GetPlayerMaximumDamage();
            console.log(dmg);
        }
        else if (EnemyStats[0].BRAIN == "Anti-vaxx") dmg = +GetPlayerAverageDamage();
        else {
            return false;
        }
        if (EnemyStats[0].HP - dmg * 2 <= 0) {
            if (EnemyStats[0].STA - UniversalMoves[TestDamage()].Cost < UniversalMoves[2].Cost) {
                return true;
            }
        }
    }

    // This function deals damage to the player.
    function AttackPlayer() {
        let canBlock = false;
        if (EnemyStats[0].STA >= UniversalMoves[TestDamage()].Cost) {
            if (!Dodged(PlayerSkills[4].Level * 4)) {
                if (WPN2.length > 0) {
                    if (WPN2[0].ItemType == "Shield") canBlock = true;
                }
                if (!Blocked(PlayerSkills[3].Level * 4) && canBlock) {
                    if (!Kritikal(EnemyStats[0].crit)) {
                        let dmg = CalculateDamage(UniversalMoves[TestDamage()].Power * EnemyStats[0].TotalDMG, playDef);
                        dmg = Math.floor(dmg / DamageWeaken);
                        PlayerCombatStats.HP -= dmg;
                        CreateCombatText(dmg, EnemyStats[0].Name, UniversalMoves[TestDamage()].Action, NAME, "Enemy", "Player");
                        CheckPlayerStatuses();
                        CreateBuffer();
                        EnemyStats[0].STA -= UniversalMoves[TestDamage()].Cost;
                        if (PlayerCombatStats.HP <= 0) PlayerDead();
                    }
                    else {
                        let dmg = CalculateDamage((UniversalMoves[TestDamage()].Power * EnemyStats[0].TotalDMG) * EnemyWeapon[0].CRIT, playDef);
                        dmg = Math.floor(dmg / DamageWeaken);
                        console.log(dmg);
                        PlayerCombatStats.HP -= dmg;
                        CreateCombatText(dmg, EnemyStats[0].Name, "critically " + UniversalMoves[TestDamage()].Action, NAME, "Enemy", "Player");
                        CheckPlayerStatuses();
                        CreateBuffer();
                        EnemyStats[0].STA -= UniversalMoves[TestDamage()].Cost;
                        if (PlayerCombatStats.HP <= 0) PlayerDead();
                    }
                }
                else {
                    let dmg = Math.floor((UniversalMoves[TestDamage()].Power * EnemyStats[0].TotalDMG) * WPN2[0].Block);
                    dmg = Math.floor(dmg / DamageWeaken);
                    PlayerCombatStats.HP -= dmg;
                    console.log(dmg);
                    CreateCombatText(dmg, EnemyStats[0].Name, UniversalMoves[TestDamage()].Action, NAME + ", but they block it", "Enemy", "Player");
                    CheckPlayerStatuses();
                    CreateBuffer();
                    EnemyStats[0].STA -= UniversalMoves[TestDamage()].Cost;
                    if (PlayerCombatStats.HP <= 0) PlayerDead();
                }
            }
            else {
                EnemyStats[0].STA -= UniversalMoves[TestDamage()].Cost;
                NonCombatText(EnemyStats[0].Name, "", "misses their attack! Way to go dumb mob!", "", "Enemy", "");
                CheckPlayerStatuses();
                CreateBuffer();
            }
        } else {
            Rest();
        }
    }

    // Am I still alive?
    function CheckIfDead() {
        if (EnemyStats[0].HP <= 0) return true;
    }

    // He really needs his vitamins now..
    function HealMePls() {
        EnemyStats[0].HP += Math.floor(EnemyStats[0].maxHP * UniversalMoves[2].Power);
        EnemyStats[0].STA -= UniversalMoves[2].Cost;
        NonCombatText(EnemyStats[0].Name, Math.floor(EnemyStats[0].maxHP * UniversalMoves[2].Power), "heals", "health", "Enemy", "restoring");
        CreateBuffer();
    }

    function Rest() {
        EnemyStats[0].STA += Math.floor(EnemyStats[0].maxSTA * 0.35);
        NonCombatText(EnemyStats[0].Name, Math.floor(EnemyStats[0].maxSTA * 0.35), "rests", "stamina", "Enemy", "restoring");
        CheckPlayerStatuses();
        CreateBuffer();
    }

    // This function tells the code what defense value it must use for some M A T H.
    function GetType() {
        if (Type == "Slash") playDef = PlayerCombatTable[0].val;
        if (Type == "Pierce") playDef = PlayerCombatTable[1].val;
        if (Type == "Blunt") playDef = PlayerCombatTable[2].val;
        if (Type == "Light") playDef = PlayerCombatTable[3].val;
        if (Type == "Dark") playDef = PlayerCombatTable[4].val;
        if (DmgType == "Slash") enemDef = EnemyStats[0].SlashDef;
        if (DmgType == "Pierce") enemDef = EnemyStats[0].PierceDef;
        if (DmgType == "Blunt") enemDef = EnemyStats[0].BluntDef;
        return playDef, enemDef;
    }

    // This function handles statuses that cause nasty effects to the enemy
    function CheckOwnStatuses() {
        for (let i = 0; i < EnemyStatusEffects.length; i++) {
            EnemyStatusEffects[i].For--;
            if (EnemyStatusEffects[i].For < 1) {
                if (EnemyStatusEffects[i].Action == "DEBUFF") DamageWeaken = 1;
                EnemyStatusEffects.splice(i, 1);
                UpdateStatuses();
                return;
            }
            if (EnemyStatusEffects[i].Action == "DMGOT") {
                let dmg = 0;
                if (EnemyStatusEffects[i].damage < 1) dmg = Math.floor((EnemyStatusEffects[i].damage / 10) * EnemyStats[0].maxHP);
                console.log(dmg);
                EnemyStats[0].HP -= dmg;
                NonCombatText(EnemyStats[0].Name, "", `takes ${dmg} damage from ${EnemyStatusEffects[i].TurnDesc}.`, "", "Enemy", "");
            }
            else if (EnemyStatusEffects[i].Action == "DEBUFF") {
                DamageWeaken = EnemyStatusEffects[i].Debuff;
            }
        }
    }

    // This function checks whether the ai can act this round.
    function AmIStunned() {
        for (let i = 0; i < EnemyStatusEffects.length; i++) {
            if (EnemyStatusEffects[i].Action == "Stun") {
                if (EnemyStatusEffects[i].For < 1) {
                    EnemyStatusEffects.splice(i, 1);
                    UpdateStatuses();
                    return false;
                }
                EnemyStatusEffects[i].For--;
                return true;
            }
        }
    }
}

function TogglePhys() {
    let py = document.getElementById('Physicals');
    if (Ptog) {
        for (let i = 0; i < Array.from(py.children).length; i++) {
            document.getElementById(`Phys${i}`).classList.add("PhysBut");
        }
        setTimeout(hide, 200);
        function hide() {
            py.textContent = '';
            Ptog = false;
        }
    } else {
        for (let i = 0; i < PlayerAbilities.length; i++) {
            let b = document.createElement('button');
            b.id = `Phys${i}`;
            b.textContent = PlayerAbilities[i].Name;
            py.appendChild(b);
            b.classList.add("PhysBut");
            setTimeout(back, 50);
            function back() {
                b.classList.remove("PhysBut");
            }
            b.addEventListener('mousedown', AbilityCheck);
        }
        Ptog = true;
    }
}

function ToggleMags() {
    let py = document.getElementById('Magicals');
    if (Mtog) {
        for (let i = 0; i < Array.from(py.children).length; i++) {
            document.getElementById(`Mags${i}`).classList.add("MagBut");
        }
        setTimeout(hide, 200);
        function hide() {
            py.textContent = '';
            Mtog = false;
        }
    } else {
        for (let i = 0; i < PlayerSpells.length; i++) {
            let b = document.createElement('button');
            b.id = `Mags${i}`;
            b.textContent = PlayerSpells[i].Name;
            py.appendChild(b);
            b.classList.add("MagBut");
            setTimeout(back, 50);
            function back() {
                b.classList.remove("MagBut");
            }
            b.addEventListener('mousedown', CastMagic);
        }
        Mtog = true;
    }
}

function sortItemsCombat() {
    CombatConsumables = [];
    for (let i = 0; i < Inventory.length; i++) {
        if (Inventory[i].Type == "Consumable" && Inventory[i].Amount > 0) {
            CombatConsumables.push(Inventory[i]);
        }
    }
}

function CreateItems() {
    let py = document.getElementById('ItemHots');
    py.textContent = '';
    if (Itog) {
        for (let i = 0; i < CombatConsumables.length; i++) {
            if (CombatConsumables[i].Amount > 0) {
                let d = document.createElement('div');
                d.classList.add("Item");
                d.classList.add(`${CombatConsumables[i].Grade}C`);
                document.getElementById('ItemHots').appendChild(d);
                let img = document.createElement('img');
                img.src = CombatConsumables[i].IMGSRC;
                if (CombatConsumables[i].Type == "Consumable") img.classList.add("ConsumeClass");
                else img.classList.add("ItemClass");
                d.appendChild(img);
                d.id = `Itms${i}`;
                let am = document.createElement('p');
                am.textContent = CombatConsumables[i].Amount;
                if (CombatConsumables[i].Type == "Consumable") am.classList.add("AmountTextCon");
                else am.classList.add("AmountText");
                d.appendChild(am);
                d.addEventListener('mousedown', Consume);
            }
            else {
                CombatConsumables.splice(i, 1);
                i--;
            }
        }
    }
}

function ToggleItems() {
    let py = document.getElementById('ItemHots');
    if (Itog) {
        Itog = false;
        CreateItems();

    } else {
        Itog = true;
        CreateItems();

    }
}
function Consume(e) {
    let a = e.target.id;
    let b = e.target.id.substring(4);
    if (a.startsWith("Itms")) {
        CombatConsumables[b].Amount--;
        PlayerCombatStats[CombatConsumables[b].Target] += CombatConsumables[b].Power;
        NonCombatText(NAME, CombatConsumables[b].Power, CombatConsumables[b].Action, CombatConsumables[b].Target, "Player", "restoring");
        CreateItems();
        if (EnemyStats[0].HP >= 1) EnemyAttacks();
    }
}

function AbilityCheck(e) {
    CheckEnemyResist();
    let b = e.target.id.substring(4);
    if (PlayerCombatStats.STA >= PlayerAbilities[b].Cost) {
        if (PlayerAbilities[b].Action == "UpDef") {
            if (!Buffed()) {
                let deletThis = deepCopy(PlayerAbilities);
                PlayerStatusEffects.push(deletThis[b]);
                PlayerCombatTable[PlayerAbilities[b].inc].val = Math.round(PlayerCombatTable[PlayerAbilities[b].inc].val * PlayerAbilities[b].Power);
                PlayerCombatTable[PlayerAbilities[b].dec].val = Math.round(PlayerCombatTable[PlayerAbilities[b].dec].val / PlayerAbilities[b].Deb);
                UpdateStatuses();
                NonCombatText(NAME, "", PlayerAbilities[b].Act, "", "Player", "");
                if (EnemyStats[0].HP >= 1) EnemyAttacks();
            }
            else return;
        }
        else {
            if (!Dodged(EnemyStats[0].dodge)) {
                if (!Blocked(EnemyStats[0].block)) {
                    if (CheckIfDMGOT() || PlayerAbilities[b].Action == "DEBUFF") {
                        if (Math.random() < 100 / 100) {
                            ApplyDeb();
                            UpdateStatuses();
                        }
                    }
                    if (!Kritikal(CritChance)) {
                        let dmg = Math.floor(PlayerAbilities[b].Power * PlayerCombatTable[9].val);
                        EnemyStats[0].HP -= Math.floor(CalculateDamage(dmg, defUsed));
                        if (PlayerAbilities[b].Action == "Stun") TryStun();
                        CreateCombatText(Math.floor(CalculateDamage(dmg, defUsed)), NAME, PlayerAbilities[b].Act, EnemyStats[0].Name, "Player", "Enemy");
                    } else {
                        let dmg = Math.floor((PlayerAbilities[b].Power * PlayerCombatTable[9].val) * WPN1[0].CRT);
                        EnemyStats[0].HP -= Math.floor(CalculateDamage(dmg, defUsed));
                        if (PlayerAbilities[b].Action == "Stun") TryStun();
                        CreateCombatText(Math.floor(CalculateDamage(dmg, defUsed)), NAME, "Critically " + PlayerAbilities[b].Act, EnemyStats[0].Name, "Player", "Enemy");
                    }
                }
                else {
                    let dmg = Math.floor(PlayerAbilities[b].Power * PlayerCombatTable[9].val);
                    EnemyStats[0].HP -= Math.floor(dmg * EnemyShield[0].Block);
                    if (PlayerAbilities[b].Action == "Stun") TryStun();
                    CreateCombatText(Math.floor(CalculateDamage(dmg, defUsed)), NAME, PlayerAbilities[b].Act, EnemyStats[0].Name + ", but they block it", "Player", "Enemy");
                }
            }
            else {
                NonCombatText(NAME, "", "misses their special attack! What a waste...", "", "Player", "");
            }
            PlayerCombatStats.STA -= PlayerAbilities[b].Cost;
            if (EnemyStats[0].HP >= 1) EnemyAttacks();

            function CheckIfDMGOT() {
                if (PlayerAbilities[b].Action == "DMGOT") {
                    return true;
                }
                else return false;
            }


            function ApplyDeb() {
                if (Etsi(PlayerAbilities[b].Name) == undefined) {
                    console.log(Etsi(PlayerAbilities[b].Name));
                    let deletThiss = deepCopy(PlayerAbilities);
                    EnemyStatusEffects.push(deletThiss[b]);
                }
                else EnemyStatusEffects[Etsi(PlayerAbilities[b].Name)].For += PlayerAbilities[b].For;
                if (EnemyStatusEffects.length == 0) {
                    let deletThiss = deepCopy(PlayerAbilities);
                    EnemyStatusEffects.push(deletThiss[b]);
                }

                function Etsi(Target) {
                    for (let i = 0; i < EnemyStatusEffects.length; i++) {
                        if (EnemyStatusEffects[i].Name == Target) {
                            return i;
                        }
                    }
                }
            }
        }
    }
    function TryStun() {
        let chance = Math.floor(Math.random() * 2);
        console.log(chance);
        if (chance == 1 && !NotStunned()) {
            let deletThis = [];
            deletThis = deepCopy(PlayerAbilities);
            EnemyStatusEffects.push(deletThis[b]);
            UpdateStatuses();
        }
    }
    function NotStunned() {
        for (let i = 0; i < EnemyStatusEffects.length; i++) {
            if (EnemyStatusEffects[i].Action == "Stun") return true;
        }
    }
    function Buffed() {
        for (let i = 0; i < PlayerStatusEffects.length; i++) {
            if (PlayerStatusEffects[i].Name == PlayerAbilities[b].Name) return true;
        }
    }
}

function CastMagic(e) {
    CheckEnemyResist();
    let magdef = null;
    let b = e.target.id.substring(4);
    if (PlayerCombatStats.MP >= PlayerSpells[b].Cost) {
        if (PlayerSpells[b].Action == "Heal") {
            let heel = Math.floor(PlayerCombatStats.maxHP * PlayerSpells[b].Power * PlayerSkills[PlayerSpells[b].MagType].Level);
            PlayerCombatStats.HP += heel;
            PlayerCombatStats.MP -= PlayerSpells[b].Cost;
            NonCombatText(NAME, heel, PlayerSpells[b].Act, "health", "Player", "restoring");
        }
        else if (PlayerSpells[b].Action == "Hurt") {
            if (!Dodged(EnemyStats[0].dodge)) {
                if (!Blocked(EnemyStats[0].block)) {
                    if (!Kritikal(CritChance)) {
                        let scl = (1 + ((PlayerStats[1].VALUE / 2 + PlayerStats[3].VALUE) / 100)); // This is the scaling value
                        scl = (Math.round(scl * 100)) / 100; // This line rounds the scaled value so that it is always fixed to two decimals.
                        let dmg = Math.floor((PlayerSpells[b].Power * PlayerSkills[PlayerSpells[b].MagType].Level) * scl);
                        if (WPN1.length > 0 && WPN1[0].Type == "Wand") dmg = dmg * WPN1[0].MagScale;
                        SwitchDef();
                        let finDMG = (CalculateDamage(dmg, magdef));
                        EnemyStats[0].HP -= finDMG;
                        PlayerCombatStats.MP -= PlayerSpells[b].Cost;
                        CreateCombatText(finDMG, NAME, PlayerSpells[b].Act, EnemyStats[0].Name, "Player", "Enemy");
                    } else {
                        let scl = (1 + ((PlayerStats[1].VALUE / 2 + PlayerStats[3].VALUE) / 100)); // This is the scaling value
                        scl = (Math.round(scl * 100)) / 100; // This line rounds the scaled value so that it is always fixed to two decimals.
                        let dmg = Math.floor(((PlayerSpells[b].Power * PlayerSkills[PlayerSpells[b].MagType].Level) * scl) * SpellCrit);
                        if (WPN1.length > 0 && WPN1[0].Type == "Wand") dmg = dmg * WPN1[0].MagScale;
                        SwitchDef();
                        let finDMG = (CalculateDamage(dmg, magdef));
                        EnemyStats[0].HP -= finDMG;
                        PlayerCombatStats.MP -= PlayerSpells[b].Cost;
                        CreateCombatText(finDMG, NAME, "Critically " + PlayerSpells[b].Act, EnemyStats[0].Name, "Player", "Enemy");
                    }
                }
                else {
                    let scl = (1 + ((PlayerStats[1].VALUE / 2 + PlayerStats[3].VALUE) / 100)); // This is the scaling value
                    scl = (Math.round(scl * 100)) / 100; // This line rounds the scaled value so that it is always fixed to two decimals.
                    let dmg = Math.floor((PlayerSpells[b].Power * PlayerSkills[PlayerSpells[b].MagType].Level) * scl)
                    if (WPN1.length > 0 && WPN1[0].Type == "Wand") dmg = dmg * WPN1[0].MagScale;
                    let finDMG = Math.floor(dmg * EnemyShield[0].Block);
                    EnemyStats[0].HP -= finDMG;
                    PlayerCombatStats.MP -= PlayerSpells[b].Cost;
                    CreateCombatText(finDMG, NAME, PlayerSpells[b].Act, EnemyStats[0].Name + ", but they block it", "Player", "Enemy");
                }
            }
            else {
                PlayerCombatStats.MP -= PlayerSpells[b].Cost;
                NonCombatText(NAME, "", "misses their spell! Why did you even bother casting?", "", "Player", "");
            }
        }
        function SwitchDef() {
            if (PlayerSpells[b].MagType == 9) magdef = EnemyStats[0].LightDef;
            else magdef = EnemyStats[0].DarkDef;
        }
        if (EnemyStats[0].HP >= 1) EnemyAttacks();
    }
}

function UpdateStatuses() {
    document.getElementById('EnemyStatuses').textContent = '';
    document.getElementById('PlayerStatuses').textContent = '';
    for (let i = 0; i < EnemyStatusEffects.length; i++) {
        let img = document.createElement('img');
        img.classList.add("StatusEffekt");
        img.id = `ee${i}`;
        img.src = EnemyStatusEffects[i].Icon;
        document.getElementById('EnemyStatuses').appendChild(img);
    }
    for (let i = 0; i < PlayerStatusEffects.length; i++) {
        let img = document.createElement('img');
        img.classList.add("StatusEffekt");
        img.id = `pe${i}`;
        img.src = PlayerStatusEffects[i].Icon;
        document.getElementById('PlayerStatuses').appendChild(img);
    }
}

function CreateCombatText(dmg, name, action, foe, class1, class2) {
    let p = document.createElement('p');
    let s0 = document.createElement('span');
    let s1 = document.createElement('span');
    let s2 = document.createElement('span');
    s0.textContent = dmg;
    s1.textContent = name;
    s2.textContent = foe;
    s0.classList.add("DMG");
    s1.classList.add(class1);
    s2.classList.add(class2);
    p.appendChild(s1);
    p.innerHTML += ` ${action} at `;
    p.appendChild(s2);
    p.innerHTML += ' causing '
    p.appendChild(s0);
    p.innerHTML += ' damage.';
    document.getElementById('CombatActionTexts').insertBefore(p, document.getElementById('CombatActionTexts').firstChild);
}

function NonCombatText(actor, value, action, variable, actorcolor, action2) {
    let p = document.createElement('p');
    let s0 = document.createElement('span');
    let s1 = document.createElement('span');
    s0.textContent = actor;
    s1.textContent = value;
    s0.classList.add(actorcolor);
    s1.classList.add("DMG");
    p.appendChild(s0);
    p.innerHTML += ` ${action} ${action2} `;
    p.appendChild(s1);
    p.innerHTML += ` ${variable}`;
    document.getElementById('CombatActionTexts').insertBefore(p, document.getElementById('CombatActionTexts').firstChild);
}


function CreateBuffer() {
    let p = document.createElement('p');
    p.textContent = `<--------------------- Turn ${turnNum} --------------------->`;
    p.classList.add("Buffer");
    document.getElementById('CombatActionTexts').insertBefore(p, document.getElementById('CombatActionTexts').firstChild);
    turnNum++;
}

function CheckPlayerStatuses() {
    for (let i = 0; i < PlayerStatusEffects.length; i++) {
        if (PlayerStatusEffects[i].For < 1) Adjust();
        else PlayerStatusEffects[i].For--;
        UpdateStatuses();
        function Adjust() {
            if (PlayerStatusEffects[i].Action == "UpDef") {
                PlayerCombatTable[PlayerStatusEffects[i].inc].val = Math.round(PlayerCombatTable[PlayerStatusEffects[i].inc].val / PlayerStatusEffects[i].Power);
                PlayerCombatTable[PlayerStatusEffects[i].dec].val = Math.round(PlayerCombatTable[PlayerStatusEffects[i].dec].val * PlayerStatusEffects[i].Deb);
            }
            UpdateStatuses();
            PlayerStatusEffects.splice(i, 1);
        }
    }
}
