const StaticEnemies = [
    {Name: "Goblin Runt", Lvl: 1, HP: 150, maxHP: 150, STA: 50, maxSTA: 50, SlashDef: 0, PierceDef: 0, BluntDef: 0, LightDef: 0, DarkDef: 0, TotalDMG: 5, BRAIN: "none", block: 6, dodge: 4, crit: 5, xp: 25},
    {Name: "Goblin Chief", Lvl: 3, HP: 175, maxHP: 175, STA: 60, maxSTA: 60, SlashDef: 0, PierceDef: 0, BluntDef: 0, LightDef: 0, DarkDef: 0, TotalDMG: 5, BRAIN: "none", block: 6, dodge: 4, crit: 5, xp: 40},
    {Name: "Hobgoblin", Lvl: 5, HP: 210, maxHP: 210, STA: 85, maxSTA: 85, SlashDef: 0, PierceDef: 0, BluntDef: 0, LightDef: 0, DarkDef: 0, TotalDMG: 8, BRAIN: "Anti-vaxx", block: 6, dodge: 4, crit: 5, xp: 60}
]

// All of these tables are for storing ALL possible equipment enemies can use.
const EnemyWeapons = [
    {Name: "Shortsword1", Type: "Slash", DMG: 26, AllowShield: true, CRIT: 1.1},
    {Name: "Shortsword2", Type: "Slash", DMG: 33, AllowShield: true, CRIT: 1.12}
];

const EnemyTorso = [
    {Name: "LeatArmor1", Type: "Chestplate", SlashDef: 6, PierceDef: 8, BluntDef: 21, LightDef: 5, DarkDef: 5, ItemType: "Torso" },
    {Name: "LeatArmor2", Type: "Chestplate", SlashDef: 8, PierceDef: 9, BluntDef: 24, LightDef: 6, DarkDef: 6, ItemType: "Torso" }
];

const EnemyHead = [
    {Name: "LeatHelm1", Type: "Helmet", SlashDef: 4, PierceDef: 5, BluntDef: 13, LightDef: 5, DarkDef: 5, ItemType: "Head" },
    {Name: "LeatHelm2", Type: "Helmet", SlashDef: 6, PierceDef: 6, BluntDef: 15, LightDef: 6, DarkDef: 6, ItemType: "Head" }
];

const EnemyHands = [
    {Name: "LeatGloves1", Type: "Gloves", SlashDef: 4, PierceDef: 5, BluntDef: 10, LightDef: 2, DarkDef: 1, ItemType: "Hands" },
    {Name: "LeatGloves2", Type: "Gloves", SlashDef: 6, PierceDef: 5, BluntDef: 12, LightDef: 2, DarkDef: 1, ItemType: "Hands" }
];

const EnemyLegs = [
    {Name: "LeatPants1", Type: "Leggings", SlashDef: 7, PierceDef: 5, BluntDef: 16, LightDef: 5, DarkDef: 5, ItemType: "Legs" },
    {Name: "LeatPants1", Type: "Leggings", SlashDef: 9, PierceDef: 6, BluntDef: 21, LightDef: 6, DarkDef: 6, ItemType: "Legs" }
];

const EnemyFeet = [
    {Name: "LeatBoots1", Type: "Sabatons", SlashDef: 5, PierceDef: 5, BluntDef: 8, LightDef: 1, DarkDef: 1, ItemType: "Feet" },
    {Name: "LeatBoots1", Type: "Sabatons", SlashDef: 6, PierceDef: 6, BluntDef: 9, LightDef: 2, DarkDef: 2, ItemType: "Feet" }
];

const EnemyShields = [
    {Name: "LeatShield1", Type: "Shield",  SlashDef: 4, PierceDef: 4, BluntDef: 6, LightDef: 2, DarkDef: 2, Block: 0.3}, // Block = percentage of damage shield blocks in case of successful block. 0.3 = 70% blocked.
    {Name: "LeatShield2", Type: "Shield",  SlashDef: 8, PierceDef: 8, BluntDef: 12, LightDef: 4, DarkDef: 4, Block: 0.28} 
];

// These tables are for actually equipping the equipment enemies use.

let EnemyArmour = [];

let EnemyWeapon = [];

let EnemyShield = [];

let EnemyRings = [];

// This table is for the enemy in combat.

let EnemyStats = [];

// These tables store some moves for enemies

const UniversalMoves = [
    {Name: "Light Attack", Power: 1, Cost: 8, Action: "Slashes"},
    {Name: "Heavy Attack", Power: 1.2, Cost: 20, Action: "Slashes"},
    {Name: "Heal up", Power: 0.25, Cost: 20}
];

// This table will store all status ailments

let EnemyStatusEffects = [];