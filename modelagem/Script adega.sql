-- Criação do esquema
CREATE DATABASE IF NOT EXISTS adega;

-- Seleção do banco de dados
USE adega;

-- 1. Tabela USUARIO (Gerenciamento de Autenticação)
-- Atende aos requisitos de modelagem: id (PK, autoincremento), email (único), senha (hash) [3].
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, 
    senha VARCHAR(255) NOT NULL 
);

-- 2. Tabela VINHO (Recurso A: Catálogo de Referência)
-- Exige CRUD completo [4].
CREATE TABLE vinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    produtor VARCHAR(255) NOT NULL,
    pais_origem VARCHAR(100),
    tipo VARCHAR(50), 
    uva_casta VARCHAR(255) 
);

-- 3. Tabela GARRAFA (Recurso B: Inventário e Consumo)
-- NOME DA TABELA ALTERADO PARA 'garrafa'.
-- Exige CRUD completo [4].
CREATE TABLE garrafa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Chave Estrangeira (FK) que liga a garrafa ao rótulo no catálogo
    vinho_id INT NOT NULL, 
    
    safra YEAR,
    preco_compra DECIMAL(10, 2) NOT NULL,
    data_aquisicao DATE NOT NULL,
    
    consumida BOOLEAN DEFAULT FALSE,
    
    data_consumo DATE NULL,
    avaliacao INT CHECK (avaliacao >= 1 AND avaliacao <= 5) NULL, 
    notas_degustacao TEXT NULL,
    
    -- Definição da Chave Estrangeira com RESTRICT:
    -- Garante que o relacionamento 1-N seja modelado corretamente [5] e impede
    -- a exclusão do vinho de referência se existirem garrafas [6].
    FOREIGN KEY (vinho_id) REFERENCES vinho(id)
        ON DELETE RESTRICT 
);