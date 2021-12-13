-- public.cliente definition

-- Drop table

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente (
	idcliente int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	email varchar NOT NULL,
	nome varchar NOT NULL,
	CONSTRAINT cliente_pk PRIMARY KEY (idcliente),
	CONSTRAINT cliente_un UNIQUE (email)
);


-- public.cotacaocripto definition

-- Drop table

-- DROP TABLE public.cotacaocripto;

CREATE TABLE public.cotacaocripto (
	codcripto varchar(5) NOT NULL,
	nomecripto varchar NOT NULL,
	cotacaoreal numeric(20, 2) NOT NULL,
	CONSTRAINT cotacaocripto_pk PRIMARY KEY (codcripto)
);


-- public.produto definition

-- Drop table

-- DROP TABLE public.produto;

CREATE TABLE public.produto (
	idproduto int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	nomeproduto varchar NOT NULL,
	categoria varchar NOT NULL,
	descricao text NULL DEFAULT ' '::text,
	especificacoes json NULL,
	precoreal numeric(20, 2) NOT NULL,
	CONSTRAINT produto_pk PRIMARY KEY (idproduto)
);