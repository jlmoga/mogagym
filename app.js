/**
 * LÒGICA DE L'APLICACIÓ DE GIMNÀS
 * Gestió de catàleg amb filtres creuats + Perfil i Adaptació
 */

// Funció per normalitzar el nom de l'exercici per al fitxer d'imatge
function generarNomFitxer(nom) {
    return nom.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar accents
        .replace(/[^a-z0-9]+/g, '-')     // Substituir caràcters no alfanumèrics (espais, parèntesis) per guionets
        .replace(/^-+|-+$/g, '');        // Netejar guionets al principi i al final
}

let profile = {
    theme: 'dark',
    age: 30,
    sex: 'home',
    level: 'intermediate',
    maxWeight: 10,
    lang: 'ca'
};

// Funció per obtenir el contingut de l'exercici segons l'idioma
function getExerciseContent(ex) {
    const lang = profile.lang || 'ca';
    if (ex.translations && ex.translations[lang]) {
        return {
            nom: ex.translations[lang].nom || ex.nom,
            instruccions: ex.translations[lang].instruccions || ex.instruccions,
            benefici_salut: ex.translations[lang].benefici || ex.benefici_salut
        };
    }
    return {
        nom: ex.nom,
        instruccions: ex.instruccions,
        benefici_salut: ex.benefici_salut
    };
}

