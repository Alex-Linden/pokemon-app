function calculateCatchSuccess(pokemon, trainerSkill = 1.0) {
  const baseChance = pokemon.captureRate / 255;
  const difficultyPenalty =
    (pokemon.hp + pokemon.defense + pokemon.speed) / 600;

  const adjusted = baseChance * (1 - difficultyPenalty) * trainerSkill;

  return Math.random() < adjusted;
}

module.exports = { calculateCatchSuccess };