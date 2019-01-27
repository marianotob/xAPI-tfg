
/*Funcion para iniciar sesion y guardar los datos del usuario con sessionStorage */
//------------------------------------------------------------------------------------------------------------------//
function hacerLogin(frm){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost/practica2/rest/login/',
        fd = new FormData(frm);

    xhr.open('POST',url,true);

    xhr.onload= function(){
        console.log(xhr.responseText);
        let datos_usuario= JSON.parse(xhr.responseText);
        let opcion= 'notOk';
        if(datos_usuario.RESULTADO=='ok'){
            //esta linea es del profesor para mostrar la salida--->sessionStorage['datos_usuario']= xhr.responseText;
            
            //guardo los datos del usuario
            sessionStorage.setItem("login",datos_usuario.login);//carpeta post (login.php)
            sessionStorage.setItem("clave", datos_usuario.clave);
            sessionStorage.setItem("nombre", datos_usuario.nombre);
            sessionStorage.setItem("email", datos_usuario.email);

            var respuesta="Bienvenido " + datos_usuario.login + ". La última conexión fue " + datos_usuario.ultimo_acceso;
            opcion= 'ok';

        }else{
           var respuesta="Datos Incorrectos";
        }
        mostrarMensaje(respuesta,opcion);  
    };

    xhr.send(fd);
    return false;
}

function mostrarMensaje(texto,caso){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        html='';

    capa_fondo.appendChild(capa_frente);

    html += '<h2> Mensaje Emergente </h2>';
    html += '<p>'+ texto +'</p>';
    if(caso=='ok'){
     html += '<a href="index.html" onclick="this.parentNode.parentNode.remove()"> <span class="icon-home"></span>Inicio</a>';
    }
    else{
     html += '<a onclick="this.parentNode.parentNode.remove()">Cerrar</a>';
    }
    capa_frente.innerHTML =html;

    capa_fondo.classList.add('capa_fondo');
    capa_frente.classList.add('capa_frente');

    document.body.appendChild(capa_fondo);
}

// LOGOUT para cerrar sesión
function HacerLogOut(){
    window.sessionStorage.clear();
    location.replace("index.html");
}

//------------------------------------------------------------------------------------------------------------------//

/* Diferentes MENU (logueados o no) */
//------------------------------------------------------------------------------------------------------------------//
function comprobarUsuario(){
    if(window.sessionStorage){
        var BarraMenu ='<li><label for="ckb-menu">&equiv;</label></li>';
            BarraMenu +='<li><a href="index.html"><span class="icon-home"></span>Inicio</a></li>';
            BarraMenu +='<li><a href="buscar.html"><span class="icon-search"></span>Buscar</a></li>';

        if (sessionStorage.getItem("login")) {
            BarraMenu +='<li><a href="nueva-entrada.html"><span class="icon-plus"></span>Nueva </a></li>';
            BarraMenu +='<li><a href="#" onclick="HacerLogOut()";><span class="icon-logout"></span>Logout</a></li>';
            
        }else{

        BarraMenu += '<li><a href="login.html"><span class="icon-login"></span>Login</a></li>';
        BarraMenu += '<li><a href="registro.html"><span class="icon-user-plus"></span>Registro</a></li>';
            
        }
    }
    document.getElementById('menuprincipal').innerHTML=BarraMenu;           
}


function denegarAcceso(){
    if(sessionStorage.getItem("login")==null){
        location.replace("index.html");
    }
}
function denegarAcceso2(){
    if(sessionStorage.getItem("login")!=null){
        location.replace("index.html");
    }
}


//------------------------------------------------------------------------------------------------------------------//

