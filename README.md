# Application d'une camera et gestion de photos

Application mobile React Native (Expo) permettant de capturer des photos, de les organiser dans des dossiers et de les gérer localement sur l’appareil via filesystem et AsyncStorage.

## Fonctionnalités principales

### 1. Capture de photos
- Accès à la caméra via `expo-camera`
- Prise de photos directement dans l’application
- Sauvegarde locale des images sur le filesystem de l’appareil
- Ajout automatique des photos à la galerie interne

### 2. Galerie de photos
- Affichage de toutes les photos capturées dans une grille
- Navigation vers un écran de détail pour chaque image
- Suppression de photos depuis la galerie ou le détail
- Chargement persistant des photos via AsyncStorage

### 3. Gestion des dossiers
- Création de dossiers personnalisés
- Renommage des dossiers (long press)
- Suppression de dossiers
- Organisation des photos dans des dossiers

### 4. Organisation des photos
- Attribution d’une photo à un seul dossier à la fois
- Déplacement de photos entre dossiers
- Retrait de photos d’un dossier sans suppression du fichier
- Suppression physique optionnelle des images du stockage

### 5. Détail des photos
- Affichage plein écran des images
- Actions disponibles selon le contexte :
  - Déplacer vers un dossier
  - Retirer du dossier
  - Supprimer la photo
- Interface conditionnelle selon la provenance (galerie ou dossier)

## Architecture technique

## Installation

### 1. Cloner le projet
```bash
git clone <repo-url>
cd photo-manager-app
```
## Installation

### 2. Installer les dépendances et Expo CLI
```bash
npm install
npm install -g expo-cli
```
### 3. Lancer l’application
```
npx expo start
```

## Lancer sur téléphone
- Installer Expo Go sur iOS ou Android
- Scanner le QR code affiché dans le terminal ou dans le navigateur Expo
- L’application se lance automatiquement sur le téléphone
