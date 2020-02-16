'use strict';

function GetPlayerMaximumDamage() {
    let mdmg = 0;
    let pdmg = 0;
    for (let i = 0; i < PlayerPhysicalList.length; i++) {
        if (PlayerCombatStats.STA >= PlayerPhysicalList[i].Cost) {
            let atk = Math.floor(PlayerPhysicalList[i].POW * PlayerCombatTable[9].val);
            let dmg = CalculateDamage(atk, defUsed);
            if (dmg > pdmg) pdmg = dmg;
        }
    }
    for (let i = 0; i < PlayerMagicalList.length; i++) {
        if (PlayerCombatStats.MP >= PlayerMagicalList[i].Cost) {
            let magdef = 0;
            let scl = (1 + ((PlayerStats[1].VALUE / 2 + PlayerStats[3].VALUE) / 100)); // This is the scaling value
            scl = (Math.round(scl * 100)) / 100; // This line rounds the scaled value so that it is always fixed to two decimals.
            let dmg = Math.floor((PlayerMagicalList[i].POW * PlayerSkills[PlayerMagicalList[i].TYPE].Level) * scl)
            if (WPN1.length > 0 && WPN1[0].Type == "Wand") dmg = dmg * WPN1[0].MagScale;
            SwitchDef();
            let finDMG = (CalculateDamage(dmg, magdef));
            if (finDMG > mdmg) mdmg = finDMG;
            function SwitchDef() {
                if (PlayerMagicalList[i].TYPE == 9) magdef = EnemyStats[0].LightDef;
                else magdef = EnemyStats[0].DarkDef;
            }
        }
    }
    if(pdmg > mdmg) return pdmg;
    else return mdmg;
}

function GetPlayerAverageDamage() {
    let mdmg = 0;
    let pdmg = 0;
    for (let i = 0; i < PlayerPhysicalList; i++) {
        if (PlayerCombatStats.STA >= PlayerPhysicalList[i].Cost) {
            let atk = Math.floor(PlayerPhysicalList[i].POW * PlayerCombatTable[9].val);
            let dmg = CalculateDamage(atk, defUsed);
            pdmg += dmg;
        }
    }
    for (let i = 0; i < PlayerMagicalList; i++) {
        if (PlayerCombatStats.MP >= PlayerMagicalList[i].Cost) {
            let magdef = 0;
            let scl = (1 + ((PlayerStats[1].VALUE / 2 + PlayerStats[3].VALUE) / 100)); // This is the scaling value
            scl = (Math.round(scl * 100)) / 100; // This line rounds the scaled value so that it is always fixed to two decimals.
            let dmg = Math.floor((PlayerMagicalList[i].POW * PlayerSkills[PlayerMagicalList[i].TYPE].Level) * scl)
            if (WPN1.length > 0 && WPN1[0].Type == "Wand") dmg = dmg * WPN1[0].MagScale;
            SwitchDef();
            let finDMG = (CalculateDamage(dmg, magdef));
            mdmg += findmg;
            function SwitchDef() {
                if (PlayerMagicalList[i].TYPE == 9) magdef = EnemyStats[0].LightDef;
                else magdef = EnemyStats[0].DarkDef;
            }
        }
    }
    let returnDamage = (pdmg + mdmg) / (PlayerPhysicalList.length + PlayerMagicalList.length);
    return returnDamage;
}