module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return require('../modules/CommandSwitchMock');
        default:
            return require('../modules/raspberryPiSwitch');
    }
};