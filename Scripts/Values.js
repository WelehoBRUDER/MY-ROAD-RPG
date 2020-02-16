'use strict';

let PlayerStats = [
    {"VALUE": 8, "NAME": "STR", "DESC": "Strength increases damage dealt with weapons that scale with strength. The following skills can't be upgraded above 1/4 of Strength: One Handed, Two Handed and Unarmed."},
    {"VALUE": 8, "NAME": "DEX", "DESC": "Dexterity increases damage dealt with weapons that scale with dexterity. The following skills can't be upgraded above 1/4 of Dexterity: Dual Wielding, Dodge, Bow and Stealth."},
    {"VALUE": 8, "NAME": "VIT", "DESC": "Vitality increases maximum hit points by 50 per level and improves natural defense. The following skills can't be upgraded above 1/4 of Vitality: Shield and Toughness."},
    {"VALUE": 5, "NAME": "END", "DESC": "Endurance increases maximum stamina by 25 per level and improves carry weight. The following skills can't be upgraded above 1/4 of Endurance: Healing, Light Magic and Dark Magic."}
];

let Class = "none";

let PlayerSkills = [
    {"Level": 0, "Name": "Dual Wielding", "Needs": "DEX", "Desc": "Dual Wielding skill improves damage by 10% per level when using two weapons."},
    {"Level": 0, "Name": "One Handed", "Needs": "STR", "Desc": "One Handed skill improves damage by 10% per level when one handing a weapon."},
    {"Level": 0, "Name": "Two Handed", "Needs": "STR", "Desc": "Two Handed skill improves damage by 10% per level when two handing a weapon."},
    {"Level": 10, "Name": "Shield", "Needs": "VIT", "Desc": "Shield skill improves block chance and allows the use of stronger shields."},
    {"Level": 3, "Name": "Dodge", "Needs": "DEX", "Desc": "Dodge skill improves dodge chance by 4% per level."},
    {"Level": 0, "Name": "Bow", "Needs": "DEX", "Desc": "Bow skill improves damage done with bows by 10% per level."},
    {"Level": 0, "Name": "Toughness", "Needs": "VIT", "Desc": "Toughness skill increases maximum hit points by 3% per level."},
    {"Level": 0, "Name": "Unarmed", "Needs": "STR", "Desc": "Unarmed skill increases melee damage by 5 per level when using fists."},
    {"Level": 1, "Name": "Healing", "Needs": "END", "Desc": "Healing skill improves all sources of healing by 5% per level."},
    {"Level": 3, "Name": "Light Magic", "Needs": "END", "Desc": "Light Magic skill improves light damage by 5% per level and allows the use of stronger spells."},
    {"Level": 3, "Name": "Dark Magic", "Needs": "END", "Desc": "Dark Magic skill improves dark damage by 5% per level and allows the use of stronger spells."},
    {"Level": 0, "Name": "Stealth", "Needs": "DEX", "Desc": "Stealth skill improves all actions that require stealth."}
];

let CombatConsumables = [];

let PlayerMisc = {
    "STAT": 8,
    "SKILL": 4
};
let timer;

let turnNum = 1;

let loc = 0;

let spec = 51;

let NAME = "Jonathan Joestar";

let defUsed = "0";

let ItemSelect = "";

let DeepCopyEnemies;

let CritChance = 5;

let SpellCrit = 1.2;

let CHARS = document.getElementById('CharacterScreen');

let DmgType = "";

let DamageWeaken = 1;

let Ptog = false;
let Mtog = false;
let Itog = false;

let SelectedEnemy = 0;

// Lazy way of getting random equipment for enemies
let EqMin = 0;
let EqMax = 0;

let PlayerCombatStats = {
    "HP": 500,
    "maxHP": 50,
    "STA": 500000,
    "maxSTA": 100000,
    "MP": 5000,
    "maxMP": 60,
    "exp": 0,
    "expneed": 0,
    "level": 1
};



