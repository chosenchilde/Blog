// Variável que define as informações básicas do site/aplicativo. 
var app = {
    siteName: 'Code Blog',
    siteSlogan: "Programação e códigos.",
    siteLicense: '&copy; 2023 Lucas Belchior'
}


/*Altera o nome e o slogan do site utilizando os valores inseridos
* na variável app.*/
$('#siteInfos').html(app.siteName + '<br>' + '<small>' + app.siteSlogan + '</small>')

$(document).ready(myApp)
function myApp() {
    // Carrega a página inicial.
    loadpage('home')
}

/* Monitora cliques em elementos '<a>' que, se ocorre, chama a função.
* routerLink()
*/
$(document).on('click', 'a', routerLink)
function routerLink(){

    /* Captura o valor do atributo 'href' do elemento clicado.
    * E filtra o seu conteúdo, recortando espaços e colocando 
    * em letras minúsculas.*/ 
    var href = $(this).attr('href').trim().toLowerCase()

    // Detecta clicks em links externos e âncoras.
    if (href.substring(0,7) == 'http://' ||
    href.substring(0,8) == 'https://' ||
    href.substring(0,1) == '#'
    ){
        // Devolve o controle para o HTML.
        return true
    }

    //Exibe a página da rota clicada. 
    loadpage(href)

    // Bloqueia o funcionamento normal do link. 
    return false 
}

// Carrega uma página.
function loadpage(page) {
    // Monta os caminhos para os componentes da página solicitada.
    const path = {
        html: `/pages/${page}/index.html`,
        css: `/pages/${page}/index.css`,
        js: `/pages/${page}/index.js`
    }

    $.get(path.html)
        .done((data) => {
            $('#pageCSS').attr('href', path.css)

            $('main').html(data)

            $.getScript(path.js)
        })
        .fail((error) => {
            loadpage('e404')
        })
    /**
    * Rola a tela para o início, útil para links no final da página.
    * Referências:
    *  • https://www.w3schools.com/jsref/met_win_scrollto.asp
    **/
    window.scrollTo(0, 0);

    /**
     * Atualiza URL da página com o endereço da rota:
     * Referências:
     *  • https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     **/
    window.history.pushState({}, '', page);
}

/* Carrega o título exibido na aba do navegador de acordo com
/* a página que vai ser carregada */
function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - '

    if (title == '') pageTitle += app.siteSlogan
    else pageTitle += title

    $('title').html(pageTitle)
}


