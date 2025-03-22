let panier = [];

function ajouterPanier(prdId) {
    let section_Prd = document.getElementById(prdId);
    console.log(section_Prd)
    let prix = section_Prd.querySelector(".prix").textContent;
    let title = section_Prd.querySelector("h2").textContent;
    let img = section_Prd.querySelector("img").getAttribute("src");
    let prdexist = null;

    for (let produit of panier) {
        if (produit.id === prdId) {
            prdexist = produit;
        }
    }
    console.log(prdexist);

    // cpt++   
    if (prdexist) {
        prdexist.qtt += 1;
        console.log("qtt " +prdexist);

    } else {
    // ajouter nouveaux produit
    panier.push({ id: prdId, title: title, prix: prix, img: img, qtt: 1 });
    console.log("ajt " +prdexist);

    }

    alert("Ce produit a été ajouté à votre panier ");
    section_Prd.querySelector('.btn_add').style.display = 'none';
    section_Prd.querySelector('.plus_remove').style.display = 'block';


    afficherPanier();
    prixTotal();
    qtyTotal();

}

function afficherPanier() {
    let panier_prd = document.getElementById("form_panier");
    if (panier.length === 0) {
        panier_prd.innerHTML = "<p>Votre panier est vide !</p>";
    }

    panier_prd.innerHTML = `<div id="header_panier"><h2 class="titre_panier">Paneir </h2> 
                            <button id="Sup_Prd" onclick="viderPanier()">Supprimer</button>
                            </div>
                            <hr class="hr_panier">
                            <div id="prix_total"> </div>`;

    for (let prd of panier) {
        //la creation des balises et leurs class 
        let productDiv = document.createElement("div");
        productDiv.classList.add("flixe_panier");

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("partInfo_prd");

        infoDiv.innerHTML = `
            <span>${prd.title}</span>
            <span>${prd.prix} dh</span>
            <span>Qté: ${prd.qtt}</span>
        `;

        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = prd.img;
        img.alt = prd.title;
        img.style.width = "45px";

        imgDiv.appendChild(img);
        productDiv.appendChild(infoDiv);
        productDiv.appendChild(imgDiv);
        panier_prd.appendChild(productDiv);
    }


}

function prixTotal() {
    let total = 0;
    for (let prd of panier) {
        total += prd.prix * prd.qtt;
    }
    document.querySelector("#prix_total").textContent = "Prix total: " + total + " dh";
}

let favoris = [];
function Favoris(prdId) {
    let list_Favoris = document.getElementById(prdId);
    let prix_favoris = list_Favoris.querySelector('.prix').textContent;
    let title_favoris = list_Favoris.querySelector('h2').textContent;
    let img_favoris = list_Favoris.querySelector('img').getAttribute('src');

    // let exist = false;
    let exist = false;

    for (i = 0; i < favoris.length; i++) {
        if (favoris[i][0] === prdId) {
            exist = true;
            break;
        }

    }

    if (!exist) {
        favoris.push([prdId, prix_favoris, title_favoris, img_favoris]);
        console.log(exist);
        console.log(favoris);
        alert("new favori");
    }
    else {
        alert("exist déjà");

    }
    cree_listFavoris();
}

function cree_listFavoris() {
    let prdFavorit = document.getElementById("form_favoris");

    if (panier.length === 0) {
        prdFavorit.innerHTML = "<p>Votre liste de favories est vide !</p>";
    }
    prdFavorit.innerHTML = `<div id="header_panier"><h2 class="titre_favoris"> Favoris à Garder </h2> 
                            <!-- <button id="fav_Prd" onclick="vider()">Supprimer</button> -->
                            </div>
                            <hr class="hr_panier">`;

    for (let fav of favoris) {
        //la creation des balises et leurs class 
        let favorisDiv = document.createElement("div");
        favorisDiv.classList.add("flixe_panier");

        let infoDiv = document.createElement("div");
        favorisDiv.classList.add("partInfo_prd");
        let iddelet = fav[0];
        infoDiv.innerHTML = `
            <span>${fav[2]}</span>
            <span>${fav[1]} dh</span>
          <span > <i class=" iconId fa-regular fa-trash-can" style=" cursor: pointer;" onclick="retirerFavoris('${iddelet}')"></i></span>
        `;

        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = fav[3];
        img.alt =fav[2];
        img.style.width = "45px";

        imgDiv.appendChild(img);
        favorisDiv.appendChild(infoDiv);
        favorisDiv.appendChild(imgDiv);

        prdFavorit.appendChild(favorisDiv);
    }

}

