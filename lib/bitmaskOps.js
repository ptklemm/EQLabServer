// http://codeforces.com/blog/entry/18169

const AAClasses = [
  { id: 0, bitmask: 0, name: 'None'},
  { id: 1, bitmask: 2, name: 'Warrior' },
  { id: 2, bitmask: 4, name: 'Cleric' },
  { id: 3, bitmask: 8, name: 'Paladin' },
  { id: 4, bitmask: 16, name: 'Ranger' },
  { id: 5, bitmask: 32, name: 'Shadow Knight' },
  { id: 6, bitmask: 64, name: 'Druid' },
  { id: 7, bitmask: 128, name: 'Monk' },
  { id: 8, bitmask: 256, name: 'Bard' },
  { id: 9, bitmask: 512, name: 'Rogue' },
  { id: 10, bitmask: 1024, name: 'Shaman' },
  { id: 11, bitmask: 2048, name: 'Necromancer' },
  { id: 12, bitmask: 4096, name: 'Wizard' },
  { id: 13, bitmask: 8192, name: 'Magician' },
  { id: 14, bitmask: 16384, name: 'Enchanter' },
  { id: 15, bitmask: 32768, name: 'Beastlord' }
]

const AAClassBerserker = { id: 16, bitmask: null, name: 'Berserker' }

const bitmaskOps = {

  getAABitmask: (classID) => {
    if (classID === 16) return null;
    return AAClasses[classID].bitmask;
  },

  AAClassIsEnabled: (classes, classID, berserker = 0) => {
    if (classID === 16 && berserker === 0) { return false };
    if (classID === 16 && berserker === 1) { return true };

    let classIsEnabled = classes & (1 << AAClasses[classID].id);

    if (classIsEnabled) { return true } else { return false };
  },

  getAAClasses: (classes, berserker) => {
    if (classes === 0 && berserker === 0) return [];

    let classArray = [];

    for (let i = 0, len = AAClasses.length; i < len; i++) {
      let classIsEnabled = classes & (1 << AAClasses[i].id);
      if (classIsEnabled) { classArray.push(AAClasses[i]) }
    }

    if (berserker === 1) {
      classArray.push(AAClassBerserker);
    }

    return classArray;
  }


}

module.exports = bitmaskOps;

// const classes = 65534;
// const classes = 512 + 256 + 16;
// const berserker = 1;

// console.log(getAAClasses(classes, berserker))