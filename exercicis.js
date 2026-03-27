/**
 * CATÀLEG D'EXERCICIS PER A LA WEB-APP DE GIMNÀSTICA
 * Lead Developer: Antigravity
 */

const CATALEG_EXERCICIS = [
    // --- CAMES ---
    {
        id: "cames-01",
        nom: "Esquat amb peses",
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
        categoria: "Cames",
        complexitat: 1,
        equipament: "Paret",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 45-6 segons",
        instruccions: "Recolza l'esquena contra la paret i baixa fins que les cuixes estiguin paral·leles a terra (angle de 90º). Mantén la posició estàtica, pressionant els talons contra el terra i l'esquena contra la paret.",
        benefici_salut: "Desenvolupa la resistència muscular als quàdriceps sense impacte articular, ideal per a la rehabilitació i l'estabilitat estructural."
    },
    {
        id: "cames-09",
        nom: "Isquios amb pilota",
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
        categoria: "Cames",
        complexitat: 3,
        equipament: "Pes corporal",
        materials: ["pes_corporal"],
        repeticions_suggerides: "3 sèries de 10 repeticions per cama",
        instruccions: "Dret, amb una cama recolzada en una banqueta o cadira. Flexiona el tors endavant sense arquejar l'esquena fins a sentir l'estirament als isquios, i torna a la posició inicial.",
        benefici_salut: "Millora l'estabilitat unilateral i la flexibilitat activa de la part posterior de la cuixa."
    },
    // --- EMPENTA (PIT/ESPATLLES/TRÍCEPS) ---
    {
        id: "empenta-01",
        nom: "Press de banca amb peses",
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
        categoria: "Empenta",
        complexitat: 4,
        equipament: "Goma elàstica",
        materials: ["gomes", "pes_corporal"],
        repeticions_suggerides: "3 sèries de 8-12 repeticions",
        instruccions: "Passa la goma per dalt de la teva esquena i subjecta-la amb les mans mentre fas flexions a terra. La goma afegeix resistència en la part final de l'empenta, quan els braços s'estenen.",
        benefici_salut: "Afegeix una corba de resistència variable que augmenta la potència muscular i la intensitat sense necessitat de pes extra."
    },

    // --- TRACCIÓ I CARDIO ---
    {
        id: "traccio-01",
        nom: "Màquina de rem",
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
        categoria: "Tracció i cardio",
        complexitat: 2,
        equipament: "Pes (mancuerna)",
        materials: ["peses"],
        repeticions_suggerides: "3 sèries de 12-15 repeticions per braç",
        instruccions: "Sostén un pes en una mà amb el braç paral·lel al cos. Eleva el braç lateralment fins a arribar a un angle de 90 graus (a l'alçada de l'espatlla). Baixa lentament per tornar a la posició inicial. Completa la sèrie i repeteix amb l'altre braç.",
        benefici_salut: "Aïllament eficaç del deltoide lateral, millorant l'amplada i l'estabilitat de l'espatlla."
    },

    // --- CORE ---
    {
        id: "core-01",
        nom: "Planxa abdominal",
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
        categoria: "Core",
        complexitat: 4,
        equipament: "Goma elàstica, Punt fix",
        materials: ["gomes"],
        repeticions_suggerides: "3 sèries de 30 segons per costat",
        instruccions: "Dret, de costat al punt d'ancoratge de la goma. Subjecta la goma amb les dues mans davant del pit i estira-la endavant fins a bloquejar braços. Lluita contra la goma que t'estira lateralment cap al punt fix.",
        benefici_salut: "Exercici d'anti-rotació que enforteix els oblics i le core profund per protegir la columna de forces laterals inesperades."
    },
    {
        id: "descans-01",
        nom: "Descans",
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
