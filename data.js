const os = require('os');
const interfaces = os.networkInterfaces();

var extarray = [];
var ctr = 0;
    // Iterate over interfaces ...
    for (var dev in interfaces) {
        var intarray = {};
        // ... and find the one that matches the criteria
        var iface = interfaces[dev];
        intarray.id = ctr;
        intarray.interfacename = dev;
        intarray.address = iface[0].address;
        intarray.alias = dev;
        extarray.push(intarray);
        ctr = ctr + 1;
    };
    
module.exports = extarray;