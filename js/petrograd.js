window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste


    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);



}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt)

    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/billeder/small/" + produkt.billede + "-sm.jpg";

    if (produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        //udsolgttekst skal fjernes

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);

    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);

}
