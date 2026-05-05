const ROUND_SECONDS = 60;
const STREAK_BONUS = 75;

const questionBank = [
  { category: 'Shop safety', prompt: 'What should you do first before lifting a vehicle on a two-post lift?', choices: ['Check lift points and vehicle balance', 'Remove battery cables', 'Loosen lug nuts', 'Drain coolant'], answer: 0, explanation: 'Always verify correct lift points and balance first to prevent falls.', difficulty: 'easy' },
  { category: 'Shop safety', prompt: 'Which PPE is most important when grinding metal?', choices: ['Safety glasses or face shield', 'Hearing aid', 'Nitrile gloves only', 'Cotton hat'], answer: 0, explanation: 'Eye/face protection is required against metal sparks and debris.', difficulty: 'easy' },
  { category: 'Shop safety', prompt: 'A chemical spill occurs. What is the best first action?', choices: ['Report and use spill kit per shop procedure', 'Ignore it', 'Spray water everywhere', 'Open hood of nearest car'], answer: 0, explanation: 'Follow established spill response and notify instructor/supervisor.', difficulty: 'medium' },
  { category: 'Tools and equipment', prompt: 'What tool is best for tightening lug nuts to spec?', choices: ['Torque wrench', 'Breaker bar', 'Impact gun only', 'Slip-joint pliers'], answer: 0, explanation: 'Final wheel fastener torque should be set with a torque wrench.', difficulty: 'easy' },
  { category: 'Tools and equipment', prompt: 'A digital multimeter on volts should be connected how?', choices: ['In parallel with the circuit/component', 'In series with battery cable', 'Across fuse only when removed', 'To ground only'], answer: 0, explanation: 'Voltage is measured in parallel across two points.', difficulty: 'medium' },
  { category: 'Tools and equipment', prompt: 'What is a main use for a breaker bar?', choices: ['Loosen tight fasteners', 'Measure resistance', 'Gap spark plugs', 'Check tire pressure'], answer: 0, explanation: 'A breaker bar provides leverage for loosening stubborn bolts.', difficulty: 'easy' },
  { category: 'Batteries', prompt: 'A fully charged 12V battery at rest is closest to:', choices: ['12.6V', '10.5V', '14.8V', '11.2V'], answer: 0, explanation: 'Around 12.6V indicates a healthy fully charged lead-acid battery.', difficulty: 'easy' },
  { category: 'Batteries', prompt: 'Corrosion on battery terminals can cause:', choices: ['High resistance and starting issues', 'Higher alternator output', 'Better cranking speed', 'Lower oil pressure'], answer: 0, explanation: 'Corrosion increases resistance and reduces current flow.', difficulty: 'easy' },
  { category: 'Batteries', prompt: 'Before disconnecting a battery, you should:', choices: ['Record radio/security settings if needed', 'Start engine and rev high', 'Disconnect positive first always', 'Add distilled water immediately'], answer: 0, explanation: 'Some vehicles lose presets; note them before service.', difficulty: 'medium' },
  { category: 'Starting systems', prompt: 'A single click and no crank often suggests:', choices: ['Low battery or starter solenoid issue', 'Overfilled coolant', 'Bad wiper motor', 'Loose gas cap'], answer: 0, explanation: 'Click/no crank points to weak battery, cables, or starter circuit faults.', difficulty: 'medium' },
  { category: 'Starting systems', prompt: 'What is the starter motor’s main job?', choices: ['Crank the engine for starting', 'Charge battery during driving', 'Cool transmission fluid', 'Open thermostat'], answer: 0, explanation: 'Starter rotates engine until combustion begins.', difficulty: 'easy' },
  { category: 'Starting systems', prompt: 'If headlights dim heavily when cranking, first check:', choices: ['Battery condition and connections', 'Cabin air filter', 'Horn relay', 'Fuel octane sticker'], answer: 0, explanation: 'Large voltage drop under load suggests battery/cable concerns.', difficulty: 'medium' },
  { category: 'Charging systems', prompt: 'Typical charging voltage with engine running is about:', choices: ['13.5V to 14.8V', '10V to 11V', '12.0V exactly', '15.8V to 17V'], answer: 0, explanation: 'Most systems regulate in the mid-13 to mid-14 volt range.', difficulty: 'easy' },
  { category: 'Charging systems', prompt: 'The alternator warning lamp on while running may indicate:', choices: ['Charging system fault', 'Full fuel tank', 'Proper ABS operation', 'Fresh engine oil'], answer: 0, explanation: 'Battery/charge light usually means an alternator circuit issue.', difficulty: 'easy' },
  { category: 'Charging systems', prompt: 'What can an overcharging alternator damage?', choices: ['Battery and electronics', 'Brake pads only', 'Tire tread only', 'Seat fabric'], answer: 0, explanation: 'Excess voltage can overheat battery and stress modules.', difficulty: 'medium' },
  { category: 'Basic electrical', prompt: 'Ohm’s law states:', choices: ['V = I × R', 'R = V × I', 'I = V × A', 'W = R ÷ I'], answer: 0, explanation: 'Voltage equals current times resistance.', difficulty: 'easy' },
  { category: 'Basic electrical', prompt: 'An open circuit usually has:', choices: ['No current flow', 'Too much coolant flow', 'Perfect continuity', 'High fuel pressure'], answer: 0, explanation: 'Open circuits break the path, stopping current.', difficulty: 'easy' },
  { category: 'Basic electrical', prompt: 'To test continuity safely, power should be:', choices: ['Off', 'At max', 'Alternating rapidly', 'Unknown'], answer: 0, explanation: 'Continuity tests are done on de-energized circuits.', difficulty: 'easy' },
  { category: 'Brakes', prompt: 'Spongy brake pedal most commonly indicates:', choices: ['Air in hydraulic system', 'New brake pads', 'High tire pressure', 'Tight wheel bearings'], answer: 0, explanation: 'Air compresses, causing a soft/spongy pedal feel.', difficulty: 'medium' },
  { category: 'Brakes', prompt: 'Minimum first check when brake warning light is on:', choices: ['Brake fluid level', 'Cup holder', 'Windshield washer level', 'Antenna height'], answer: 0, explanation: 'Low brake fluid can trigger warning and indicates a possible leak/wear.', difficulty: 'easy' },
  { category: 'Brakes', prompt: 'Rotors with excessive runout can cause:', choices: ['Brake pulsation', 'Engine knock', 'Battery drain', 'Poor A/C cooling'], answer: 0, explanation: 'Rotor variation commonly causes pulsation during braking.', difficulty: 'medium' },
  { category: 'Steering and suspension', prompt: 'Uneven tire wear on one edge may indicate:', choices: ['Alignment issue', 'Fresh fuel', 'Good wheel balance', 'New spark plugs'], answer: 0, explanation: 'Incorrect camber/toe settings can wear tire edges.', difficulty: 'easy' },
  { category: 'Steering and suspension', prompt: 'A failed ball joint can create:', choices: ['Clunks and loose steering feel', 'Higher charging voltage', 'Brighter headlights', 'Better ride comfort'], answer: 0, explanation: 'Worn joints add play and noise, affecting safety.', difficulty: 'medium' },
  { category: 'Steering and suspension', prompt: 'Power steering fluid low can lead to:', choices: ['Whining noise and hard steering', 'Faster ABS cycling', 'Higher alternator output', 'Cooler engine temp'], answer: 0, explanation: 'Low fluid reduces hydraulic assist and causes pump noise.', difficulty: 'easy' },
  { category: 'Cooling systems', prompt: 'Thermostat stuck closed will likely cause:', choices: ['Engine overheating quickly', 'No cabin blower speed', 'Low tire pressure', 'Weak battery'], answer: 0, explanation: 'Coolant cannot circulate through radiator when thermostat is closed.', difficulty: 'easy' },
  { category: 'Cooling systems', prompt: 'Never remove a radiator cap when:', choices: ['Engine is hot and under pressure', 'Engine is off overnight', 'Coolant is full', 'Fan is unplugged'], answer: 0, explanation: 'Hot systems are pressurized and can cause severe burns.', difficulty: 'easy' },
  { category: 'Cooling systems', prompt: 'Coolant in oil may look like:', choices: ['Milky or chocolate-colored oil', 'Clear green oil', 'Black dry powder', 'Blue smoke only'], answer: 0, explanation: 'Coolant contamination often emulsifies oil into milky sludge.', difficulty: 'medium' },
  { category: 'Engine performance', prompt: 'A misfire DTC often begins with checking:', choices: ['Basics: plugs, coils, fuel, compression', 'Paint color', 'Seat adjustments', 'Transmission mount only'], answer: 0, explanation: 'Verify ignition, fuel, and mechanical basics before parts swapping.', difficulty: 'medium' },
  { category: 'Engine performance', prompt: 'Vacuum leaks usually cause:', choices: ['Lean condition and rough idle', 'Overcharged battery', 'High brake fluid', 'Cold thermostat'], answer: 0, explanation: 'Unmetered air can create lean mixtures and idle issues.', difficulty: 'medium' },
  { category: 'Engine performance', prompt: 'A clogged air filter may result in:', choices: ['Reduced power and efficiency', 'Higher coolant pressure', 'Faster starter speed', 'Brighter dash lights'], answer: 0, explanation: 'Restricted airflow can hurt performance and fuel economy.', difficulty: 'easy' },
  { category: 'Scan tool and DTC basics', prompt: 'What does DTC stand for?', choices: ['Diagnostic Trouble Code', 'Drive Train Command', 'Direct Timing Control', 'Data Transfer Circuit'], answer: 0, explanation: 'DTC means Diagnostic Trouble Code.', difficulty: 'easy' },
  { category: 'Scan tool and DTC basics', prompt: 'A “pending” code means:', choices: ['Fault seen but not mature yet', 'Repaired and verified', 'Permanent no-fault condition', 'Battery is fully charged'], answer: 0, explanation: 'Pending codes are detected but may need another drive cycle.', difficulty: 'medium' },
  { category: 'Scan tool and DTC basics', prompt: 'Best first step after reading a code is:', choices: ['Look up code info and verify concern', 'Replace first listed part', 'Clear codes and release vehicle', 'Disconnect battery overnight'], answer: 0, explanation: 'Use service info and confirm symptoms before repair decisions.', difficulty: 'medium' },
  { category: 'Maintenance', prompt: 'Why rotate tires regularly?', choices: ['Promote even tire wear', 'Increase battery voltage', 'Lower coolant boiling point', 'Fix alignment automatically'], answer: 0, explanation: 'Rotation helps tires wear more evenly across positions.', difficulty: 'easy' },
  { category: 'Maintenance', prompt: 'Engine oil should typically be checked:', choices: ['On level ground with engine off per procedure', 'Only while driving', 'After removing radiator cap', 'Only after rain'], answer: 0, explanation: 'Follow manufacturer procedure, usually level ground and proper wait time.', difficulty: 'easy' },
  { category: 'Maintenance', prompt: 'A maintenance schedule is important because it:', choices: ['Prevents failures and extends life', 'Voids all warranties', 'Raises idle speed', 'Eliminates need for inspections'], answer: 0, explanation: 'Preventive service reduces breakdown risk and cost.', difficulty: 'easy' },
  { category: 'Shop safety', prompt: 'Best footwear in the auto shop is:', choices: ['Closed-toe, non-slip shoes', 'Flip-flops', 'Sandals', 'Bare feet'], answer: 0, explanation: 'Proper footwear protects from dropped tools and slipping.', difficulty: 'easy' },
  { category: 'Tools and equipment', prompt: 'Before using a floor jack, always:', choices: ['Chock wheels and set parking brake', 'Open fuel cap', 'Disconnect alternator', 'Remove spark plugs'], answer: 0, explanation: 'Stabilize vehicle to prevent rolling.', difficulty: 'easy' },
  { category: 'Batteries', prompt: 'Load testing a battery checks its ability to:', choices: ['Deliver current under demand', 'Change tire pressure', 'Store coolant', 'Lubricate bearings'], answer: 0, explanation: 'Load tests evaluate voltage drop while current is drawn.', difficulty: 'medium' },
  { category: 'Starting systems', prompt: 'Neutral safety switch prevents starting when:', choices: ['Transmission is in gear', 'Fuel tank is full', 'A/C is on', 'Headlights are off'], answer: 0, explanation: 'It allows cranking only in Park/Neutral (or clutch pressed).', difficulty: 'medium' },
  { category: 'Charging systems', prompt: 'A slipping serpentine belt can cause:', choices: ['Low alternator output', 'Higher compression', 'Faster coolant flow', 'Improved braking'], answer: 0, explanation: 'Alternator speed drops if belt slips.', difficulty: 'medium' },
  { category: 'Basic electrical', prompt: 'High resistance in a connector is often found with:', choices: ['Voltage drop testing', 'Tire gauge', 'Compression test only', 'Coolant refractometer'], answer: 0, explanation: 'Voltage drop across loaded connections identifies resistance issues.', difficulty: 'hard' },
  { category: 'Brakes', prompt: 'ABS helps primarily by:', choices: ['Preventing wheel lock during hard braking', 'Shortening all stops on all surfaces always', 'Increasing engine power', 'Charging the battery'], answer: 0, explanation: 'ABS maintains steerability by reducing lockup.', difficulty: 'medium' },
  { category: 'Steering and suspension', prompt: 'A bounce test that keeps oscillating suggests worn:', choices: ['Shocks/struts', 'Spark plugs', 'Fuel injectors', 'Thermostat'], answer: 0, explanation: 'Excessive bouncing indicates weak dampers.', difficulty: 'easy' },
  { category: 'Cooling systems', prompt: 'Electric radiator fans are commonly controlled by:', choices: ['ECM and relays based on temp data', 'Door switch only', 'Brake light switch', 'Fuel level sender'], answer: 0, explanation: 'Modules use coolant temp input to command fan operation.', difficulty: 'medium' },
  { category: 'Engine performance', prompt: 'Before replacing an oxygen sensor for a lean code, check:', choices: ['For intake leaks and fuel pressure', 'Tire age first', 'Cabin filter only', 'Seat belt function'], answer: 0, explanation: 'Root causes can be leaks or fuel delivery, not sensor failure.', difficulty: 'hard' },
  { category: 'Scan tool and DTC basics', prompt: 'Freeze frame data shows:', choices: ['Operating conditions when fault set', 'Future repair costs', 'Technician payroll', 'Battery warranty terms'], answer: 0, explanation: 'Freeze frame captures snapshot data at time of DTC.', difficulty: 'medium' },
  { category: 'Maintenance', prompt: 'Ignoring TPMS warning can lead to:', choices: ['Unsafe tire pressure and tire wear', 'Higher alternator voltage', 'Cooler brakes', 'Smoother idle'], answer: 0, explanation: 'Incorrect pressure affects handling, wear, and safety.', difficulty: 'easy' }
];