// Funció per generar les estrelles de complexitat
function getComplexityStars(level) {
    const maxStars = 5;
    let starsHtml = '<div class="stars">';
    for (let i = 1; i <= maxStars; i++) {
        const starClass = i <= level ? 'star filled' : 'star';
        starsHtml += `<span class="${starClass}">★</span>`;
    }
    starsHtml += '</div>';
    return `
        <div class="complexity-container">
            <span class="complexity-label">Complexitat</span>
            ${starsHtml}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // --- GESTIÓ DE NAVEGACIÓ (HISTORY API) ---
    function navegarA(view, push = true) {
        // --- PROTECCIÓ CONTRA VISTES INVÀLIDES (Evitar pantalla en blanc) ---
        const validViews = ['catalog', 'routines', 'activity', 'profile'];
        if (!validViews.includes(view)) {
            // Si estem en un hash desconegut (Ex: #modal), provem d'anar a l'historial anterior 
            // o default catalog
            if (view === 'modal' || view === 'save' || view === 'detail' || view === 'edit') {
                // No fem res, esperem que el popstate gestioni el modal.
                // Però ens assegurem que la vista subjacent encara sigui visible.
                return;
            }
            view = 'catalog'; // Fallback
        }

        // Actualitzar classes de les pestanyes
        navTabs.forEach(t => {
            if (t.getAttribute('data-view') === view) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Mostrar/amagar seccions
        catalogSection.classList.toggle('hidden', view !== 'catalog');
        routinesSection.classList.toggle('hidden', view !== 'routines');
        profileSection.classList.toggle('hidden', view !== 'profile');
        activitySection.classList.toggle('hidden', view !== 'activity');
        catalogFilters.classList.toggle('hidden', view !== 'catalog');

        // Executar renderitzats segons la vista
        if (view === 'catalog') {
            updateDisplay();
        } else if (view === 'routines') {
            renderRoutines();
        } else if (view === 'activity') {
            renderActivityLog();
        }

        // Guardar a l'historial
        if (push) {
            history.pushState({ view: view }, '', `#${view}`);
        }
    }
    // --- ELEMENTS DOM ---
    const exerciseGrid = document.getElementById('exerciseGrid');
    const categoryButtons = document.querySelectorAll('.filter-btn[data-category]');
    const materialTrigger = document.getElementById('toggleMaterialMenu');
    const materialMenu = document.getElementById('materialMenu');
    const materialToggles = document.querySelectorAll('#materialToggles input');
    
    // Elements Perfil
    const executionModal = document.getElementById('executionModal');
    const detailModal = document.getElementById('detailModal');
    const editRoutineModal = document.getElementById('editRoutineModal');
    const saveRoutineModal = document.getElementById('saveRoutineModal');
    const profileForm = document.getElementById('profileForm');
    const closeModals = document.querySelectorAll('.close-modal, .close-btn-action');
    
    // Elements Rutines
    const navTabs = document.querySelectorAll('.nav-tab');
    const catalogSection = document.getElementById('catalogSection');
    const routinesSection = document.getElementById('routinesSection');
    const profileSection = document.getElementById('profileSection');
    const activitySection = document.getElementById('activitySection');
    const catalogFilters = document.getElementById('catalogFilters');
    const routinesList = document.getElementById('routinesList');
    const activityLogList = document.getElementById('activityLogList');
    const btnNewRoutine = document.getElementById('btnNewRoutine');
    const selectionBar = document.getElementById('selectionActionBar');
    const selectionCount = document.getElementById('selectionCount');
    const btnSaveRoutine = document.getElementById('saveRoutine');
    const btnCancelSelection = document.getElementById('cancelSelection');
    
    const btnConfirmSaveRoutine = document.getElementById('confirmSaveRoutine');

    let currentCategory = 'tots';
    let isSelectionMode = false;
    let selectedExercisesIds = [];
    
    // --- MIGRACIÓ I PERSISTÈNCIA (LocalStorage) ---
    // Migració de dades de mogagym a kora360 si cal
    if (localStorage.getItem('mogagym_routines') && !localStorage.getItem('kora360_routines')) {
        localStorage.setItem('kora360_routines', localStorage.getItem('mogagym_routines'));
    }
    
    let routines = JSON.parse(localStorage.getItem('kora360_routines')) || [];
    let activityLog = JSON.parse(localStorage.getItem('kora360_activity_log')) || [];
    let currentRoutineExecution = null;
    const fitnessLevelMap = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3
    };

    // --- GESTIÓ DE WAKE LOCK (Pantalla encesa) ---
    let wakeLock = null;

    function recordStepTime() {
        if (!currentRoutineExecution) return;
        const now = Date.now();
        const elapsed = now - currentRoutineExecution.stepStartTime;
        
        const currentItem = currentRoutineExecution.items[currentRoutineExecution.currentIndex];
        if (currentItem && currentItem.id === 'descans-01') {
            currentRoutineExecution.totalRestMs += elapsed;
        }
        
        currentRoutineExecution.stepStartTime = now;
    }

    async function requestWakeLock() {
        if ('wakeLock' in navigator) {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('✅ Wake Lock actiu: La pantalla no s\'apagarà.');
                
                wakeLock.addEventListener('release', () => {
                    console.log('🔓 Wake Lock alliberat.');
                });
            } catch (err) {
                console.error(`❌ Error Wake Lock: ${err.message}`);
            }
        }
    }

    function releaseWakeLock() {
        if (wakeLock !== null) {
            wakeLock.release();
            wakeLock = null;
        }
    }

    // Re-adquirir el Wake Lock si la pestanya torna a ser visible
    document.addEventListener('visibilitychange', async () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            await requestWakeLock();
        }
    });

    // --- PERSISTÈNCIA (LocalStorage) ---
    function loadProfile() {
        const saved = localStorage.getItem('moga_profile');
        if (saved) {
            profile = JSON.parse(saved);
            // Omplir el form amb dades guardades
            if (profile.theme) document.getElementById('pTheme').value = profile.theme;
            document.getElementById('pAge').value = profile.age;
            document.getElementById('pSex').value = profile.sex;
            document.getElementById('pLevel').value = profile.level;
            document.getElementById('pMaxWeight').value = profile.maxWeight;
            document.getElementById('pLang').value = profile.lang || 'ca';
            
            if (profile.theme) applyTheme(profile.theme);
            return true;
        }
        return false;
    }

    function saveProfile(newData) {
        profile = newData;
        localStorage.setItem('moga_profile', JSON.stringify(profile));
        if (profile.theme) applyTheme(profile.theme);
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // També canviem el meta theme-color per a la barra d'adreces de Chrome/Android
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#3D5F90' : '#111318');
        }
    }

    // --- LÒGICA D'ADAPTACIÓ ---
    function getExecutionGoal(exercise) {
        if (exercise.nom === 'Descans') {
            return { sets: 1, reps: "60 s", extra: " de descans", isCount: true };
        }
        // Multiplicadors per nivell
        const multipliers = {
            'beginner': { reps: 0.8, weight: 0.5, sets: 0 },
            'intermediate': { reps: 1.0, weight: 0.7, sets: 0 },
            'advanced': { reps: 1.2, weight: 0.9, sets: 1 }
        };
        const m = multipliers[profile.level];

        // --- CAS ESPECIAL: COMPTATGE (REM, ETC.) ---
        if (exercise.tipus === 'comptatge') {
            const comptatgeOpcions = {
                'beginner': 100,
                'intermediate': 300,
                'advanced': 500
            };
            return {
                sets: 1,
                reps: comptatgeOpcions[profile.level] || 250,
                extra: " remades",
                isCount: true
            };
        }

        // --- CAS ESTÀNDARD: SÈRIES X REPS ---
        // Parsejar repeticions suggerides (Ex: "3 sèries de 12-15 repeticions")
        const setsMatch = exercise.repeticions_suggerides.match(/(\d+)\s+sèries/);
        const repsMatch = exercise.repeticions_suggerides.match(/(\d+)-?(\d+)?\s+repeticions/);
        
        let baseSets = setsMatch ? parseInt(setsMatch[1]) : 3;
        let baseReps = repsMatch ? parseInt(repsMatch[1]) : 12;

        let finalSets = baseSets + m.sets;
        let finalReps = Math.round(baseReps * m.reps);
        let finalWeight = "";

        // Si l'exercici requereix peses, calculem el pes sugerit
        if (exercise.materials.includes('peses')) {
            const calculatedWeight = Math.round(profile.maxWeight * m.weight);
            finalWeight = ` amb ${calculatedWeight}kg`;
        } else if (exercise.materials.includes('gomes')) {
            const intensity = profile.level === 'beginner' ? 'lleugera' : (profile.level === 'advanced' ? 'forta' : 'mitjana');
            finalWeight = ` amb goma ${intensity}`;
        }

        return {
            sets: finalSets,
            reps: finalReps,
            extra: finalWeight,
            isCount: false
        };
    }

    function showExerciseDetail(exId) {
        const ex = CATALEG_EXERCICIS.find(e => e.id === exId);
        const detailContent = document.getElementById('detailContent');
        const content = getExerciseContent(ex);
        
        const nomFitxer = ex.imatge ? `${ex.imatge}.jpg` : (ex.nom === 'Descans' ? 'descans.png' : `${generarNomFitxer(ex.nom)}.jpg`);
        detailContent.innerHTML = `
            <h2>${content.nom}</h2>
            <img src="img/${nomFitxer}" class="modal-img-small" alt="${content.nom}" 
                 onerror="this.onerror=null;this.src='https://placehold.co/400x200/111/4facfe?text=${encodeURIComponent(content.nom)}'">
            
            <div class="detail-complexity-box">
                ${getComplexityStars(ex.complexitat || 3)}
            </div>

            <div class="detail-tabs">
                <button class="tab-btn active" onclick="switchDetailTab('instruccions')">Instruccions</button>
                <button class="tab-btn" onclick="switchDetailTab('beneficis')">Beneficis</button>
            </div>

            <div id="pane-instruccions" class="tab-pane active">
                <p class="modal-desc">${content.instruccions}</p>
            </div>
            
            <div id="pane-beneficis" class="tab-pane">
                <div class="benefit-box" style="margin-top: 0;">
                    <strong>Benefici principal:</strong>
                    <p>${content.benefici_salut}</p>
                </div>
            </div>

            <div class="modal-footer-actions">
                <button class="save-btn" style="width: 100%;" onclick="window.openExecutionModal('${ex.id}'); document.getElementById('detailModal').classList.remove('open');">
                    Començar entrenament
                </button>
            </div>
        `;
        
        if (!detailModal.classList.contains('open')) {
            detailModal.classList.add('open');
            history.pushState({ modal: 'detail' }, '', '#detail');
        }
    }

    window.switchDetailTab = (tabName) => {
        const panes = document.querySelectorAll('.tab-pane');
        const buttons = document.querySelectorAll('.tab-btn');
        
        panes.forEach(p => p.classList.remove('active'));
        buttons.forEach(b => b.classList.remove('active'));
        
        document.getElementById(`pane-${tabName}`).classList.add('active');
        // Trobar el botó corresponent i activar-lo
        const index = tabName === 'instruccions' ? 0 : 1;
        buttons[index].classList.add('active');
    };

    function openExecutionModal(exId, isRoutine = false) {
        const ex = CATALEG_EXERCICIS.find(e => e.id === exId);
        if (!ex) return;

        const goal = getExecutionGoal(ex);
        const content = document.getElementById('executionContent');
        const nomImatge = generarNomFitxer(ex.nom);
        
        let routineControls = '';
        if (isRoutine && currentRoutineExecution) {
            const { currentIndex, items } = currentRoutineExecution;
            const progress = ((currentIndex + 1) / items.length) * 100;
            const isLast = currentIndex === items.length - 1;

            routineControls = `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="execution-footer">
                    <p class="disclaimer-footer">
                        Basat en les teves dades de perfil i el pes màxim de ${profile.maxWeight}kg.
                    </p>
                    <div class="execution-options">
                        <div class="random-toggle-container">
                            <div class="random-toggle-label">
                                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.45 20 9.5V4h-5.5zm.73 11.09l-1.41 1.41 3.13 3.13L14.5 22H20v-5.5l-2.04 2.04-2.73-2.73z"/></svg>
                                <span><span class="label-desktop">Mode Aleatori</span><span class="label-mobile">Aleatori</span></span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="randomModeToggle" ${currentRoutineExecution.isRandom ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="random-toggle-container">
                            <div class="random-toggle-label">
                                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M15 7v4h1V7h-1zm2 0v4h1V7h-1zm2 0v4h1V7h-1zM5 13h14v-2H5v2zm0 4h14v-2H5v2zM5 7v4h1V7H5zm2 0v4h1V7H7zm2 0v4h1V7H9zm2 0v4h1V7h-1z"/></svg>
                                <span><span class="label-desktop">Entrenament en circuit</span><span class="label-mobile">Circuit</span></span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="circuitModeToggle" ${currentRoutineExecution.isCircuit ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="nav-btns-step">
                        <button class="btn-step" id="prevStep" ${currentIndex === 0 ? 'disabled' : ''}>← Anterior</button>
                        <span>${currentIndex + 1} / ${items.length}</span>
                        <button class="btn-step" id="nextStep">${isLast ? 'Finalitzar' : 'Següent →'}</button>
                    </div>
                </div>
            `;
        } else {
            // Botó normal per a execució única
            routineControls = `
                <div class="execution-footer">
                    <p class="disclaimer-footer">
                        Basat en les teves dades de perfil i el pes màxim de ${profile.maxWeight}kg.
                    </p>
                    <button class="close-btn-action">Tancar</button>
                </div>
            `;
        }

        const item = isRoutine ? currentRoutineExecution.items[currentRoutineExecution.currentIndex] : { id: exId, set: 1 };
        const exItem = isRoutine ? CATALEG_EXERCICIS.find(e => e.id === item.id) : ex;
        const goalText = goal.isCount ? `${goal.reps}${goal.extra}` : `SÈRIE ${item.set} de ${goal.sets} (${goal.reps} repeticions${goal.extra})`;
        const content_ex = getExerciseContent(ex);

        const nomFitxer = ex.imatge ? `${ex.imatge}.jpg` : (ex.nom === 'Descans' ? 'descans.png' : `${generarNomFitxer(ex.nom)}.jpg`);
        content.innerHTML = `
            <h2>${content_ex.nom}</h2>
            <div class="execution-header-compact">
                <img src="img/${nomFitxer}" class="modal-img" alt="${content_ex.nom}" 
                     onerror="this.onerror=null;this.src='https://placehold.co/400x200/111/4facfe?text=${encodeURIComponent(content_ex.nom)}'">
                <div class="goal-highlight">
                    <h4>El teu objectiu per avui:</h4>
                    <div class="goal-val">${goalText}</div>
                    ${getComplexityStars(ex.complexitat || 3)}
                </div>
            </div>
            <p class="modal-desc">${content_ex.instruccions}</p>
            ${routineControls}
        `;
        if (!executionModal.classList.contains('open')) {
            executionModal.classList.add('open');
            requestWakeLock(); // Activar Wake Lock
            // Afegir estat a l'historial perquè el botó "Back" tanqui el modal
            history.pushState({ modal: 'execution' }, '', '#modal');
        }

        // Handlers de la rutina
        if (isRoutine) {
            document.getElementById('prevStep')?.addEventListener('click', () => {
                recordStepTime();
                currentRoutineExecution.currentIndex--;
                const item = currentRoutineExecution.items[currentRoutineExecution.currentIndex];
                openExecutionModal(item.id, true);
            });
            document.getElementById('nextStep')?.addEventListener('click', () => {
                recordStepTime();
                // Tracking de progrés
                if (currentRoutineExecution) {
                    currentRoutineExecution.completedIndices.add(currentRoutineExecution.currentIndex);
                }

                if (currentRoutineExecution.currentIndex < currentRoutineExecution.items.length - 1) {
                    currentRoutineExecution.currentIndex++;
                    const item = currentRoutineExecution.items[currentRoutineExecution.currentIndex];
                    openExecutionModal(item.id, true);
                } else {
                    finishRoutine();
                }
            });

            // Toggle de mode aleatori
            document.getElementById('randomModeToggle')?.addEventListener('change', (e) => {
                const isRandom = e.target.checked;
                currentRoutineExecution.isRandom = isRandom;
                
                if (isRandom) {
                    // Shufflem els exercicis que queden (inclòs l'actual)
                    const currentIndex = currentRoutineExecution.currentIndex;
                    const items = [...currentRoutineExecution.items];
                    const currentItem = items[currentIndex];
                    
                    // Separem el que ja hem fet i el que queda
                    const done = items.slice(0, currentIndex);
                    const remaining = items.slice(currentIndex + 1);
                    
                    // Shufflem el que queda
                    for (let i = remaining.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
                    }
                    
                    currentRoutineExecution.items = [...done, currentItem, ...remaining];
                    // Guardem l'ordre original per si es desactiva? 
                    // Millor no, si es desactiva es queda amb l'ordre "shuffled" actual
                } else {
                    // Si es desactiva, potser voldria tornar a l'ordre original...
                    // Però per simplicitat, mantenim l'ordre actual.
                }
                
                // Refresquem el modal per actualitzar el comptador si hagués canviat res (tot i que no canvia)
                // En realitat només ens cal per guardar l'estat.
            });
            // Toggle de mode circuit
            document.getElementById('circuitModeToggle')?.addEventListener('change', (e) => {
                const isCircuit = e.target.checked;
                currentRoutineExecution.isCircuit = isCircuit;
                regenerateSequence();
                openExecutionModal(currentRoutineExecution.items[currentRoutineExecution.currentIndex].id, true);
            });
        } else {
            // Tornar a posar el listener al botó "Entès" dinàmic si no és rutina
            content.querySelector('.close-btn-action').addEventListener('click', () => {
                history.back(); // En lloc de directament tancar, forcem un "back"
            });
        }
    }
    window.openExecutionModal = openExecutionModal; // Make globally accessible for onclick

    function finishRoutine() {
        if (!currentRoutineExecution) return;
        recordStepTime();

        const endTime = new Date();
        const startTime = currentRoutineExecution.startTime;
        const routineName = currentRoutineExecution.routineName;
        const totalItems = currentRoutineExecution.items.length;
        
        // Assegurar que el darrer ítem també es compta si s'ha arribat fins al final
        if (executionModal.classList.contains('open')) {
            currentRoutineExecution.completedIndices.add(currentRoutineExecution.currentIndex);
        }

        // Identificar i comptar només exercicis de treball (no descansos)
        const workItemsIndices = [];
        currentRoutineExecution.items.forEach((item, idx) => {
            if (item.id !== 'descans-01') {
                workItemsIndices.push(idx);
            }
        });
        
        const totalWorkItems = workItemsIndices.length;
        const completedWorkIndices = [...currentRoutineExecution.completedIndices]
            .filter(idx => workItemsIndices.includes(idx));
        
        const completedWorkCount = completedWorkIndices.length;
        const progress = totalWorkItems > 0 ? (completedWorkCount / totalWorkItems) * 100 : 100;

        // Regla de Qualitat: mímim 20% de treball real
        if (progress >= 20) {
            // Càlcul d'Intensitat: E = Sum(I) / C
            let sumIntensity = 0;
            completedWorkIndices.forEach(idx => {
                const item = currentRoutineExecution.items[idx];
                const ex = CATALEG_EXERCICIS.find(e => e.id === item.id);
                if (ex) {
                    sumIntensity += (ex.complexitat || 3);
                }
            });

            const C = fitnessLevelMap[profile.level] || 2;
            const finalIntensity = (sumIntensity / C).toFixed(1);

            const avgComplexity = completedWorkCount > 0 ? (sumIntensity / completedWorkCount).toFixed(1) : 0;

            const session = {
                id: Date.now(),
                date: startTime.toLocaleDateString(),
                routineName: routineName,
                startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                duration: Math.max(1, Math.round(((endTime - startTime) - currentRoutineExecution.totalRestMs) / 60000)), // minuts, mínim 1 per evitar 0
                intensity: finalIntensity,
                avgComplexity: parseFloat(avgComplexity),
                progress: Math.round(progress),
                status: progress >= 100 ? 'Completada' : 'Parcial'
            };

            activityLog.unshift(session);
            localStorage.setItem('kora360_activity_log', JSON.stringify(activityLog));
        }

        if (executionModal.classList.contains('open')) {
            executionModal.classList.remove('open');
            releaseWakeLock();
            if (window.location.hash === '#modal') {
                history.back();
            }
        }
        currentRoutineExecution = null;
    }

    // --- GESTIÓ DE RUTINES ---
    function saveRoutines() {
        localStorage.setItem('kora360_routines', JSON.stringify(routines));
    }

    function renderRoutines() {
        routinesList.innerHTML = '';
        if (routines.length === 0) {
            routinesList.innerHTML = `<div class="empty-state">No tens cap rutina encara.</div>`;
            return;
        }

        routines.forEach((routine, index) => {
            const card = document.createElement('div');
            card.className = 'routine-card';
            
            const exerciseNames = routine.exercises
                .map(id => {
                    const ex = CATALEG_EXERCICIS.find(e => e.id === id);
                    return ex ? ex.nom : null;
                })
                .filter(name => name !== null)
                .join(', ');

            card.innerHTML = `
                <h3>${routine.name}</h3>
                <p class="count">${routine.exercises.length} exercicis</p>
                <p class="routine-exercises-list">${exerciseNames}</p>
                <div class="routine-actions">
                    <button class="btn-play" title="Executar Rutina">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                    </button>
                    <button class="btn-icon-edit" title="Editar Rutina">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    </button>
                    <button class="btn-icon-delete" title="Eliminar Rutina">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                </div>
            `;
            
            // Add event listeners properly
            card.querySelector('.btn-play').addEventListener('click', (e) => {
                e.stopPropagation();
                window.startRoutine(index);
            });
            card.querySelector('.btn-icon-edit').addEventListener('click', (e) => {
                e.stopPropagation();
                window.openEditRoutine(index);
            });
            card.querySelector('.btn-icon-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                window.deleteRoutine(index);
            });
            
            card.addEventListener('click', () => window.startRoutine(index));
            routinesList.appendChild(card);
        });
    }

    function renderActivityLog() {
        activityLogList.innerHTML = '';
        if (activityLog.length === 0) {
            activityLogList.innerHTML = `<div class="empty-state">Encara no tens cap sessió registrada.</div>`;
            return;
        }

        activityLog.forEach(session => {
            const card = document.createElement('div');
            card.className = 'activity-card';
            
            card.innerHTML = `
                <div class="activity-header">
                    <div class="activity-date-info">
                        <span class="activity-date">${session.date}</span>
                        <span class="activity-time">${session.startTime} - ${session.endTime}</span>
                    </div>
                    <div class="activity-header-right">
                        <span class="activity-status ${session.status.toLowerCase()}">${session.status}</span>
                        <button class="btn-icon-delete" title="Esborrar Registre">
                            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    </div>
                </div>
                <h3>${session.routineName}</h3>
                <div class="activity-complexity" style="margin-bottom: 1.2rem; opacity: 0.9;">
                    ${getComplexityStars(session.avgComplexity || 3)}
                </div>
                <div class="activity-stats">
                    <div class="stat-item">
                        <span class="stat-label">Durada</span>
                        <span class="stat-val">${session.duration} min</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Progrés</span>
                        <span class="stat-val">${session.progress}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Intensitat</span>
                        <span class="stat-val intensity">${session.intensity}</span>
                    </div>
                </div>
                </div>
            `;
            
            card.querySelector('.btn-icon-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = activityLog.indexOf(session);
                if (idx !== -1) {
                    window.deleteActivityLogEntry(idx);
                }
            });

            activityLogList.appendChild(card);
        });
    }

    window.deleteActivityLogEntry = (index) => {
        activityLog.splice(index, 1);
        localStorage.setItem('kora360_activity_log', JSON.stringify(activityLog));
        renderActivityLog();
    };

    window.startRoutine = (index) => {
        const routine = routines[index];
        currentRoutineExecution = {
            currentIndex: 0,
            isRandom: false,
            isCircuit: false,
            originalExercises: routine.exercises, // Guardem IDs originals
            items: [],
            startTime: new Date(),
            routineName: routine.name,
            completedIndices: new Set(),
            totalRestMs: 0,
            stepStartTime: Date.now()
        };
        regenerateSequence();
        openExecutionModal(currentRoutineExecution.items[0].id, true);
    };

    function regenerateSequence() {
        const { isRandom, isCircuit, originalExercises, currentIndex } = currentRoutineExecution;
        
        // 1. Obtenir informació de cada exercici (incloent sets)
        const exData = originalExercises.map(id => {
            const ex = CATALEG_EXERCICIS.find(e => e.id === id);
            return { id, goal: getExecutionGoal(ex) };
        });

        let newItems = [];
        
        if (isCircuit) {
            // Mode Circuit: Interleavar sèries
            const maxSets = Math.max(...exData.map(d => d.goal.sets));
            for (let s = 1; s <= maxSets; s++) {
                let lap = [];
                exData.forEach(d => {
                    if (s <= d.goal.sets) {
                        // Excepció: comptatge només a la 1a volta
                        if (d.goal.isCount && s > 1) return;
                        lap.push({ id: d.id, set: s });
                    }
                });
                
                if (isRandom) {
                    // Si és aleatori, shufflem la volta actual
                    for (let i = lap.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [lap[i], lap[j]] = [lap[j], lap[i]];
                    }
                }
                newItems.push(...lap);
                // Afegir descans després de cada volta completa en circuit
                newItems.push({ id: 'descans-01', set: 1 });
            }
        } else {
            // Mode Normal
            exData.forEach(d => {
                for (let s = 1; s <= d.goal.sets; s++) {
                    newItems.push({ id: d.id, set: s });
                }
                // Afegir descans després de cada exercici en mode normal
                newItems.push({ id: 'descans-01', set: 1 });
            });
            
            if (isRandom) {
                // Si és aleatori normal, shufflem tot? 
                // Segons el comportament anterior, shufflavem els EXERCICIS, no les sèries individuals barrejades.
                // Per mantenir coherència, si és aleatori NO cercuit, shufflem per bloc d'exercici.
                let exerciseBlocks = [];
                exData.forEach(d => {
                    let block = [];
                    for (let s = 1; s <= d.goal.sets; s++) {
                        block.push({ id: d.id, set: s });
                    }
                    exerciseBlocks.push(block);
                });
                
                for (let i = exerciseBlocks.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [exerciseBlocks[i], exerciseBlocks[j]] = [exerciseBlocks[j], exerciseBlocks[i]];
                }
                newItems = exerciseBlocks.flat();
            }
        }

        // Treure l'últim descans per evitar un descans abans de finalitzar la rutina
        if (newItems.length > 0 && newItems[newItems.length - 1].id === 'descans-01') {
            newItems.pop();
        }

        // Si ja estàvem executant, hem d'intentar mantenir el punt on estàvem?
        // És difícil perquè l'estructura canvia totalment. 
        // Per simplicitat, si es canvia de mode, es reinicia al principi de l'exercici actual?
        // Millor: busquem l'item equivalent o reiniciem. 
        // Per ara, si es canvia el mode a mig camí, mantenim el currentIndex si és vàlid, o resetejem.
        currentRoutineExecution.items = newItems;
        if (currentRoutineExecution.currentIndex >= newItems.length) {
            currentRoutineExecution.currentIndex = 0;
        }
    }

    // Variable global per mantenir la referència a la funció de refrescar el modal d'edició
    let currentRenderEditList = null;

    window.deleteRoutine = (index) => {
        routines.splice(index, 1);
        saveRoutines();
        renderRoutines();
    };

    window.removeExercise = (rIdx, eIdx) => {
        const r = routines[rIdx];
        if (r.exercises.length <= 1) {
            // alert() is still a bit dangerous if blocked, but it's a safety guard.
            // I'll leave it as a simple console alert or just return.
            // Actually, I'll use a simple alert but let's hope it works now that listeners are fixed.
            alert("La rutina ha de tenir almenys un exercici.");
            return;
        }
        r.exercises.splice(eIdx, 1);
        saveRoutines();
        if (currentRenderEditList) {
            currentRenderEditList();
        }
    };

    window.openEditRoutine = (index) => {
        const routine = routines[index];
        const editContent = document.getElementById('editRoutineContent');
        
        const renderEditList = () => {
            currentRenderEditList = renderEditList; // Guardem la referència
            const editListUl = document.createElement('ul');
            editListUl.className = 'edit-list';
            
            routine.exercises.forEach((exId, exIndex) => {
                const ex = CATALEG_EXERCICIS.find(e => e.id === exId);
                const exName = ex ? ex.nom : "Exercici desconegut";
                const exImg = ex ? (ex.nom === 'Descans' ? 'img/descans.png' : `img/${generarNomFitxer(ex.nom)}.jpg`) : 'https://placehold.co/100x100/111/4facfe?text=?';
                
                const li = document.createElement('li');
                li.className = 'edit-item';
                li.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                        <img src="${exImg}" class="edit-item-img" alt="${exName}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/111/4facfe?text=?'">
                        <span class="edit-item-name">${exName}</span>
                    </div>
                    <div class="edit-controls">
                        <button class="btn-edit-control move-up" ${exIndex === 0 ? 'disabled' : ''} title="Moure amunt">↑</button>
                        <button class="btn-edit-control move-down" ${exIndex === routine.exercises.length - 1 ? 'disabled' : ''} title="Moure avall">↓</button>
                        <button class="btn-edit-control delete" title="Eliminar">🗑️</button>
                    </div>
                `;
                
                li.querySelector('.move-up').addEventListener('click', () => window.moveExercise(index, exIndex, -1));
                li.querySelector('.move-down').addEventListener('click', () => window.moveExercise(index, exIndex, 1));
                li.querySelector('.delete').addEventListener('click', () => window.removeExercise(index, exIndex));
                
                editListUl.appendChild(li);
            });

            editContent.innerHTML = `
                <h2>Editar: ${routine.name}</h2>
                <div class="form-group" style="margin-bottom: 2rem;">
                    <label>Nom de la rutina</label>
                    <input type="text" id="editRoutineName" value="${routine.name}">
                </div>
                <h3>Ordre dels exercicis</h3>
            `;
            editContent.appendChild(editListUl);
            
            const addBtn = document.createElement('button');
            addBtn.className = 'btn-text';
            addBtn.style.cssText = "color: var(--primary); font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; padding: 0.5rem 0;";
            addBtn.innerHTML = `<span>+</span> Afegir exercici`;
            addBtn.onclick = () => window.showAddExerciseList(index);
            editContent.appendChild(addBtn);

            const container = document.createElement('div');
            container.id = 'addExerciseContainer';
            container.className = 'hidden';
            editContent.appendChild(container);

            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.innerText = 'Guardar canvis';
            saveBtn.onclick = () => window.saveEditedRoutine(index);
            editContent.appendChild(saveBtn);
        };

        renderEditList();
        editRoutineModal.classList.add('open');
        history.pushState({ modal: 'editRoutine' }, '', '#edit');

        window.showAddExerciseList = (rIdx) => {
            const container = document.getElementById('addExerciseContainer');
            container.classList.remove('hidden');
            
            // Llista simplificada d'exercicis per triar (excloent ocults)
            const availableExercises = CATALEG_EXERCICIS
                .filter(ex => !ex.ocult)
                .sort((a,b) => a.nom.localeCompare(b.nom));
            
            let html = `
                <div class="add-exercise-selection">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0;">Tria un exercici:</h4>
                        <button class="btn-icon-delete" style="padding: 0.2rem 0.6rem; font-size: 0.8rem;" onclick="document.getElementById('addExerciseContainer').classList.add('hidden')">Tancar llista</button>
                    </div>
                    <div class="search-box" style="margin-bottom: 1rem;">
                        <input type="text" id="addExSearch" placeholder="Cerca exercici..." style="width: 100%; padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-dark); color: white;" oninput="window.filterAddExerciseList()">
                    </div>
                    <div class="add-exercise-list-scroll" id="addExListScroll">
            `;
            
            const renderAddExItems = (filteredList) => {
                let itemsHtml = '';
                filteredList.forEach(ex => {
                    const exImg = ex.nom === 'Descans' ? 'img/descans.png' : `img/${generarNomFitxer(ex.nom)}.jpg`;
                    itemsHtml += `
                        <div class="add-exercise-item" onclick="window.addExerciseToRoutine(${rIdx}, '${ex.id}')">
                            <img src="${exImg}" class="edit-item-img" style="width: 40px; height: 40px;" onerror="this.onerror=null;this.src='https://placehold.co/100x100/111/4facfe?text=?'">
                            <div class="add-ex-info">
                                <span class="add-ex-name">${ex.nom}</span>
                                <span class="add-ex-cat">${ex.categoria}</span>
                            </div>
                            <button class="btn-edit-control">+</button>
                        </div>
                    `;
                });
                return itemsHtml;
            };
            
            html += renderAddExItems(availableExercises);
            html += `</div></div>`;
            container.innerHTML = html;
            
            window.filterAddExerciseList = () => {
                const query = document.getElementById('addExSearch').value.toLowerCase();
                const filtered = availableExercises.filter(ex => 
                    ex.nom.toLowerCase().includes(query) || 
                    ex.categoria.toLowerCase().includes(query)
                );
                document.getElementById('addExListScroll').innerHTML = renderAddExItems(filtered);
            };

            container.scrollIntoView({ behavior: 'smooth' });
        };

        window.addExerciseToRoutine = (rIdx, exId) => {
            routines[rIdx].exercises.push(exId);
            document.getElementById('addExerciseContainer').classList.add('hidden');
            renderEditList();
        };
        
        window.moveExercise = (rIdx, eIdx, direction) => {
            const r = routines[rIdx];
            const targetIdx = eIdx + direction;
            if (targetIdx >= 0 && targetIdx < r.exercises.length) {
                const temp = r.exercises[eIdx];
                r.exercises[eIdx] = r.exercises[targetIdx];
                r.exercises[targetIdx] = temp;
                renderEditList();
            }
        };

        // window.removeExercise was moved to top level

        window.saveEditedRoutine = (rIdx) => {
            const newName = document.getElementById('editRoutineName').value.trim();
            if (newName) {
                routines[rIdx].name = newName;
                saveRoutines();
                renderRoutines();
                history.back(); // Tancar modal
            } else {
                alert("La rutina ha de tenir un nom.");
            }
        };
    };

    // --- LOGICA DE SELECCIÓ ---
    function toggleSelectionMode(active) {
        isSelectionMode = active;
        selectedExercisesIds = [];
        selectionBar.classList.toggle('hidden', !active);
        // Ja no amaguem els filtres: catalogFilters.classList.toggle('hidden', active);
        updateDisplay();
    }

    function updateSelectionCounter() {
        selectionCount.innerText = `${selectedExercisesIds.length} exercicis seleccionats`;
    }

    // --- GESTIÓ DEL CATÀLEG ---
    let activeMaterials = Array.from(materialToggles)
        .filter(t => t.checked)
        .map(t => t.value);

    function updateDisplay() {
        const filtered = CATALEG_EXERCICIS.filter(ex => {
            if (ex.ocult) return false;
            
            // 1. Filtre de categoria
            const categoryMatch = (currentCategory === 'tots' || ex.categoria === currentCategory);
            if (!categoryMatch) return false;

            // 2. Filtre de materials (Lògica Híbrida: Descobriment + Inventari)
            // Si no hi ha cap material seleccionat, no mostrem res (segons preferència usuari)
            if (activeMaterials.length === 0) return false;

            // L'exercici ha de contenir ALMENYS UN dels materials seleccionats (Descobriment)
            const matchesSelectedMaterial = ex.materials.some(m => activeMaterials.includes(m));
            if (!matchesSelectedMaterial) return false;

            // A més, l'usuari ha de tenir TOTS els materials que l'exercici requereix (Inventari)
            // (Considerem 'pes_corporal' i 'cap' com a sempre disponibles per la lògica d'inventari)
            const hasAllNeeded = ex.materials.every(m => 
                m === 'pes_corporal' || m === 'cap' || activeMaterials.includes(m)
            );
            
            return hasAllNeeded;
        });
        renderExercises(filtered);
    }

    function renderExercises(exercises) {
        const totalExercises = CATALEG_EXERCICIS.filter(ex => !ex.ocult).length;
        const counter = document.getElementById('exerciseCounter');
        
        exerciseGrid.innerHTML = '';
        if (exercises.length === 0) {
            exerciseGrid.innerHTML = `<div class="loading"><p>No hi ha exercicis...</p></div>`;
            if (counter) counter.classList.add('hidden');
            return;
        }

        if (counter) {
            counter.classList.remove('hidden');
            counter.innerText = `${exercises.length} exercicis de ${totalExercises} al catàleg`;
        }

        exercises.forEach(ex => {
            const card = document.createElement('div');
            const isSelected = selectedExercisesIds.includes(ex.id);
            card.className = `exercise-card ${isSelectionMode ? 'selecting' : ''} ${isSelected ? 'selected' : ''}`;
            
            const content = getExerciseContent(ex);
            const nomFitxer = ex.imatge ? `${ex.imatge}.jpg` : (ex.nom === 'Descans' ? 'descans.png' : `${generarNomFitxer(ex.nom)}.jpg`);
            card.innerHTML = `
                <img src="img/${nomFitxer}" alt="${content.nom}" class="card-img" 
                     onerror="this.onerror=null;this.src='https://placehold.co/400x200/111/4facfe?text=${encodeURIComponent(content.nom)}'">
                <div class="card-content">
                    <span class="category-tag">${ex.categoria}</span>
                    <h3>${content.nom}</h3>
                    ${getComplexityStars(ex.complexitat || 3)}
                    <span class="rep-tag">${ex.repeticions_suggerides}</span>
                    <p class="instructions">${content.instruccions}</p>
                    <div class="benefit-box">
                        <strong>Benefici Salut:</strong>
                        <p>${content.benefici_salut}</p>
                    </div>
                    <button class="btn-quick-play" title="Executar ràpidament">▶</button>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                // Si ha clicat el botó de play, no obrim el detall (ja ho gestiona el botó)
                if (e.target.closest('.btn-quick-play')) return;
                
                if (isSelectionMode) {
                    card.classList.toggle('selected');
                    const id = ex.id;
                    if (card.classList.contains('selected')) {
                        selectedExercisesIds.push(id);
                    } else {
                        selectedExercisesIds = selectedExercisesIds.filter(i => i !== id);
                    }
                    updateSelectionCounter();
                } else {
                    showExerciseDetail(ex.id);
                }
            });

            // Botó d'execució ràpida (Mobile)
            const quickPlayBtn = card.querySelector('.btn-quick-play');
            if (quickPlayBtn) {
                quickPlayBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openExecutionModal(ex.id);
                });
            }
            
            exerciseGrid.appendChild(card);
        });
    }

    // --- ESDEVENIMENTS ---
    materialTrigger.addEventListener('click', () => {
        const isOpen = materialMenu.classList.toggle('open');
        materialTrigger.classList.toggle('active', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (!materialMenu.contains(e.target) && !materialTrigger.contains(e.target)) {
            materialMenu.classList.remove('open');
            materialTrigger.classList.remove('active');
        }
    });

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            updateDisplay();
        });
    });

    materialToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            activeMaterials = Array.from(materialToggles).filter(t => t.checked).map(t => t.value);
            updateDisplay();
        });
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            // This will now trigger history.back()
            history.back();
        });
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newData = {
            theme: document.getElementById('pTheme').value,
            age: parseInt(document.getElementById('pAge').value),
            sex: document.getElementById('pSex').value,
            level: document.getElementById('pLevel').value,
            maxWeight: parseInt(document.getElementById('pMaxWeight').value),
            lang: document.getElementById('pLang').value
        };
        saveProfile(newData);
        updateDisplay();
        navTabs[0].click(); // Anar a explorar automàticament
    });

    // Canvi de tema immediat en seleccionar
    document.getElementById('pTheme').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });

    // Canvi de Pestanyes (Navegació)
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const view = tab.getAttribute('data-view');
            navegarA(view);
        });
    });

    // Gestió del botó "Back" (History API)
    window.addEventListener('popstate', (event) => {
        const state = event.state || {};
        
        // 1. Si hi ha modals oberts, els tanquem SEGONS L'ESTAT
        // Si no hi ha 'modal' a l'estat, tanquem tots els modals que estiguin oberts
        if (!state.modal) {
            if (detailModal.classList.contains('open')) detailModal.classList.remove('open');
            if (executionModal.classList.contains('open')) {
                executionModal.classList.remove('open');
                releaseWakeLock();
            }
            if (editRoutineModal && editRoutineModal.classList.contains('open')) editRoutineModal.classList.remove('open');
            if (saveRoutineModal.classList.contains('open')) saveRoutineModal.classList.remove('open');
        } else {
            // Si hi ha un modal a l'estat, ens assegurem que només ELS ALTRES estiguin tancats
            // (Per exemple, si tornem de execution a detail)
            if (state.modal === 'detail') {
                if (executionModal.classList.contains('open')) {
                    executionModal.classList.remove('open');
                    releaseWakeLock();
                }
                if (saveRoutineModal.classList.contains('open')) saveRoutineModal.classList.remove('open');
                if (editRoutineModal && editRoutineModal.classList.contains('open')) editRoutineModal.classList.remove('open');
            }
        }

        // 2. Gestionar el canvi de vista
        const currentHash = window.location.hash.replace('#', '') || 'catalog';
        const viewToLoad = state.view ? state.view : (['catalog', 'routines', 'activity', 'profile'].includes(currentHash) ? currentHash : 'catalog');
        
        navegarA(viewToLoad, false);
    });

    // Bridge per a Median.co / Apps Mòbils (Hardware Back Button)
    window.median_library_ready = function() {
        if (window.median && window.median.on) {
            window.median.on('backButton', function() {
                history.back();
            });
        }
    };

    // Bridge per a Cordova (Hardware Back Button Android)
    document.addEventListener("deviceready", () => {
        document.addEventListener("backbutton", (e) => {
            e.preventDefault();
            
            const currentHash = window.location.hash.replace('#', '');
            const hasOpenModals = document.querySelector('.modal.open');
            
            // Si estem a la pantalla principal i sense modals, 
            // no fem res per assegurar-nos que l'app no es tanqui en cap cas.
            if ((currentHash === 'catalog' || currentHash === '') && !hasOpenModals) {
                return;
            }
            
            // En qualsevol altre cas, naveguem cap enrere a la vista anterior
            history.back();
        }, false);
    }, false);

    btnNewRoutine.addEventListener('click', () => {
        // Tornar al catàleg en mode selecció
        navTabs[0].click();
        toggleSelectionMode(true);
    });

    btnCancelSelection.addEventListener('click', () => {
        toggleSelectionMode(false);
    });

    btnSaveRoutine.addEventListener('click', () => {
        if (selectedExercisesIds.length === 0) {
            alert("Selecciona almenys un exercici.");
            return;
        }
        routineNameInput.value = "";
        saveRoutineModal.classList.add('open');
        history.pushState({ modal: 'saveRoutine' }, '', '#save');
        setTimeout(() => routineNameInput.focus(), 100);
    });

    btnConfirmSaveRoutine.addEventListener('click', () => {
        const name = routineNameInput.value.trim();
        if (name) {
            routines.push({ name, exercises: [...selectedExercisesIds] });
            saveRoutines();
            saveRoutineModal.classList.remove('open');
            toggleSelectionMode(false);
            navTabs[1].click(); // Anar a rutines
        } else {
            alert("Siusplau, introdueix un nom per a la rutina.");
        }
    });

    // Tancar el modal de guardar rutina amb la X
    saveRoutineModal.querySelector('.close-modal').addEventListener('click', () => {
        history.back();
    });

    // Tancar el modal d'editar rutina amb la X
    document.querySelector('#editRoutineModal .close-modal').addEventListener('click', () => {
        history.back();
    });

    // Inicialització
    try {
        const hasProfile = loadProfile();
        
        // Si no hi ha perfil, anem directament a la pestanya de perfil
        if (!hasProfile) {
            navegarA('profile', false);
            // Opcional: podríem mostrar un missatge de benvinguda
        } else {
            const initialView = window.location.hash.replace('#', '') || 'catalog';
            history.replaceState({ view: initialView }, '', '#' + initialView);
            navegarA(initialView, false);
        }
        
        updateDisplay();
    } catch (err) {
        console.error("Error durant la inicialització:", err);
    }
});
