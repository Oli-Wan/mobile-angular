'use strict';

describe('angular mobile', function () {

    describe("notification", function () {
        beforeEach(function () {
            browser().navigateTo('/');
        });

        it("should show on tap", function () {
            hammer("#notification-toggle").tap();
            sleep(1);
            expect(css("#notification-zone").verticalTranslateOffset()).toBe(400);
            expect(css("#notification-zone").animated()).toBe(true);
        });


    });

    describe('missions', function () {

        beforeEach(function () {
            browser().navigateTo('/');
        });

        it("should be the mission list page", function () {
            expect(element('[ng-view] h1:first').text()).toMatch("Missions");
        });

        it('should render the mission table', function () {
            expect(element("#missions-table").count()).toBe(1);
        });

        it("should have a new mission link", function () {
            expect(element("a:contains('Ajouter une nouvelle mission')").count()).toBe(1);
        });
    });

    describe('new mission form', function () {

        beforeEach(function () {
            browser().navigateTo('#/mission/new');
        });

        it("should render new mission form", function () {
            expect(element('[ng-view] h3:first').text()).toMatch("Ajouter une nouvelle mission");
        });

        it("should require a responsible", function () {
            sleep(1);
            select("mission.responsible").option("");
            select("mission.vehicle").option("Voiture");
            input("password").enter("1234");
            expect(element("#submit[disabled='disabled']").count()).toBe(1);
        });

        it("should require a vehicle", function () {
            sleep(1);
            select("mission.vehicle").option("");
            select("mission.responsible").option("Doe John");
            input("password").enter("1234");
            expect(element("#submit[disabled='disabled']").count()).toBe(1);
        });

        it("should require a password", function () {
            sleep(1);
            select("mission.vehicle").option("Voiture");
            input("password").enter("");
            expect(element("#submit[disabled='disabled']").count()).toBe(1);
        });

        it("should require a true password", function () {
            input("password").enter("09483");
            hammer("#submit").tap();
            expect(element("div.alert.alert-error").count()).toBe(1);
            expect(element("div.alert.alert-error").text()).toContain("Mauvais mot de passe");
        });

        it("should create a new mission", function () {
            sleep(1);
            select("mission.vehicle").option("Hélicoptère");
            select("mission.responsible").option("Doe John");
            input("password").enter("1234");
            hammer("#submit").tap();
            expect(element("#missions-table>tbody>tr").count()).toBe(2);
        });
    });
});