const categories = ['Mixed Review', ...new Set(questionBank.map(q => q.category))];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const categorySelect = document.getElementById('category-select');
const startBtn = document.getElementById('start-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const categoryLabel = document.getElementById('category-label');
const questionText = document.getElementById('question-text');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

let state = {};

categories.forEach(c => {
  const option = document.createElement('option'); option.value = c; option.textContent = c; categorySelect.appendChild(option);
});

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function startGame() {
  const selected = categorySelect.value;
  const pool = selected === 'Mixed Review' ? questionBank : questionBank.filter(q => q.category === selected);
  state = { selected, questions: shuffle(pool), index: 0, score: 0, correct: 0, attempted: 0, streak: 0, bestStreak: 0, timeLeft: ROUND_SECONDS, questionStartTime: Date.now(), timerId: null };
  startScreen.classList.add('hidden'); endScreen.classList.add('hidden'); gameScreen.classList.remove('hidden');
  scoreEl.textContent = '0'; streakEl.textContent = '0'; timeEl.textContent = String(state.timeLeft);
  state.timerId = setInterval(tick, 1000);
  showQuestion();
}

function tick() {
  state.timeLeft -= 1;
  timeEl.textContent = String(Math.max(state.timeLeft, 0));
  if (state.timeLeft <= 0) endGame();
}

function showQuestion() {
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.classList.add('hidden');
  const q = state.questions[state.index % state.questions.length];
  state.currentQuestion = q;
  state.questionStartTime = Date.now();
  categoryLabel.textContent = `${q.category} • ${q.difficulty.toUpperCase()}`;
  questionText.textContent = q.prompt;
  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const b = document.createElement('button');
    b.className = 'btn choice';
    b.textContent = choice;
    b.addEventListener('click', () => answerQuestion(i, b));
    choicesEl.appendChild(b);
  });
}