//Apartado del index
//------------------------------------------------------------------------------------------------------------------//
function mostrarEntradas(pagina){
    let xhr = new XMLHttpRequest();
        url = 'http://localhost/practica2/rest/entrada/',
        section = document.querySelector('section:nth-of-type(1)');

    pagina = parseInt(pagina);
    let numero_final = parseInt(6);

    url += '?' +'pag=' + pagina + '&lpag=' + numero_final;
    console.log(url);
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            while( fc = section.querySelector('section>div>article') ){
                fc.remove();
            }
            
            let plantilla = section.querySelector('div>template');
           
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                let elem = plantilla.content.cloneNode(true);
                elem.querySelector('h3>a').href ='entrada.html?id'+e.id;
                elem.querySelector('h3>a').innerHTML = e.nombre;
                elem.querySelector('figure>img').src = foto;
                elem.querySelector('figure>img').alt = e.descripcion_foto;
                elem.querySelector('figure>figcaption').innerHTML += e.descripcion;
                elem.querySelector('figure>figcaption>footer>a').href = 'entrada.html?id'+e.id;;
                elem.querySelector('figure>figcaption>footer>a').innerHTML = 'Leer más';
                elem.querySelector('time:first-of-type').setAttribute('datetime', e.fecha);
                elem.querySelector('time:first-of-type').innerHTML = e.fecha;
                elem.querySelector('div>p:first-of-type').innerHTML = e.login;
                elem.querySelector('div>p:nth-of-type(2)').innerHTML += e.ncomentarios;
                elem.querySelector('div>p:nth-of-type(3)').innerHTML += e.nfotos;
                    
                section.querySelector('h2+div').appendChild(elem);

            }
            //let  total = Math.ceil(cont/6);
            //let  total = Math.floor(cont/6);
            totalPagina();


        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}

function totalPagina(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);

        if(v.RESULTADO == 'ok'){

        let npaginas = Math.floor(v.FILAS.length/6);
        npaginas=parseInt(npaginas);
        if((v.FILAS.length/6)%1==0){
            npaginas= npaginas-1;
        }
        document.querySelector('section:first-of-type>footer>p:nth-of-type(3)').textContent=npaginas;
        }else{
            alert('ERROR');
        }
    }
    xhr.send();
}  



function paginaActual(){
    let pag = document.querySelector('section:first-of-type>footer>p');
    let toNum =parseInt(pag.textContent.trim());
    return toNum;
}

function maximaPagina(){
    let max = document.querySelector('section:first-of-type>footer>p:nth-of-type(3)');
    let toNum = parseInt(max.textContent.trim());
    return toNum;
}



function actualizarPagina(num){
    document.querySelector('section:first-of-type>footer>p').textContent = num;
}

function pasarPagina(cambiar_pagina){

    let actual = paginaActual();
    let maxima = maximaPagina();
        switch(cambiar_pagina) {
        case '+':
        if(actual+1<=maxima){
            actual++;
        }
            break;
        case '-':
            if(actual-1>=0){
                actual--;
            }
            break;
        case '++':
            actual = maximaPagina();
            break;
        case '--':
            actual = 0;
            break;
        }
    
    actualizarPagina(actual);
    mostrarEntradas(actual);
}


//funcion que muestra los ultimos comentarios
function mostrarUltimosComentarios(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/comentario/?u=10';
    let section = document.querySelector('section:nth-of-type(2)');
 
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            
            while( fc = section.querySelector('section>article') ){
                fc.remove();
            }
            
            let plantilla = section.querySelector('template');
            
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                
                let elem = plantilla.content.cloneNode(true);
                
                elem.querySelector('h3').innerHTML = e.nombre_entrada ;
                elem.querySelector('article>div>h4>span').innerHTML = e.titulo;
                elem.querySelector('div>div>p:first-of-type').innerHTML = e.login+':';
                elem.querySelector('div>div>p:nth-of-type(2)').innerHTML = e.texto;
                elem.querySelector('a').innerHTML = 'Leer más';
                elem.querySelector('a').setAttribute('href','entrada.html?id'+e.id_entrada+"#"+e.id);
                elem.querySelector('time').innerHTML = e.fecha;  
                section.appendChild(elem);
            }

        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}

//------------------------------------------------------------------------------------------------------------------//


