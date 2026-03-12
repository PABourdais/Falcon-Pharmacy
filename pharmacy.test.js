import { Drug, Pharmacy } from "./pharmacy";

const update = (name, expiresIn, benefit) =>
  new Pharmacy([new Drug(name, expiresIn, benefit)]).updateBenefitValue()[0];

describe("Pharmacy", () => {
  describe("Doliprane", () => {
    it("should decrease benefit and expiresIn by 1", () => {
      expect(update("Doliprane", 10, 20)).toEqual(new Drug("Doliprane", 9, 19));
    });

    it("should decrease benefit twice as fast after expiration", () => {
      expect(update("Doliprane", 0, 10)).toEqual(new Drug("Doliprane", -1, 8));
    });

    it("should not decrease benefit below 0", () => {
      expect(update("Doliprane", 10, 0)).toEqual(new Drug("Doliprane", 9, 0));
    });

    it("should not decrease benefit below 0 after expiration", () => {
      expect(update("Doliprane", 0, 0)).toEqual(new Drug("Doliprane", -1, 0));
    });

    it("should not decrease benefit below 0 when benefit is 1 after expiration", () => {
      expect(update("Doliprane", 0, 1)).toEqual(new Drug("Doliprane", -1, 0));
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 before expiration", () => {
      expect(update("Herbal Tea", 10, 20)).toEqual(
        new Drug("Herbal Tea", 9, 21),
      );
    });

    it("should increase benefit by 2 after expiration", () => {
      expect(update("Herbal Tea", 0, 20)).toEqual(
        new Drug("Herbal Tea", -1, 22),
      );
    });

    it("should not increase benefit above 50", () => {
      expect(update("Herbal Tea", 10, 50)).toEqual(
        new Drug("Herbal Tea", 9, 50),
      );
    });

    it("should not increase benefit above 50 after expiration", () => {
      expect(update("Herbal Tea", 0, 49)).toEqual(
        new Drug("Herbal Tea", -1, 50),
      );
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days left", () => {
      expect(update("Fervex", 15, 20)).toEqual(new Drug("Fervex", 14, 21));
    });

    it("should still increase benefit by 1 when 11 days left", () => {
      expect(update("Fervex", 11, 20)).toEqual(new Drug("Fervex", 10, 21));
    });

    it("should increase benefit by 2 when 10 days or less left", () => {
      expect(update("Fervex", 10, 20)).toEqual(new Drug("Fervex", 9, 22));
    });

    it("should still increase benefit by 2 when 6 days left", () => {
      expect(update("Fervex", 6, 20)).toEqual(new Drug("Fervex", 5, 22));
    });

    it("should increase benefit by 3 when 5 days or less left", () => {
      expect(update("Fervex", 5, 20)).toEqual(new Drug("Fervex", 4, 23));
    });

    it("should drop benefit to 0 after expiration", () => {
      expect(update("Fervex", 0, 30)).toEqual(new Drug("Fervex", -1, 0));
    });

    it("should not increase benefit above 50 when +1", () => {
      expect(update("Fervex", 15, 50)).toEqual(new Drug("Fervex", 14, 50));
    });

    it("should not increase benefit above 50 when +2", () => {
      expect(update("Fervex", 10, 49)).toEqual(new Drug("Fervex", 9, 50));
    });

    it("should not increase benefit above 50 when +3", () => {
      expect(update("Fervex", 5, 49)).toEqual(new Drug("Fervex", 4, 50));
    });
  });

  describe("Dafalgan", () => {
    it("should decrease benefit by 2 and expiresIn by 1", () => {
      expect(update("Dafalgan", 10, 20)).toEqual(new Drug("Dafalgan", 9, 18));
    });

    it("should decrease benefit by 4 after expiration", () => {
      expect(update("Dafalgan", 0, 20)).toEqual(new Drug("Dafalgan", -1, 16));
    });

    it("should not decrease benefit below 0", () => {
      expect(update("Dafalgan", 10, 1)).toEqual(new Drug("Dafalgan", 9, 0));
    });

    it("should not decrease benefit below 0 after expiration", () => {
      expect(update("Dafalgan", 0, 3)).toEqual(new Drug("Dafalgan", -1, 0));
    });
  });

  describe("Magic Pill", () => {
    it("should not change benefit or expiresIn", () => {
      expect(update("Magic Pill", 10, 40)).toEqual(
        new Drug("Magic Pill", 10, 40),
      );
    });

    it("should not change even when past expiration date", () => {
      expect(update("Magic Pill", -1, 40)).toEqual(
        new Drug("Magic Pill", -1, 40),
      );
    });
  });
});
