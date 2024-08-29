

//DONNEES
var mostCurrent
let ValueDisplayed;
var operators=['+','-','*','÷']
var resultat=0
const basicMessage='Faites un calcul !';
//ELEMENTS
const resultOperation=document.querySelector('#result');
const currentWrite=document.querySelector('#current_write');

resultOperation.innerText = resultat

const colorMode=document.querySelector('#color_mode');
const allBtn=document.querySelectorAll('button');
const numericBtn=document.querySelectorAll('.btn_numeric');
const operationBtn=document.querySelectorAll('.op');

const deleteBtn=document.querySelector('#suppr');
const clearBtn=document.querySelector('#eff');
const resultBtn=document.querySelector('#equal');
const cardHistory = document.querySelector('#history')

// EVENEMENTS
//Changer le mode de couleur
colorMode.addEventListener('click',()=>{
    changeColorMode();
    })

//Effacer le dernier nombre
deleteBtn.addEventListener('click',()=>{
    supprimerDernierNombre();
})
//Effacer tous les nombres
clearBtn.addEventListener('click',()=>{
    effacerConsole();
})

//Ajouter les nombres dans le calcul
numericBtn.forEach((e)=>{
    e.addEventListener('click',()=>{
        var txt=currentWrite.innerText;
        if(txt==basicMessage){
            txt='';
            currentWrite.classList.toggle('color_gray');
        }
        ValueDisplayed=txt +e.value;
        currentWrite.innerText= ValueDisplayed;
    })
})
//Ajouter les signes dans le calcul
operationBtn.forEach((e)=>{
    e.addEventListener('click',()=>{
    if(ValueDisplayed!=basicMessage || ValueDisplayed!=''){
        //temp.push(ValueDisplayed);
    }
    currentWrite.innerText= ValueDisplayed + e.innerText;
})})
//
resultBtn.addEventListener('click',()=>{
    if(voidError()) {
        console.log('valid')
        let calcul =currentWrite.innerText 
        resultat = compute(calcul)
        displayResult(resultat);
        chargerHistorique()
    }else{
        console.log('not valid')
    }
})





// FONCTIONS
function changeColorMode(){
    let wholePage=document.querySelector('html');
    wholePage.classList.toggle('light_mode');
    wholePage.classList.toggle('dark_mode');
    wholePage.classList.toggle('color_w');
    allBtn.forEach((e)=>{
        e.classList.toggle('color_w');
        e.classList.toggle('hoverdark');
    })
    if(colorMode.getAttribute('src')=='./img/night-mode-svgrepo-com (1).svg'){
        colorMode.setAttribute('src','./img/light-mode-svgrepo-com.svg');
    }else{
        colorMode.setAttribute('src','./img/night-mode-svgrepo-com (1).svg');
    }
}
function effacerConsole(){
    ValueDisplayed=basicMessage;
    currentWrite.innerText = ValueDisplayed;
    currentWrite.classList.toggle('color_gray');
}
function supprimerDernierNombre(){
    ValueDisplayed=ValueDisplayed.slice(0, -1);
    currentWrite.innerText = ValueDisplayed;
}

function chargerHistorique(){
    var item
    //cardHistory.innerText = 'ADD'
    console.log(mostCurrent)
    item = document.createElement('p');
    item.innerText = mostCurrent
    cardHistory.appendChild(item)
}

function calculer(calcul){
    let count=0
    let temp=''
    let lastOp
    ops=[,]
    let val=0
    for(var i=0; i < calcul.length; i++){
        // 8 + 8
        let c= calcul[i]
        if(i==0){
            console.log( 'charactère numero ',i+1, ' : ', c)
            temp+=c
        }else{
            if(i==calcul.length-1){
                console.log('FIN : val=', val,'lastOp=', lastOp, 'temp=', temp)
                val = calculPerOP(lastOp, val, Number.parseInt(temp,10))
                console.log(val)
            }
            console.log( 'charactère numero ',i+1, ' : ', c)
            if(c !='+' && c!='-' && c!='*' && c!='÷'){
                temp+=c
            }else{
                console.log('operateur')
                count+=1
                if(count==1){
                    val = Number.parseInt(temp+c, 10)
                    console.log( 'valeur de départ : ', val)
                }
                if(count==2){
                    console.log('operateur 2 ', c)
                    console.log('count!=1')
                    console.log(Number.parseInt(temp, 10))
                    val = calculPerOP(c,val, Number.parseInt(temp, 10))
                    console.log(val)
                    count=0
                }
                temp=''
                lastOp=c
                
            }
        }
    }
    console.log('resultat : ', val)
    return val;
}

function compute(calcul){
    let temp=''
    let tab=[]
    for(let i=0; i < calcul.length; i++){
        // 82 + 45 + 34
        let c = calcul[i]
            if(c !='+' && c!='-' && c!='*' && c!='÷'){
                temp+=c
            }else{
                tab.push(Number.parseInt(temp))
                tab.push(c)
                temp=''
            }
            if(i==calcul.length-1){
                
                tab.push(Number.parseInt(temp))
            }
        console.log('i : ', i)
        console.log(tab)
    }
    let operation=''
    let op
    let a
    let d
    for(let i=0; i < tab.length; i++){
        let b = tab[i]
        if(i==0){
            a = b
        }else{
            if(i%2==0 && i!=0){
                d = a
                console.log(a,op, b)
                a = calculPerOP(op, Number.parseInt(a), Number.parseInt(b))
                operation = d + op +b + " = "+a
                mostCurrent=operation
            }else{
                op = b
            }
        }
    }
    return a
}

function calculPerOP(op, val1, val2){
    switch(op){
        case '+':
            return val1 + val2
        case '-':
            return val1 - val2
        case '*':
            if(val1==0 || val2==0){
                return 0
            }
            let produit=val1
            for(let index=1; index<val2; index++){
                produit+=val1
            }
            return produit
            
        case '÷':
            return val1 / val2
    }
}

function displayResult(string){
    resultOperation.innerText = string;
}
function voidError(){
    let value = currentWrite.innerText
    if(value==basicMessage || value==''){
        console.log('Veuillez entrer un calcul')
        return false;
    }else{
        console.log('Le calcul est prêt à être effectué')
        return true;
    }
}
function inputError(){
    let last=''
    for(let c of ValueDisplayed){
        if(c==''){
            resultOperation.innerText = 'Impossible de calculer';
            return false;
        }
        if(c in operators){
            if(last in operators){
                resultOperation.innerText = 'Veuillez entrer un calcul correct';
                return false;
            }
        }
    }
}

changeColorMode()