function hacerBusqueda(pagina){

    let xhr = new XMLHttpRequest();
        url = 'http://localhost/practica2/rest/entrada/',
        section = document.querySelector('section:nth-of-type(2)');

     pagina = parseInt(pagina);
    let numero_final = parseInt(6);
    url += '?' +'pag=' + pagina + '&lpag=' + numero_final;

    let v_titulo=document.getElementById('titulo').value;
    url += '&n=' + v_titulo;
    let v_autor=document.getElementById('nombre').value;
    url += '&l=' +v_autor;
    let v_descripcion=document.getElementById('descripcion').value;
    url += '&d=' +v_descripcion;

    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        let partesI1=document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(1)').value;
        let partesI2=document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(2)').value;
        let partesI3=document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(3)').value;
        if(partesI1!='no' && partesI2!='no' && partesI3!='no'){
            let v_fecIni=partesI3+'-'+partesI2+'-'+partesI1;
            url += '&fi=' +v_fecIni;
        }

        let partesF1=document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(1)').value;
        let partesF2=document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(2)').value;
        let partesF3=document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(3)').value;
        if(partesF1!='no' && partesF2!='no' && partesF3!='no'){
            let v_fecFin=partesF3+'-'+partesF2+'-'+partesF1;
            url += '&ff=' +v_fecFin;
        }

    }else{
        let v_fecIni=document.getElementById('fecha_i').value;
        url += '&fi=' +v_fecIni;
        let v_fecFin=document.getElementById('fecha_f').value;
        url += '&ff=' +v_fecFin;
        console.log(v_fecIni);
    }
    console.log(url);



    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            while( fc = section.querySelector('section>div>article') ){
                fc.remove();
            }
            let plantilla = section.querySelector('div>template'); 
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                
                let elem = plantilla.content.cloneNode(true);
                
                elem.querySelector('h3>a').innerHTML = e.nombre;
                elem.querySelector('figure>img').src = foto;
                elem.querySelector('figure>img').alt = e.descripcion_foto;
                elem.querySelector('figure>figcaption').innerHTML += e.descripcion;
                elem.querySelector('figure>figcaption>footer>a').innerHTML = 'Leer más';
                elem.querySelector('time:first-of-type').setAttribute('datetime', e.fecha);
                elem.querySelector('time:first-of-type').innerHTML = e.fecha;
                elem.querySelector('div>p:first-of-type').innerHTML = e.login;
                elem.querySelector('div>p:nth-of-type(2)').innerHTML += e.ncomentarios;
                elem.querySelector('div>p:nth-of-type(3)').innerHTML += e.nfotos;
    
                section.querySelector('h2+div').appendChild(elem);
            }
            totalPaginaBuscador(url);

        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;//si pongo true recarga la pagina
}


function paginaActualBuscador(){
    let pag = document.querySelector('section:nth-of-type(2)>footer>p');
    let toNum =parseInt(pag.textContent.trim());
    return toNum;
}

function maximaPaginaBuscador(){
    let max = document.querySelector('section:nth-of-type(2)>footer>p:nth-of-type(3)');
    let toNum = parseInt(max.textContent.trim());
    return toNum;
}

function actualizarPaginaBuscador(num){
    document.querySelector('section:nth-of-type(2)>footer>p').textContent = num;
}


function totalPaginaBuscador(enlace){
    let xhr = new XMLHttpRequest();
    let url = enlace;
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);

        if(v.RESULTADO == 'ok'){

        let npaginas = Math.floor(v.FILAS.length/6);
        npaginas=parseInt(npaginas);
        if((v.FILAS.length/6)%1==0){
            npaginas= npaginas-1;
        }
        document.querySelector('section:nth-of-type(2)>footer>p:nth-of-type(3)').textContent=npaginas;
        }else{
            alert('ERROR');
        }
    }
    xhr.send();
} 

