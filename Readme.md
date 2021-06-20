# CSU Application mobile
## Installation

### Android
Pour installer le projet :

```bash
npm i
# Ou
yarn
```

Configurer le lien de l'api dans le fichier api/config.ts

example :

```ts
export const config = {
  url_base: "http://192.168.178.21:8000/api/",
};
```

Pour lancer le projet démarrer l'emulateur android ou branché votre téléphone avec le débug activé

```bash
npm run android
# Ou
yarn run android
```

addendum: Faire attention lors de l'utilisation d'un appareil physique il peut y avoir quelques soucis avec expo si les appareils ne sont pas sur le même réseau

### Web

Non supportée

## Erreur restante

- Pour choisir une ville faut double cliquer (les states ne se mette pas à jour directement)
- Les pharmachecks et les novachecks ne se mette pas à jour automatiquement
- Les toasts pour notifier du succès ou non d'une action sont présent mais ne s'affiche pas
- Les tabs d'en bas n'ont pas d'icon ce qui les rends trop discret