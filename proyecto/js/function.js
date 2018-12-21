var myUser;


//generación de usuarios
function random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
};
 
function token() {
    return random() + random(); // Para hacer el token más largo
};

function newUser(){
    let ram= random();
    let myToken= token();
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:3000/api/user/';

    var params = "idUser="+myToken; 
    xhr.open("POST",url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(params);
    myUser=myToken;
    return false;
}   
 




//funciones al servidor

function allvideos(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/videos/';
    let section = document.querySelector('section>article:first-of-type');
    let guardar = document.querySelector('section>article:first-of-type');
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
            //console.log(v);
            //console.log(v.length);
            let plantilla = section.querySelector('template:first-of-type');
            //for(let i=0; i < v.length ; i++){
                let e = v[0];
                let elem = plantilla.content.cloneNode(true);
                elem.querySelector('h3').innerHTML = e.idVideo;
                guardar.appendChild(elem);
            //}
    }
    xhr.send();
}  

//visualizaciones

function newVisualise(id){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:3000/api/visualise/';

    var params = "VIDEO_idVideo="+id+"&USER_idUser="+myUser; 
/*     var params = "velocidad="+vel+"&tiempoVisto="+tv+"&VIDEO_idVideo="+id;  */
console.log(params);
    xhr.open("POST",url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(params);
    return false;
}   


function ModificarVisualizado(tv){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:3000/api/visualizado/32';
        var params = "tiempoVisto="+tv; 

    xhr.open("PUT",url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(params);
    return false;
}   


/* function guardarVisualizado(id,vel,tv){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:3000/api/visualizado/';

    var params = "velocidad="+vel+"&tiempoVisto="+tv+"&VIDEO_idVideo="+id; 

    xhr.open("POST",url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    console.log('datos:'+params);
    xhr.send(params);
    return false;
}   */