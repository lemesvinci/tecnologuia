--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.areas (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.areas OWNER TO postgres;

--
-- Name: areas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.areas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.areas_id_seq OWNER TO postgres;

--
-- Name: areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.areas_id_seq OWNED BY public.areas.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content text NOT NULL,
    userid integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_backup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_backup (
    id integer,
    content text,
    userid integer,
    createdat timestamp without time zone
);


ALTER TABLE public.comments_backup OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone text,
    location text,
    occupation text,
    bio text,
    role text DEFAULT 'user'::text,
    resettoken text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: areas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas ALTER COLUMN id SET DEFAULT nextval('public.areas_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.areas (id, name, description) FROM stdin;
1	Desenvolvimento	Área focada em programação desenvolvimento de software
2	Cibersegurança	Área focada em segurança da informação e proteção de dados
3	Inteligência Artificial	Área focada em aprendizado de máquina e IA
4	Banco de Dados	Área focada em gerenciamento e análise de dados
5	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
6	DevOps	Área focada em integração entre desenvolvimento e operações
7	Cloud Computing	Área focada em computação em nuvem e serviços online
8	Desenvolvimento	Área focada em programação desenvolvimento de software
9	Cibersegurança	Área focada em segurança da informação e proteção de dados
10	Inteligência Artificial	Área focada em aprendizado de máquina e IA
11	Banco de Dados	Área focada em gerenciamento e análise de dados
12	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
13	DevOps	Área focada em integração entre desenvolvimento e operações
14	Cloud Computing	Área focada em computação em nuvem e serviços online
15	Desenvolvimento	Área focada em programação desenvolvimento de software
16	Cibersegurança	Área focada em segurança da informação e proteção de dados
17	Inteligência Artificial	Área focada em aprendizado de máquina e IA
18	Banco de Dados	Área focada em gerenciamento e análise de dados
19	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
20	DevOps	Área focada em integração entre desenvolvimento e operações
21	Cloud Computing	Área focada em computação em nuvem e serviços online
22	Desenvolvimento	Área focada em programação desenvolvimento de software
23	Cibersegurança	Área focada em segurança da informação e proteção de dados
24	Inteligência Artificial	Área focada em aprendizado de máquina e IA
25	Banco de Dados	Área focada em gerenciamento e análise de dados
26	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
27	DevOps	Área focada em integração entre desenvolvimento e operações
28	Cloud Computing	Área focada em computação em nuvem e serviços online
29	Desenvolvimento	Área focada em programação desenvolvimento de software
30	Cibersegurança	Área focada em segurança da informação e proteção de dados
31	Inteligência Artificial	Área focada em aprendizado de máquina e IA
32	Banco de Dados	Área focada em gerenciamento e análise de dados
33	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
34	DevOps	Área focada em integração entre desenvolvimento e operações
35	Cloud Computing	Área focada em computação em nuvem e serviços online
36	Desenvolvimento	Área focada em programação desenvolvimento de software
37	Cibersegurança	Área focada em segurança da informação e proteção de dados
38	Inteligência Artificial	Área focada em aprendizado de máquina e IA
39	Banco de Dados	Área focada em gerenciamento e análise de dados
40	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
41	DevOps	Área focada em integração entre desenvolvimento e operações
42	Cloud Computing	Área focada em computação em nuvem e serviços online
43	Desenvolvimento	Área focada em programação desenvolvimento de software
44	Cibersegurança	Área focada em segurança da informação e proteção de dados
45	Inteligência Artificial	Área focada em aprendizado de máquina e IA
46	Banco de Dados	Área focada em gerenciamento e análise de dados
47	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
48	DevOps	Área focada em integração entre desenvolvimento e operações
49	Cloud Computing	Área focada em computação em nuvem e serviços online
50	Desenvolvimento	Área focada em programação desenvolvimento de software
51	Cibersegurança	Área focada em segurança da informação e proteção de dados
52	Inteligência Artificial	Área focada em aprendizado de máquina e IA
53	Banco de Dados	Área focada em gerenciamento e análise de dados
54	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
55	DevOps	Área focada em integração entre desenvolvimento e operações
56	Cloud Computing	Área focada em computação em nuvem e serviços online
57	Desenvolvimento	Área focada em programação desenvolvimento de software
58	Cibersegurança	Área focada em segurança da informação e proteção de dados
59	Inteligência Artificial	Área focada em aprendizado de máquina e IA
60	Banco de Dados	Área focada em gerenciamento e análise de dados
61	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
62	DevOps	Área focada em integração entre desenvolvimento e operações
63	Cloud Computing	Área focada em computação em nuvem e serviços online
64	Desenvolvimento	Área focada em programação desenvolvimento de software
65	Cibersegurança	Área focada em segurança da informação e proteção de dados
66	Inteligência Artificial	Área focada em aprendizado de máquina e IA
67	Banco de Dados	Área focada em gerenciamento e análise de dados
68	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
69	DevOps	Área focada em integração entre desenvolvimento e operações
70	Cloud Computing	Área focada em computação em nuvem e serviços online
71	Desenvolvimento	Área focada em programação desenvolvimento de software
72	Cibersegurança	Área focada em segurança da informação e proteção de dados
73	Inteligência Artificial	Área focada em aprendizado de máquina e IA
74	Banco de Dados	Área focada em gerenciamento e análise de dados
75	Infraestrutura	Área focada em redes, servidores e infraestrutura de TI
76	DevOps	Área focada em integração entre desenvolvimento e operações
77	Cloud Computing	Área focada em computação em nuvem e serviços online
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, userid, createdat) FROM stdin;
\.


--
-- Data for Name: comments_backup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments_backup (id, content, userid, createdat) FROM stdin;
34	oi	1	2025-05-10 08:33:15.136
35	a	1	2025-05-10 04:47:06.572
37	teste	2	2025-05-10 14:37:35.74
39	testando	2	2025-05-11 00:03:14.969
40	testando2	2	2025-05-11 00:24:10.325
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, phone, location, occupation, bio, role, resettoken) FROM stdin;
1	Guilherme Lemes Andrade	glemesandrade7@gmail.com	$2a$10$4NRbxcfhGTCUD5IRI46e8OH5.ZIeLLy69krrEPPHXRxZ6wGDT0Aey	\N	\N	\N	\N	admin	\N
2	Leandro Lima	leandrolima@gmail.com	$2a$10$vExJATcykkn/5QwcCrP31.RXs2ndh5fiTqUvH1GVLDCvsWS8zG6cW	\N	\N	\N	\N	user	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0Njk3MzA5NSwiZXhwIjoxNzQ2OTc2Njk1fQ.2KEHKIJ3keHdtQSElKbn7aC5hdhaCnwzP5ZmkmNPBas
\.


--
-- Name: areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.areas_id_seq', 77, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 40, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