// supprimer de la liste favoris 
function retirerFavoris(prdId)
{
    for( i=0 ; i <favoris.length;i++)
    {
        if(favoris[i] === prdId){

        favoris.splice(i,1);
        console.log("prd retiré", prdId);  
        cree_listFavoris();
        return;
        }
        // cree_listFavoris();
    }
    console.log("prd nn trouvé");

}


function qtyTotal() {
    let counter = document.getElementById("increment");
    //  let newCounter = counter.textContent;
    // console.log(typeof(counter));
    // console.log(counter.textContent=0);
    let sum = 0;
    for (let i = 0; i < panier.length; i++) {
        sum += panier[i].qtt;
    }
    // newCounter=sum;
    // modifier le veleur du span_panier
    counter.textContent = sum;
}

function viderPanier() {

    panier = [];
    // panier.splice(0,panier.length);
    //
    document.getElementById("increment").textContent = 0;
    // console.log(document.getElementById("increment").textContent);
    let products = document.querySelectorAll('.product ');
    console.log(products);

    for (i = 0; i < products.length; i++) {
        let prd = products[i];
        prd.querySelector('.btn_add').style.display = 'inline-block';
        prd.querySelector('.plus_remove').style.display = 'none';
        prd.qtt = 0;
        prd.querySelector('.cpt').textContent = 1;
        //
        console.log(prd);
    }

    if (panier.length === 0) {
        document.getElementById('form_panier').innerHTML = "<p>Votre panier est vide !</p>";
    }

}


function cpt_plus(prdId, cpt) {

    let qtt_prd = document.getElementById(cpt);
    console.log(qtt_prd);
    let newValue = Number(qtt_prd.textContent);

    for (let produit of panier) {
        if (produit.id === prdId) {
            produit.qtt += 1;
            newValue = produit.qtt;
            break;
        }
    }
    // modifier la valeur du span
    qtt_prd.textContent = newValue;
    afficherPanier();
    prixTotal();
    qtyTotal();
}

function cpt_munis(prdId, cpt) {
    let section_prd = document.getElementById(prdId);
    let qtt_prd = document.getElementById(cpt);
    // console.log(qtt_prd);
    let newValue = Number(qtt_prd.textContent);

    for (let i = 0; i < panier.length; i++) {

        if (panier[i].id === prdId) {
            if (panier[i].qtt > 1) {
                panier[i].qtt -= 1;
                newValue = panier[i].qtt;
            }
            else {
                // supprimer le produit + hide div (btn_plus // btn_munis )
                section_prd.querySelector(".plus_remove").style.display = 'none';
                section_prd.querySelector(".btn_add").style.display = 'inline-block';
                panier.splice(i, 1);
            }
        }

    }

    // si le panier est vide en le cache 
    if (panier.length === 0) {
        document.getElementById("form_panier").style.display = "none";
    }
    //ecraser le valeur par defaut du span
    qtt_prd.textContent = newValue;

    afficherPanier();
    prixTotal();
    qtyTotal();
}




function gereSection(sectionId) {

    let section = document.getElementById(sectionId);


        if (panier.length === 0 && sectionId === "form_panier") {
            section.innerHTML = "<p>Votre panier est vide !</p>";
    }

    if (favoris.length === 0 && sectionId === "form_favoris") {
        section.innerHTML = "<p>Votre liste de favoris est vide !</p>";
    }

    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";

    } else {
        section.style.display = "none";
    }


}

// la gestions des clicks
document.getElementById("link_click").addEventListener("click", function(){
    gereSection("form_panier");
});

document.getElementById("link_favoris").addEventListener("click", function(){
    gereSection("form_favoris");

});

// function eventpanier()
// document.getElementById("link_click").addEventListener("click", function (event) {
//     event.preventDefault();

//     let section_panier = document.getElementById("form_panier");
//     console.log(section_panier.style.display)
//     if (section_panier.style.display == "none" || section_panier.style.display === "") {
//         section_panier.style.display = "block";
//     }
//     else {
//         section_panier.style.display = "none";
//     }
//     if (panier.length === 0) {
//         section_panier.innerHTML = "<p>Votre panier est vide !</p>";


//     }

// });