function answerQuestion(selectedIndex, buttonClicked) {
  const q = state.currentQuestion;
  const buttons = [...choicesEl.children];
  buttons.forEach(btn => btn.disabled = true);
  state.attempted += 1;

  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) {
    const elapsed = (Date.now() - state.questionStartTime) / 1000;
    const speedBonus = Math.max(0, Math.round((1 - Math.min(elapsed, 10) / 10) * 50));
    state.score += 100 + speedBonus;
    state.correct += 1;
    state.streak += 1;
    if (state.streak % 3 === 0) state.score += STREAK_BONUS;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    buttonClicked.classList.add('correct');
    feedbackEl.className = 'feedback correct';
    feedbackEl.innerHTML = `✅ Correct! +${100 + speedBonus} points${state.streak % 3 === 0 ? ` + ${STREAK_BONUS} streak bonus!` : ''}<br>${q.explanation}`;
  } else {
    state.streak = 0;
    buttonClicked.classList.add('incorrect');
    buttons[q.answer].classList.add('correct');
    feedbackEl.className = 'feedback incorrect';
    feedbackEl.innerHTML = `❌ Incorrect. ${q.explanation}`;
  }

  scoreEl.textContent = String(state.score);
  streakEl.textContent = String(state.streak);
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  if (state.timeLeft <= 0) return endGame();
  state.index += 1;
  showQuestion();
}

function endGame() {
  clearInterval(state.timerId);
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  const acc = state.attempted ? Math.round((state.correct / state.attempted) * 100) : 0;
  document.getElementById('final-score').textContent = state.score;
  document.getElementById('final-correct').textContent = state.correct;
  document.getElementById('final-attempted').textContent = state.attempted;
  document.getElementById('final-accuracy').textContent = `${acc}%`;
  document.getElementById('final-best-streak').textContent = state.bestStreak;
  const message = acc >= 85 ? 'Excellent technician mindset—strong diagnostic decisions!' : acc >= 70 ? 'Solid work—keep building speed and consistency!' : 'Good effort—review missed topics and attack the next round!';
  document.getElementById('performance-message').textContent = message;
}

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', () => {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});
