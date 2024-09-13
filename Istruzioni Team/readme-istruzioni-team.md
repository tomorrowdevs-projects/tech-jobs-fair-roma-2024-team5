# Istruzioni Team

## Credenziali
Le credenziali admin sono condivise e memorizzate in un file .kdbx. (Trovate sul Github sotto /Istruzioni Team) Per accedervi:
1. Installare [KeePassXC](https://keepassxc.org/)
2. Aprire il file .kdbx con KeePassXC
3. Inserire la password principale fornita separatamente

## VPN - ZeroTier
Utilizziamo ZeroTier come nostra VPN. Ecco come configurarla:

1. Scaricare e installare ZeroTier da [https://www.zerotier.com/download/](https://www.zerotier.com/download/)
2. Dopo l'installazione, eseguire ZeroTier One
3. Fare clic con il tasto destro sull'icona ZeroTier nella barra delle applicazioni
4. Selezionare "Join Network"
5. Inserire l'ID della rete ZeroTier fornito separatamente (chiedere a @bimbo911)
6. Attendere l'approvazione dell'amministratore di rete (@bimbo911)

Una volta approvati, sarete connessi alla rete VPN e potrete accedere alle risorse interne.

### Credenziali:
1. Le credenziali si trovano nel database con le password.

### Connessione al server:
1. Avviare PuTTY
2. Nel campo "Host Name", inserire l'indirizzo IP del server (10.244.249.37)
3. Assicurarsi che la porta sia impostata su 22
4. Andare su Connection > Data
5. Nel campo "Auto-login username", inserire il vostro nome utente che troverete nel Database
6. Tornare alla schermata principale e salvare la sessione con un nome (Opzionale)
7. Cliccare "Open" per connettersi

Al primo collegamento, accettare l'impronta digitale del server.

Quando richiesto, inserire la password fornita dall'amministratore.

### Sicurezza:
- Non condividete le vostre credenziali con nessuno.
- Se sospettate che le vostre credenziali siano state compromesse, contattate immediatamente l'amministratore.

Per qualsiasi problema di accesso o domanda sulla sicurezza, contattate l'amministratore (@bimbo911).