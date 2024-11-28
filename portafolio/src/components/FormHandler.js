import { useState } from 'preact/hooks';

export default function FormHandler() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const res = await fetch('https://formsubmit.co/ariane2fernanda4@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (res.ok) {
      setIsSubmitted(true);
    } else {
      alert('Hubo un error al enviar el formulario.');
    }

    setIsLoading(false);
  };

  return (
    <div class="max-w-7xl mx-auto text-center">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} class="max-w-2xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
          <div class="mb-4">
            <label htmlFor="name" class="block text-lg font-medium">Nombre:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onInput={(e) => setName(e.target.value)} 
              required 
              class="w-full p-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          </div>

          <div class="mb-4">
            <label htmlFor="email" class="block text-lg font-medium">Correo Electrónico:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onInput={(e) => setEmail(e.target.value)} 
              required 
              class="w-full p-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          </div>

          <div class="mb-6">
            <label htmlFor="message" class="block text-lg font-medium">Mensaje:</label>
            <textarea 
              id="message"
              rows="4" 
              value={message} 
              onInput={(e) => setMessage(e.target.value)} 
              required 
              class="w-full p-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          </div>

          <button 
            type="submit" 
            class={`w-full p-2 ${isLoading ? 'bg-gray-400' : 'bg-gray-600'} text-white rounded hover:bg-gray-500`}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      ) : (
        <p class="text-center text-xl text-green-600">¡Gracias! Tu mensaje ha sido enviado correctamente.</p>
      )}
    </div>
  );
}
