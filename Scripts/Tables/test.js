

function CalcDamage(atk, def) {
    let dmg = atk * atk / (atk + def);
    return `Total damage is ${dmg}`;
}