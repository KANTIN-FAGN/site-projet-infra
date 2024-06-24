# Documentation du Système de Serveur Web et Sauvegarde

### Table des matières

1. Introduction
2. Architecture du système
3. Utilisation
4. Bilan

#### Introduction

Dans le cadre de ce projet, nous devions élaborer l'architecture informatique d'une petite entreprise, incluant plusieurs composants :

- Un pare-feu
- Un client Linux et un client Windows
- Un serveur Linux sur lequel on devait héberger le site web
- Un autre serveur Linux de sauvegarde pour le site web

Nous avions pour consigne de  faire en sorte de pourvoir accéder au serveur de sauvegarde uniquement via le réseau de notre société mais le serveur web devait être accessible à tous.

#### Architecture du système

img_1 (maquette du prjet)

#### Utilisation

Les clients Windows et Linux sont connectés au WAN. Ils vont êtres mis en relation avec le pare-feu qui va les redirigés vers le serveur web sur lequel se trouve notre site.

Au totale nous avons 5 VM:

- 1 qui sert pour le serveur web.
- 1 pour le serveur de sauvgarde
- 2 clients (1 Windows et 1 Linux)
- 1 pour le pare-feu

Detail des IPs des différents éléments :

**WAN** : 192.168.229.130/24
**LAN** : 192.168.1.1/24
**ServWeb** : 192.168.1.100/24
**ServBackUP** : 192.168.1.101/24
**UserLinux** : 192.168.1.200/24
**UserWindows** : 192.168.1.201/24

Détail des regles du pare-feu :

img_2 (image regle pare-feu)

On utilise également du rsync pour le serveur de sauvegarde.

#### Bilan

Au travers de ce projet nous avons pu aborder des notions d'infrastrcutures qui ont permis de parfaires nos connaissances dans ce domaine et d'apporter des réponses à nos questions. L'utilisation de logiciels comme pfsense ou bien nginx ont été essentiels a la réalisation de ce projet. Même si ce projet a été très difficile nous sommes fières de vous présenter une solution qui fonctionne plutôt bien.