# ESIR-TP2 - Modules, asynchronisme et fs

Objectifs :
  - Comprendre et maitriser les différentes manières de faire de l'asynchronisme 
  - Savoir découper en module son application
  - Savoir utiliser l'API fs
  
Sujets abordés :
 - callback
 - promess
 - async/await
 - modules
 - fs
 
Lien utiles :

  - Outillage (npm, node, git, ab, postman etc.) : https://slides.com/stephmichel/deck-4#/
  
  - Ecmascript : https://slides.com/stephmichel/ecmascript#/
  
  - Node.js : https://slides.com/stephmichel/node-js#/
  
Pour le bon déroulement du TP et pour vous familiariser avec GIT, lorsque vous liser une ligne du genre (Tag: BLA-BLA-BLA), c'est qu'il est temps de commiter vos modifications afin de pouvoir revenir à ce niveau de code plus tard si besoin. 
Ceci vous permettra également de vous y retrouver lorsque le correctif vous sera fourni.
  
# Initialisation d'un projet
  
  Idem TP1, que l'on rappelle ici. Vous pouvez également repartir du tag TP1-ESIR-INIT du TP1, faire une branche (git branch TP2) et vous positionner sur cette branche (git checkout TP2).
  Sinon :
  
   - initialisation d'un projet node avec npm
   
    npm init
    
   - Initialisation GIT
   
    git init
    
   Paramétrer son .gitignore à la racine du projet avec le site http://gitignore.io
   
   - Installation du module nodemon
     
    npm i --save-dev nodemon
    
   - Installation et initialisation du module ESLINT
   
    npm i --save-dev eslint
    eslint --init
   
    How would you like to configure ESLint? Answer questions about your style
    Which version of ECMAScript do you use? ES5
    Where will your code run? Node
    Do you use JSX? No
    What style of indentation do you use? Spaces
    What quotes do you use for strings? Single
    What line endings do you use? Unix
    Do you require semicolons? No
    What format do you want your config file to be in? JSON
   
   - Commiter son premier projet (pour pouvoir éventuellement revenir dessus)
   
    git add .
    git commit -m "Initialisation"
    
   - Lancer l'IDE (Visual Studio Code)
        
    code .
  
   (tag: TP2-ESIR-INIT)
  
  # Ajout de modules au projet

  Dans ce TP nous allons avoir besoin des modules suivants :
    - fs (mais il est présent par défaut, donc pas besoin de l'installer) :  https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
    - http (pareil, présent par défaut). Doc ici  https://nodejs.org/dist/latest-v10.x/docs/api/http.html
    - 
    - debug (https://slides.com/stephmichel/node-js#/12/4)
    - winston (https://slides.com/stephmichel/node-js#/9/8)
    - colors (https://www.npmjs.com/package/colors), pour mettre un peu de gaieté dans tout ça...
    
   (tag: TP2-ESIR-MODULES)
    
  # STEP 1 : Création d'un serveur Web qui retourne la liste des fichiers d'un répertoire
    
   S'inspirer du TP1 pour réaliser un serveur Web (avec le module http) qui retourne au format JSON la liste des fichiers d'un répertoire (juste le nom dans un premier temps). Utiliser pour cela le module fs.
   
   (tag: TP2-ESIR-STEP1)
   
   # STEP 2 : Retourner, pour chaque fichier de la liste ses propriétés (taille, dates, etc.)
   
   Ici encode utiliser le module fs.
   
   (tag: TP2-ESIR-STEP1)
   
   # STEP 3 : Déplacer le coeur de la méthode 
