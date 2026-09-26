const screens = [...document.querySelectorAll('[data-screen]')];
const revealScreen = document.querySelector('.screen--reveal');
const resultStage = document.querySelector('.result-stage');
const toast = document.querySelector('.toast');
let revealTimer;
let locale = 'en';

const copy = {
  en: {
    welcomeEyebrow:'Beauty, understood.',welcomeTitle:'Care that begins<br />with you.',welcomeDeck:'A quieter, more intelligent way to understand your beauty.',begin:'Begin',privacy:'Privacy before beauty',imageLabel:'Phase 2A · LP2A-20260926.1',
    todayEyebrow:'Friday · your care, composed',morning:'Good morning,',todayFocus:"Today's focus",protectGlow:"Protect the glow<br />you've built.",heroReason:'Your saved morning ritual and latest Skin preview point to one gentle priority.',openRitual:'Open morning ritual',fixture:'Demo context',latestSkin:'Latest Skin preview',calmPicture:'A calm, balanced picture.',precisionContext:'Your illustrative result is ready to explore. No live provider was contacted.',viewResult:'View Precision result',understandFocus:'Understand your focus and next step',yourLumiere:'Your Lumière',analyze:'Analyze',skin:'Skin',skinState:'Preview ready',hair:'Hair',hairState:'Routine saved',nails:'Nails',nailsState:'Explore care',personalThread:'Your personal thread',baselineReady:'Your first baseline is ready.',baselineCopy:'One more comparable Skin result can begin a meaningful view over time.',coachLabel:'Lumière Coach',coachQuestion:"Would you like to make today's ritual simpler?",coachSource:'Based on your saved routine · no new analysis',askCoach:'Ask Coach',navToday:'Today',navAnalyze:'Analyze',navCoach:'Coach',navYou:'You',
    understanding:'Understanding the image',bringingFocus:'Bringing your<br />current picture into focus.',phaseCopy:'Reading visible cosmetic characteristics · illustrative demo only',skipReveal:'Show result now',skinResult:'Skin result',illustrative:'Illustrative demo',demoImage:'Illustrative image',currentPicture:'Your current picture',resultHeadline:'Calm, balanced—and asking for hydration support.',resultDeck:'The visible picture appears even overall. Your most useful beauty focus today is maintaining moisture comfort.',atGlance:'At a glance',keyInsights:'Key insights',details:'Details',texture:'Texture',appearsBalanced:'Appears balanced',tone:'Tone',looksEven:'Looks even',hydration:'Hydration',supportToday:'Support today',noMeasurement:'Qualitative prototype language · no live measurement or diagnosis',topFocus:'Your top focus',hydrationComfort:'Hydration comfort',focusCopy:'Keep care gentle and consistent. Add moisture before introducing anything new.',nextAction:'Your next action',buildRitual:'Build a gentle morning ritual with Coach.',storedOnly:'Coach will use this stored illustrative result. It will not trigger a new analysis.',continueCoach:'Continue with Coach',progress:'Progress',baselineCreated:'Baseline created',baselineHonest:'There is no trend yet. Future comparable results can build your personal view over time.',exploreDetails:'Explore your result'
  },
  ar: {
    welcomeEyebrow:'جمالك، بوضوح.',welcomeTitle:'عناية تبدأ<br />منكِ.',welcomeDeck:'طريقة أكثر هدوءاً وذكاءً لفهم جمالكِ.',begin:'ابدئي',privacy:'الخصوصية قبل الجمال',imageLabel:'Phase 2A · LP2A-20260926.1',
    todayEyebrow:'الجمعة · عنايتكِ بتناغم',morning:'صباح الخير،',todayFocus:'تركيز اليوم',protectGlow:'حافظي على الإشراقة<br />التي صنعتِها.',heroReason:'روتينكِ الصباحي المحفوظ ومعاينة البشرة الأخيرة يشيران إلى أولوية لطيفة واحدة.',openRitual:'افتحي روتين الصباح',fixture:'سياق تجريبي',latestSkin:'أحدث معاينة للبشرة',calmPicture:'صورة هادئة ومتوازنة.',precisionContext:'نتيجتكِ التوضيحية جاهزة للاستكشاف. لم يتم الاتصال بأي مزوّد مباشر.',viewResult:'شاهدي نتيجة Precision',understandFocus:'افهمي تركيزكِ وخطوتكِ التالية',yourLumiere:'Lumière الخاصة بكِ',analyze:'حلّلي',skin:'البشرة',skinState:'المعاينة جاهزة',hair:'الشعر',hairState:'الروتين محفوظ',nails:'الأظافر',nailsState:'استكشفي العناية',personalThread:'مساركِ الشخصي',baselineReady:'خط الأساس الأول جاهز.',baselineCopy:'نتيجة بشرة أخرى قابلة للمقارنة يمكن أن تبدأ رؤية شخصية مفيدة مع الوقت.',coachLabel:'مدرّبة Lumière',coachQuestion:'هل ترغبين في تبسيط روتين اليوم؟',coachSource:'بناءً على روتينكِ المحفوظ · من دون تحليل جديد',askCoach:'اسألي المدرّبة',navToday:'اليوم',navAnalyze:'تحليل',navCoach:'المدرّبة',navYou:'أنتِ',
    understanding:'فهم الصورة',bringingFocus:'نجعل صورتكِ الحالية<br />أكثر وضوحاً.',phaseCopy:'قراءة الخصائص التجميلية الظاهرة · عرض توضيحي فقط',skipReveal:'اعرضي النتيجة الآن',skinResult:'نتيجة البشرة',illustrative:'عرض توضيحي',demoImage:'صورة توضيحية',currentPicture:'صورتكِ الحالية',resultHeadline:'هادئة ومتوازنة، وتستفيد من دعم الترطيب.',resultDeck:'تبدو الصورة الظاهرة متجانسة عموماً. التركيز التجميلي الأكثر فائدة اليوم هو الحفاظ على راحة الترطيب.',atGlance:'نظرة سريعة',keyInsights:'أهم الملاحظات',details:'التفاصيل',texture:'الملمس',appearsBalanced:'يبدو متوازناً',tone:'اللون',looksEven:'يبدو متجانساً',hydration:'الترطيب',supportToday:'دعم اليوم',noMeasurement:'لغة توضيحية نوعية · لا قياس مباشر ولا تشخيص',topFocus:'تركيزكِ الأول',hydrationComfort:'راحة الترطيب',focusCopy:'حافظي على عناية لطيفة ومنتظمة. أضيفي الترطيب قبل تجربة أي شيء جديد.',nextAction:'خطوتكِ التالية',buildRitual:'أنشئي روتيناً صباحياً لطيفاً مع المدرّبة.',storedOnly:'ستستخدم المدرّبة هذه النتيجة التوضيحية المحفوظة، ولن تبدأ تحليلاً جديداً.',continueCoach:'تابعي مع المدرّبة',progress:'التقدّم',baselineCreated:'تم إنشاء خط الأساس',baselineHonest:'لا يوجد اتجاه بعد. يمكن للنتائج المستقبلية القابلة للمقارنة بناء رؤيتكِ الشخصية مع الوقت.',exploreDetails:'استكشفي نتيجتكِ'
  }
};

