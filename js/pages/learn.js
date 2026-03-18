// Learn page

let _quizAnswered = false;
const QUIZ = {
  question: "What does P/E ratio stand for?",
  options: [
    "Profit & Earnings ratio",
    "Price-to-Earnings ratio",
    "Portfolio Equity ratio",
    "Profit Estimation ratio"
  ],
  correct: 1,
};

function renderLearnPage() {
  const levelFilter = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filterHtml = levelFilter.map(level => `
    <button class="btn btn-sm ${level === 'All' ? 'btn-primary' : 'btn-secondary'}"
            id="filter-${level}"
            onclick="filterCourses('${level}')">
      ${level}
    </button>
  `).join('');

  const coursesHtml = renderCourseCards(COURSES);

  const quizOptions = QUIZ.options.map((opt, i) => `
    <button class="quiz-option" onclick="answerQuiz(${i}, this)">${escapeHtml(opt)}</button>
  `).join('');

  const content = `
    <div class="page-header">
      <h1 class="page-title">Learning Center</h1>
      <p class="page-subtitle">Master stock trading with structured courses and lessons.</p>
    </div>

    <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;">
      <!-- Courses -->
      <div style="flex:1;min-width:0;">
        <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
          ${filterHtml}
        </div>
        <div class="grid-auto" id="courses-grid">${coursesHtml}</div>
      </div>

      <!-- Quick Quiz -->
      <div style="width:300px;flex-shrink:0;">
        <div class="glass-card quiz-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            ${Icons.target}
            <div class="quiz-title" style="margin:0;">Quick Quiz</div>
          </div>
          <div class="quiz-question">${escapeHtml(QUIZ.question)}</div>
          <div class="quiz-options" id="quiz-options">${quizOptions}</div>
          <div id="quiz-result" style="display:none;margin-top:14px;padding:12px;border-radius:8px;font-size:0.875rem;"></div>
        </div>

        <!-- Stats -->
        <div class="glass-card p-5 mt-4">
          <div style="font-weight:700;margin-bottom:14px;">Your Progress</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--fg2);margin-bottom:6px;">
                <span>Courses Completed</span><span>1/6</span>
              </div>
              <div class="progress-track"><div class="progress-bar" style="width:16.6%"></div></div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--fg2);margin-bottom:6px;">
                <span>Total XP Earned</span><span>600 / 6,400</span>
              </div>
              <div class="progress-track"><div class="progress-bar" style="width:9.4%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return renderAppShell('learn', 'Learn', content);
}

function renderCourseCards(courses) {
  return courses.map(course => {
    const levelBadgeClass = course.level === 'Beginner' ? 'badge-success' : course.level === 'Intermediate' ? 'badge-warning' : 'badge-danger';
    const btnLabel = course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Course';
    const btnClass = course.progress === 100 ? 'btn-secondary' : 'btn-primary';

    return `
      <div class="glass-card-hover course-card">
        <div class="course-card-header">${course.image}</div>
        <div class="course-card-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <span class="badge ${levelBadgeClass}">${course.level}</span>
            <span style="font-size:0.75rem;color:var(--warning);">+${formatNumber(course.xpReward)} XP</span>
          </div>
          <div class="course-card-title">${escapeHtml(course.title)}</div>
          <div class="course-card-desc">${escapeHtml(course.description)}</div>
          <div class="course-meta">
            <span class="course-meta-item">${Icons.clock} ${course.duration}</span>
            <span class="course-meta-item">${Icons.book} ${course.lessons} lessons</span>
          </div>
          ${course.progress > 0 ? `
            <div class="course-progress">
              <div class="course-progress-label">
                <span>Progress</span><span>${course.progress}%</span>
              </div>
              <div class="progress-track"><div class="progress-bar" style="width:${course.progress}%"></div></div>
            </div>
          ` : ''}
          <button class="btn ${btnClass} w-full btn-sm"
                  onclick="startCourse('${escapeHtml(course.id)}')">
            ${course.progress === 100 ? '✓ ' : ''}${btnLabel}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterCourses(level) {
  // Update filter button styles
  document.querySelectorAll('[id^="filter-"]').forEach(btn => {
    btn.className = 'btn btn-sm btn-secondary';
  });
  const activeBtn = document.getElementById('filter-' + level);
  if (activeBtn) activeBtn.className = 'btn btn-sm btn-primary';

  const filtered = level === 'All' ? COURSES : COURSES.filter(c => c.level === level);
  const grid = document.getElementById('courses-grid');
  if (grid) { grid.innerHTML = renderCourseCards(filtered); }
}

function startCourse(id) {
  const course = COURSES.find(c => c.id === id);
  if (!course) return;
  Toast.info(`Opening "${course.title}"`, `${course.lessons} lessons · ${course.duration} · +${formatNumber(course.xpReward)} XP`);
}

function answerQuiz(selectedIdx, btn) {
  if (_quizAnswered) return;
  _quizAnswered = true;

  const options  = document.querySelectorAll('.quiz-option');
  const resultEl = document.getElementById('quiz-result');

  options.forEach((opt, i) => {
    if (i === QUIZ.correct) {
      opt.classList.add('correct');
    } else if (i === selectedIdx && i !== QUIZ.correct) {
      opt.classList.add('wrong');
    }
    opt.style.pointerEvents = 'none';
  });

  const isCorrect = selectedIdx === QUIZ.correct;
  if (resultEl) {
    resultEl.style.display = 'block';
    resultEl.style.background = isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
    resultEl.style.border = `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`;
    resultEl.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
    resultEl.textContent = isCorrect
      ? '✅ Correct! P/E = Price ÷ Earnings Per Share'
      : '❌ Not quite. The answer is "Price-to-Earnings ratio"';
  }

  if (isCorrect) Toast.success('+50 XP!', 'You answered correctly!');
}
