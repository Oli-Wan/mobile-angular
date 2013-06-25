'use strict';

describe('angular mobile', function () {
    describe("initialization", function () {
        it('should go to initialization', function () {
            browser().navigateTo('/');
            var test = browser().window().path();
            console.log(test);
        });
    });

    /*
     describe('missions', function () {
     beforeEach(function () {
     browser().window.localStorage.setItem("boostraped", true);
     browser().navigateTo('#/');
     });

     it('should render mission list', function () {
     expect(element('[ng-view] h1:first').text()).toMatch("Missions");
     expect(element("#missions-table")).toBeDefined();
     });

     it("should have a new mission link", function () {
     expect(element("a:contains('Ajouter une nouvelle mission')")).toBeDefined();
     });
     });*/
});
