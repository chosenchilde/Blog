$(document).ready(myProfile)

var user, userProfile;

function myProfile() {

    changeTitle('Perfil de usuário')

    // Monitora status de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {

        // Se o usuário está logado...
        if (user) {

            theDate = new Date(user.metadata.creationTime)
            created = theDate.toLocaleDateString('pt-BR') + " às " + theDate.toLocaleTimeString('pt-BR')

            theDate = new Date(user.metadata.lastSignInTime)
            last = theDate.toLocaleDateString('pt-BR') + " às " + theDate.toLocaleTimeString('pt-BR')

            $('article').html(`
            <div class="userProfile">
<h2>Perfil do usuário</h2>
<div id="googleManage"><img src="${user.photoURL} " alt="${user.displayName}"> <h3>${user.displayName}</h5> Seu perfil é gerenciado pelo Google.</div>
<ul>
    <li><strong>ID Local:</strong></li> ${user.uid}
    <li><strong>E-mail:</strong></li> ${user.email}
    <li><strong>Data de Cadastro:</strong></li> ${created}
    <li><strong>Último Acesso:</strong></li> ${last}
</ul>

<p>Clique no botão abaixo para ver/editar seu perfil.</p>
<button id="googleProfile"><i class="fa-brands fa-google fa-fw"></i> Perfil no Google</button>

<button id="googleLogout"><i class="fa-solid fa-right-from-bracket fa-fw"></i> Sair</button> <button id="googleRemove"><i class="fa-solid fa-user-lock fa-fw"></i> Aplicativos Conectados</button>
<p>Clique no botão acima para sair do aplicativo neste dispositivo.
Você precisará entrar novamente para ter acesso aos recursos restritos do site.</p>

<p>Para remover sua conta deste aplicativo, acesse seu perfil do Google, localize e remova o aplicativo "<code>project-${firebaseConfig.messagingSenderId}</code>". 
Lembre-se que o Google só compartilha seu nome público, seu endereço de e-mail e sua imagem de perfil pública com nosso site,
significa que, normalmente, não é necessário remover as permissões deste aplicativo da sua conta por questões de privacidade.
</p>
<blockquote><em>Leia nossas <a href="policies">Políticas de privacidade</a> para saber mais.</em></blockquote>
<p>Se quiser remover mesmo assim, clique no botão abaixo para acessar a página de permissões:</p>

<p>Em seguida, clique no botão [<i class="fa-solid fa-right-from-bracket fa-fw"></i> Sair / Logout] acima.</p>
</div>
            `)
            // Quando clicar no botão de perfil.
            $('#googleProfile').click(toProfile)

            // Quando clicar no botão de logout.
            $('#googleLogout').click(logout)

            // Quando clicar no botão de remover perfil.
            $('#googleRemove').click(remove)

            // Se não tem logados...
        } else {
            loadpage('home')
        }
    });

}

function toProfile() {
    window.open('https://myaccount.google.com/', '_blank')
}

function logout() {
    firebase.auth().signOut()
    loadpage('home')
}

function remove() {
    window.open('https://myaccount.google.com/permissions', '_blank')
}