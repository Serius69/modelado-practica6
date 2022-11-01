function cargarDatos(){
    document.getElementById('t01').innerHTML=`    
    <table class="table mb-0" id="t01">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col">NSIM</th>
                                                        <th scope="col">Ganancia neta (Bs)</th>
                                                        <th scope="col">Juegos que gana la casa(Juego)</th>
                                                        <th scope="col">Porcentaje victoria casa(%)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
            
    `;
     

    console.log('extraccion de variables');
    var x0 = document.getElementById("id-nmsimul").value; // numero maximo de simulaciones
    var x1 = document.getElementById("id-nmj").value; // numero maximo de juegos
    var x2 = document.getElementById("id-cjue").value; //Costo del Juego 
    var x3 = document.getElementById("id-gjug").value; //Ganancia del Jugador
    var nmsimul =parseInt(x0);//numero de simulaciones
    var nmj =parseInt(x1);//numero de juegos
    var cjue =parseFloat(x2);//Costo del Juego 1
    var gjug = parseFloat(x3);//Ganancia del Jugador
    var cj = 0;
    var cj2= 0;
    
    if(x0== "" || x1 =="" || x2 =="" || x3==""){
        alert("Por favor llene los campos");
        return;
    }
    if(nmsimul <= 0 || nmj <= 0 || cjue<= 0 || gjug<= 0){
        alert("Ningun valor puede ser negativo");
        return;
    }    
    // alert("comenzamos");
    while(cj2<nmsimul){
        carga(nmsimul,nmj, cjue, cj, cj2, gjug ,0 ,0 ,0);
        cj2++;      
    }
}

var totaljuegosganados = 0;
var totalganancianeta = 0;
var pgnetatotal = 0;
var sumaporcentajes = 0;

function carga(nmsimul,nmj, cjue, cj, cj2, gjug,gcasa,gneta,njcasa){
    console.log()
    if(cj==nmj){  
        // console.log('termina el ciclo del cj '+cj2);       
        // var totaljuegosganados=totaljuegosganados+njcasa;
        // var ganancianetatotal=ganancianetatotal+gneta;
        // carga2(totaljuegosganados,ganancianetatotal,nmsimul);
        // if(cj2==(nmsimul+1)){ 
        return;
        // }        
    }   
    
    //inicializacion de variables
    console.log('inicializacion de variables')
    var gneta = gneta;
    var cjue = cjue;
    var gcasa = gcasa;
    var njcasa = njcasa;
    var pjcasa = 0;
    var auxconj = 0;
    var sumd1d2 = 0;

    console.log('inicia el ciclo');
    cj=cj+1;               
    var rd1 = Math.random();
    var rd2 = Math.random();

    // Calculo de los lados de los dados
    var dado1 = Math.round((1+(5)*rd1));
    var dado2 = Math.round((1+(5)*rd2));

    console.log('sumatoria dados '+sumd1d2);        
    sumd1d2=dado1+dado2;

    if(auxconj==1){
        console.log('inicia el ciclo interno'); 
        if(sumd1d2==7){  
            auxconj=0;
        }else{
            if(sumd1d2==auxsumda){
                auxconj=0;
                njcasa=njcasa+1;
            }else{
                return;
            }
        }
    }else{
        if(sumd1d2==7){
            njcasa=njcasa+1;       
        }
    }    
    
    if(cj==(nmj)){                  
        console.log('cargar fila'+cj);
                 
        pjcasa=(1-(njcasa/nmj))*100;
        var juegosganados=nmj-njcasa;
        gneta=(juegosganados*cjue)-njcasa*gjug;

        totaljuegosganados=totaljuegosganados+juegosganados;
        totalganancianeta = totalganancianeta + gneta;
        sumaporcentajes = sumaporcentajes+pjcasa;
        
        // ganancianetatotal=ganancianetatotal+gneta;
        if(cj2!=(nmsimul)){
            cj2++;
            var fila = `
            <tr>
                <td>${cj2}</td>
                <td>${gneta}</td>
                <td>${juegosganados}</td>
                <td>${pjcasa.toFixed(2)}</td>
            </tr>`;
            document.getElementById('t01').innerHTML+=fila;
        }
        if(cj2==(nmsimul-1)){
            pgnetatotal = sumaporcentajes/nmsimul; 

            var objetivo = document.getElementById('texto_nav1');
            var objetivo2 = document.getElementById('texto_nav2');
            var objetivo3 = document.getElementById('texto_nav3');

            objetivo.innerHTML = totalganancianeta;
            objetivo2.innerHTML = totaljuegosganados;
            objetivo3.innerHTML = pgnetatotal.toFixed(2);


            // var fila2 = `
            // <tr>
            //     <td>prueba</td>
            //     <td>${totaljuegosganados}</td>
            //     <td>${pgnetatotal}</td>
            // </tr>`;
            // console.log(fila2);
            // document.getElementById('t02').innerHTML2+=fila2;
        }
        carga(nmsimul,nmj, cjue, cj, cj2, gjug,gcasa,gneta,njcasa);           
    }

    
    carga(nmsimul,nmj, cjue, cj, cj2, gjug,gcasa,gneta,njcasa);

       
}