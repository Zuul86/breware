var should = require('should');
var sinon = require('sinon');
var moment = require('moment');
var mash = require('../modules/mash');

describe('mash', function () {

    describe('startMash', function () {

        it('should start mash when has steps', function () {
            var mashTest = mash();
            mashTest.addStep();
            mashTest.startMash().should.be.true;
        });

        it('should not start mash if already started', function () {
            var mashTest = mash();
            mashTest.addStep('TEST');
            mashTest.startMash();
            mashTest.startMash().should.be.false;
        });

    //    it('should return false if mash started', function () {
    //        var mashTest = mash();
    //        mashTest.startMash();
    //        mashTest.canStartMash().should.be.false;
    //    });

    //    it('should return false if mash started and has steps', function () {
    //        var mashTest = mash();
    //        mashTest.addStep('TEST');
    //        mashTest.startMash();
    //        mashTest.canStartMash().should.be.false;
    //    });
    });

    describe('aboveStepTemp', function () {
        it('should return true if current temperature is greater then current step temperature', function () {
            var mashTest = mash();
            mashTest.addStep({ steptemp: 5 });
            mashTest.aboveStepTemp(6).should.be.true;
        });

        it('should return false if current temperature is less then current step temperature', function () {
            var mashTest = mash();
            mashTest.addStep({ steptemp: 6 });
            mashTest.aboveStepTemp(5).should.be.false;
        });

        //it('should call startmashtimer', function () {
        //    var mashTest = mash();

        //    sinon.spy(mashTest, "startMashTimer");
        //    mashTest.addStep({ steptemp: 5 });
        //    mashTest.aboveStepTemp(6);
        //    //spy.withArgs([{ steptemp: 5 }]).calledOnce.should.be.true;
        //});
    });

    describe('currentMashTime', function () {
        it('should correctly calculate', function () {
            var clock = sinon.useFakeTimers(0, "Date");

            var mashTest = mash();
            mashTest.addStep({ steptemp: 6, steptime: 10 });
            mashTest.startMash();

            clock.tick(5000)

            mashTest.currentMashTime().should.be.eql(5/60);
            
            clock.restore();
        });
    });

    describe('isMashComplete', function () {
        it('should return true', function () {
            var clock = sinon.useFakeTimers(0, "Date");

            var mashTest = mash();
            mashTest.addStep({ steptemp: 6, steptime: 1 });
            mashTest.startMash();

            clock.tick(61000);

            var result = mashTest.isMachComplete();

            result.should.be.true;
        });
    });
});