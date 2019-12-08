// let test = /[^\^]+(?=\^)?/g.exec("19,1^20,1^24,1^35,1^10,1^1,1");


let str = "1,1,2,10000,90^2,1,25,8000,60000^3,1^10,1";

// let matches = str.match(/[^\^]+(?=\^)?/g);
let matches = str.match(/[^^]+(?=^)?/g)
// let details = [];
let sa = [];

// for (let i = 0; i < matches.length; i++) {
//   let array = matches[i].split(',');
//   details.push(array);
// }

// let details = matches.map(match => {
//   return match.split(',');
// })

// sa = str.match(/[^^]+(?=^)?/g)
// .map(match => match.split(','))
// .map(ability => {
//   return {
//     abilityID: ability[0],
//     level: ability[1],
//     params: ability.length > 2 ? ability.slice(2) : null
//   }
// });

sa = str.match(/[^^]+(?=^)?/g)
.map(match => match.split(','))
.reduce((sa, ability) => {
  // ability = ability.map(property => parseInt(property, 10))
  switch(ability[0]) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '11':
    case '29':
    case '32':
    case '33':
    case '37':
    case '40':
    case '41':
    case '43':
    case '44':
      return {
        ...sa,
        [ability[0]]: {
          level: ability[1] ? ability[1] : null,
          params: ability.length > 2 ? ability.slice(2) : []
        }
      }
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
    case '12':
    case '13':
    case '14':
    case '15':
    case '16':
    case '17':
    case '18':
    case '19':
    case '20':
    case '21':
    case '22':
    case '23':
    case '24':
    case '25':
    case '26':
    case '27':
    case '28':
    case '30':
    case '31':
    case '34':
    case '35':
    case '36':
    case '38':
    case '39':
    case '42':
      return {
        ...sa,
        [ability[0]]: ability[1] ? ability[1] : '0',
      }
    default:
      return sa
  }
}, {});


console.log(sa)