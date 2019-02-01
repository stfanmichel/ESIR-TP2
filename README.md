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
    
   - debug (https://slides.com/stephmichel/node-js#/12/4)
    
   - winston (https://slides.com/stephmichel/node-js#/9/8)
    
   - colors (https://www.npmjs.com/package/colors), pour mettre un peu de gaieté dans tout ça...
    
  # STEP 1 : Création d'un serveur Web qui retourne la liste des fichiers d'un répertoire (avec une méthode synchrone)
    
   S'inspirer du TP1 pour réaliser un serveur Web (avec le module http) qui retourne au format JSON la liste des fichiers d'un répertoire (juste le nom dans un premier temps). Utiliser pour cela le module fs.
   
   On va voir que les méthodes synchrone c'est le mal mais en attendant, pour l'exercice, utiliser la méthode fs.readdirsync ( https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options ). Ici encore un JSON.stringify() permettra de convertir le tableau Javascript en JSON.
   
   (tag: TP2-ESIR-STEP1)
   
   # STEP 2 : Retourner, pour chaque fichier de la liste ses propriétés (taille, dates, etc.)
   
   Ici encode utiliser le module fs.
   
   On utilisera la méthode fs.statSync() (https://nodejs.org/api/fs.html#fs_fs_statsync_path_options) pour récupérer les propriétés d'un fichier.
   
   On peut imaginer comme retour un tableau d'objets. Chaque object aura une propriété "name" correspondant au nom du fichier et une propriété "properties" correspondant aux propriétés du fichier (retournées par fs.statSync())
   
   (tag: TP2-ESIR-STEP2)
   
   # STEP 3 : Déplacer le coeur de la méthode dans un module
   
   Déplacer le code "fonctionnel" relatif à la récupération des propriétés des fichiers d'un path dans un module externe. Le module devra fournir une méthode qui retourne le tableau d'objets dont nous avons parlés au step 2. 
   
   On utilisera ici la méthode 'common.js' classique (https://slides.com/stephmichel/node-js#/11/2), la gestion des modules à la mode ES6 n'est pas encore disponible avec node.js. Ceci dit il serait possible de l'utiliser grâce au transpileur Babel mais cela complexifierait un peu trop le TP.
   
   Faite des mesures de performance en prenant un répertoire avec de nombreux fichier (node_modules par exemple) avec ab.
   Conserver les résultats pour les comparer à ceux du step 4.
   
   (tag: TP2-ESIR-STEP3)

 # STEP 4 : Le même en asynchrone (a little bit tricky)
   
   Modifier le code précédent pour en faire une fonction asynchrone avec un callback.
   La signature deviendra quelque chose comme :
   
     fileProperties(path, callback)
   
   où callback est une fonction qui a pour signature :
     
     callback(err, result)
   
   Voir ici pour un rappel sur les fonctions asynchrones : https://slides.com/stephmichel/ecmascript#/7/2
   
   Ca c'est la partie facile, maintenant il faut également utiliser les version asynchrone de fs, à savoir fs.readdir (https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) au lieu de fs.readdirsync et fs.stat (https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback) au lieu de fs.statSync.
   
   Vous risquez en plus de devoir utiliser le très populaire module async (https://www.npmjs.com/package/async) et en particulier la méthode reduce dont je rappelle ici l'usage.
   
    async.reduce([UN_TABLEAU_D_ITEM], [], (memo, item, callback) => {
      // pointless async:
      uneFonctionAsynchrone(param,(err,result){
        if (err){
          callback(err)
        } else {
          memo.push(result)
          callback(null, memo)
        }
      })
    }, (err, result) => {
      // result is now equal to the last value of memo, which is 6
    })
   
   Faite des mesures de performance en prenant un répertoire avec de nombreux fichier (node_modules par exemple) avec ab.
   Conserver ces résultats pour les comparer à ceux du step 3.
   
   (tag: TP2-ESIR-STEP4)

# STEP 5 : Le même avec des promesses (promise)
   
   Modifier le code précédent pour en faire une fonction asynchrone avec une promesse.
   La signature deviendra quelque chose comme :
   
    fileProperties(path)
    et retourne un objet Promise
    
   Voir ici pour un rappel sur les promises : https://slides.com/stephmichel/ecmascript#/7/5
   
   Modifier également le code de la fonction pour utiliser fs.promises (https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api) au lieu de fs. On remplacera en particulier la méthode fs.readdir par fsPromises.readdir  (https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fspromises_readdir_path_options).
   
   (tag: TP2-ESIR-STEP5)
   
   BONUS : On peut aller un peu plus loin et faire un peu de refactoring afin de séparer la partie "récupération des fichiers" de la partie "récupération des properties" en deux méthodes distinctes. Ces deux méthodes que nous appellerons fileList(path) et fileProperties(fileListArray) retourneront chacune une promise.
   Dans la page principale, le code d'appel ressemblera alors à :
   
    fileList(path)
      .then(fileList => {
        return fileProperties(path, fileList)
      })
      .then(result => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(result))
      })
      .catch(reason => {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify(reason))
    })
  
   (tag: TP2-ESIR-STEP5-BONUS)
   
 # STEP 6 : Le même avec des async/await (après je ne vous embête plus...)
 
 Maintenant que vous avez des promises partout, modifier le code afin de les appeler avec des async/await.
 
 Voir ici pour un rappel sur les promises : https://slides.com/stephmichel/ecmascript#/7/7
 
  (tag: TP2-ESIR-STEP6)
