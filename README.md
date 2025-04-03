# Homecook

## Usuario de prueba:
- Nombre de usuario: ernestina@HomeCook.com
- Contraseña: Soy_Ernestina1

## Dependencias
- Para poder ejecutar hay que tener instalado el *json-server*
- Se deve trasladar el directorio de trabajo a "JSON_SERVER"
- npm install -g json-server
- json-server --watch All.json

## Proyecto en angular
- Se deve navegar hasta la carpeta ./HomeCook-Angular
```bash 
cd ./HomeCook-Angular
```
- El propio proyecto angular posee un script que describe su funcionalidad y requisitos.


## Descripción del proyecto:
Nuestro proyecto consiste en ofrecer una página web de recetas.
La idea era disponer de un sitio en el que se pudiera buscar la receta deseada, tener una cuenta, buscar recetas por tipo y filtrar por receta.
Una vez seleccionada una receta deseada, se mostrarán los pasos para su realización.
## Autores
- Nicolás Rey Alonso
- Greta Piccoli
- Wafa Azdad Triki

## Requisitos Funcionales
- Que se puedan almacenar recetas.
- Acceder a recetas online.
- Poder iniciar sesión.
- Poder crear cuentas.
- Poder crear recetas personales.
- Poder acceder a un listado de recetas guardadas.
- Poder buscar y filtrar recetas bajo diferentes criterios.

## Templates
### Header
#### Archivo
- *Templates/header.html*
#### Implementa los mockups
- *"Mockups/Header.png"*
#### Es usado por
- Todas las páginas

### Footer
#### Archivo
- *Templates/footer.html*
#### Implementa los mockups
- *"Mockups/Footer"*
#### Es usado por
- Todas las páginas

### Items
#### Archivo
- *Templates/item.html*
#### Es usado por
- Hasta que no implementemos JavaScript, ninguna

### List Of Recipes
#### Archivo
- *Templates/ListOfRecipes.html*
#### Implementa los mockups
- *"Mockups/List of recipes.png"*
#### Es usado por
- HomePage
- Account
- Filtered Recipes
- Search Result

### Recomendations
#### Archivo
- *Templates/recomendations.html*
#### Implementa los mockups
- *Mockups/Recomendations.png*
#### Es usado por
- Recipe
- HomePage

### Steps Of Recipes
#### Archivo
- *Templates/StepsOfRecipes.html*
#### Implementa los mockups
- *"Mockups/Template_step_of_a_recipe.png"*
#### Es usado por
- Recipe

## Páginas
### Account
#### Archivo
- *Account.html*
#### Implementa los mockups
- *Mockups/Cuenta.png*
#### Utiliza Templates
- Header
- Footer
- List Of Recipes
### Article Template (Provisional)
#### Archivo
- *article-template.html*

### Recipe
#### Archivo
- *Recipe.html*
#### Implementa los mockups
- *Mockups/Cuenta.png*
#### Utiliza Templates
- Header
- Footer
- Steps Of Recipes
- Recomendations

### Filtered Recipes
#### Archivo
- *Recipes-filter.html*
#### Implementa los mockups
- *"Mockups/Recipes_from_filter.png"*
#### Utiliza Templates
- Header
- List Of Recipes
- Footer
### Search Result
#### Archivo
- *SearchRecipes.html*
#### Implementa los mockups
- *"Mockups/Search_recipes.png"*
#### Utiliza Templates
- Header
- Footer
- List Of Recipes
### Edit Profile
#### Archivo
- *EditProfile.html*
#### Implementa los mockups
- *"Mockups/Edit_perfil.png"*
#### Utiliza Templates
- Header
- Footer

### HomePage
#### Archivo
- *index.html*
#### Implementa los mockups
- *"Mockups/Homepage.png"*
#### Utiliza Templates
- Header
- Footer
- List Of Recipes
### Log-in
#### Archivo
- *Log-in.html*
#### Implementa los mockups
- *"Mockups/Log-in.png"*
#### Utiliza Templates
- Header
- Footer

### Sign-in
#### Archivo
- *Sign-in.html*
#### Implementa los mockups
- *"Mockups/Sign-up.png"*
#### Utiliza Templates
- Header
- Footer



## Scripts
- Cada página utiliza su propio script *único*

### Account
#### Archivo
- *Scripts/Account.js*
#### Utilizado por
- Página Account
#### Implementa:
- Integración de templates
- Carga dinámica de contenido

### EditProfile
#### Archivo
- *Scripts/EditProfile.js*
#### Utilizado por
- Página EditProfile
#### Implementa:
- Integración de templates
- Validación de formularios
- Carga dinámica de contenido

### HomePage
#### Archivo
- *Scripts/HomePage.js*
#### Utilizado por
- Página HomePage
#### Implementa:
- Integración de templates
- Carga dinámica de contenido

### Log-in
#### Archivo
- *Scripts/Log-in.js*
#### Utilizado por
- Página Log-in
#### Implementa:
- Validación de credenciales
- Manejo de sesiones
- Integración de templates

### Recipe
#### Archivo
- *Scripts/Recipe.js*
#### Utilizado por
- Página Recipe
#### Implementa:
- Carga dinámica de recetas
- Integración de templates
- Interacción con base de datos

### Recipes-filter
#### Archivo
- *Scripts/Recipes-filter.js*
#### Utilizado por
- Página Recipes-filter
#### Implementa:
- Filtros avanzados de recetas
- Integración de templates
- Actualización dinámica de resultados

### SearchRecipes
#### Archivo
- *Scripts/SearchRecipes.js*
#### Utilizado por
- Página SearchRecipes
#### Implementa:
- Búsqueda de recetas
- Integración de templates
- Manejo de sugerencias

### Sign-in
#### Archivo
- *Scripts/Sign-in.js*
#### Utilizado por
- Página Sign-in
#### Implementa:
- Registro de nuevos usuarios
- Validación de formularios
- Integración de templates


## Herramientas Externas:
### JSON-Server
#### Ubicación
- *JSON_SERVER*
#### Archivos
##### JSON_SERVER/package.json
- Archivo de datos principal
##### JSON_SERVER/package-lock.json
- Archivo de configuracion del JSON server


## Enlaces Externos
### Enlace Figma
- [Figma - HomeCook](https://www.figma.com/design/2niUmMJ2UsHNdK5xQ7Ui7R/HomeCook?node-id=47-2&t=4zfBJrdXHoN6BGBq-0)

### Enlace Trello
- [Trello - HomeCook](https://trello.com/invite/b/67bdff70ee9396dc759b04ce/ATTIff2e3758e2fb3f6f6366d974223e7fca34632008/homecook)

