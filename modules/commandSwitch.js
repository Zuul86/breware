module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return require('../modules/mockCommandSwitch');

        case 'production':
            return require('../modules/raspberryPiSwitch');

        default:
            throw new Error('Invalid Environment:' + process.env.NODE_ENV);
    }
};