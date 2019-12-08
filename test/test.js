const fs              = require('fs-extra'),
      path            = require('path'),
      D3Node          = require('d3-node'),
      _               = require('lodash'),
      __mapsDirectory = path.resolve(__dirname + '/../../files/maps');


/********************************************************************************************/


function renderZoneMap(zoneName) {
  /*
  There are two types of entries in the map files; Lines (L) and points (P). 
  A line consists of two points (start and end) with each three coordinates (a 3D vector), followed by a color code. 
  A point consists of one point with three coordinates, followed by a color code, a font size and a label.

  A coordinate in the map is in the form of Y, X, Z, and is different from the in-game /loc coordinate. 
  First, the X and Y coordinates are swapped. 
  Second, they are multiplied by -1, meaning that 100 /loc translates into -100 in the map file.

  Color codes are in the form of R (red), G (green), B (blue), meaning that 0, 0, 0 is black, and 255, 255, 255 is white.
  Font sizes have three possible values: 1, 2 and 3, where 1 is the smallest (and borderline unreadable), and 3 is the largest.
  Labels are written with underscores instead of spaces.
  */
  return new Promise((resolve, reject) => {

  const d3n = new D3Node({styles:'.test {fill:#808080;}'});
  

  let xArr = [], yArr = [];
  let x_min, x_max;
  let y_min, y_max;
  let dimensions;

  let points, pArr, pCoordsArr, p, pColorArr, pColor, pFontSize, pLabel;
  let lines, lArr, lCoordsArr, p1Arr, p1, p2Arr, p2, lColorArr, lColor;
 

  fs.readFile(path.resolve(__mapsDirectory + `/${zoneName}.txt`))
    .then(data => {
      data = data.toString();

      // Find All Points
      points = data.match(/P\s.+/g).map(line => {

        pArr = line.slice(2).split(',').map(str => str.trim())

        pCoordsArr = pArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p = {x: pCoordsArr[1], y: pCoordsArr[0], z: pCoordsArr[2]};
  
        pColorArr = pArr.slice(3, 6);
        pColor = {r: parseInt(pColorArr[0], 10), g: parseInt(pColorArr[1], 10), b: parseInt(pColorArr[2], 10)}
  
        pFontSize = parseInt(pArr.slice(6)[0], 10);
        pLabel = pArr.pop();

        return {
          type: 'P',
          p,
          color: pColor,
          fontSize: pFontSize,
          label: pLabel
        }
      })

      // Find All Lines
      lines = data.match(/L\s.+/g).map(line => {

        lArr = line.slice(2).split(',').map(str => str.trim())

        p1Arr = lArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p1 = {x: p1Arr[1], y: p1Arr[0], z: p1Arr[2]};
        
        p2Arr = lArr.slice(3, 6).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p2 = {x: p2Arr[1], y: p2Arr[0], z: p2Arr[2]};
  
        lColorArr = lArr.slice(6);
        lColor = {r: parseInt(lColorArr[0], 10), g: parseInt(lColorArr[1], 10), b: parseInt(lColorArr[2], 10)}
  
        return {
          type: 'L',
          p1,
          p2,
          color: lColor
        }
      })

      // Calculate Dimensions of SVG, adding some extra for margins
      for (let i = 0, len = points.length; i < len; i++) {
        xArr.push(points[i].p.x);
        yArr.push(points[i].p.y);
      }
      for (let i = 0, len = lines.length; i < len; i++) {
        xArr.push(lines[i].p1.x, lines[i].p2.x);
        yArr.push(lines[i].p1.y, lines[i].p2.y);
      }

      x_min = _.min(xArr);
      x_max = _.max(xArr);
      y_min = _.min(yArr);
      y_max = _.max(yArr);
      
      dimensions = {
        width: Math.floor((Math.abs(x_min) + Math.abs(x_max)) * 1.1),
        height: Math.floor((Math.abs(y_min) + Math.abs(y_max)) * 1.1)
      }

      // Create SVG
      let svg = d3n.createSVG(dimensions.width, dimensions.height);
      
      // Create Lines
      // x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" 
      for (let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i];
        svg
          .append('line')
          .attr('x1', line.p1.x)
          .attr('y1', line.p1.y)
          .attr('x2', line.p2.x)
          .attr('y2', line.p2.y)
          .attr('style', `stroke:rgb(${line.color.r},${line.color.g},${line.color.b});stroke-width:2`)
      }
      
      svg = d3n.svgString();
      // console.log(svg);
      resolve(svg);
    })
    .catch(error => {
      reject(error);
    });
 
  
  });
}

renderZoneMap('blackburrow');
