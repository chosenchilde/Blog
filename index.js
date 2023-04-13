/**
 * Estrutura de Blog
 * MIT License 2023 By Lucas Belchior
 **/

 /**
  * JavaScript do aplicativo.
  * Depende de "jQuery".
  */

// Variável que define as informações básicas do site/aplicativo. 
var app = {
    siteName: 'Code Blog',
    siteSlogan: 'Programação e códigos.',
    siteLicense: '<a href="#" title="Lucas Belchior">&copy; 2023 Lucas Belchior</a>',
    apiContactsURL: 'http://localhost:3000/contacts'
}


/*Altera as informações mutáveis do site como logo, slogan, nome
utilizando os valores inseridos na variável app.*/
$('#siteInfos').html(app.siteName + '<br>' + '<small>' + app.siteSlogan + '</small>')
$('#siteLicense').html('Desenvolvido por ' + app.siteLicense)

$(document).ready(myApp)
function myApp() {
    /**
     * IMPORTANTE!
     * Para que o roteamento funcione corretamente no "live server", é 
     * necessário que erros 404 abram a página "404.html".
     **/

    // Verifica se o 'localStorage' contém uma rota.
    if (localStorage.path == undefined) {

        // Se não contém, aponta a rota 'home'.
        localStorage.path = 'home'
    }

    // Armazena a rota obtida em 'path'.        
    var path = localStorage.path

    // Apaga o 'localStorage', liberando o recurso.
    delete localStorage.path

    // Carrega a página solicitada pela rota.
    loadpage(path)

    /* Monitora cliques em elementos '<a>' que, se ocorre, chama a função.
    * routerLink() */
    $(document).on('click', 'a', routerLink)
}

/* Função que processa um link quando clicado. */
function routerLink() {

    /* Captura o valor do atributo 'href' do elemento clicado.
    * E filtra o seu conteúdo, recortando espaços e colocando 
    * em letras minúsculas.*/
    var href = $(this).attr('href').trim().toLowerCase()

    // Detecta clicks em links externos e âncoras.
    if (
    href.substring(0, 7) == 'http://' ||
    href.substring(0, 8) == 'https://' ||
    href.substring(0, 4) == 'tel:' ||
    href.substring(0, 7) == 'mailto:' ||
    href.substring(0, 1) == '#'
    )
        // Devolve o controle para o HTML.
        return true

    //Exibe a página da rota clicada. 
    loadpage(href)

    // Bloqueia o funcionamento normal do link. 
    return false
}

// Carrega uma página.
function loadpage(page, updateURL = true) {
    // Monta os caminhos para os componentes da página solicitada.
    const path = {
        html: `/pages/${page}/index.html`,
        css: `/pages/${page}/index.css`,
        js: `/pages/${page}/index.js`
    }

    // Faz o request ao conteúdo a ser carregado no SPA.
    $.get(path.html)
        .done((data) => {
            // Se o documento carregado não é uma página de conteúdo.
            if (data.trim().substring(0,9) != '<article>')

            // Carrega a página de error 404 sem atualizar a rota.
            loadpage ('e404', false)

            // Se o documento é uma página de conteúdo.
            else {
                // jQuery - Instala o CSS da página na 'index.html'.
                $('#pageCSS').attr('href', path.css)

                // jQuery - Carregar o HTML no elemento <main></main>.
                $('main').html(data)

                // jQuery - Carrega e executa o JavaScript.
                $.getScript(path.js)
            }
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
    if (updateURL) window.history.pushState({}, '', page);

}

/* Carrega o título exibido na aba do navegador de acordo com
/* a página que vai ser carregada */
function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - '

    if (title == '') pageTitle += app.siteSlogan
    else pageTitle += title

    $('title').html(pageTitle)
}


