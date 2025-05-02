# Projet de Transformation d'Images

Ce projet permet de transformer des images en utilisant deux types d'opérations : `effet` (effets) et `filtre` (filtres). Vous pouvez appliquer des transformations comme faire pivoter, refléter, flouter, etc.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (gestionnaire de paquets pour Node.js)

## Installation

1. Clonez le repository :

```bash
git clone https://github.com/MaelJansen/Evaluation_architecture_application.git
cd Evaluation_architecture_application
```
2. Installez les dépendances :
```bash
npm install
```

3. Configurez vos variables d'environnement si nécessaire (dans un fichier .env)

### Lancer le Projet : 
```bash
npm run start:all
```

### Faire une Demande

L'API est disponible à l'URL suivante :
```bash
http://localhost:<port>/:imageId/:idUtilisateur/transforms
```
### Format de la requête
La requête doit être envoyée avec POST et envoyer un formulaire form-data qui contient les champs suivants :
  1. parameters: Un JSON avec les paramètres pour la transformation. Exemple :
     ```bash
     {"action": "mirror", "direction": "vertical"}

  3. image: Le fichier image à transformer.
  4. type: Le type d'opération à réaliser. Cela peut être l'un des suivants :
  ```bash
    'effet' ou 'filtre'
  ```

### Actions pour Effet :
- rotate : Faire pivoter l'image (envoyer aussi l'angle de rotation).
- ecrasement : Effet d'écrasement.
- mirror : Faire un reflet de l'image.
- kaleidoscope : Effet kaleidoscope.

### Actions pour Filtre :
- blur : Flouter l'image.
- sharpen : Affiner l'image.
- grayscale : Convertir l'image en niveaux de gris.
- negate : Inverser les couleurs de l'image.
