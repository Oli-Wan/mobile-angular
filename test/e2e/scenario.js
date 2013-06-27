'use strict';

describe('angular mobile', function () {

    describe('mission description', function () {
        beforeEach(function () {
            browser().navigateTo('/#/mission/1?page=mission');
        });

        describe("left menu", function () {
            it("should be hidden", function () {
                expect(element(".mission-zone").prop("offsetLeft")).toBe(0);
            });

            it("should be visible on button click", function () {
                hammer(".menu-button").tap();
                expect(display(".mission-zone").horizontalTranslateOffset()).toBe(250);
            });

            it("should be discoverable on drag", function () {
                hammer(".mission-zone").dragRight(10);
                expect(display(".mission-zone").horizontalTranslateOffset()).toBe(250);
            });
        });
    });

    describe("notification", function () {
        beforeEach(function () {
            browser().navigateTo('/');
        });

        it("should show on tap", function () {
            hammer("#notification-toggle").tap();
            sleep(2);
            expect(display("#notification-zone").verticalTranslateOffset()).toBe(400);
            expect(display("#notification-zone").animated()).toBe(true);
        });

        it("should display notifications", function () {
            expect(repeater(".notification-container>a").count()).toBe(1);
        });

        it("should hide notification swipe", function () {
            hammer("#notification-toggle").tap();
            sleep(2);
            hammer(".notification-container>a:first-child").dragRight(400);
            sleep(2);
            expect(display(".notification-container>a:first-child").haveClass("hide")).toBe(true);
        });

        it("should hide on drag up", function () {
            hammer("#notification-zone").dragUp(-100);
            expect(display("#notification-zone").verticalTranslateOffset()).toBe(0);
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

        it("should navigate to new mission description", function () {
            hammer("#missions-table tr>td:first-child").tap();
            expect(browser().location().url()).toBe("/mission/1?page=mission");
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

        it("should create a new mission and redirect to the mission list", function () {
            sleep(1);
            select("mission.vehicle").option("Hélicoptère");
            select("mission.responsible").option("Doe John");
            input("password").enter("1234");
            hammer("#submit").tap();
            sleep(1);
            expect(element("#missions-table>tbody>tr").count()).toBe(2);
        });
    });
});
