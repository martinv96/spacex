# 🚀 SpaceX Launch Explorer

Une application Vue 3 + TypeScript + Tailwind qui affiche les lancements de SpaceX à l'aide de leur API publique.

## 🌐 Démo

[Démo en ligne sur Vercel] https://spacex-u5ch.vercel.app/

---

## 📁 Fonctionnalités

- Affichage du **prochain lancement**
- Liste paginée des **10 derniers lancements**
- Filtrage par **succès/échec**
- Détail d’un lancement dans une **modale**
- Intégration de la vidéo YouTube si disponible
- Données supplémentaires sur :
  - Le **lieu de lancement**
  - Les **payloads** et leurs **clients**

---

## 🛠️ Stack technique

- **Vue 3** + **TypeScript**
- **Tailwind CSS**
- API publique : [SpaceX v5](https://github.com/r-spacex/SpaceX-API)
- Déploiement sur **Vercel**

---

## 📌 Choix techniques

- Utilisation de la composition API (`<script setup>`) pour un code plus lisible et modulaire.
- Récupération des données via des `composables` pour isoler la logique liée à l’API.
- `computed` pour le traitement des données (formatage date, YouTube embed).
- `ref` pour les états réactifs (modale, vidéo, etc.).
- Gestion propre des cas où certaines données sont manquantes (ex: pas de vidéo, pas de description).
- Design simple mais responsive avec Tailwind.

---

## 🧩 Difficultés rencontrées

- La description (`details`) est souvent absente dans les données de l’API SpaceX.
- Le champ `youtube_id` n’est pas fourni dans la v5 : extraction manuelle depuis `links.webcast`.
- Nécessité de faire plusieurs requêtes en parallèle pour récupérer le nom du `launchpad` et les `payloads`.
- Gestion des erreurs silencieuses quand les données sont `null` ou incomplètes.

---

## 📚 Ressources utilisées

- [Documentation API SpaceX](https://github.com/r-spacex/SpaceX-API)
- [Vue 3 + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Vercel](https://vercel.com/)
- [Regex101](https://regex101.com/) pour l’extraction d’ID YouTube

---

## 🚀 Déploiement (optionnel)

### Vercel

1. Créer un compte sur [vercel.com](https://vercel.com/)
2. Lier votre dépôt GitHub
3. Laisser les options par défaut (framework détecté automatiquement)
4. Déployer 🎉

---

## 📂 Lancer en local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur local
npm run dev