const toastCopy = {
  en:{privacy:'Privacy Center is preserved outside this three-screen prototype.',profile:'Profile is preserved outside this three-screen prototype.',notifications:'No new notifications in this deterministic demo.',routine:'Routine remains unchanged in this prototype.',analyze:'Analyze remains unchanged in this prototype.',hair:'Hair remains unchanged in this prototype.',nails:'Nails remains unchanged in this prototype.',history:'History remains unchanged in this prototype.',coach:'Coach remains unchanged in this prototype.',share:'Sharing is disabled in this local prototype.',details:'Detailed Results remains unchanged in this prototype.'},
  ar:{privacy:'مركز الخصوصية محفوظ خارج هذا النموذج المكوّن من ثلاث شاشات.',profile:'الملف الشخصي محفوظ خارج هذا النموذج.',notifications:'لا توجد إشعارات جديدة في هذا العرض الثابت.',routine:'لم يتغير الروتين في هذا النموذج.',analyze:'لم تتغير شاشة التحليل في هذا النموذج.',hair:'لم تتغير تجربة الشعر في هذا النموذج.',nails:'لم تتغير تجربة الأظافر في هذا النموذج.',history:'لم يتغير السجل في هذا النموذج.',coach:'لم تتغير تجربة المدرّبة في هذا النموذج.',share:'المشاركة معطّلة في النموذج المحلي.',details:'لم تتغير النتائج التفصيلية في هذا النموذج.'}
};

function showScreen(name) {
  clearTimeout(revealTimer);
  screens.forEach(screen => screen.classList.toggle('is-active', screen.dataset.screen === name));
  if (name === 'reveal') {
    revealScreen.classList.remove('result-visible');
    resultStage.setAttribute('aria-hidden', 'true');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) showResult();
    else revealTimer = setTimeout(showResult, 3600);
  }
}

function showResult() {
  clearTimeout(revealTimer);
  revealScreen.classList.add('result-visible');
  resultStage.setAttribute('aria-hidden', 'false');
  resultStage.querySelector('button')?.focus({preventScroll:true});
}

function showToast(key) {
  toast.textContent = toastCopy[locale][key] || '';
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function applyLocale(next) {
  locale = next;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[locale][node.dataset.i18n];
    if (value) node.innerHTML = value;
  });
  document.querySelector('.locale-toggle').textContent = locale === 'en' ? 'العربية' : 'English';
}

document.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.next) showScreen(target.dataset.next);
  if (target.dataset.jump) showScreen(target.dataset.jump);
  if (target.hasAttribute('data-show-result')) showResult();
  if (target.dataset.toastKey) showToast(target.dataset.toastKey);
  if (target.classList.contains('locale-toggle')) applyLocale(locale === 'en' ? 'ar' : 'en');
});

applyLocale('en');
