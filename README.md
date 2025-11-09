# My Little Library

Application de gestion de bibliothèque développée avec Next.js 15, TypeScript, MongoDB et Tailwind CSS.

## 🚀 Fonctionnalités

- **Authentification** : Inscription et connexion des utilisateurs
- Gestion des livres (création, modification, suppression)
- Recherche de livres par titre, auteur ou résumé
- Pagination des résultats
- Validation des données avec Zod
- Interface responsive avec Tailwind CSS
- Protection des routes avec middleware

## 📋 Prérequis

- Node.js 18+
- MongoDB (local ou MongoDB Atlas)
- npm, yarn, pnpm ou bun

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd my-little-library-app
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Créez un fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

4. Configurez les variables d'environnement dans `.env.local` :
```env
MONGODB_URI=votre_chaîne_de_connexion_mongodb
```

**Note:** Next.js charge automatiquement les variables depuis `.env.local`. Ce fichier est ignoré par git pour des raisons de sécurité.

Exemple pour MongoDB local :
```env
MONGODB_URI=mongodb://localhost:27017/my-little-library
```

Exemple pour MongoDB Atlas :
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

## 🚀 Démarrage

Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
my-little-library-app/
├── app/
│   ├── components/          # Composants réutilisables
│   ├── dashboard/           # Pages du dashboard
│   │   ├── books/          # Gestion des livres
│   │   ├── members/        # Gestion des membres
│   │   └── loans/          # Gestion des prêts
│   ├── entity/             # Entités Zod
│   ├── ui/                  # Composants UI
│   └── layout.tsx          # Layout principal
├── lib/
│   ├── actions.ts          # Server Actions
│   ├── data.ts             # Fonctions de récupération de données
│   ├── db.ts               # Connexion MongoDB
│   ├── validations.ts      # Schémas de validation Zod
│   └── utils.ts            # Fonctions utilitaires
├── models/                 # Modèles Mongoose
└── public/                 # Fichiers statiques
```

## 🔧 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Zod** - Validation de schémas
- **Tailwind CSS** - Framework CSS utilitaire
- **Heroicons** - Icônes SVG

## 📝 Variables d'environnement

Les variables d'environnement doivent être définies dans un fichier `.env.local` à la racine du projet.

| Variable | Description | Requis |
|----------|-------------|--------|
| `MONGODB_URI` | Chaîne de connexion MongoDB | Oui |
| `AUTH_SECRET` | Clé secrète pour l'authentification (générer avec `openssl rand -base64 32`) | Recommandé |

**Important:** Le fichier `.env.local` est ignoré par git. Ne commitez jamais vos variables d'environnement.

## 🧪 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🏗️ Architecture

L'application utilise :
- **Server Components** pour le rendu côté serveur
- **Server Actions** pour les mutations de données
- **Zod** pour la validation des formulaires
- **Mongoose** pour l'interaction avec MongoDB
- **Tailwind CSS** pour le styling

## 📚 Modèles de données

### Book
- `title` (string, requis)
- `author` (string, optionnel)
- `editionName` (string, optionnel)
- `yearOfPublication` (Date, optionnel)
- `ean13` (number, optionnel - 13 chiffres)
- `copyNum` (number, requis)
- `loanableStatus` (enum: "available on site" | "loanable")
- `summary` (string, optionnel)
- `coverURL` (string, optionnel - URL valide)

## 🔒 Sécurité

- Validation des entrées avec Zod
- Protection contre les injections MongoDB
- Variables d'environnement pour les secrets
- Vérification des types TypeScript

## 📄 Licence

Ce projet est développé pour le collège Saint-Vincent.

## 👤 Auteur

Sébastien Goffin

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
