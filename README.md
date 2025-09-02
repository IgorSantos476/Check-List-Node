### Check List APP
Projeto de aplicação web de **Check List**, desenvolvido com **Node.js**, **MongoDB**, **EJS** e **CSS**. A aplicação permite que usuários criem contas, façam login com autenticação segura via JWT e gerenciem suas próprias tarefas.

**-> FUNCIONALIDADES:**
- Cadastro de novos usuários
- Login com autenticação via **JWT**
- Middleware para proteção de rotas
- Cada usuário possui acesso exclusivo às suas tarefas
- Criar, editar e deletar tarefas
- Interface simples e funcional utilizando EJS, CSS e Bootstrap

<img width="1366" height="653" alt="checkList - print" src="https://github.com/user-attachments/assets/7c89a7c2-b5f1-4839-85c2-cb6f3c1f87f0" />

<img width="1366" height="653" alt="login_checkList - print" src="https://github.com/user-attachments/assets/b2646a3d-2b3b-4ea8-8689-795369396587" />

**-> Tecnologias Utilizadas:**
EJS | CSS | BOOTSTRAP | NODEJS | MONGODB

### Passo a passo:
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd Check-List-Node

# Instale as dependências
npm install

# Crie um arquivo .env com as seguintes variáveis:
*-> Exemplo de .env:*
MONGO_URI=seu_link_do_mongodb
PORT=8080
SECRET_KEY='palavraSecreta'

# Inicie o servidor
node app
