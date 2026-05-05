#!/usr/bin/env bash
set -u

PASS_COUNT=0
FAIL_COUNT=0

pass() { echo "PASS: $1"; PASS_COUNT=$((PASS_COUNT+1)); }
fail() { echo "FAIL: $1"; FAIL_COUNT=$((FAIL_COUNT+1)); }

FILES=(index.html styles.css script.js README.md)

# 1. Merge conflict markers
if rg -n '<<<<<<<|=======|>>>>>>>' "${FILES[@]}" >/dev/null 2>&1; then
  fail "Merge conflict markers found in tracked web files."
else
  pass "No merge conflict markers in index.html/styles.css/script.js/README.md."
fi

# 2. JS syntax
if node --check script.js >/dev/null 2>&1; then
  pass "JavaScript syntax check passed (node --check script.js)."
else
  fail "JavaScript syntax check failed (node --check script.js)."
fi

# 3/4/5. ID map + question count + old answer-index format
python - <<'PY'
import re, sys
from pathlib import Path

html = Path('index.html').read_text(encoding='utf-8')
js = Path('script.js').read_text(encoding='utf-8')

errors = []

# 3 IDs in els map must exist in HTML
m = re.search(r"const\s+els\s*=\s*Object\.fromEntries\(\[(.*?)\]\.map", js, re.S)
if not m:
    errors.append('Could not parse els map in script.js')
else:
    js_ids = set(re.findall(r"'([a-z0-9-]+)'", m.group(1)))
    html_ids = set(re.findall(r'id="([^"]+)"', html))
    missing = sorted(i for i in js_ids if i not in html_ids)
    if missing:
        errors.append('Missing IDs in index.html referenced by script.js: ' + ', '.join(missing))

# 4 questionBank count >=45
m2 = re.search(r"const\s+questionBank\s*=\s*\[(.*?)\n\];", js, re.S)
if not m2:
    errors.append('Could not parse questionBank in script.js')
else:
    count = len(re.findall(r"\{\s*category:\s*'", m2.group(1)))
    if count < 45:
        errors.append(f'questionBank too small: found {count}, need at least 45')

# 5 no answer-index style
if re.search(r"\banswer\s*:\s*\d+\b", js):
    errors.append('Found old answer-index format like answer: 0 in script.js')

if errors:
    for e in errors:
        print('PYFAIL:' + e)
    sys.exit(1)
print('PYPASS:ID mapping/question count/answer-index checks passed.')
PY
py_status=$?
if [ $py_status -eq 0 ]; then
  pass "ID map, questionBank size (>=45), and no answer-index format checks passed."
else
  fail "ID map/questionBank/answer-index validation failed."
fi

echo "---"
echo "Total PASS: $PASS_COUNT"
echo "Total FAIL: $FAIL_COUNT"

if [ $FAIL_COUNT -gt 0 ]; then
  exit 1
fi
