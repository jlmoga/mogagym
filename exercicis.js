/**
 * CATÀLEG D'EXERCICIS PER A LA WEB-APP DE GIMNÀSTICA
 * Lead Developer: Antigravity
 */

const CATALEG_EXERCICIS = [
    // --- CAMES ---
    {
        id: "cames-01",
        nom: "Esquat amb peses",
        imatge: "esquat-amb-peses",
        categoria: "Cames",
        complexitat: 3,
        equipament: "Peses (mancuernes)",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions",
        instruccions: "Dret, amb els peus a l'amplada de les espatlles i una pesa a cada mà lateralment. Baixa el maluc com si t'asseguessis en una cadira invisible, mantenint l'esquena recta i el pit obert. Els genolls no han de sobrepassar excessivament les puntes dels peus. Torna a la posició inicial empenyent des dels talons.",
        benefici_salut: "Enforteix el tren inferior (quadriceps, glutis i isquiotibials) i millora l'estabilitat del core i la mobilitat funcional."
    },
    {
        id: "cames-02",
        nom: "Estocada búlgara (peu a banqueta)",
        imatge: "estocada-bulgara-peu-a-banqueta",
        categoria: "Cames",
        complexitat: 4,
        equipament: "Banqueta, peses (opcional)",
        materials: ["banqueta", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 10 repeticions per cama",
        instruccions: "Col·loca un peu darrere teu sobre la banqueta. Amb l'altra cama endavant, baixa le genoll posterior cap a terra mantenint el tors vertical. El genoll davanter ha de quedar alineat amb el turmell. Puja controladament.",
        benefici_salut: "Desenvolupa una gran força unilateral, millora l'equilibri i posa un èmfasi especial en el gluti major i el quàdriceps."
    },
    {
        id: "cames-03",
        nom: "Step-up (pujar a banqueta)",
        imatge: "step-up-pujar-a-banqueta",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Banqueta, peses (opcional)",
        materials: ["banqueta", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions per cama",
        instruccions: "Col·loca un sencer sobre la banqueta. Empeny amb aquesta cama per elevar tot el cos fins a quedar dret sobre la banqueta. Baixa lentament per tornar a terra sense deixar caure el pes bruscament.",
        benefici_salut: "Millora la potència de les cames, la coordinació i és excel·lent per al treball cardiovascular de baixa intensitat combinat amb força."
    },
    {
        id: "cames-04",
        nom: "Pont de gluti amb goma",
        imatge: "pont-de-gluti-amb-goma",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Goma elàstica de resistència",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 20 repeticions",
        instruccions: "Estirat cap per amunt amb els genolls flexionats i la goma situada just per sobre dels genolls. Eleva el maluc cap al sostre contraient fortament els glutis i mantenint una lleugera tensió cap enfora contra la goma.",
        benefici_salut: "Aïllament eficaç del gluti i activació dels abductors, essencial per a la salut lumbar i l'estabilitat de la pelvis."
    },
    {
        id: "cames-05",
        nom: "Pes mort amb peses",
        imatge: "pes-mort-amb-peses",
        categoria: "Cames",
        complexitat: 3,
        equipament: "Peses (mancuernes)",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 10-12 repeticions",
        instruccions: "Sostén les peses davant de les cuixes. Flexiona lleugerament els genolls i inclina el tors endavant des del maluc, lliscant les peses per sota dels genolls mentre mantens l'esquena totalment plana. Torna a dalt contraient els isquiotibials i glutis.",
        benefici_salut: "Exercici fonamental per a la cadena posterior (esquena baixa, glutis i isquios), millorant la postura i la força funcional."
    },
    {
        id: "cames-06",
        nom: "Caminada lateral amb goma",
        imatge: "caminada-lateral-amb-goma",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Goma elàstica (mini-band)",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 15 passes per costat",
        instruccions: "Col·loca la goma al voltant dels turmells o per sobre dels genolls. En posició de mig esquat, fes passes laterals curtes mantenint sempre la tensió a la goma i els peus paral·lels.",
        benefici_salut: "Activa intensament el gluti mitjà, crucial per prevenir lesions de genoll i millorar l'estabilitat lateral."
    },
    {
        id: "cames-07",
        nom: "Elevació de talons (assegut amb peses)",
        imatge: "elevacio-de-talons-assegut-amb-peses",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 15-20 repeticions",
        instruccions: "Assegut a la banqueta amb els peus a terra i les peses sobre els genolls. Eleva els talons al màxim possible, contraient el soli, i baixa lentament fins a sentir un lleuger estirament.",
        benefici_salut: "Enforteix la musculatura del panxell (bessons i soli), millorant la circulació i l'estabilitat del turmell."
    },
    {
        id: "cames-08",
        nom: "Esquat isomètric a la paret",
        imatge: "esquat-isometric-a-la-paret",
        categoria: "Cames",
        complexitat: 1,
        equipament: "Paret",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 45-60 segons",
        instruccions: "Recolza l'esquena contra la paret i baixa fins que les cuixes estiguin paral·leles a terra (angle de 90º). Mantén la posició estàtica, pressionant els talons contra el terra i l'esquena contra la paret.",
        benefici_salut: "Desenvolupa la resistència muscular als quàdriceps sense impacte articular, ideal per a la rehabilitació i l'estabilitat estructural."
    },
    {
        id: "cames-09",
        nom: "Isquios amb pilota",
        imatge: "isquios-amb-pilota",
        categoria: "Cames",
        complexitat: 4,
        equipament: "Pilota suïssa (Fitball)",
        materials: ["pilota"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Estirat d'esquena amb els talons sobre la pilota. Eleva le maluc i estira la pilota cap a tu flexionant els genolls, després torna a estirar les cames sense baixar le maluc.",
        benefici_salut: "Treball d'estabilitat i enfortiment de la cadena posterior molt intens."
    },
    {
        id: "cames-10",
        nom: "Isquios a una cama",
        imatge: "isquios-a-una-cama",
        categoria: "Cames",
        complexitat: 3,
        equipament: "Pes corporal",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 10 repeticions per cama",
        instruccions: "Dret, amb una cama recolzada en una banqueta o cadira. Flexiona el tors endavant sense arquejar l'esquena fins a sentir l'estirament als isquios, i torna a la posició inicial.",
        benefici_salut: "Millora l'estabilitat unilateral i la flexibilitat activa de la part posterior de la cuixa."
    },
    {
        id: "cames-11",
        nom: "Esquat isomètric a la paret amb pilota",
        imatge: "esquat-isometric-a-la-paret-amb-pilota",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Pilota suïssa (Fitball), Paret",
        materials: ["pilota", "pes_corporal"],
        repeticions_suggerides: "3 sèries aguantant entre 30 i 60 segons",
        instruccions: "Col·loca la pilota entre la teva zona lumbar i la paret. Amb els peus separats a l'amplada de les espatlles, baixa el cos lliscant sobre la pilota fins que els genolls formin un angle de 90 graus. Manté la posició.",
        benefici_salut: "Molt segur per a la gent amb dolors d'esquena, ja que la pilota guia el moviment i protegeix la curvatura lumbar mentre es genera una gran resistència muscular a les cuixes."
    },
    {
        id: "cames-12",
        nom: "Estocada lliscant posterior (Reverse Lunge)",
        imatge: "estocada-lliscant-posterior-reverse-lunge",
        categoria: "Cames",
        complexitat: 3,
        equipament: "Màquina de rem",
        materials: ["rem", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions per cama",
        instruccions: "Posa't dempeus al costat de la màquina, mirant cap endavant. Posa un peu a terra i l'altre sobre el seient. Fes lliscar el seient cap enrere mentre flexiones la cama de terra, baixant el maluc. La resistència de la màquina (si agafes el mànec amb una mà) pot ajudar-te a estabilitzar-te.",
        benefici_salut: "Treballa l'estabilitat del genoll en un pla dinàmic. Perfecte per simular el lliscament controlat en tarteres o terrenys tous."
    },
    {
        id: "cames-13",
        nom: "Elevació de Tibials (Tibialis Raise)",
        imatge: "elevacio-de-tibials-tibialis-raise",
        categoria: "Cames",
        complexitat: 2,
        equipament: "Una paret",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 20 repeticions (fins a notar la cremor)",
        instruccions: "Recolza l'esquena a la paret i avança els peus uns 30-40 cm. Amb les cames rectes, eleva les puntes dels peus cap amunt tant com puguis, aguantant un segon a dalt, i baixa lentament.",
        benefici_salut: "Enforteix el tibial anterior. És el 'fre de mà' del cos. Si aquest múscul és fort, els teus genolls no patiran en el descens. Prevé la periostitis tibial."
    },
    {
        id: "cames-14",
        nom: "Estocada caminant amb pes",
        imatge: "estocada-caminant-amb-pes",
        categoria: "Cames",
        complexitat: 3,
        equipament: "Dues peses (mancuernes)",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 10-12 passos (5-6 per cama)",
        instruccions: "Comença dempeus subjectant una pesa a cada mà amb els braços estesos als costats, tot seguit fes un pas llarg cap endavant i flexiona ambdós genolls fins que el de darrere gairebé toqui terra, assegurant-te que el genoll de davant quedi a 90 graus i no sobrepassi la punta del peu, abans d'impulsar-te amb la cama de davant per tornar a la posició vertical mentre avances la cama de darrere per realitzar la següent estocada en un moviment continu.",
        benefici_salut: "Desenvolupa una força concèntrica i excèntrica brutal, essencial per a les pujades amb molta inclinació i per controlar el descens. Millora la mobilitat del maluc."
    },
    // --- EMPENTA (PIT/ESPATLLES/TRÍCEPS) ---
    {
        id: "empenta-01",
        nom: "Press de banca amb peses",
        imatge: "press-de-banca-amb-peses",
        categoria: "Empenta",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 10-12 repeticions",
        instruccions: "Estirat d'esquena a la banqueta. Empeny les peses cap amunt des del pit fins a estendre els braços, sense bloquejar els colzes. Baixa controladament fins que les peses arribin a l'altura del pit.",
        benefici_salut: "Treball integral del pectoral major, deltoides anterior i tríceps, fonamental per a la força d'empenta horitzontal."
    },
    {
        id: "empenta-02",
        nom: "Obertures de pit a la banqueta",
        imatge: "obertures-de-pit-a-la-banqueta",
        categoria: "Empenta",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions",
        instruccions: "Estirat a la banqueta with les peses sobre el pit. Obre els braços lateralment amb una lleugera flexió de colzes (com si abraçessis un arbre) fins a sentir l'estirament al pectoral. Torna a la posició inicial usant la força del pit.",
        benefici_salut: "Millora la flexibilitat pectoral i aïlla el múscul per a un desenvolupament més harmònic."
    },
    {
        id: "empenta-03",
        nom: "Flexions inclinades (mans a banqueta)",
        imatge: "flexions-inclinades-mans-a-banqueta",
        categoria: "Empenta",
        complexitat: 2,
        equipament: "Banqueta",
        materials: ["banqueta", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions",
        instruccions: "Col·loca les mans a la banqueta i els peus a terra, formant una línia recta amb el cos. Baixa le pit cap a la banqueta i empeny amb força per tornar a dalt. Mantén le core activat en tot moment.",
        benefici_salut: "Versió pedagògica de les flexions que posa èmfasi en la part inferior del pectoral i facilita l'aprenentatge de la tècnica correcta."
    },
    {
        id: "empenta-04",
        nom: "Press militar assegut",
        imatge: "press-militar-assegut",
        categoria: "Empenta",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 10 repeticions",
        instruccions: "Assegut amb l'esquena ben recolzada. Eleva les peses des de l'alçada de les orelles cap al sostre de manera vertical. Baixa controladament evitant arquejar l'esquena.",
        benefici_salut: "Enforteix les espatlles (deltoides) i millora la mobilitat del cinturó escapular."
    },
    {
        id: "empenta-05",
        nom: "Elevacions laterals amb gomes o peses",
        imatge: "elevacions-laterals-amb-gomes-o-peses",
        categoria: "Empenta",
        complexitat: 2,
        equipament: "Gomes o Peses",
        materials: ["gomes", "peses"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Dret, eleva els braços lateralment fins que estiguin paral·lels a terra, mantenint una mínima flexió de colzes. Baixa lentament. Si uses gomes, trepitja-les amb els peus per crear resistència.",
        benefici_salut: "Aïllament del deltoides lateral, essencial per a l'amplitud de les espatlles i la postura vertical."
    },
    {
        id: "empenta-06",
        nom: "Fons de tríceps a la banqueta",
        imatge: "fons-de-triceps-a-la-banqueta",
        categoria: "Empenta",
        complexitat: 3,
        equipament: "Banqueta",
        materials: ["banqueta", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "D'esquena a la banqueta, recolza les mans a la vora. Amb les cames esteses (o flexionades per facilitar), baixa le cos flexionant els colzes cap enrere i puja fent força exclusivament amb els tríceps.",
        benefici_salut: "Exercici de pes corporal d'alta eficàcia per al desenvolupament de la part posterior del braç i la força de les articulacions del colze."
    },
    {
        id: "empenta-07",
        nom: "Press francès amb peses",
        imatge: "press-frances-amb-peses",
        categoria: "Empenta",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Estirat a la banqueta. Estén els braços amb les peses cap al sostre. Flexiona només els colzes portant les peses cap a les teves temples (el braç des de l'espatlla al colze no s'ha de moure). Torna a estendre.",
        benefici_salut: "Aïlla el tríceps en la seva totalitat, especialment la porció llarga, millorant la definició i la força braquial."
    },
    {
        id: "empenta-08",
        nom: "Flexions amb goma a l'esquena",
        imatge: "flexions-amb-goma-a-l-esquena",
        categoria: "Empenta",
        complexitat: 4,
        equipament: "Goma elàstica",
        materials: ["gomes", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 8-12 repeticions",
        instruccions: "Passa la goma per dalt de la teva esquena i subjecta-la amb les mans mentre fas flexions a terra. La goma afegeix resistència en la part final de l'empenta, quan els braços s'estenen.",
        benefici_salut: "Afegeix una corba de resistència variable que augmenta la potència muscular i la intensitat sense necessitat de pes extra."
    },
    {
        id: "empenta-09",
        nom: "Flexions amb peus sobre pilota",
        imatge: "flexions-amb-peus-sobre-pilota",
        categoria: "Empenta",
        complexitat: 4,
        equipament: "Pilota suïssa (Fitball)",
        materials: ["pilota", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 8 a 12 repeticions",
        instruccions: "Col·loca les mans a terra (amplada d'espatlles) i els peus o les tibies sobre la pilota. Manté el cos en línia recta (com una taula) mentre baixes el pit cap a terra i tornes a pujar.",
        benefici_salut: "Augmenta la intensitat de la flexió tradicional en traslladar més pes al tren superior i obliga el core a treballar contínuament per no perdre l'equilibri."
    },

    // --- TRACCIÓ I CARDIO ---
    {
        id: "traccio-01",
        nom: "Màquina de rem",
        imatge: "maquina-de-rem",
        categoria: "Tracció",
        complexitat: 5,
        equipament: "Màquina de rem",
        materials: ["rem"],
        tipus: "comptatge",
        opcions_comptatge: [100, 200, 300, 500],
        repeticions_suggerides: "Objectiu: 250 remades a ritme constant",
        instruccions: "Empeny fort amb les cames primer, inclina le tors lleugerament enrere i acaba estirant le manillar cap al teu abdomen. Torna els braços, inclina le tors endavant i flexiona genolls per repetir.",
        benefici_salut: "Treball cardiovascular d'alt impacte metabòlic que implica el 85% dels músculs del cos, millorant la capacitat aeròbica i la resistència muscular."
    },
    {
        id: "traccio-02",
        nom: "Rem a una mà (recolzat a banqueta)",
        imatge: "rem-a-una-ma-recolzat-a-banqueta",
        categoria: "Tracció",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 12 repeticions per costat",
        instruccions: "Recolza un genoll i la mà del mateix costat a la banqueta. Amb l'altra mà, estira la pesa cap al maluc, mantenint l'esquena paral·lela a terra i evitant rotar le tors.",
        benefici_salut: "Enforteix el dorsal ample i els músculs de l'esquena mitjana, millorant la postura i corregint desequilibris musculars."
    },
    {
        id: "traccio-03",
        nom: "Rem amb gomes (punt fix)",
        imatge: "rem-amb-gomes-punt-fix",
        categoria: "Tracció",
        complexitat: 2,
        equipament: "Goma elàstica, Punt fix",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 15-20 repeticions",
        instruccions: "Ancori la goma a un punt fix a l'alçada del pit. Dret, amb els genolls relaxats, estira els extrems de la goma cap a tu, portant els colzes enrere i ajuntant les escàpules.",
        benefici_salut: "Treball excel·lent per a la salut escapular i la retracció de les espatlles, ideal per a persones que passen molt temps assegudes."
    },
    {
        id: "traccio-04",
        nom: "Curl de bíceps dempeus",
        imatge: "curl-de-biceps-dempeus",
        categoria: "Tracció",
        complexitat: 2,
        equipament: "Peses or Goma",
        materials: ["peses", "gomes"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Dret, amb els braços estirats i un pes a cada mà. Flexiona els colzes portant els pesos cap a les espatlles sense moure els braços superiors ni balancejar le cos.",
        benefici_salut: "Desenvolupa la força del bíceps braquial i millora la capacitat de càrrega d'objectes en la vida quotidiana."
    },
    {
        id: "traccio-05",
        nom: "Curl de bíceps concentrat",
        imatge: "curl-de-biceps-concentrat",
        categoria: "Tracció",
        complexitat: 3,
        equipament: "Banqueta, Peses",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 12 repeticions per braç",
        instruccions: "Assegut a la banqueta, recolza el colze a la cara interna de la cuixa del mateix costat. Realitza el curl sense permetre que el braç es desplaci. El focus és l'aïllament total.",
        benefici_salut: "Elimina qualsevol possibilitat de 'trampa' amb le cos, maximitzant el creixement i la força del pic del bíceps."
    },
    {
        id: "traccio-06",
        nom: "Face-pull amb gomes",
        imatge: "face-pull-amb-gomes",
        categoria: "Tracció",
        complexitat: 4,
        equipament: "Goma elàstica, Punt fix",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Amb la goma ancorada alta, estira els extrems cap al teu front, obrint els colzes cap als costats i rotant externament els braços (com fent 'doble bíceps').",
        benefici_salut: "Exercici estrella per a la salut de les espatlles i la postura, treballant el deltoides posterior i els rotatoris."
    },
    {
        id: "traccio-07",
        nom: "Rem vertical amb peses",
        imatge: "rem-vertical-amb-peses",
        categoria: "Tracció",
        complexitat: 3,
        equipament: "Peses",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Dret, sostén les peses davant teu. Eleva-les verticalment cap a la barbeta, mantenint els colzes sempre per sobre de les mans i prop del cos.",
        benefici_salut: "Treballa els trapezis i el deltoides mitjà, millorant l'estètica i la força del cinturó escapular."
    },
    {
        id: "traccio-08",
        nom: "Elevacions laterals",
        imatge: "elevacions-laterals",
        categoria: "Tracció i cardio",
        complexitat: 2,
        equipament: "Pes (mancuerna)",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions per braç",
        instruccions: "Sostén un pes en una mà amb el braç paral·lel al cos. Eleva el braç lateralment fins a arribar a un angle de 90 graus (a l'alçada de l'espatlla). Baixa lentament per tornar a la posició inicial. Completa la sèrie i repeteix amb l'altre braç.",
        benefici_salut: "Aïllament eficaç del deltoide lateral, millorant l'amplada i l'estabilitat de l'espatlla."
    },
    {
        id: "traccio-09",
        nom: "Rem invertit (per a tracció pura)",
        imatge: "rem-invertit-per-a-traccio-pura",
        categoria: "Tracció",
        complexitat: 2,
        equipament: "Màquina de rem",
        materials: ["rem"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Assegut a la màquina de rem, agafa el mànec. En lloc de fer el moviment de cames, manté-les fixes i centra't només a portar el mànec cap al pit amb els colzes ben oberts.",
        benefici_salut: "Aïlla la musculatura de l'esquena superior, corregint la postura \"encorbada\" de qui porta motxilla o passa hores al PC."
    },
    {
        id: "traccio-10",
        nom: "Curl de bíceps amb goma (dempeus)",
        imatge: "curl-de-biceps-amb-goma-dempeus",
        categoria: "Tracció",
        complexitat: 1,
        equipament: "Goma de resistència (banda elàstica)",
        materials: ["gomes", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions",
        instruccions: "Posa't dempeus i trepitja la goma amb els dos peus (o amb un, per menys resistència) al centre. Agafa els extrems de la goma amb les mans, amb els palmells mirant cap endavant. Mantenint els colzes enganxats al cos, flexiona els braços portant les mans cap a les espatlles. Baixa lentament.",
        benefici_salut: "Treballa la força dels braços, amb la particularitat que la resistència de la goma augmenta a mesura que puges (quan el múscul està més contret), cosa que és excel·lent per a la salut de l'articulació del colze."
    },

    // --- CORE ---
    {
        id: "core-01",
        nom: "Planxa abdominal",
        imatge: "planxa-abdominal",
        categoria: "Core",
        complexitat: 3,
        equipament: "Terra (estoreta)",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 45-60 segons",
        instruccions: "Recolza't sobre els avantbraços i la punta dels peus. Mantén le cos en una línia recta, sense que le maluc s'enfonsi ni pugi massa. Prem fort l'abdomen i els glutis.",
        benefici_salut: "Millora l'estabilitat de la columna, prevé dolors d'esquena i enforteix tota la musculatura profunda del tronc."
    },
    {
        id: "core-02",
        nom: "Gir rus amb pesa",
        imatge: "gir-rus-amb-pesa",
        categoria: "Core",
        complexitat: 3,
        equipament: "Pesa (mancuerna)",
        materials: ["peses", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 20 girs",
        instruccions: "Assegut amb els genolls flexionats i els talons lleugerament elevats. Sosté una pesa amb les dues mans i gira le tors d'un costat a l'altre, tocant gairebé terra amb la pesa en cada rotació.",
        benefici_salut: "Treballa els oblics i la capacitat de rotació del tronc, essencial per a la funcionalitat esportiva."
    },
    {
        id: "core-03",
        nom: "Deadbug",
        imatge: "deadbug",
        categoria: "Core",
        complexitat: 4,
        equipament: "Terra (estoreta)",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions totals",
        instruccions: "Estirat d'esquena, amb els braços cap al sostre i les cames en 90º. Baixa simultàniament la cama dreta i el braç esquerre sense que l'esquena baixa s'enlairi de terra. Torna al centre i canvia.",
        benefici_salut: "Ensenya a dissociar el moviment de les extremitats de l'estabilitat lumbo-pèlvica, sent un exercici de control motor excepcional."
    },
    {
        id: "core-04",
        nom: "Woodchopper amb gomes",
        imatge: "woodchopper-amb-gomes",
        categoria: "Core",
        complexitat: 4,
        equipament: "Goma elàstica, Punt fix",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 12 repeticions per costat",
        instruccions: "Ancori la goma en un punt alt lateralment. Amb les dues mans, estira la goma en diagonal cap avall fins al maluc contrari, rotant le tors i els peus de manera coordinada.",
        benefici_salut: "Potència la transmissió de forces entre el tren inferior i superior a través del core en moviments de rotació."
    },
    {
        id: "core-05",
        nom: "Elevació de cames (estirat a banqueta)",
        imatge: "elevacio-de-cames-estirat-a-banqueta",
        categoria: "Core",
        complexitat: 3,
        equipament: "Banqueta",
        materials: ["banqueta", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Estirat a la banqueta, subjecta't per la part posterior del teu cap. Eleva les cames estirades fins als 90º i baixa-les lentament evitant arquejar l'esquena inferior.",
        benefici_salut: "Posa el focus en la part inferior de l'abdomen i els flexors del maluc, millorant la força de compressió abdominal."
    },
    {
        id: "core-06",
        nom: "Superman a terra",
        imatge: "superman-a-terra",
        categoria: "Core",
        complexitat: 2,
        equipament: "Terra (estoreta)",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Estirat cap per avall. Eleva simultàniament braços i cames uns centímetres de terra, contraient tota la cadena posterior (erectors espinals i glutis). Mantén la mirada a terra.",
        benefici_salut: "Vital per a la musculatura extensora de l'esquena, compensant el temps d'assegut i millorant l'erecció postural."
    },
    {
        id: "core-07",
        nom: "Press Pallof amb gomes",
        imatge: "press-pallof-amb-gomes",
        categoria: "Core",
        complexitat: 4,
        equipament: "Goma elàstica, Punt fix",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 30 segons per costat",
        instruccions: "Dret, de costat al punt d'ancoratge de la goma. Subjecta la goma amb les dues mans davant del pit i estira-la endavant fins a bloquejar braços. Lluita contra la goma que t'estira lateralment cap al punt fix.",
        benefici_salut: "Exercici d'anti-rotació que enforteix els oblics i le core profund per protegir la columna de forces laterals inesperades."
    },
    {
        id: "core-08",
        nom: "Intercanvi de pilota (V-Pass)",
        imatge: "intercanvi-de-pilota-v-pass",
        categoria: "Core",
        complexitat: 3,
        equipament: "Pilota suïssa (Fitball), Estora",
        materials: ["pilota", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 10 a 15 intercanvis (mà-peu-mà compta com a 2)",
        instruccions: "Estirat d'esquena amb la pilota a les mans. Eleva braços i cames simultàniament per \"passar\" la pilota de les mans als peus (subjectant-la amb els turmells). Torna a baixar sense que la pilota ni les mans toquin terra, i repeteix l'intercanvi.",
        benefici_salut: "Treballa la coordinació intermuscular i tota la cadena anterior del tronc, amb un èmfasi especial en el control motor de la zona lumbo-pèlvica."
    },
    {
        id: "core-09",
        nom: "Caminada del granger (Farmer's Walk)",
        imatge: "caminada-del-granger-farmer-s-walk",
        categoria: "Core",
        complexitat: 1,
        equipament: "Dues peses pesades",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 45-60 segons de caminada",
        instruccions: "Agafa una pesa a cada mà. Mantén l'esquena ben recta, les espatlles enrere (ben 'empaquetades') i la mirada al davant. Camina a passos curts i controlats durant el temps o distància fixats, evitant que el pes oscil·li.",
        benefici_salut: "Simula el transport de material o el pes de la motxilla. Enforteix l'adherència (vital per a grimpades) i l'estabilitat del tronc davant forces d'asimetria."
    },
    {
        id: "core-10",
        nom: "Jefferson Curl",
        imatge: "jefferson-curl",
        categoria: "Core",
        complexitat: 4,
        equipament: "Banqueta i una pesa lleugera",
        materials: ["banqueta", "peses"],
        repeticions_suggerides: "3 sèries de 5-8 repeticions molt lentes i controlades",
        instruccions: "Posa't dempeus sobre la banqueta. Amb les cames totalment rectes, comença a enrotllar la columna vèrtebra per vèrtebra, començant pel coll, baixant el pes cap als peus (i per sota del nivell de la banqueta si pots). Puja de la mateixa manera, desenrotllant-te lentament.",
        benefici_salut: "Decompressió de la columna i flexibilitat activa dels isquiotibials. Prepara l'esquena per aguantar la tensió constant de les pujades pronunciades."
    },
    {
        id: "cardio-01",
        nom: "Escaladors (Mountain Climbers)",
        categoria: "Cardio",
        complexitat: 2,
        equipament: "Pes corporal",
        imatge: "mountain-climbers",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 45 segons",
        instruccions: "Col·loca't en posició de planxa alta amb les mans sota les espatlles i el cos recte. Alterna ràpidament el moviment dels genolls cap al pit, com si estiguessis corrent en horitzontal.",
        benefici_salut: "Treball cardiovascular intens que enforteix el core i millora la coordinació.",
        translations: {
            ca: {
                nom: "Escaladors (Mountain Climbers)",
                instruccions: "Col·loca't en posició de planxa alta amb les mans sota les espatlles i el cos recte. Alterna ràpidament el moviment dels genolls cap al pit, com si estiguessis corrent en horitzontal. Mantén el maluc baix i el focus en l'estabilitat del tronc per evitar el balanceig excessiu.",
                benefici: "Treball cardiovascular intens que enforteix el core, millora la coordinació i augmenta la potència explosiva del tren inferior."
            },
            es: {
                nom: "Escaladores (Mountain Climbers)",
                instruccions: "Colócate en posición de plancha alta con las manos bajo los hombros y el cuerpo recto. Alterna rápidamente el movimiento de las rodillas hacia el pecho, como si estuvieras corriendo en horizontal. Mantén la cadera baja y el foco en la estabilidad del tronco para evitar balanceos excesivos.",
                benefici: "Trabajo cardiovascular intenso que fortalece el core, mejora la coordinación y aumenta la potencia explosiva del tren inferior."
            },
            en: {
                nom: "Mountain Climbers",
                instruccions: "Get into a high plank position with your hands under your shoulders and your body straight. Rapidly alternate driving your knees toward your chest, as if running horizontally. Keep your hips low and focus on core stability to prevent excessive swaying.",
                benefici: "Intense cardiovascular workout that strengthens the core, improves coordination, and increases explosive power in the lower body."
            }
        }
    },
    {
        id: "cardio-02",
        nom: "Burpees (adaptats)",
        categoria: "Cardio",
        complexitat: 4,
        equipament: "Pes corporal",
        imatge: "burpees-adaptats",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Esquat, planxa, flexió i salt. Sense impacte si cal.",
        benefici_salut: "Alta despesa calòrica i treball de potència total.",
        translations: {
            ca: {
                nom: "Burpees (adaptats)",
                instruccions: "Comença d'esquena dreta, baixa en un esquat fins a tocar terra amb les mans, salta o camina cap enrere fins a la posició de planxa, realitza una flexió si el teu nivell ho permet, torna els peus cap a les mans i finalitza amb un salt vertical estenent els braços. Es pot realitzar sense salt per reduir l'impacte.",
                benefici: "Exercici de cos sencer extremadament eficaç per cremar calories, millorar la resistència cardiopulmonar i la coordinació motora."
            },
            es: {
                nom: "Burpees (adaptados)",
                instruccions: "Comienza con la espalda recta, baja en una sentadilla hasta tocar el suelo con las manos, salta o camina hacia atrás hasta la posición de plancha, realiza una flexión si tu nivel lo permite, devuelve los pies hacia las manos y finaliza con un salto vertical extendiendo los brazos. Se puede realizar sin salto para reducir el impacto.",
                benefici: "Ejercicio de cuerpo completo extremadamente eficaz para quemar calorías, mejorar la resistencia cardiopulmonar y la coordinación motora."
            },
            en: {
                nom: "Burpees (adapted)",
                instruccions: "Start with a straight back, drop into a squat until your hands touch the floor, jump or step back into a plank position, perform a push-up if your level allows, return your feet to your hands, and finish with a vertical jump extending your arms. Can be performed without the jump to reduce impact.",
                benefici: "Extremely effective full-body exercise for burning calories, improving cardiopulmonary endurance, and motor coordination."
            }
        }
    },
    {
        id: "cardio-03",
        nom: "Jumping Jacks (gomes)",
        categoria: "Cardio",
        complexitat: 2,
        equipament: "Goma elàstica",
        imatge: "jumping-jacks-gomes",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 1 minut",
        instruccions: "Salta obrint i tancant cames amb la goma als turmells.",
        benefici_salut: "Enforteix abductors i millora la coordinació.",
        translations: {
            ca: {
                nom: "Jumping Jacks (gomes)",
                instruccions: "Col·loca una mini-banda al voltant dels teus turmells. Comença dempeus amb els braços als costats. Salta obrint les cames lateralment mentre eleves els braços per sobre del cap. Torna a la posició inicial de forma controlada, lluitant contra la resistència de la goma en tot moment.",
                benefici: "Intensifica el treball lateral de les cames, especialment dels abductors i el gluti mitjà, alhora que manté el pols elevat."
            },
            es: {
                nom: "Jumping Jacks (con gomas)",
                instruccions: "Coloca una mini-banda alrededor de tus tobillos. Comienza de pie con los brazos a los lados. Salta abriendo las piernas lateralmente mientras elevas los brazos por encima de la cabeza. Vuelve a la posición inicial de forma controlada, luchando contra la resistencia de la goma en todo momento.",
                benefici: "Intensifica el trabajo lateral de las piernas, especialmente de los abductores y el glúteo medio, a la vez que mantiene el pulso elevado."
            },
            en: {
                nom: "Jumping Jacks (with bands)",
                instruccions: "Place a mini-band around your ankles. Start standing with your arms at your sides. Jump opening your legs laterally while raising your arms above your head. Return to the starting position in a controlled manner, fighting against the band's resistance at all times.",
                benefici: "Intensifies lateral leg work, especially of the abductors and gluteus medius, while keeping the heart rate elevated."
            }
        }
    },
    {
        id: "cardio-04",
        nom: "Salts del patinador (Skater Jumps)",
        categoria: "Cardio",
        complexitat: 3,
        equipament: "Pes corporal",
        imatge: "skater-jumps",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 20 repeticions",
        instruccions: "Salta lateralment d'un peu a l'altre rítmicament.",
        benefici_salut: "Millora l'equilibri dinàmic i la força lateral.",
        translations: {
            ca: {
                nom: "Salts del patinador (Skater Jumps)",
                instruccions: "Fes un salt lateral ample cap a la dreta, aterrant sobre el peu dret i creuant la cama esquerra per darrere. Immediatament, impulsa't cap a l'esquerra fent el moviment contrari, com si fossis un patinador de velocitat. Utilitza els braços per guanyar impuls i mantenir l'equilibri.",
                benefici: "Millora l'estabilitat lateral del genoll, l'equilibri dinàmic i la potència dels glutis i quàdriceps en moviments asimètrics."
            },
            es: {
                nom: "Saltos del patinador (Skater Jumps)",
                instruccions: "Realiza un salto lateral amplio hacia la derecha, aterrizando sobre el pie derecho y cruzando la pierna izquierda por detrás. Inmediatamente, impúlsate hacia la izquierda realizando el movimiento contrario, como si fueras un patinador de velocidad. Utiliza los brazos para ganar impulso y mantener el equilibrio.",
                benefici: "Mejora la estabilidad lateral de la rodilla, el equilibrio dinámico y la potencia de los glúteos y cuádriceps en movimientos asimétricos."
            },
            en: {
                nom: "Skater Jumps",
                instruccions: "Perform a wide lateral jump to the right, landing on your right foot and crossing your left leg behind. Immediately propel yourself to the left performing the opposite movement, as if you were a speed skater. Use your arms for momentum and balance.",
                benefici: "Improves lateral knee stability, dynamic balance, and power in the glutes and quads during asymmetrical movements."
            }
        }
    },
    {
        id: "cardio-05",
        nom: "Boxa a l'ombra (Shadow Boxing)",
        categoria: "Cardio",
        complexitat: 3,
        equipament: "Peses lleugeres",
        imatge: "shadow-boxing-peses",
        materials: ["peses"],
        repeticions_suggerides: "4 sèries de 1 minut",
        instruccions: "Llança cops de puny controlats amb peses lleugeres.",
        benefici_salut: "Tonificació de braços i agilitat cardiovascular.",
        translations: {
            ca: {
                nom: "Boxa a l'ombra (Shadow Boxing)",
                instruccions: "Subjecta una pesa lleugera a cada mà i col·loca't en posició de guàrdia. Llança cops de puny (jabs, cross i hams) de forma controlada i rítmica cap a un oponent imaginari. Mantén els genolls relaxats i els colzes a prop del cos, assegurant-te de no bloquejar l'articulació del colze en el cop.",
                benefici: "Tonificació de braços i espatlles mentre millora l'agilitat cardiovascular i la coordinació ull-mà sota una lleugera sobrecàrrega."
            },
            es: {
                nom: "Boxeo a la sombra (Shadow Boxing)",
                instruccions: "Sujeta una pesa ligera en cada mano y colócate en posición de guardia. Lanza puñetazos (jabs, cross y ganchos) de forma controlada y rítmica hacia un oponente imaginario. Mantén las rodillas relajadas y los codos cerca del cuerpo, asegurándote de no bloquear la articulación del codo en el golpe.",
                benefici: "Tonifica los brazos y los hombros mientras mejora la agilidad cardiovascular y la coordinación ojo-mano bajo una ligera sobrecarga."
            },
            en: {
                nom: "Shadow Boxing",
                instruccions: "Carry a light weight in each hand and get into a guard position. Throw punches (jabs, cross, and hooks) in a controlled and rhythmic manner toward an imaginary opponent. Keep your knees relaxed and elbows close to your body, making sure not to lock the elbow joint during the strike.",
                benefici: "Tones arms and shoulders while improving cardiovascular agility and eye-hand coordination under a light overload."
            }
        }
    },
    {
        id: "cardio-06",
        nom: "Thrusters",
        categoria: "Cardio",
        complexitat: 4,
        equipament: "Peses",
        imatge: "thrusters",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 15 repeticions",
        instruccions: "Esquat i empenta de la càrrega sobre el cap.",
        benefici_salut: "Exercici metabòlic complet (força + cardio).",
        translations: {
            ca: {
                nom: "Thrusters",
                instruccions: "Sostén les peses a l'alçada de les espatlles. Baixa en un esquat profund mantenint l'esquena recta i el pes als talons. En pujar, aprofita l'impuls de les cames per estendre els braços i llançar les peses per sobre del cap en un moviment fluid i continu.",
                benefici: "Un dels moviments més complets per a la condició física general, combinant la força de les cames amb l'empenta vertical d'espatlles i un gran consum d'oxigen."
            },
            es: {
                nom: "Thrusters",
                instruccions: "Sujeta las pesas a la altura de los hombros. Baja en una sentadilla profunda manteniendo la espalda recta y el peso en los talones. Al subir, aprovecha el impulso de las piernas para extender los brazos y lanzar las pesas por encima de la cabeza en un movimiento fluido y continuo.",
                benefici: "Uno de los movimientos más completos para la condición física general, combinando la fuerza de las piernas con el empuje vertical de hombros y un gran consumo de oxígeno."
            },
            en: {
                nom: "Thrusters",
                instruccions: "Hold the weights at shoulder height. Drop into a deep squat keeping your back straight and your weight on your heels. As you rise, use the momentum from your legs to extend your arms and drive the weights overhead in one fluid and continuous movement.",
                benefici: "One of the most comprehensive movements for overall fitness, combining leg strength with vertical shoulder drive and high oxygen consumption."
            }
        }
    },
    {
        id: "cardio-07",
        nom: "Salts laterals sobre banqueta (Bench Lateral Hops)",
        categoria: "Cardio",
        complexitat: 5,
        equipament: "Banqueta",
        imatge: "salts-laterals-banqueta",
        materials: ["banqueta"],
        repeticions_suggerides: "3 sèries de 30 segons",
        instruccions: "Salta lateralment sobre la banqueta amb suport de mans.",
        benefici_salut: "Desenvolupa l'agilitat explosiva extrema.",
        translations: {
            ca: {
                nom: "Salts laterals sobre banqueta (Bench Lateral Hops)",
                instruccions: "Col·loca't de costat a la banqueta i recolza-hi les mans amb força. Flexiona els genolls i impulsa't per saltar amb els dos peus alhora cap a l'altre costat de la banqueta, aterrant de forma suau. Mantén el pes sobre les mans per facilitar el desplaçament aeri.",
                benefici: "Desenvolupa una agilitat explosiva extrema i coordina la força del tren superior amb la reactivitat de les cames."
            },
            es: {
                nom: "Saltos laterales sobre banco (Bench Lateral Hops)",
                instruccions: "Colócate de lado al banco y apoya las manos con fuerza. Flexiona las rodillas e impúlsate para saltar con ambos pies a la vez hacia el otro lado del banco, aterrizando de forma suave. Mantén el peso sobre las manos para facilitar el desplazamiento aéreo.",
                benefici: "Desarrolla una agilidad explosiva extrema y coordina la fuerza del tren superior con la reactividad de las piernas."
            },
            en: {
                nom: "Bench Lateral Hops",
                instruccions: "Stand profile to the bench and place your hands firmly on it. Bend your knees and propel yourself to jump with both feet at once to the other side of the bench, landing softly. Keep your weight on your hands to facilitate the aerial movement.",
                benefici: "Develops extreme explosive agility and coordinates upper body strength with leg reactivity."
            }
        }
    },
    {
        id: "cardio-08",
        nom: "Esquat amb salt (Jump Squat)",
        categoria: "Cardio",
        complexitat: 3,
        equipament: "Pes corporal",
        imatge: "esquat-amb-salt",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 12 repeticions",
        instruccions: "Fes un esquat i salta verticalment amb potència.",
        benefici_salut: "Maximitza la potència explosiva de les cames.",
        translations: {
            ca: {
                nom: "Esquat amb salt (Jump Squat)",
                instruccions: "Baixa en posició d'esquat convencional fins que les cuixes estiguin paral·leles a terra. Des d'aquí, impulsa't amb explosivitat cap amunt realitzant un salt vertical tan alt com puguis. Aterra amb les puntes dels peus i flexiona els genolls immediatament per esmorteir l'impacte.",
                benefici: "Augmenta dràsticament la potència del tren inferior (pliometria), millora la densitat òssia i eleva ràpidament la freqüència cardíaca."
            },
            es: {
                nom: "Sentadilla con salto (Jump Squat)",
                instruccions: "Baja en posición de sentadilla convencional hasta que los muslos estén paralelos al suelo. Desde aquí, impúlsate con explosividad hacia arriba realizando un salto vertical tan alto como puedas. Aterriza con las puntas de los pies y flexiona las rodillas inmediatamente para amortiguar el impacto.",
                benefici: "Aumenta drásticamente la potencia del tren inferior (pliometría), mejora la densidad ósea y eleva rápidamente la frecuencia cardíaca."
            },
            en: {
                nom: "Jump Squat",
                instruccions: "Drop into a conventional squat position until your thighs are parallel to the floor. From there, explode upward performing a vertical jump as high as you can. Land on the balls of your feet and immediately bend your knees to cushion the impact.",
                benefici: "Dramatically increases lower body power (plyometrics), improves bone density, and rapidly raises heart rate."
            }
        }
    },
    {
        id: "descans-01",
        nom: "Descans",
        imatge: "descans",
        categoria: "Altres",
        ocult: true,
        complexitat: 1,
        equipament: "Cap",
        materials: ["cap"],
        repeticions_suggerides: "---",
        instruccions: "Aprofita per hidratar-te i recuperar el alè per a la següent sèrie. No cal que corris. El temps dedicat al descans no constarà al registre d'activitat.",
        benefici_salut: "Permet la recuperació muscular i del sistema nerviós."
    }
];

// Exportació per a ús en el mòdul principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CATALEG_EXERCICIS;
}
