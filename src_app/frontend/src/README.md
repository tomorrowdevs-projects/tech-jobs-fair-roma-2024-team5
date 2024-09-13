Iniziare con Create React App

Nella directory del progetto, puoi eseguire:

### `npm start`

Esegue l'app in modalità di sviluppo.\
Apri [http://localhost:3000](http://localhost:3000) per vederla nel tuo browser.

La pagina si ricaricherà quando apporterai modifiche.\
Potresti anche vedere eventuali errori di lint nella console.

### `npm test`

Lancia il runner di test in modalità di watch interattiva.\
Vedi la sezione su [come eseguire i test](https://facebook.github.io/create-react-app/docs/running-tests) per ulteriori informazioni.

### `npm run build`

Compila l'app per la produzione nella cartella `build`.\
Configura correttamente React in modalità di produzione e ottimizza la compilazione per le migliori prestazioni.

La compilazione è minificata e i nomi dei file includono gli hash.\
La tua app è pronta per essere distribuita!

Vedi la sezione su [distribuzione](https://facebook.github.io/create-react-app/docs/deployment) per ulteriori informazioni.

### `npm run eject`

**Nota: questa è un'operazione a senso unico. Una volta che `eject`, non puoi tornare indietro!**

Se non sei soddisfatto delle scelte di configurazione e degli strumenti di compilazione, puoi `eject` in qualsiasi momento. Questo comando rimuoverà la singola dipendenza di compilazione dal tuo progetto.

Invece, copierà tutti i file di configurazione e le dipendenze transitive (webpack, Babel, ESLint, ecc.) direttamente nel tuo progetto, in modo da avere il pieno controllo su di esse. Tutti i comandi tranne `eject` continueranno a funzionare, ma punteranno ai script copiati, in modo da poterli personalizzare. A questo punto sei solo tu.

Non devi mai usare `eject`. Il set di funzionalità curato è adatto per piccole e medie distribuzioni, e non dovresti sentirti obbligato a usare questa funzionalità. Tuttavia, comprendiamo che questo strumento non sarebbe utile se non potessi personalizzarlo quando sei pronto per farlo.

### Struttura del progetto

```
src/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── HabitForm/
│   │   │   └── HabitForm.jsx
│   │   ├── HabitList/
│   │   │   └── HabitList.jsx
│   │   ├── HabitTracker/
│   │   │   └── HabitTracker.jsx
│   │   └── Dashboard/
│   │       └── Dashboard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── habitService.js
│   ├── hooks/
│   │   └── useNotification.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── index.html
├── package.json
└── vite.config.js
```
Di seguito è descritto lo scopo di ogni file nella struttura del progetto:

### src/
La cartella `src` contiene il codice sorgente dell'applicazione.

#### src/components/
La cartella `components` contiene i componenti React riutilizzabili.

*   `Auth/`: contiene i componenti relativi all'autenticazione, come ad esempio il form di login e registrazione.
*   `HabitForm/`: contiene il componente per la definizione delle abitudini.
*   `HabitList/`: contiene il componente per la visualizzazione delle abitudini.
*   `HabitTracker/`: contiene il componente per il tracciamento del completamento delle attività legate alle abitudini.
*   `Dashboard/`: contiene il componente per la visualizzazione dei grafici sull'andamento delle abitudini.

#### src/pages/
La cartella `pages` contiene le pagine dell'applicazione.

*   `Home.jsx`: la pagina di benvenuto.
*   `Auth.jsx`: la pagina di autenticazione.
*   `Dashboard.jsx`: la pagina del cruscotto.

#### src/services/
La cartella `services` contiene i servizi dell'applicazione.

*   `authService.js`: il servizio per l'autenticazione.
*   `habitService.js`: il servizio per la gestione delle abitudini.

#### src/hooks/
La cartella `hooks` contiene gli hook personalizzati.

*   `useNotification.js`: l'hook per l'invio di notifiche.

#### src/utils/
La cartella `utils` contiene le funzioni di utilità.

*   `dateUtils.js`: le funzioni per la gestione delle date.

#### src/context/
La cartella `context` contiene i contesti dell'applicazione.

*   `AuthContext.js`: il contesto per l'autenticazione.

#### src/App.jsx
Il componente principale dell'applicazione.

#### src/main.jsx
Il punto di ingresso dell'applicazione.

### public/
La cartella `public` contiene i file statici dell'applicazione.

*   `index.html`: il file HTML di base dell'applicazione.

### package.json
Il file di configurazione del progetto.

### vite.config.js
Il file di configurazione di Vite.