function pasarPaginaBuscador(cambiar_pagina){

    let actual = paginaActualBuscador();
    let maxima = maximaPaginaBuscador();
        switch(cambiar_pagina) {
        case '+':
        if(actual+1<=maxima){
            actual++;
        }
            break;
        case '-':
            if(actual-1>=0){
                actual--;
            }
            break;
        case '++':
            actual = maximaPaginaBuscador();
            break;
        case '--':
            actual = 0;
            break;
        }
    console.log(actual);
    actualizarPaginaBuscador(actual);
    hacerBusqueda(actual);
}

function reconocerNavegador(){
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){

        document.querySelector('section>form>fieldset').innerHTML+='<div></div>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<label for="fecha_i">Desde </label>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<select></select>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<select></select>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<select></select>';

        document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(1)').innerHTML+='<option value="no">dd</option>';  
        for(i=1;i<32;i++){
            if(i<10){
                document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(1)').innerHTML+='<option value="0'+i+'">'+i+'</option>'; 
            }else{
           document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(1)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
            }
        }
        document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(2)').innerHTML+='<option value="no">mm</option>'; 
        for(i=1;i<13;i++){   
            if(i<10){
                document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(2)').innerHTML+='<option value="0'+i+'">'+i+'</option>'; 
            }else{
           document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(2)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
            }
        }
        document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(3)').innerHTML+='<option value="no">aaaa</option>';
        for(i=2010;i<2018;i++){
           document.querySelector('section>form>fieldset>div:nth-of-type(4)>select:nth-of-type(3)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
        }

        document.querySelector('section>form>fieldset').innerHTML+='<div></div>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<label for="fecha_f">hasta</label>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<select></select>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<select></select>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<select></select>';

        document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(1)').innerHTML+='<option value="no">dd</option>'; 
        for(i=1;i<32;i++){
            if(i<10){
                document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(1)').innerHTML+='<option value="0'+i+'">'+i+'</option>'; 
            }else{
           document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(1)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
            }
        }

        document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(2)').innerHTML+='<option value="no">mm</option>'; 
        for(i=0;i<13;i++){
            if(i<10){
                document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(2)').innerHTML+='<option value="0'+i+'">'+i+'</option>'; 
            }else{
           document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(2)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
            }
        }

        document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(3)').innerHTML+='<option value="no">aaaa</option>'; 
        for(i=2010;i<2018;i++){
           document.querySelector('section>form>fieldset>div:nth-of-type(5)>select:nth-of-type(3)').innerHTML+='<option value="'+i+'">'+i+'</option>'; 
        }

        document.querySelector('section>form>fieldset').innerHTML+='<input class="aceptar_formulario" type="submit" value="Buscar">';
     
    }else{

        document.querySelector('section>form>fieldset').innerHTML+='<div>';
        document.querySelector('section>form>fieldset').innerHTML+='</div>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<label for="fecha_i">Desde </label>';
        document.querySelector('section>form>fieldset>div:nth-of-type(4)').innerHTML+='<input type="date" name="fecha_i" id="fecha_i">';
        
        document.querySelector('section>form>fieldset').innerHTML+='<div>';
        document.querySelector('section>form>fieldset').innerHTML+='</div>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<label for="fecha_f">hasta</label>';
        document.querySelector('section>form>fieldset>div:nth-of-type(5)').innerHTML+='<input type="date" name="fecha_f" id="fecha_f">';
        
        document.querySelector('section>form>fieldset').innerHTML+='<input class="aceptar_formulario" type="submit" value="Buscar">'; 
                           
    }
}



//----------------------------------------------------------------------------------


