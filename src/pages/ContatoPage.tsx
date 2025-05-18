import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormValues]?: string;
};

const ContatoPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (!formValues.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }
    
    if (!formValues.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
      isValid = false;
    }
    
    if (!formValues.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', formValues);
      setFormSubmitted(true);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-primary-100">
              Estamos à disposição para responder suas dúvidas e receber seus comentários.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <Mail className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">E-mail</h3>
                      <p className="text-gray-600">contato@ripiaia.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Phone className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p className="text-gray-600">(00) 0000-0000</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Endereço</h3>
                      <p className="text-gray-600">
                        Rua da Floresta, 123 <br />
                        Céu do Mar - Rio de Janeiro <br />
                        CEP: 00000-000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Horário de Atendimento</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>9h às 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Envie sua Mensagem</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">Mensagem enviada com sucesso!</h3>
                        <p className="mt-2 text-sm">Agradecemos seu contato. Responderemos em breve.</p>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-green-600 hover:text-green-500"
                            onClick={() => setFormSubmitted(false)}
                          >
                            Enviar nova mensagem
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Sugestão">Sugestão</option>
                        <option value="Acervo">Acervo</option>
                        <option value="Loja">Loja</option>
                        <option value="Transmissões">Transmissões</option>
                        <option value="Outro">Outro</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formValues.message}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Como posso acessar o acervo de hinários?</h3>
                  <p className="text-gray-600">
                    Você pode acessar nosso acervo de hinários através da seção "Acervo" no menu principal. 
                    Lá você encontrará PDFs, áudios e partituras disponíveis para visualização e download.
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Como funcionam as transmissões ao vivo?</h3>
                  <p className="text-gray-600">
                    Nossas transmissões ao vivo são realizadas em datas específicas, geralmente em trabalhos 
                    oficiais. Você pode verificar a programação na seção "Ao Vivo" e receber notificações 
                    cadastrando seu e-mail.
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Quais formas de pagamento são aceitas na loja?</h3>
                  <p className="text-gray-600">
                    Nossa loja aceita cartões de crédito, débito, boleto bancário e PIX. Todos os pagamentos 
                    são processados de forma segura através de gateways de pagamento confiáveis.
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Posso contribuir com conteúdo para o acervo?</h3>
                  <p className="text-gray-600">
                    Sim! Agradecemos contribuições para nosso acervo. Entre em contato conosco através deste 
                    formulário com o assunto "Acervo" e descreva qual material você gostaria de compartilhar.
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Como posso receber atualizações do site?</h3>
                  <p className="text-gray-600">
                    Você pode se cadastrar para receber nossas novidades através da seção "Receba Notificações" 
                    presente em diversas páginas do site, ou nos seguir nas redes sociais listadas no rodapé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContatoPage;