const ROUND_SECONDS = 60;
const STREAK_BONUS = 75;

const MODES = {
  mixed: 'Mixed Review',
  category: 'Category Review',
  daily: 'Daily Garage Challenge',
  survival: 'Survival Mode'
};

const questionBank = [
  { category: 'Shop Safety', prompt: 'Before raising a vehicle, your first step is to:', choices: ['Check lift points and balance', 'Rev engine to warm up', 'Remove spark plugs', 'Bleed brakes'], correct: 'Check lift points and balance', explanation: 'Correct lift placement prevents vehicle falls.', difficulty: 'Easy' },
  { category: 'Shop Safety', prompt: 'Best eye protection for grinding is:', choices: ['Face shield or safety glasses', 'Baseball cap', 'Shop rag', 'Latex gloves'], correct: 'Face shield or safety glasses', explanation: 'Grinding throws sparks and debris toward the face.', difficulty: 'Easy' },
  { category: 'Tools & Equipment', prompt: 'Final wheel lug tightening should use a:', choices: ['Torque wrench', 'Pry bar', 'Impact only', 'Test light'], correct: 'Torque wrench', explanation: 'Torque specs prevent warped rotors and wheel damage.', difficulty: 'Easy' },
  { category: 'Tools & Equipment', prompt: 'Voltage is measured with a meter connected:', choices: ['In parallel', 'In series', 'At the fuse only', 'At battery negative only'], correct: 'In parallel', explanation: 'Voltage compares electrical potential between two points.', difficulty: 'Easy' },
  { category: 'Vehicle Maintenance', prompt: 'Why follow maintenance schedules?', choices: ['Reduce failures and extend life', 'Increase tire pressure', 'Disable warning lights', 'Avoid inspections'], correct: 'Reduce failures and extend life', explanation: 'Preventive service lowers breakdown risk.', difficulty: 'Easy' },
  { category: 'Vehicle Maintenance', prompt: 'Engine oil is best checked:', choices: ['On level ground using procedure', 'While driving', 'With radiator cap off', 'Only after rain'], correct: 'On level ground using procedure', explanation: 'Consistent method gives accurate level reading.', difficulty: 'Easy' },
  { category: 'Fluids', prompt: 'Low brake fluid can indicate:', choices: ['Possible leak or pad wear', 'Good battery health', 'Overfilled coolant', 'Worn wiper blades'], correct: 'Possible leak or pad wear', explanation: 'Investigate cause, don’t just top off and ignore.', difficulty: 'Medium' },
  { category: 'Fluids', prompt: 'Never open a hot radiator cap because:', choices: ['System is pressurized and can burn you', 'Battery may drain', 'Tires may deflate', 'ABS may set a code'], correct: 'System is pressurized and can burn you', explanation: 'Hot coolant can spray out dangerously.', difficulty: 'Easy' },
  { category: 'Tires', prompt: 'Regular tire rotation helps:', choices: ['Even tread wear', 'Increase alternator output', 'Lower oil pressure', 'Calibrate TPMS'], correct: 'Even tread wear', explanation: 'Rotation spreads load patterns across positions.', difficulty: 'Easy' },
  { category: 'Tires', prompt: 'Uneven edge wear usually suggests:', choices: ['Alignment concern', 'Overcharged battery', 'Bad thermostat', 'Dirty fuel'], correct: 'Alignment concern', explanation: 'Toe/camber can wear one shoulder quickly.', difficulty: 'Medium' },
  { category: 'Brakes Basics', prompt: 'Spongy brake pedal most often means:', choices: ['Air in hydraulic system', 'New pads installed', 'Tight wheel nuts', 'Good booster'], correct: 'Air in hydraulic system', explanation: 'Air compresses and softens pedal feel.', difficulty: 'Easy' },
  { category: 'Brakes Basics', prompt: 'ABS mainly helps by:', choices: ['Reducing wheel lock during hard stops', 'Increasing engine power', 'Charging battery', 'Cooling rotors'], correct: 'Reducing wheel lock during hard stops', explanation: 'ABS helps keep steering control while braking.', difficulty: 'Medium' },
  { category: 'Batteries', prompt: 'A resting battery near 12.6V is usually:', choices: ['Near fully charged', 'Completely failed', 'Overcharging', 'Shorted starter'], correct: 'Near fully charged', explanation: '12.6V is a common full-charge reference.', difficulty: 'Easy' },
  { category: 'Batteries', prompt: 'Corroded battery terminals cause:', choices: ['High resistance and poor cranking', 'Higher fuel pressure', 'Coolant leaks', 'Better charging'], correct: 'High resistance and poor cranking', explanation: 'Corrosion restricts current flow.', difficulty: 'Easy' },
  { category: 'Starting Basics', prompt: 'Single click, no crank often points to:', choices: ['Weak battery/cable/starter issue', 'Good starter draw', 'Overfilled engine oil', 'Low tire tread'], correct: 'Weak battery/cable/starter issue', explanation: 'Start with battery state and cable checks.', difficulty: 'Medium' },
  { category: 'Starting Basics', prompt: 'Starter motor purpose is to:', choices: ['Crank engine for starting', 'Charge battery', 'Cool radiator', 'Run fuel pump continuously'], correct: 'Crank engine for starting', explanation: 'It spins the crankshaft until combustion starts.', difficulty: 'Easy' },
  { category: 'Charging Basics', prompt: 'Normal charging voltage running is about:', choices: ['13.5–14.8 volts', '10–11 volts', '12.0 exactly', '16.5 volts'], correct: '13.5–14.8 volts', explanation: 'Most systems regulate in this range.', difficulty: 'Easy' },
  { category: 'Charging Basics', prompt: 'Battery warning light on while running suggests:', choices: ['Charging system fault', 'Full fuel tank', 'Correct tire pressure', 'Normal operation'], correct: 'Charging system fault', explanation: 'Check belt, wiring, alternator output.', difficulty: 'Easy' },
  { category: 'Basic Electrical', prompt: 'Ohm’s law is:', choices: ['V = I × R', 'I = V × W', 'R = I ÷ V', 'V = R ÷ I'], correct: 'V = I × R', explanation: 'Core relationship between voltage, current, resistance.', difficulty: 'Easy' },
  { category: 'Basic Electrical', prompt: 'Continuity testing should be done with power:', choices: ['Off', 'At idle', 'At full charge', 'At high RPM'], correct: 'Off', explanation: 'De-energize circuit before ohms/continuity checks.', difficulty: 'Easy' },
  { category: 'Cooling Basics', prompt: 'Thermostat stuck closed usually causes:', choices: ['Fast overheating', 'Noisy alternator only', 'Low brake fluid', 'Better MPG'], correct: 'Fast overheating', explanation: 'Coolant cannot circulate through radiator.', difficulty: 'Easy' },
  { category: 'Cooling Basics', prompt: 'Milky engine oil may indicate:', choices: ['Coolant contamination', 'Normal break-in', 'Fresh fuel', 'Clean combustion'], correct: 'Coolant contamination', explanation: 'Coolant and oil emulsion looks milky.', difficulty: 'Medium' },
  { category: 'Belts & Hoses', prompt: 'A cracked serpentine belt can lead to:', choices: ['Charging and accessory issues', 'Higher compression', 'Better steering feel', 'Lower emissions instantly'], correct: 'Charging and accessory issues', explanation: 'Belt drives alternator and accessories.', difficulty: 'Easy' },
  { category: 'Belts & Hoses', prompt: 'Soft swollen coolant hose may mean:', choices: ['Hose deterioration', 'Strong battery', 'Perfect coolant flow', 'Normal by design'], correct: 'Hose deterioration', explanation: 'Aged hoses can fail under pressure.', difficulty: 'Easy' },
  { category: 'Engine Performance Basics', prompt: 'Vacuum leaks often cause:', choices: ['Lean idle and rough running', 'Overfilled crankcase', 'Strong battery', 'Cold AC vent'], correct: 'Lean idle and rough running', explanation: 'Unmetered air upsets air-fuel balance.', difficulty: 'Medium' },
  { category: 'Engine Performance Basics', prompt: 'Before replacing parts for misfire code, first:', choices: ['Verify basics: spark, fuel, compression', 'Replace PCM', 'Change tires', 'Flush coolant'], correct: 'Verify basics: spark, fuel, compression', explanation: 'Test evidence first, parts later.', difficulty: 'Medium' },
  { category: 'Warning Lights', prompt: 'Check engine light means:', choices: ['A fault was detected and should be diagnosed', 'Oil was just changed', 'Tires are aligned', 'Brake pads are new'], correct: 'A fault was detected and should be diagnosed', explanation: 'Use scan data and testing to find root cause.', difficulty: 'Easy' },
  { category: 'Warning Lights', prompt: 'TPMS light usually relates to:', choices: ['Tire pressure issue', 'Alternator failure', 'Radiator cap leak', 'Misfire'], correct: 'Tire pressure issue', explanation: 'Check and set tire pressures first.', difficulty: 'Easy' },
  { category: 'Scan Tool Basics', prompt: 'Freeze frame data shows:', choices: ['Conditions when code set', 'Future failures', 'Repair costs', 'Warranty expiration'], correct: 'Conditions when code set', explanation: 'Snapshot helps recreate fault context.', difficulty: 'Medium' },
  { category: 'Scan Tool Basics', prompt: 'Live data is useful because it:', choices: ['Shows sensor values in real time', 'Replaces all testing', 'Deletes all codes', 'Charges battery faster'], correct: 'Shows sensor values in real time', explanation: 'Compare sensor behavior to expected values.', difficulty: 'Easy' },
  { category: 'DTC Basics', prompt: 'DTC stands for:', choices: ['Diagnostic Trouble Code', 'Drive Train Command', 'Data Timing Circuit', 'Digital Test Control'], correct: 'Diagnostic Trouble Code', explanation: 'Standard term for stored fault code.', difficulty: 'Easy' },
  { category: 'DTC Basics', prompt: 'A pending code means:', choices: ['Fault seen but not matured yet', 'Vehicle fixed', 'No issue found', 'Battery disconnected'], correct: 'Fault seen but not matured yet', explanation: 'May require another drive cycle to set hard code.', difficulty: 'Medium' },
  { category: 'CCC Thinking', prompt: 'In concern-cause-correction, “concern” is:', choices: ['Customer-reported symptom', 'Part to replace', 'Repair bill', 'Test equipment list'], correct: 'Customer-reported symptom', explanation: 'Start by verifying the exact concern.', difficulty: 'Easy' },
  { category: 'CCC Thinking', prompt: 'Best practice before replacing a part is to:', choices: ['Test and confirm root cause', 'Order parts first', 'Clear codes repeatedly', 'Road test with warning lights ignored'], correct: 'Test and confirm root cause', explanation: 'Evidence-based diagnosis prevents comebacks.', difficulty: 'Easy' },
  { category: 'Inspection Logic', prompt: 'During multipoint inspection, prioritize:', choices: ['Safety items first', 'Cosmetic scratches first', 'Stereo presets', 'Key chain color'], correct: 'Safety items first', explanation: 'Brakes/tires/lights are immediate safety concerns.', difficulty: 'Easy' },
  { category: 'Inspection Logic', prompt: 'If customer says “noise on bumps,” good first step:', choices: ['Duplicate concern on road test', 'Replace struts immediately', 'Clear all modules', 'Flush transmission'], correct: 'Duplicate concern on road test', explanation: 'Verify symptom before any repair plan.', difficulty: 'Medium' },
  { category: 'Shop Safety', prompt: 'Proper shop footwear is:', choices: ['Closed-toe non-slip shoes', 'Flip-flops', 'Sandals', 'Open heel clogs'], correct: 'Closed-toe non-slip shoes', explanation: 'Foot protection helps prevent injury.', difficulty: 'Easy' },
  { category: 'Tools & Equipment', prompt: 'Before using floor jack, always:', choices: ['Chock wheels and set brake', 'Remove battery', 'Bleed clutch', 'Open hood'], correct: 'Chock wheels and set brake', explanation: 'Prevent vehicle movement.', difficulty: 'Easy' },
  { category: 'Vehicle Maintenance', prompt: 'Cabin air filter mainly affects:', choices: ['Cabin airflow and air quality', 'Starter speed', 'Brake fluid condition', 'Wheel torque'], correct: 'Cabin airflow and air quality', explanation: 'It filters incoming HVAC air.', difficulty: 'Easy' },
  { category: 'Fluids', prompt: 'Using wrong oil viscosity can cause:', choices: ['Poor lubrication performance', 'Brighter headlights', 'Longer brake life', 'Higher tire pressure'], correct: 'Poor lubrication performance', explanation: 'Use manufacturer-specified viscosity.', difficulty: 'Medium' },
  { category: 'Tires', prompt: 'Tire placard pressure info is usually found:', choices: ['Driver door jamb label', 'Windshield top edge', 'Radiator support only', 'Battery case'], correct: 'Driver door jamb label', explanation: 'Placard lists OEM recommended pressures.', difficulty: 'Easy' },
  { category: 'Brakes Basics', prompt: 'Brake pulsation during stops may indicate:', choices: ['Rotor variation/runout', 'Fresh fluid', 'Strong battery', 'Worn spark plugs'], correct: 'Rotor variation/runout', explanation: 'Rotor issues can cause pedal pulsation.', difficulty: 'Medium' },
  { category: 'Batteries', prompt: 'Load testing evaluates battery ability to:', choices: ['Deliver current under load', 'Increase voltage above 15V', 'Cool starter', 'Lubricate terminals'], correct: 'Deliver current under load', explanation: 'Checks voltage behavior while current demand applied.', difficulty: 'Medium' },
  { category: 'Starting Basics', prompt: 'Neutral safety switch prevents cranking when:', choices: ['Transmission is in gear', 'Fuel is low', 'TPMS is on', 'Headlights are bright'], correct: 'Transmission is in gear', explanation: 'Cranking allowed only in safe selector positions.', difficulty: 'Easy' },
  { category: 'Charging Basics', prompt: 'Loose serpentine belt may cause:', choices: ['Low alternator output', 'Better fuel trim', 'Steady overheating only', 'No electrical effect'], correct: 'Low alternator output', explanation: 'Alternator spins slower when belt slips.', difficulty: 'Easy' },
  { category: 'Basic Electrical', prompt: 'High resistance connection is best found by:', choices: ['Voltage drop test under load', 'Visual only', 'Fuel pressure gauge', 'Tire tread depth test'], correct: 'Voltage drop test under load', explanation: 'Loaded voltage drop reveals unwanted resistance.', difficulty: 'Medium' },
  { category: 'Cooling Basics', prompt: 'Electric cooling fan is usually controlled by:', choices: ['ECM and relay logic', 'Horn switch', 'Wiper motor', 'Fuel gauge'], correct: 'ECM and relay logic', explanation: 'Fan command is based on coolant temp inputs.', difficulty: 'Medium' },
  { category: 'Belts & Hoses', prompt: 'When replacing belt, also inspect:', choices: ['Tensioner and pulleys', 'Seat fabric', 'Floor mats', 'Radio antenna'], correct: 'Tensioner and pulleys', explanation: 'Worn tensioners/pulleys shorten new belt life.', difficulty: 'Easy' },
  { category: 'DTC Basics', prompt: 'Best step after reading a code is:', choices: ['Look up info and verify concern', 'Replace first listed part', 'Disconnect battery overnight', 'Ignore if car starts'], correct: 'Look up info and verify concern', explanation: 'Code is a clue, not a parts list.', difficulty: 'Easy' }
];

const els = Object.fromEntries([
  'start-screen',
  'game-screen',
  'end-screen',
  'mode-select',
  'category-select',
  'start-btn',
  'time',
  'score',
  'combo',
  'lives',
  'end-round-btn',
  'boost-meter',
  'damage-meter',
  'progress-meter',
  'mode-label',
  'category-label',
  'question-text',
  'choices',
  'feedback',
  'next-btn',
  'final-score',
  'final-accuracy',
  'final-correct',
  'final-attempted',
  'final-best-combo',
  'final-rank',
  'share-text',
  'copy-result-btn',
  'play-again-btn',
  'change-category-btn',
  'copy-status'
].map(id => [id, document.getElementById(id)]));

let state = {};

const categories = [...new Set(questionBank.map(q => q.category))];

categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  els['category-select'].appendChild(option);
});

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function seededShuffle(array, seed) {
  const result = [...array];
  let currentSeed = seed;

  for (let i = result.length - 1; i > 0; i -= 1) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function seedFromDate() {
  const date = new Date();
  return Number(`${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}${String(date.getUTCDate()).padStart(2, '0')}`);
}

function setupGame() {
  const mode = els['mode-select'].value;
  const category = els['category-select'].value;

  let pool = questionBank;

  if (mode === 'category') {
    pool = questionBank.filter(q => q.category === category);
  }

  if (mode === 'daily') {
    pool = seededShuffle(questionBank, seedFromDate()).slice(0, 20);
  }

  if (mode === 'mixed' || mode === 'survival') {
    pool = shuffle(questionBank);
  }

  state = {
    mode,
    category,
    pool,
    index: 0,
    score: 0,
    correct: 0,
    attempted: 0,
    combo: 0,
    bestCombo: 0,
    boost: 0,
    damage: 0,
    timeLeft: ROUND_SECONDS,
    lives: mode === 'survival' ? 3 : Infinity,
    timer: null
  };

  els['start-screen'].classList.add('hidden');
  els['end-screen'].classList.add('hidden');
  els['game-screen'].classList.remove('hidden');

  updateHud();

  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    updateHud();

    if (state.timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  showQuestion();
}

function updateHud() {
  els.time.textContent = state.timeLeft;
  els.score.textContent = state.score;
  els.combo.textContent = state.combo;
  els.lives.textContent = state.lives === Infinity ? '∞' : state.lives;
  els['boost-meter'].value = Math.min(100, state.boost);
  els['damage-meter'].value = Math.min(100, state.damage);

  const progress = state.attempted ? Math.round((state.correct / state.attempted) * 100) : 0;
  els['progress-meter'].value = progress;
  els['mode-label'].textContent = `Mode: ${MODES[state.mode]}`;
}

function showQuestion() {
  const question = state.pool[state.index % state.pool.length];
  state.current = question;

  els['category-label'].textContent = `${question.category} • ${question.difficulty}`;
  els['question-text'].textContent = question.prompt;

  const choices = shuffle(question.choices).map(choice => ({
    text: choice,
    isCorrect: choice === question.correct
  }));

  state.currentChoices = choices;

  els.choices.innerHTML = '';
  els.feedback.textContent = '';
  els.feedback.className = 'feedback';
  els['next-btn'].classList.add('hidden');

  choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'btn choice';
    button.textContent = choice.text;
    button.onclick = () => answer(index, button);
    els.choices.appendChild(button);
  });
}