function verEntradaCompleta(){
    
    let idEntrada= location.search.replace('?id','').split('=')[0];
            if(idEntrada<0 || idEntrada==''){
                location.replace("index.html");
            }

    let xhr = new XMLHttpRequest();
        url = 'http://localhost/practica2/rest/entrada/'+idEntrada,
        section = document.querySelector('section:first-of-type');

    let guardar = document.querySelector('section>article:first-of-type');

    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            
            let plantilla = document.querySelector('template:first-of-type'); 
            if(v.FILAS.length==0){
                location.replace("index.html");
            }
     
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let elem = plantilla.content.cloneNode(true);

                elem.querySelector('h3').innerHTML =e.nombre;
                elem.querySelector('p:first-of-type').innerHTML =e.descripcion;
                elem.querySelector('p:nth-of-type(2)').innerHTML = e.login;
                elem.querySelector('a:first-of-type').innerHTML += e.nfotos;
                elem.querySelector('a:nth-of-type(2)').innerHTML += e.ncomentarios;

                guardar.appendChild(elem);
            }

        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}


function verFotosEntrada(){

    let idEntrada= location.search.replace('?id','').split('=')[0];
            if(idEntrada<0){
                location.replace("index.html");
            }

    let xhr = new XMLHttpRequest();
        url = 'http://localhost/practica2/rest/foto/?id_entrada='+idEntrada,
        section = document.querySelector('section:nth-of-type(1)>div');


    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            let plantilla = section.querySelector('template:nth-of-type(1)');           
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                let elem = plantilla.content.cloneNode(true);

                elem.querySelector('article>h3').innerHTML =e.id;
                elem.querySelector('article>figure>img').src =foto;
                elem.querySelector('article>figure>figcaption').innerHTML =e.texto;
                section.appendChild(elem);
            }

        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}


function mostrarComentariosID(){
    let idEntrada= location.search.replace('?id','').split('=')[0];
            if(idEntrada<0){
                location.replace("index.html");
            }

    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/comentario/?id_entrada='+idEntrada;
    let section = document.querySelector('section:nth-of-type(2)');
 
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
   
            let plantilla = section.querySelector('template');
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                
                let elem = plantilla.content.cloneNode(true);
                elem.querySelector('article').setAttribute('id','c'+ e.id);
                elem.querySelector('article>div>h4>span').innerHTML = e.titulo;
                elem.querySelector('div>div>p:first-of-type').innerHTML = e.login+':';
                elem.querySelector('div>div>p:nth-of-type(2)').innerHTML = e.texto;
                elem.querySelector('a').innerHTML = 'Responder';
                elem.querySelector('a').setAttribute('onclick','responderComentario(this);');
                
                if (!sessionStorage.getItem("login")) {
                  elem.querySelector('a').style.display += 'none'; 
                }
                elem.querySelector('time').innerHTML = e.fecha;  
                section.appendChild(elem);
            }
            let idComent= location.hash.replace('#','');
            location.hash= 'c'+idComent;

        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}



//Todo lo del registro (validar campos hasta ser registrado)

//------------------------------------------------------------------------------------------------------------------//
function validaPassword(){

    let pass1 = document.getElementById("pwd").value;
    let pass2 = document.getElementById("pwd2").value;
    if(pass1 != pass2){
        document.getElementById("pwd").style.border="solid red";
        document.getElementById("pwd2").style.border="solid red";
        document.getElementById("aceptar").disabled=true;

        let tipo = document.createElement("p");
        let node = document.createTextNode("Las contraseñas no coinciden");
        tipo.appendChild(node);
        let element = document.querySelector('section>form>fieldset>div:nth-of-type(3)');
        element.appendChild(tipo);
    }else{
        document.getElementById("pwd").style.border="solid green";
        document.getElementById("pwd2").style.border="solid green";
        document.getElementById("aceptar").disabled=false;
        let elem = document.querySelector('section>form>fieldset>div:nth-of-type(3)>p');
            if(elem != null){
                elem.remove();
            }
    }
}



