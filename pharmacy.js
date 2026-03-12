export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

const clampBenefit = (value) =>
  Math.min(Math.max(value, MIN_BENEFIT), MAX_BENEFIT);

function updateDefault(drug) {
  drug.expiresIn -= 1;
  const degradation = drug.expiresIn < 0 ? 2 : 1;
  drug.benefit = clampBenefit(drug.benefit - degradation);
}

function updateHerbalTea(drug) {
  drug.expiresIn -= 1;
  const improvement = drug.expiresIn < 0 ? 2 : 1;
  drug.benefit = clampBenefit(drug.benefit + improvement);
}

function updateFervex(drug) {
  drug.expiresIn -= 1;
  if (drug.expiresIn < 0) {
    drug.benefit = 0;
    return;
  }
  let improvement = 1;
  if (drug.expiresIn < 5) improvement = 3;
  else if (drug.expiresIn < 10) improvement = 2;
  drug.benefit = clampBenefit(drug.benefit + improvement);
}

function updateDafalgan(drug) {
  drug.expiresIn -= 1;
  const degradation = drug.expiresIn < 0 ? 4 : 2;
  drug.benefit = clampBenefit(drug.benefit - degradation);
}

// Magic Pill never expires or loses benefit
function updateMagicPill() {}

const DRUG_HANDLERS = {
  "Herbal Tea": updateHerbalTea,
  Fervex: updateFervex,
  "Magic Pill": updateMagicPill,
  Dafalgan: updateDafalgan,
};

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      const updateHandler = DRUG_HANDLERS[drug.name] ?? updateDefault;
      updateHandler(drug);
    }
    return this.drugs;
  }
}
