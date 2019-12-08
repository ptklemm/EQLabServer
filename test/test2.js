const math = require('mathjs');

let point = {x: -736.1915332031035, y: -1105.9207974139235, z: undefined}

const ans = [
  {
    point: {x: -726, y: -1136, z: 1057}
  },
  {
    point: {x: -785, y: -1103, z: 1057}
  },
  {
    point: {x: -785, y: -1092, z: 1057}
  },
];

const x = point.x, y = point.y
const Ax = ans[0].point.x, Ay = ans[0].point.y, Az = ans[0].point.z;
const Bx = ans[1].point.x, By = ans[1].point.y, Bz = ans[1].point.z;
const Cx = ans[2].point.x, Cy = ans[2].point.y, Cz = ans[2].point.z;


const e1 = (x-Ax)*((By-Ay)*(Cz-Az)-(Bz-Az)*(Cy-Ay)) - (y-Ay)*((Bx-Ax)*(Cz-Az)-(Bz-Az)*(Cx-Ax));
const e2 = ((Bx-Ax)*(Cy-Ay)-(By-Ay)*(Cx-Ax));
const e3 = `z = (${e1}/${e2} * -1) + ${Az}`;

point.z = math.eval(e3);

console.log(point.z)