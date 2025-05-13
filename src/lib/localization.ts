import type { AllLocalizationStrings } from '@/types';

export const translations: AllLocalizationStrings = {
  en: {
    appName: 'BreatheWise',
    tagline: 'Your guide to the Wim Hof Method',
    // Navigation
    navDashboard: 'Dashboard',
    navProgress: 'Progress',
    // User Name Form
    enterYourName: 'Enter your name to get started:',
    namePlaceholder: 'Your Name',
    saveName: 'Save Name',
    // Dashboard
    welcome: 'Welcome, {name}!',
    startSession: 'Start New Session',
    viewProgress: 'View Progress', // Changed from 'View Your Progress'
    // Session Configuration
    configureSession: 'Configure Your Session',
    numberOfRounds: 'Number of Rounds (1-10):',
    beginSession: 'Begin Session',
    // Breathing Session
    round: 'Round {current} of {total}',
    breathe: 'Breathe',
    breathIn: 'Inhale deeply...',
    breathOut: 'Exhale fully...',
    prepareToHold: 'Prepare to hold...',
    exhaleAndHold: 'Exhale fully and HOLD',
    holdBreath: 'Hold your breath',
    recoveryBreath: 'Recovery Breath',
    takeRecoveryBreath: 'Take a deep recovery breath and hold for 15s',
    stopTimer: 'Stop Timer & Breathe',
    sessionComplete: 'Session Complete!',
    yourHoldTimes: 'Your hold times (seconds):',
    longestHoldThisSession: 'Longest hold this session: {time}s',
    backToDashboard: 'Back to Dashboard',
    stopSession: 'Stop Session',
    // Progress Page
    yourProgress: 'Your Progress',
    longestBreathHold: 'Longest Breath Hold Ever',
    totalSessions: 'Total Sessions Completed',
    sessionsLog: 'Sessions Log',
    noSessionsYet: 'You haven\'t completed any sessions yet. Start one from the dashboard!',
    sessionDate: 'Date',
    sessionRounds: 'Rounds',
    sessionHolds: 'Holds (s)',
    longestHoldColumnHeader: 'Longest',
    deleteAllData: 'Delete All Data', // Changed from 'Delete All My Data'
    confirmDeleteAllTitle: 'Are you sure?',
    confirmDeleteAllDescription: 'This will permanently delete all your session history and user name. This action cannot be undone.',
    deleteSession: 'Delete Session',
    confirmDeleteSessionTitle: 'Delete this session?',
    confirmDeleteSessionDescription: 'This will permanently delete this session record. This action cannot be undone.',
    actionColumnHeader: 'Actions',
    // Wim Hof Method Info
    wimHofMethodTitle: 'About the Wim Hof Method',
    wimHofMethodDescription: `The Wim Hof Method is a powerful technique that combines three pillars: Cold Therapy, Breathing, and Commitment. It's known for its potential benefits on physical and mental well-being.

**Breathing Exercise Steps:**
1.  **Controlled Hyperventilation:** Sit in a comfortable position. Inhale deeply through the nose or mouth, and exhale unforced through the mouth. Repeat for 30-40 breaths. You might feel lightheaded or tingling sensations.
2.  **Breath Retention (Exhale Hold):** After the last exhalation, hold your breath for as long as you comfortably can without force.
3.  **Recovery Breath:** When you feel the urge to breathe, inhale deeply and hold for 10-15 seconds, then exhale. This completes one round.

Typically, 3-4 rounds are performed in one session. Listen to your body and never force anything. Consult a healthcare professional if you have any health concerns.`,
    // General
    loading: 'Loading...',
    sec: 's',
    toggleLanguage: 'Switch Language',
    english: 'English',
    russian: 'Russian',
    closeButtonLabel: 'Close',
    cancelButton: 'Cancel',
    confirmDeleteButton: 'Yes, Delete',
    confirmDeleteAllButton: 'Yes, Delete All',
  },
  ru: {
    appName: 'ДышиМудро',
    tagline: 'Ваш гид по методу Вима Хофа',
    // Navigation
    navDashboard: 'Панель',
    navProgress: 'Прогресс',
    // User Name Form
    enterYourName: 'Введите ваше имя, чтобы начать:',
    namePlaceholder: 'Ваше Имя',
    saveName: 'Сохранить', // Changed from 'Сохранить Имя'
    // Dashboard
    welcome: 'Добро пожаловать, {name}!',
    startSession: 'Начать Сессию', // Changed from 'Начать Новую Сессию'
    viewProgress: 'Мой Прогресс', // Changed from 'Посмотреть Прогресс'
    // Session Configuration
    configureSession: 'Настройте Сессию',
    numberOfRounds: 'Количество Раундов (1-10):',
    beginSession: 'Начать Сессию',
    // Breathing Session
    round: 'Раунд {current} из {total}',
    breathe: 'Дышите',
    breathIn: 'Вдохните глубоко...',
    breathOut: 'Выдохните полностью...',
    prepareToHold: 'Приготовьтесь к задержке...',
    exhaleAndHold: 'Выдохните полностью и ДЕРЖИТЕ',
    holdBreath: 'Задержите дыхание',
    recoveryBreath: 'Восстановительное Дыхание',
    takeRecoveryBreath: 'Сделайте глубокий восстановительный вдох и задержите на 15с',
    stopTimer: 'Остановить и Дышать', // Changed from 'Остановить Таймер и Дышать'
    sessionComplete: 'Сессия Завершена!',
    yourHoldTimes: 'Ваши задержки дыхания (секунды):',
    longestHoldThisSession: 'Самая долгая задержка в этой сессии: {time}с',
    backToDashboard: 'На Панель', // Changed from 'Вернуться на Панель'
    stopSession: 'Остановить Сессию',
    // Progress Page
    yourProgress: 'Ваш Прогресс',
    longestBreathHold: 'Самая Долгая Задержка Дыхания',
    totalSessions: 'Всего Завершено Сессий',
    sessionsLog: 'Журнал Сессий',
    noSessionsYet: 'Вы еще не завершили ни одной сессии. Начните одну с панели!',
    sessionDate: 'Дата',
    sessionRounds: 'Раунды',
    sessionHolds: 'Задержки (с)',
    longestHoldColumnHeader: 'Макс.',
    deleteAllData: 'Удалить Все Данные', // Changed from 'Удалить Все Мои Данные'
    confirmDeleteAllTitle: 'Вы уверены?',
    confirmDeleteAllDescription: 'Вся история сессий и имя пользователя будут удалены навсегда. Действие нельзя отменить.', // Improved phrasing
    deleteSession: 'Удалить Сессию',
    confirmDeleteSessionTitle: 'Удалить эту сессию?',
    confirmDeleteSessionDescription: 'Эта запись сессии будет удалена навсегда. Действие нельзя отменить.', // Improved phrasing
    actionColumnHeader: 'Действия',
    // Wim Hof Method Info
    wimHofMethodTitle: 'О методе Вима Хофа',
    wimHofMethodDescription: `Метод Вима Хофа — это мощная техника, сочетающая три столпа: Холодотерапию, Дыхание и Приверженность. Он известен своими потенциальными преимуществами для физического и психического благополучия.

**Этапы дыхательного упражнения:**
1.  **Контролируемая гипервентиляция:** Сядьте в удобное положение. Глубоко вдохните через нос или рот и без усилий выдохните через рот. Повторите 30-40 раз. Вы можете почувствовать легкое головокружение или покалывание.
2.  **Задержка дыхания (на выдохе):** После последнего выдоха задержите дыхание так долго, как сможете комфортно, без насилия над собой.
3.  **Восстановительный вдох:** Когда почувствуете потребность вдохнуть, сделайте глубокий вдох и задержите его на 10-15 секунд, затем выдохните. Это завершает один раунд.

Обычно за одну сессию выполняется 3-4 раунда. Прислушивайтесь к своему телу и никогда ничего не форсируйте. Проконсультируйтесь с врачом, если у вас есть какие-либо проблемы со здоровьем.`,
    // General
    loading: 'Загрузка...',
    sec: 'с',
    toggleLanguage: 'Переключить язык',
    english: 'Английский',
    russian: 'Русский',
    closeButtonLabel: 'Закрыть',
    cancelButton: 'Отмена',
    confirmDeleteButton: 'Да, Удалить',
    confirmDeleteAllButton: 'Да, Удалить Всё',
  },
};
