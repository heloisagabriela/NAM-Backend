# Recuperação de senha.

**RF**

- O usuário deve poder recuperar sua senha informando o e-mail.
- O usuári eve receber um e-mail com instruções de recuperaçao de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utiizar Mailtrap para testar envios em ambiente de dev;
- Utilizar  Amazon SES para enios e produção;
- O envio de e-mails deve acontecer em segundo plano (backgroun job);


**RF**
- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- o usuário deve poder listar o dias de um mês com pelo menos um horário disponível de um prestador;
- o usuário deve poder listar horários disponíveis de um dia espeecífico de um prestador
- o usuário deve poder realizar um novo agenamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenadaem cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 9 e às 18h
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- o prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificac1ões não lidas;

**RNF**


**RN**
- o usuário não pode alterar seu email para um email já utilizado;
- Para atalizar sua senha, o usuári deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua senha;


# Agendamento de serviços