function answer(index, button) {
  [...els.choices.children].forEach(choiceButton => {
    choiceButton.disabled = true;
  });

  state.attempted += 1;

  const chosen = state.currentChoices[index];

  if (chosen.isCorrect) {
    const gain = 100 + Math.min(50, state.combo * 5);
    state.score += gain;
    state.correct += 1;
    state.combo += 1;
    state.boost = Math.min(100, state.boost + 12 + state.combo);

    if (state.combo % 3 === 0) {
      state.score += STREAK_BONUS;
    }

    state.bestCombo = Math.max(state.bestCombo, state.combo);

    button.classList.add('correct');
    els.feedback.className = 'feedback correct';
    els.feedback.innerHTML = `Correct! +${gain} XP<br>${state.current.explanation}`;
  } else {
    state.combo = 0;
    state.damage = Math.min(100, state.damage + 18);

    if (state.mode === 'survival') {
      state.lives -= 1;

      if (state.lives <= 0) {
        els.feedback.className = 'feedback incorrect';
        els.feedback.innerHTML = `Incorrect. ${state.current.explanation}<br>Out of lives.`;
        updateHud();
        return endGame();
      }
    }

    button.classList.add('incorrect');

    [...els.choices.children].forEach((choiceButton, choiceIndex) => {
      if (state.currentChoices[choiceIndex].isCorrect) {
        choiceButton.classList.add('correct');
      }
    });

    els.feedback.className = 'feedback incorrect';
    els.feedback.innerHTML = `Incorrect. ${state.current.explanation}`;
  }

  updateHud();
  els['next-btn'].classList.remove('hidden');
}

