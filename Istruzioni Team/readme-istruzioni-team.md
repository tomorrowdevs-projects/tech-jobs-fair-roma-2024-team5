# Istruzioni Team

## Credenziali
Le credenziali admin sono condivise e memorizzate in un file .kdbx. (Trovate sul Github sotto /Istruzioni Team) Per accedervi:
1. Installare KeePassXC (https://keepassxc.org/)
2. Aprire il file .kdbx con KeePassXC
3. Inserire la password principale fornita separatamente

## VPN - ZeroTier
Utilizziamo ZeroTier come nostra VPN. Ecco come configurarla:

1. Scaricare e installare ZeroTier da https://www.zerotier.com/download/
2. Dopo l'installazione, eseguire ZeroTier One
3. Fare clic con il tasto destro sull'icona ZeroTier nella barra delle applicazioni
4. Selezionare "Join Network"
5. Inserire l'ID della rete ZeroTier fornito separatamente
6. Attendere l'approvazione dell'amministratore di rete (@bimbo911)

Una volta approvati, sarete connessi alla rete VPN e potrete accedere alle risorse interne.

## Connessione SSH con PuTTY

### Generazione delle chiavi SSH:
1. Scaricare PuTTYgen
2. Avviare PuTTYgen
3. Configurare le impostazioni della chiave:
   - Type of key to generate: RSA
   - Number of bits in a generated key: 4096
4. Cliccare su "Generate"
5. Muovere il mouse nell'area vuota per generare randomness
6. Una volta generata la chiave, impostare una passphrase (opzionale ma fortemente consigliato)
7. Salvare la chiave privata (.ppk) con un nome riconoscibile, ad esempio: "username_chiave_privata.ppk"
8. Copiare l'intero contenuto del campo "Public key for pasting into OpenSSH authorized_keys file" e salvarlo in un file di testo con estensione .pub, ad esempio: "username_chiave_pubblica.pub"

### Invio della chiave pubblica all'amministratore:
1. Inviare il file "username_chiave_pubblica.pub" all'amministratore tramite Telegram (@bimbo911)

### Connessione al server:
1. Avviare PuTTY
2. Nel campo "Host Name", inserire l'indirizzo IP del server
3. Andare su Connection > SSH > Auth
4. Cliccare su "Browse" e selezionare il file .ppk della vostra chiave privata
5. Tornare alla schermata principale e salvare la sessione con un nome
6. Cliccare "Open" per connettersi

Al primo collegamento, accettare l'impronta digitale del server.

IMPORTANTE: Non procedere con la connessione finché non avrete ricevuto conferma dall'amministratore che la vostra chiave pubblica è stata autorizzata.

