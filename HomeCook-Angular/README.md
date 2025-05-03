# HomeCook - Angular


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Instalar dependencias


Ejecute el siguiente comando para instalar todas las dependencias necesarias

```bash
npm install
```

Este comando descargará e instalará todas las librerías y paquetes listados en el archivo `package.json`

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecute

```bash
ng serve
```
Una vez que el servidor esté funcionando, abra su navegador y navegue hasta `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.
## Paginas

En el archivo `app.routes.ts`, puede ver todas las páginas que se han creado.
Para cargar la paginas, abra su navegador y navegue hasta `http://localhost:4200/` seguido del nombre de la página que desea ver

### Homepage

Esta pagina se abre cuando se empieza la navigacion, donde se cargarán el header, el footer, las recetas buscadas por ingredientes, los tipos y los favoritos

### Account

Esta pagina se abre al navegar hasta `http://localhost:4200/account` dónde se utilizó el archivo de componentes `account.component.ts`
En esta página, entonces, se carga el perfil de la persona, donde se puede encontrar el nombre y el correo electrónico vinculado a la cuenta. A continuación, se pueden ver los botones que dirigen a la página de Editing y a la Homepage, “Ajustes” y “Cerrar sesión” respectivamente.
También es posible encontrarse con recetas guardadas tanto en “guardado” como en “me gusta”, lo que es posible gracias a los botones insertados en las respectivas recetas.

### Sign-in

Esta pagina se abre al navegar hasta `http://localhost:4200/SignIn` dónde se utilizó el archivo de componentes `sign-in.component.ts`
Aquí es posible registrar un perfil introduciendo una dirección de correo electrónico y una contraseña que, por razones de seguridad, se le pedirá que repita para comprobar que ha introducido correctamente.
Una vez completado el proceso, hará clic en el botón "Sign-In" y será redirigido a la página Account.

### Login

Esta pagina se abre al navegar hasta `http://localhost:4200/login` dónde se utilizó el archivo de componentes `login.component.ts`
Aquí encontrará la forma de acceder a su perfil introduciendo un correo electrónico y una contraseña que ya haya guardado en la página Sign-in. En el momento en que haga clic en el botón Login, será redirigido a la página Account.

### Editing

Esta pagina se abre al navegar hasta `http://localhost:4200/edit` dónde se utilizó el archivo de componentes `edit-profile.component.ts`
Una vez en esta página, podrá cambiar toda la información sobre su perfil, es decir, su foto, nombre, correo electrónico y contraseña.
Una vez que esté satisfecho, puede guardar sus cambios gracias al botón "Guardar cambio" que le notificará el guardado que ha realizado; también puede salir de la cuenta gracias al botón "Cerrar sesión" y volver a la página Homepage.
También puede eliminar la cuenta y, de esta forma, se borrará el guardado completo del perfil.

### Recipe

Esta página muestra todas las recetas guardadas, que en este caso son 4. Para acceder a las distintas recetas hemos utilizado el componente `recipe.component.ts`y puede navegar hasta

- `http://localhost:4200/recipe?id=1`
- `http://localhost:4200/recipe?id=2`
- `http://localhost:4200/recipe?id=3`
- `http://localhost:4200/recipe?id=4`

En cada receta puedes encontrar las distintas informaciones y pasos a seguir, puedes guardar la receta en “Me gusta” y “Guardado” (esta receta se encontrará entonces en la zona correspondiente de tu perfil descrita anteriormente) y puedes compartir la receta a través de enlaces con los respectivos botones. En la parte inferior de la página habrá otras recetas recomendadas y, si hace clic en ellas, le llevarán a la receta correspondiente.


### Recipe-filter

Esta página se utiliza para la búsqueda filtrada a través del campo de búsqueda del header. Una vez que escriba el nombre de la receta que desea buscar, verá una lista con todas las recetas con ese nombre. Por ejemplo, puede navegar por este filtro `http://localhost:4200/recipes-filter?search=Pizza`
Para ver todas las recetas del filtro, puede buscar `http://localhost:4200/recipes-filter?filter=all`. 
Para hacer este filtro hemos utilizado el componente `recipes-filter.component.ts`

## Componentes

Además de los componentes ya descritos, también se utilizaron los siguientes:

- `footer.component.ts` cargado en cada página descrita anteriormente
- `header.component.ts` cargado en cada página descrita anteriormente
- `item.component.ts`
- `list-of-recipes.component.ts` utilizado para cargar una lista de recetas
- `recommendations.component.ts` utilizado para cargar una lista de recetas recomendatas abajo de las recetas
- `search.component.ts` utilizado para buscar recetas
- `search-results.component.ts` utilizado para visualizar lo que se buscaba
- `steps-of-recipes.component.ts` utilizado para cargar los pasos de las recetas

## Services

Los servicios se utilizaron para guardar las distintas recetas y cuentas registradas en Firestore.
El fichero utilizado es `firestore.service.ts`

## Enlaces Externos
### Enlace Figma
- [Figma - HomeCook](https://www.figma.com/design/2niUmMJ2UsHNdK5xQ7Ui7R/HomeCook?node-id=47-2&t=4zfBJrdXHoN6BGBq-0)

### Enlace Trello
- [Trello - HomeCook](https://trello.com/invite/b/67bdff70ee9396dc759b04ce/ATTIff2e3758e2fb3f6f6366d974223e7fca34632008/homecook)