function nextQuestion() {
  state.index += 1;
  showQuestion();
}

function rank(score, accuracy) {
  if (score > 2200 && accuracy >= 85) return 'Master Tech in Training';
  if (score > 1700 && accuracy >= 78) return 'Service Lane Pro';
  if (score > 1300 && accuracy >= 70) return 'Diagnostic Rookie';
  if (score > 900 && accuracy >= 62) return 'Lube Bay Legend';
  if (score > 500 && accuracy >= 50) return 'Apprentice Tech';
  return 'Needs More Shop Time';
}

function endGame() {
  clearInterval(state.timer);

  els['game-screen'].classList.add('hidden');
  els['end-screen'].classList.remove('hidden');

  const accuracy = state.attempted ? Math.round((state.correct / state.attempted) * 100) : 0;
  const finalRank = rank(state.score, accuracy);

  els['final-score'].textContent = state.score;
  els['final-accuracy'].textContent = `${accuracy}%`;
  els['final-correct'].textContent = state.correct;
  els['final-attempted'].textContent = state.attempted;
  els['final-best-combo'].textContent = state.bestCombo;
  els['final-rank'].textContent = finalRank;

  const modeText = state.mode === 'category'
    ? `Category Review (${state.category})`
    : MODES[state.mode];

  const resultText = `Torque Rush: ASE G1 Garage Sprint
Score: ${state.score}
Accuracy: ${accuracy}%
Best Combo: ${state.bestCombo}
Rank: ${finalRank}
Mode: ${modeText}
Time: ${ROUND_SECONDS} sec`;

  els['share-text'].textContent = resultText;
  state.share = resultText;
}

async function copyResult() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(state.share);
      els['copy-status'].textContent = 'Result copied!';
    } else {
      throw new Error('Clipboard unavailable');
    }
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = state.share;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      els['copy-status'].textContent = 'Result copied with fallback copy.';
    } catch {
      els['copy-status'].textContent = 'Copy blocked. Select and copy the text manually.';
    }

    textarea.remove();
  }
}

els['start-btn'].onclick = setupGame;
els['next-btn'].onclick = nextQuestion;
els['end-round-btn'].onclick = endGame;
els['play-again-btn'].onclick = setupGame;
els['change-category-btn'].onclick = () => {
  els['end-screen'].classList.add('hidden');
  els['start-screen'].classList.remove('hidden');
};
els['copy-result-btn'].onclick = copyResult;