/* 
Instrucciones para el creacion del juego "Adivina el Numero"

1. Generar un numero aleatorio.

2. Guardar el numero del intento en el que el jugador se encuentro empezando por el 1.

3. Darle al jugador una forma de adivinar el numero.

4. Una vez que se ha introducido el numero, guardarlo en alguna parte para que el jugador pueda ver sus intentos.

5. Comprobar si el numero es correcto.

6. Si el numero es correcto:

    - Mostrar un mensaje de felicitacion
    - Hacer que el jugador no pueda introducir mas numeros/intentos. 
    - Mostrar un control que permita que el jugador vuelva a empezar el juego.

7. Si el numero es incorrecto y al jugador le quedan intentos:

    - Decirle al jugador que ha fallado
    - Dejar que el jugador lo intente de nuevo
    - Incrementar el numero de intentos en 1

8. Si el numero es incorrecto y no quedan intentos:

    - Decirle al jugador que ha terminado (GAMEOVER)
    - Hacer que el jugador no pueda introducir mas intentos 
    - Mostrar un control que permita al jugador empezar de nuevo.

9. Una vez que el juego se reinicia, aseguerase de que la logica del juego y la interface de  usuario (UI) se restablecen por completo para volver al paso 1.

*/

// Generamos el numero aleatorio a adivinar
let randomNumber = Math.floor(Math.random() * 100 ) + 1;

// Guardamos las referencias de cada parafo
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

// Guardamos las referencias al input y boton de enviar

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

// Variable para los intentos
let guessCount = 1;
// Variable para guardar y crear el boton de reset
let resetButton;
// Damos el foco al input 
guessField.focus();

// Funcion para comprobar el numero a adivinar
function checkGuess(){
    // Guardar el numero ingresado en el input 
    // Nos aseguramos que se un Number
    let userGuess = Number(guessField.value);

    // Comprobamos si estamos en el primer intento 
    if (guessCount === 1){
        guesses.textContent = "Intentos anteriores";
    }
    guesses.textContent += userGuess + " ";

    // Bloque de comprobacion del numero a afivinar 
    // Pasos del 5 al 8 
    // Condicion cuando acertamos
    if (userGuess === randomNumber ){
        lastResult.textContent = "Felicidades has acertado!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent= "";
        setGameOver();
    }else if (guessCount === 10){
        // Condicion cuando no quedan intentos
        lastResult.textContent = "GAME OVER";
        setGameOver();
    }else {
        // Condicion cuando quedan intentos, entonces comprobamos si es mayor o menor el numero introducido con respecto al numero a adiuvinar
        lastResult.textContent = "Incorrecto!";
        lastResult.style.backgroundColor = "red";

        if (userGuess < randomNumber){
            lowOrHi.textContent = "El numero es muy bajo";
        } else if(userGuess > randomNumber){
            lowOrHi.textContent = "El numero ea muy alto";
        }
    }

    // Preparamos las variables para el siguiente intento
    guessCount++;
    // Borramos el valor del campo numerico
    guessField.value = "";
    // Aplicamos nuevamente el foco
    guessField.focus();
}

// A gregamos un listenar al boton guessSubmit
guessSubmit.addEventListener("click", checkGuess);

// funcion gameover
function setGameOver(){
    guessField.disabled = true; // Deshabilita el input
    guessSubmit.disabled = true; // Deshabilita el boton enviar

    // Cremos e; boton reset para resetear el juego
    resetButton = document.createElement("button");
    resetButton.className = "restButton";
    resetButton.textContent = "Reinciar el juego";
    // Colocamos el boton dentro de contenedor padre, en este caso el body
    document.body.append(resetButton);

    // Creamos el listener del boton creado
    resetButton.addEventListener("click", resetGame);

}

// Creamos la funcion resetGame que reseteara el juego para volver a empezar. 
function resetGame(){
    guessCount = 1;

    // Resetamos los parrafos 
    const resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParas.length; i++){
        resetParas[i],textContent = "";
        resetParas[i].style.backgroundColor = "black";
    }

    // Eliminamos d=el boton reset
    resetButton.parentNode.removeChild(resetButton);

    // Reactivamos el input y el submit
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    // Cambiamos el background de lastresult para que no se va
    lastResult.style.backgroundColor = "black";

    // Generamos un nuevo numero aleatorio
    randomNumber = Math.floor(Math.random() * 100) + 1;
}