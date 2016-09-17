module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return require('../modules/TemperatureSensorMock');
        default:
            return require('../modules/bw_ds18b20');
    }
};