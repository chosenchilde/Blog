-- ---------------------------------
-- FrontEndeiros - Banco de dados
-- By Luferat
-- MIT License
-- 
-- Modela o banco de dados da API do aplicativo.
-- ---------------------------------

-- Apaga o banco de dados caso ele exista.
-- IMPORTANTE! Só faça isso em momento de desenvolvimento.
-- Nunca use este código em produção.
DROP DATABASE IF EXISTS codeblog;

-- Cria o banco de dados com caracteres utf8 e buscas case-insensitive.
CREATE DATABASE codeblog CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Seleciona o banco de dados para as próximas interações.
USE codeblog;

-- Cria tabela dos contatos → contacts.
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM ('received', 'readed', 'responded', 'deleted') DEFAULT 'received'
);

-- Cria a tabela de usuários → users.
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_photo VARCHAR(255) COMMENT 'URL da imagem.',
    user_bio VARCHAR(255),
    user_birth DATE,
    user_type ENUM('user', 'moderator', 'author', 'admin') DEFAULT 'user',
    user_status ENUM('on', 'off', 'ban', 'del') DEFAULT 'on'
);

-- Cria a tabela de artigos → articles.
CREATE TABLE articles (
    art_id INT PRIMARY KEY AUTO_INCREMENT,
    art_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    art_author INT NOT NULL,
    art_title VARCHAR(127) NOT NULL,
    art_thumbnail VARCHAR(255) COMMENT 'URL da imagem.',
    art_resume VARCHAR(127) NOT NULL,
    art_content TEXT NOT NULL,
    art_views INT DEFAULT 0,
    art_status ENUM('on', 'off', 'del') DEFAULT 'on',
    FOREIGN KEY (art_author) REFERENCES users (user_id)
);

-- Cria a tabela de comentários → comments. 
CREATE TABLE comments (
    cmt_id INT PRIMARY KEY AUTO_INCREMENT,
    cmt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cmt_author INT NOT NULL, 
    cmt_article INT NOT NULL, 
    cmt_comment TEXT NOT NULL,
    cmt_status ENUM('on', 'off', 'del') DEFAULT 'on',
    FOREIGN KEY (cmt_author) REFERENCES users (user_id),
    FOREIGN KEY (cmt_author) REFERENCES articles (art_id) 
);

-- Lista de redes sociais dos usuários → social.
CREATE TABLE social (
    scl_id INT PRIMARY KEY AUTO_INCREMENT,
    scl_user INT NOT NULL, 
    scl_name VARCHAR(127) NOT NULL,
    scl_link VARCHAR(255) NOT NULL, 
    scl_status ENUM('on', 'off', 'del') DEFAULT 'on',
    FOREIGN KEY (scl_user) REFERENCES users (user_id)
);

-- ---- --
-- CRUD --
-- ---- --

-- Insere vários registros na tabela 'contacts'.
INSERT INTO contacts 
    (name, email, subject, message)
VALUES 
    ('Nome de Contato', 'nome@contato.com', 'Erro', 'Não consigo me cadastrar em seu site.'),
    ('Sobrenome de Contato', 'sobrenome@contato.com', 'Entrando em contato', 'Mensagem para indicar que estou entrando em contato'),
    ('Nome do Meio de Contato', 'nomedomeio@contato.com', 'Teste de Contato', 'Estou testando contatos.');

-- Insere dados na tabela 'users'. 
INSERT INTO users (
    user_name,
    user_email,
    user_photo,
    user_bio,
    user_birth
) VAlUES (
    'Primeiro Nome',
    'primeironome@gmail.com',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'Uma bio aleatória sobre o Primeiro Nome',
    '2001-10-28'
);
INSERT INTO users (
    user_name,
    user_email,
    user_photo,
    user_bio,
    user_birth
) VAlUES (
    'Segundo Nome',
    'segundonome@gmail.com',
    'https://randomuser.me/api/portraits/women/33.jpg',
    'Uma bio aleatória sobre o Segundo Nome',
    '1999-11-10'
);

-- Insere artigos na tabela 'articles'. 
INSERT INTO articles  
    (art_author, art_title, art_thumbnail, art_resume, art_content)
VALUES ('1', 'Primeiro artigo do blog', 'https://picsum.photos/200', 'Esse é o primeiro artigo publicado no blog.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a ultrices leo. Vivamus in suscipit quam. Sed posuere erat non massa vehicula laoreet.');

-- Insere artigos de atividade.
INSERT INTO articles (art_author, art_title, art_thumbnail, art_resume, art_content)
VALUES ('1', 'Segundo artigo do blog','https://picsum.photos/201', 'Resumo do segundo artigo.', 'Esse é o conteúdo do segundo artigo.');

INSERT INTO articles (art_author, art_title, art_thumbnail, art_resume, art_content)
VALUES ('1', 'Terceiro artigo do blog','https://picsum.photos/202', 'Resumo do terceiro artigo.', 'Esse é o conteúdo do terceiro artigo.');

-- Insere os comentários da atividade.
INSERT INTO comments (cmt_author, cmt_article, cmt_comment)
VALUES ('1', '3', 'Conteúdo do primeiro comentário pelo primeiro usuário.');

INSERT INTO comments (cmt_author, cmt_article, cmt_comment)
VALUES ('2', '3', 'Conteúdo do segundo comentário pelo segundo usuário.');