function validaUsuario(){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost/practica2/rest/login/' +document.getElementById("login").value;
    xhr.open('GET',url,true);
    xhr.onload= function(){
        console.log(xhr.responseText);
        let datos_usuario= JSON.parse(xhr.responseText);
        if(datos_usuario.DISPONIBLE=='false'){
            document.getElementById("login").style.border="solid red";
            document.getElementById("aceptar").disabled=true;

            let tipo = document.createElement("p");
            let node = document.createTextNode("El usuario ya existe");
            tipo.appendChild(node);
            let element = document.querySelector('section>form>fieldset>div:nth-of-type(1)');
            element.appendChild(tipo);

        }else{
            document.getElementById("login").style.border="solid green";
            document.getElementById("aceptar").disabled=false;
            let elem = document.querySelector('section>form>fieldset>div:nth-of-type(1)>p');
            if(elem != null){
                elem.remove();
            }
        }
    };
    xhr.send();
    return false;
}

function hacerRegistro(frm){
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost/practica2/rest/usuario/',
        fd = new FormData(frm);

    xhr.open("POST",url,true);
    
    xhr.send(fd);
    mostrarMensaje2();
    return false;
}


function mostrarMensaje2(){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        html='';

    capa_fondo.appendChild(capa_frente);
    html += '<h2> Bienvenido </h2>';
    html += '<p>'+ 'Te has registrado correctamente' +'</p>';
    html += '<a href="login.html" onclick="this.parentNode.parentNode.remove()"> <span class="icon-login"></span>Login</a>';

    capa_frente.innerHTML =html;
    capa_fondo.classList.add('capa_fondo');
    capa_frente.classList.add('capa_frente');
    document.body.appendChild(capa_fondo);
}

//------------------------------------------------------------------------------------------------------------------//


//comentarios para las entradas respuestas y nuevas
//------------------------------------------------------------------------------------------------------------------//



function comprobarPoderComentar(){
    if(window.sessionStorage){
        if (sessionStorage.getItem("login")) {
            FormularioComentar ='';
            FormularioComentar +=' <h2>Hacer Comentario</h2>';         
            FormularioComentar +='<form onsubmit="return escribirComentario(this);"><fieldset>';
            FormularioComentar +='<a id="contestar"><h3 >Escribe un comentario</h3></a>';
            FormularioComentar +='<div>'+'<label for="titulo">Título </label>';
            FormularioComentar +='<input type="text" name="titulo" id="titulo" maxlength="50" required>';
            FormularioComentar +='</div>';
            FormularioComentar +='<div>';
            FormularioComentar +='<textarea rows="2" cols="36" name="texto" id="texto" placeholder="Escribe aquí tu comentario" required></textarea>';
            FormularioComentar +='</div>';
            FormularioComentar +='<input type="submit" name="aceptar" value="Comentar">';
            FormularioComentar +='</fieldset></form>';
            
        }else{
            FormularioComentar ='';
            FormularioComentar ='<h2>Para dejar un comentario debes estar logueado<a href="login.html"><span class="icon-login"></span>Login</a></h2>';  
        }
    }
    document.querySelector('section:nth-of-type(3)').innerHTML= FormularioComentar;          
}


function escribirComentario(frm){
    let idEntrada= location.search.replace('?id','').split('=')[0];
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost/practica2/rest/comentario/',
        fd = new FormData(frm);


    fd.append('login', sessionStorage.getItem('login'));
    fd.append('titulo', document.getElementById('titulo').value);
    fd.append('texto', document.getElementById('texto').value);
    fd.append('id_entrada', idEntrada);
    
    xhr.open("POST",url,true);
    xhr.onload = function () {
        actualizarComentarios();
        mostrarMensaje3('Comentario realizado');
    }
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('clave'));
    xhr.send(fd);

    return false;
}

function mostrarMensaje3(texto){
    let capa_fondo = document.createElement('div'),
        capa_frente = document.createElement('article'),
        html='';

    capa_fondo.appendChild(capa_frente);

    html += '<h2> Mensaje Emergente </h2>';
    html += '<p>'+ texto +'</p>';
    html += '<a onclick="this.parentNode.parentNode.remove()">Cerrar</a>';
  
    capa_frente.innerHTML =html;

    capa_fondo.classList.add('capa_fondo2');
    capa_frente.classList.add('capa_frente');

    document.body.appendChild(capa_fondo);
}