let PlayerCombatTable = [
    {"Name": "SlashDef", "val": 10, "desc": "Protection against Slash Damage."},
    {"Name": "BluntDef", "val": 10, "desc": "Protection against Blunt Damage."},
    {"Name": "PierceDef", "val": 10, "desc": "Protection against Pierce Damage."},
    {"Name": "LightDef", "val": 10, "desc": "Protection against Light Damage."},
    {"Name": "DarkDef", "val": 10, "desc": "Protection against Dark Damage."},
    {"Name": "wpnDMG", "val": 0, "desc": "Base damage of main hand weapon."},
    {"Name": "wpn2DMG", "val": 0, "desc": "Base damage of second hand weapon."},
    {"Name": "wpnScale", "val": 0, "desc": "Extra damage from stat scaling on main hand weapon."},
    {"Name": "wpnScale2", "val": 0, "desc": "Extra damage from stat scaling on second hand weapon."},
    {"Name": "TotalDMG", "val": 0, "desc": "Total damage from all weapons with scaling."}
];

let PlayerPhysicalList = [
    {ID: "LA", POW: 1, Cost: 8},
    {ID: "HA", POW: 1.2, Cost: 20},
    {ID: "BA", POW: 0.9, Cost: 35},
    {ID: "TD", POW: 1, Cost: 40},
    {ID: "LC", POW: 1.1, Cost: 40},
    {ID: "CB", POW: 1.25, Cost: 30},
]

let PlayerMagicalList = [
    {ID: "FI", POW: 15, TYPE: 9, Cost: 20},
    {ID: "DB", POW: 21, TYPE: 10, Cost: 25}
]


// damage value explains how much damage the victim takes per turn. In this case; value < 1, the value actually means %. For example: 0.3 = 3% of maxHP.

let PlayerAbilities = [
    {Name: "Bash", Action: "Stun", Power: 0.9, Cost: 35, Desc: "Deal damage and have a 50% chance of stunning, cost:", Last: 35, End: "STA.", Icon: "Textures/Effects/Stunned.png", For: 2, Act: "bashes", EffectDesc: "Stunned for", EffectEnd: "turns."},
    {Name: "Iron Skin", Action: "UpDef", Power: 1.5, Cost: 25, Desc: "50% increase to slash defense, 30% decrease to blunt defense, cost:", Last: 25, End: "STA.", Icon: "Textures/Effects/Harden.png", For: 4, Act: "uses iron skin", inc: 0, dec: 1, Deb: 1.3, EffectDesc: "Slash Defense up by 50%, Blunt Defense down by 30% for", EffectEnd: "turns."},
    {Name: "Toxic Dagger", Action:"DMGOT", Power: 1, Cost: 40, Desc: "Throw a poisoned dagger at the enemy. 50% chance of poisoning. cost: ", Last: 40, End: "STA", Icon: "Textures/Effects/Poison.png", For: 6, Act: "throws a poisoned dagger", damage: 0.3, EffectDesc: "Suffering from poison for", EffectEnd: "turns.", TurnDesc: "poison"},
    {Name: "Lacerating Arrow", Action:"DMGOT", Power: 1.1, Cost: 40, Desc: "Shoot a lacerating arrow at enemy. 50% chance of causing bleed. cost: ", Last: 40, End: "STA", Icon: "Textures/Effects/Bleed.png", For: 3, Act: "shoots a lacerating arrow", damage: 0.5, EffectDesc: "Bleeding for", EffectEnd: "turns.", TurnDesc: "bleeding"},
    {Name: "Crippling Blow", Action:"DEBUFF", Power: 1.25, Cost: 30, Desc: "Strike the enemy's weakpoint for heavy damage. 50% chance of inflicting weaken. cost: ", Last: 30, End: "STA", Icon: "Textures/Effects/Weaken.png", For: 4, Act: "strikes", EffectDesc: "Weakened for", EffectEnd: "turns.", Debuff: 1.8}
]

let PlayerSpells = [
    {Name: "Minor Heal", Action: "Heal", Power: 0.15, Cost: 30, Desc: "Heal yourself for 15% of maximum hp. cost:", End: "MP", Act: "casts minor heal", Last: 30, MagType: 8},
    {Name: "Fire", Action: "Hurt", Power: 15, Cost: 20, Desc: "Deal fire damage to enemy. Light spell. cost:", End: "MP", Act: "hurls fire ball", Last: 20, MagType: 9},
    {Name: "Dark Bolt", Action: "Hurt", Power: 21, Cost: 25, Desc: "Shoot a bolt of energy at enemy. Dark spell. cost:", End: "MP", Act: "shoots a dark bolt", Last: 25, MagType: 10}
]

let PlayerStatusEffects = [];

let BGMusics = [
    {ID: "Combat01", SRC: "Music/Combat1.mp3"}
]