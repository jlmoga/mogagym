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

// Funció per normalitzar el nom de l'exercici per al fitxer d'imatge
function generarNomFitxer(nom) {
    return nom.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar accents
        .replace(/[^a-z0-9]+/g, '-')     // Substituir caràcters no alfanumèrics (espais, parèntesis) per guionets
        .replace(/^-+|-+$/g, '');        // Netejar guionets al principi i al final
}

document.addEventListener('DOMContentLoaded', () => {
    // --- GESTIÓ DE NAVEGACIÓ (HISTORY API) ---
    function navegarA(view, push = true) {
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
        catalogFilters.classList.toggle('hidden', view !== 'catalog');

        // Executar renderitzats segons la vista
        if (view === 'catalog') {
            renderExercises(CATALEG_EXERCICIS);
        } else if (view === 'routines') {
            renderRoutines();
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
    const profileForm = document.getElementById('profileForm');
    const closeModals = document.querySelectorAll('.close-modal, .close-btn-action');
    
    // Elements Rutines
    const navTabs = document.querySelectorAll('.nav-tab');
    const catalogSection = document.getElementById('catalogSection');
    const routinesSection = document.getElementById('routinesSection');
    const profileSection = document.getElementById('profileSection');
    const catalogFilters = document.getElementById('catalogFilters');
    const routinesList = document.getElementById('routinesList');
    const btnNewRoutine = document.getElementById('btnNewRoutine');
    const selectionBar = document.getElementById('selectionActionBar');
    const selectionCount = document.getElementById('selectionCount');
    const btnSaveRoutine = document.getElementById('saveRoutine');
    const btnCancelSelection = document.getElementById('cancelSelection');
    
    // Elements Guardar Rutina Modal
    const saveRoutineModal = document.getElementById('saveRoutineModal');
    const routineNameInput = document.getElementById('routineNameInput');
    const btnConfirmSaveRoutine = document.getElementById('confirmSaveRoutine');

    let currentCategory = 'tots';
    let currentView = 'catalog';
    let isSelectionMode = false;
    let selectedExercisesIds = [];
    let routines = JSON.parse(localStorage.getItem('mogagym_routines')) || [];
    let currentRoutineExecution = null;
    let profile = {
        age: 30,
        sex: 'home',
        level: 'intermediate',
        maxWeight: 10
    };

    // --- PERSISTÈNCIA (LocalStorage) ---
    function loadProfile() {
        const saved = localStorage.getItem('moga_profile');
        if (saved) {
            profile = JSON.parse(saved);
            // Omplir el form amb dades guardades
            document.getElementById('pAge').value = profile.age;
            document.getElementById('pSex').value = profile.sex;
            document.getElementById('pLevel').value = profile.level;
            document.getElementById('pMaxWeight').value = profile.maxWeight;
        }
    }

    function saveProfile(newData) {
        profile = newData;
        localStorage.setItem('moga_profile', JSON.stringify(profile));
    }

    // --- LÒGICA D'ADAPTACIÓ ---
    function getExecutionGoal(exercise) {
        // Multiplicadors per nivell
        const multipliers = {
            'beginner': { reps: 0.8, weight: 0.5, sets: 0 },
            'intermediate': { reps: 1.0, weight: 0.7, sets: 0 },
            'advanced': { reps: 1.2, weight: 0.9, sets: 1 }
        };
        const m = multipliers[profile.level];

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
            extra: finalWeight
        };
    }

    function showExecutionModal(exId, isRoutine = false) {
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
                <div class="nav-btns-step">
                    <button class="btn-step" id="prevStep" ${currentIndex === 0 ? 'disabled' : ''}>← Anterior</button>
                    <span>${currentIndex + 1} / ${items.length}</span>
                    <button class="btn-step" id="nextStep">${isLast ? 'Finalitzar' : 'Següent →'}</button>
                </div>
            `;
        } else {
            // Botó normal per a execució única
            routineControls = `<button class="close-btn-action">Tancar</button>`;
        }

        content.innerHTML = `
            <h2>${isRoutine ? 'Entrenament en Ruta' : 'Execució Ràpida'}</h2>
            <img src="img/${nomImatge}.jpg" alt="${ex.nom}" class="modal-img-small" 
                 onerror="this.onerror=null;this.src='https://placehold.co/400x200/111/4facfe?text=${encodeURIComponent(ex.nom)}'">
            <p>Adaptat per a nivell <strong>${document.getElementById('pLevel').options[document.getElementById('pLevel').selectedIndex].text}</strong>:</p>
            <div class="goal-highlight">
                <h4>${ex.nom}</h4>
                <div class="goal-val">${goal.sets} sèries x ${goal.reps} repeticions${goal.extra}</div>
            </div>
            <p class="modal-desc">${ex.instruccions}</p>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                Basat en les teves dades de perfil i el pes màxim de ${profile.maxWeight}kg.
            </p>
            ${routineControls}
        `;
        executionModal.classList.add('open');
        // Afegir estat a l'historial perquè el botó "Back" tanqui el modal
        history.pushState({ modal: 'execution' }, '', '#modal');

        // Handlers de la rutina
        if (isRoutine) {
            document.getElementById('prevStep')?.addEventListener('click', () => {
                currentRoutineExecution.currentIndex--;
                showExecutionModal(currentRoutineExecution.items[currentRoutineExecution.currentIndex], true);
            });
            document.getElementById('nextStep')?.addEventListener('click', () => {
                if (currentRoutineExecution.currentIndex < currentRoutineExecution.items.length - 1) {
                    currentRoutineExecution.currentIndex++;
                    showExecutionModal(currentRoutineExecution.items[currentRoutineExecution.currentIndex], true);
                } else {
                    finishRoutine();
                }
            });
        } else {
            // Tornar a posar el listener al botó "Entès" dinàmic si no és rutina
            content.querySelector('.close-btn-action').addEventListener('click', () => {
                history.back(); // En lloc de directament tancar, forcem un "back"
            });
        }
    }

    function finishRoutine() {
        executionModal.classList.remove('open');
        currentRoutineExecution = null;
        alert("Enhorabona! Has completat la teva rutina. 🎉");
    }

    // --- GESTIÓ DE RUTINES ---
    function saveRoutines() {
        localStorage.setItem('mogagym_routines', JSON.stringify(routines));
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
            
            // Obtenir els noms dels exercicis per mostrar-los
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
                    <button class="btn-play" title="Executar Rutina" onclick="event.stopPropagation(); window.startRoutine(${index})">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                    </button>
                    <button class="btn-icon-delete" title="Eliminar Rutina" onclick="event.stopPropagation(); window.deleteRoutine(${index})">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                </div>
            `;
            card.onclick = () => window.startRoutine(index);
            routinesList.appendChild(card);
        });
    }

    window.startRoutine = (index) => {
        const routine = routines[index];
        currentRoutineExecution = {
            currentIndex: 0,
            items: routine.exercises
        };
        showExecutionModal(routine.exercises[0], true);
    };

    window.deleteRoutine = (index) => {
        if (confirm("Segur que vols eliminar aquesta rutina?")) {
            routines.splice(index, 1);
            saveRoutines();
            renderRoutines();
        }
    };

    // --- LOGICA DE SELECCIÓ ---
    function toggleSelectionMode(active) {
        isSelectionMode = active;
        selectedExercisesIds = [];
        selectionBar.classList.toggle('hidden', !active);
        catalogFilters.classList.toggle('hidden', active);
        updateDisplay();
    }

    // --- GESTIÓ DEL CATÀLEG ---
    let activeMaterials = Array.from(materialToggles)
        .filter(t => t.checked)
        .map(t => t.value);

    function updateDisplay() {
        const filtered = CATALEG_EXERCICIS.filter(ex => {
            const categoryMatch = (currentCategory === 'tots' || ex.categoria === currentCategory);
            const materialsMatch = ex.materials.every(m => activeMaterials.includes(m));
            return categoryMatch && materialsMatch;
        });
        renderExercises(filtered);
    }

    function renderExercises(exercises) {
        exerciseGrid.innerHTML = '';
        if (exercises.length === 0) {
            exerciseGrid.innerHTML = `<div class="loading"><p>No hi ha exercicis...</p></div>`;
            return;
        }

        exercises.forEach(ex => {
            const card = document.createElement('div');
            const isSelected = selectedExercisesIds.includes(ex.id);
            card.className = `exercise-card ${isSelectionMode ? 'selecting' : ''} ${isSelected ? 'selected' : ''}`;
            
            const nomImatge = generarNomFitxer(ex.nom);
            card.innerHTML = `
                <img src="img/${nomImatge}.jpg" alt="${ex.nom}" class="card-img" 
                     onerror="this.onerror=null;this.src='https://placehold.co/400x200/111/4facfe?text=${encodeURIComponent(ex.nom)}'">
                <div class="card-content">
                    <span class="category-tag">${ex.categoria}</span>
                    <h3>${ex.nom}</h3>
                    <div class="rep-tag">${ex.repeticions_suggerides}</div>
                    <p class="instructions">${ex.instruccions}</p>
                    <div class="benefit-box">
                        <strong>Benefici Salut:</strong>
                        <p>${ex.benefici_salut}</p>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (isSelectionMode) {
                    if (selectedExercisesIds.includes(ex.id)) {
                        selectedExercisesIds = selectedExercisesIds.filter(id => id !== ex.id);
                    } else {
                        selectedExercisesIds.push(ex.id);
                    }
                    selectionCount.innerText = `${selectedExercisesIds.length} exercicis seleccionats`;
                    renderExercises(exercises); // Refresh cards to show selection
                } else {
                    showExecutionModal(ex.id);
                }
            });
            
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
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('open');
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
            executionModal.classList.remove('open');
        });
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newData = {
            age: parseInt(document.getElementById('pAge').value),
            sex: document.getElementById('pSex').value,
            level: document.getElementById('pLevel').value,
            maxWeight: parseInt(document.getElementById('pMaxWeight').value)
        };
        saveProfile(newData);
        alert("Perfil actualitzat correctament! 🎉");
        updateDisplay();
        navTabs[0].click(); // Anar a explorar automàticament
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
        // 1. Si hi ha modals oberts, els tanquem
        if (executionModal.classList.contains('open')) {
            executionModal.classList.remove('open');
            return;
        }
        if (saveRoutineModal.classList.contains('open')) {
            saveRoutineModal.classList.remove('open');
            return;
        }

        // 2. Gestionar el canvi de vista
        const currentHash = window.location.hash.replace('#', '') || 'catalog';
        const viewToLoad = (event.state && event.state.view) ? event.state.view : currentHash;
        
        // Evitar bucles infinits: només navegarA si la vista és diferent de l'actual
        // o si forcem la càrrega des de l'estat
        navegarA(viewToLoad, false);
    });

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
        saveRoutineModal.classList.remove('open');
    });

    // Inicialització
    try {
        loadProfile();
        // Definir l'estat inicial a l'historial
        history.replaceState({ view: 'catalog' }, '', '#catalog');
        updateDisplay();
    } catch (err) {
        console.error("Error durant la inicialització:", err);
    }
});