//no lo uso y recargo directamente la web (esto habria que mirarlo un poco mas)
function actualizarComentarios(){

    let section = document.querySelector('section:nth-of-type(2)');  
    while( fc = section.querySelector('section>article') ){
        fc.remove();
    }
    document.getElementById("titulo").value="";
    document.getElementById("texto").value="";

    mostrarComentariosID();

}



function responderComentario(enl){

    let div = enl.parentNode;
    let titulo = div.querySelector('h4>span').innerHTML;
    
    document.getElementById("titulo").value= 'Re: '+ titulo;
    document.getElementById("texto").focus();
}

// subir nueva entrada
//-----------------------------------------------------------------------------------------------------

function mostrarFoto(btn){
    let input = btn.parentNode.querySelector('[type="file"]');
    let fr = new FileReader();
    
    fr.onload = function(){
        let img = btn.parentNode.querySelector('img');
        img.src = fr.result;
        img.alt = input.files[0].name;
    };
    
    fr.readAsDataURL(input.files[0]);

    let tamanyo = compruebaFotoSelect(input);
    if(tamanyo == false){
        input.style.backgroundColor = 'red';

        let tipo = document.createElement("p");
        let node = document.createTextNode("El archivo debe ser menor de 500k");
        tipo.appendChild(node);
        let element = btn.parentNode;
        element.appendChild(tipo);
        btn.parentNode.querySelector('p').style.color = 'red';
    }else{
        input.style.backgroundColor = 'green';
        if(btn.parentNode.querySelector('p') != null){
            btn.parentNode.querySelector('p').remove();
        }
    }
}  

function agregaFoto(){
    let template = document.querySelector('template');
    let div = template.parentNode;
    
    let elem = template.content.cloneNode(true);
    div.appendChild(elem);
} 

function eliminarFoto(btn){
    let div = btn.parentNode.remove();
} 


function nuevaEntrada(event) {

    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    let form = new FormData();

    form.append('login', sessionStorage.getItem('login'));
    form.append('nombre', document.getElementById('Titulo').value);
    form.append('descripcion', document.getElementById('descripcion').value);

    if(compruebaFotos()){
        xhr.open('POST', url, true);

        xhr.onload = function(){
            console.log(xhr.responseText);
            let v = JSON.parse(xhr.responseText);
            subirFoto(v.id, event);

            let respuesta="Nueva entrada subida correctamente ";
            mostrarMensaje(respuesta,'ok'); 
            
        }

        xhr.setRequestHeader('Authorization', sessionStorage.getItem('clave'));
        xhr.send(form);

    }
    else{
        let respuesta="Alguno de los campos no ha sido rellenado correctamente";
        mostrarMensaje(respuesta,'no'); 
    }
    return false;
}

function compruebaFotos(){
    let foto = document.querySelectorAll('[type=file]');
    
    for (let i = 0; i < foto.length; i++) {
        if(foto[i].files[0].size > 500000)
            return false;
    }
    
    return true;
}

function compruebaFotoSelect(enl){    
        if(enl.files[0].size > 500000)
            return false;
        else
            return true;
}

function subirFoto(id, event) {
    event.preventDefault();

    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/foto/';

    let form = new FormData();
    let foto = document.querySelectorAll('[type=file]')

    for (let i = 0; i < foto.length; i++) {
        let div = foto[i].parentNode.parentNode;
        console.log(div);
        form.append('login', sessionStorage.getItem('login'));
        form.append('id_entrada', id);
        form.append('texto', div.querySelector('textarea').value + '' + i);
        form.append('foto', div.querySelector('[type=file]').files[0]);

        xhr.open('POST', url, true);
        
        xhr.onload = function () {
            console.log(xhr.responseText);
        }
        xhr.setRequestHeader('Authorization', sessionStorage.getItem('clave'));
        xhr.send(form);
        form = new FormData();
        xhr = new XMLHttpRequest();
    }

}            
                        
                        
                    
                    
                    
                   
                     
                    

