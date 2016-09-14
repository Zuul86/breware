module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return require('../modules/TemperatureSensorMock');

        case 'production':
            return require('../modules/bw_ds18b20');

        default:
            throw new Error('Invalid Environment:' + process.env.NODE_ENV);
    }
};