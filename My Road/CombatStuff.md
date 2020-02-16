# DEFENSE

Defense first check if combatant's total DEF is more than the enemy's total DMG. 
If that is the case, then defense will be twice as effective.

An Idea:
    MAX def is 1000. Damage calculation example: 200 DMG, 300 DEF.
    (200^3/300^2) * 0.4 = 35 DMG.
    Example two: 300 DMG, 200 DEF.
    ((300^3/200^2) * 0.8 - 0.27 * (300^2/ 200))/1.42 = 295 DMG.

Better idea:
    dmg = atk * atk / (atk + def)

As is seen above, when attack power is significantly lower than than Defense, damage is greatly diminished. 
The opposite becomes evident when attack power overpowers Defense.

# FLAVOUR

To make combat interesting, I'm going to write flavour texts for attacks and events. It's far too boring for a small text to just say "Dealt x damage to enemy".
Instead it'd be more like "You swing your ${weaponName} towards the ${enemyName}, but it dodges the blow! You quickly follow up with a feint and a real strike, catching it offguard and dealing ${dmg} damage!"

# MECHANICS

The combat screen will have a few buttons for the player to press, that reveal more options during the fight.

Ideally, there will be many status effects that CAN stack and lots of different factors that can play into how a fight goes.
Still need to figure out how magic is going to work. Wands will be two handed blunt weapons that have a MagAdjust stat, just like Dark Souls.