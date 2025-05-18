// Language translations
const translations = {
  en: {
    title: 'Admin Dashboard',
    signin: 'Sign in to your account',
    username: 'Username',
    username_placeholder: 'Enter your username',
    password: 'Password',
    password_placeholder: 'Enter your password',
    login_error: 'Invalid username or password. Please try again.',
    signin_button: 'Sign In',
    fullname: 'Full Name',
    fullname_placeholder: 'Enter your full name',
    email: 'Email',
    email_placeholder: 'Enter your email',
    confirm_password: 'Confirm Password',
    confirm_password_placeholder: 'Confirm your password',
    register_button: 'Register',
    toggle_form: "Don't have an account? Register here",
    toggle_form_login: 'Already have an account? Login here',
    demo_credentials: 'Demo Credentials:',
    registration_success: 'Registration successful! Please wait for admin approval before logging in.',
    passwords_not_match: 'Passwords do not match',
    pending_approval: 'Your account is pending approval. Please wait for admin verification.'
  },
  es: {
    title: 'Panel de Administración',
    signin: 'Inicia sesión en tu cuenta',
    username: 'Usuario',
    username_placeholder: 'Ingresa tu usuario',
    password: 'Contraseña',
    password_placeholder: 'Ingresa tu contraseña',
    login_error: 'Usuario o contraseña inválidos. Por favor intenta de nuevo.',
    signin_button: 'Iniciar Sesión',
    fullname: 'Nombre Completo',
    fullname_placeholder: 'Ingresa tu nombre completo',
    email: 'Correo Electrónico',
    email_placeholder: 'Ingresa tu correo electrónico',
    confirm_password: 'Confirmar Contraseña',
    confirm_password_placeholder: 'Confirma tu contraseña',
    register_button: 'Registrarse',
    toggle_form: '¿No tienes una cuenta? Regístrate aquí',
    toggle_form_login: '¿Ya tienes una cuenta? Inicia sesión aquí',
    demo_credentials: 'Credenciales de Demostración:',
    registration_success: '¡Registro exitoso! Por favor espera la aprobación del administrador antes de iniciar sesión.',
    passwords_not_match: 'Las contraseñas no coinciden',
    pending_approval: 'Tu cuenta está pendiente de aprobación. Por favor espera la verificación del administrador.'
  },
  fr: {
    title: "Tableau de Bord d'Administration",
    signin: 'Connectez-vous à votre compte',
    username: "Nom d'utilisateur",
    username_placeholder: "Entrez votre nom d'utilisateur",
    password: 'Mot de passe',
    password_placeholder: 'Entrez votre mot de passe',
    login_error: "Nom d'utilisateur ou mot de passe invalide. Veuillez réessayer.",
    signin_button: 'Se Connecter',
    fullname: 'Nom Complet',
    fullname_placeholder: 'Entrez votre nom complet',
    email: 'Email',
    email_placeholder: 'Entrez votre email',
    confirm_password: 'Confirmer le Mot de Passe',
    confirm_password_placeholder: 'Confirmez votre mot de passe',
    register_button: "S'inscrire",
    toggle_form: "Vous n'avez pas de compte ? Inscrivez-vous ici",
    toggle_form_login: 'Vous avez déjà un compte ? Connectez-vous ici',
    demo_credentials: 'Identifiants de Démonstration :',
    registration_success: "Inscription réussie ! Veuillez attendre l'approbation de l'administrateur avant de vous connecter.",
    passwords_not_match: 'Les mots de passe ne correspondent pas',
    pending_approval: "Votre compte est en attente d'approbation. Veuillez attendre la vérification de l'administrateur."
  },
  de: {
    title: 'Admin-Dashboard',
    signin: 'Melden Sie sich bei Ihrem Konto an',
    username: 'Benutzername',
    username_placeholder: 'Geben Sie Ihren Benutzernamen ein',
    password: 'Passwort',
    password_placeholder: 'Geben Sie Ihr Passwort ein',
    login_error: 'Ungültiger Benutzername oder Passwort. Bitte versuchen Sie es erneut.',
    signin_button: 'Anmelden',
    fullname: 'Vollständiger Name',
    fullname_placeholder: 'Geben Sie Ihren vollständigen Namen ein',
    email: 'E-Mail',
    email_placeholder: 'Geben Sie Ihre E-Mail ein',
    confirm_password: 'Passwort bestätigen',
    confirm_password_placeholder: 'Bestätigen Sie Ihr Passwort',
    register_button: 'Registrieren',
    toggle_form: 'Noch kein Konto? Hier registrieren',
    toggle_form_login: 'Bereits ein Konto? Hier anmelden',
    demo_credentials: 'Demo-Anmeldedaten:',
    registration_success: 'Registrierung erfolgreich! Bitte warten Sie auf die Genehmigung des Administrators, bevor Sie sich anmelden.',
    passwords_not_match: 'Passwörter stimmen nicht überein',
    pending_approval: 'Ihr Konto wartet auf Genehmigung. Bitte warten Sie auf die Überprüfung durch den Administrator.'
  },
  it: {
    title: 'Dashboard di Amministrazione',
    signin: 'Accedi al tuo account',
    username: 'Nome utente',
    username_placeholder: 'Inserisci il tuo nome utente',
    password: 'Password',
    password_placeholder: 'Inserisci la tua password',
    login_error: 'Nome utente o password non validi. Per favore riprova.',
    signin_button: 'Accedi',
    fullname: 'Nome Completo',
    fullname_placeholder: 'Inserisci il tuo nome completo',
    email: 'Email',
    email_placeholder: 'Inserisci la tua email',
    confirm_password: 'Conferma Password',
    confirm_password_placeholder: 'Conferma la tua password',
    register_button: 'Registrati',
    toggle_form: 'Non hai un account? Registrati qui',
    toggle_form_login: 'Hai già un account? Accedi qui',
    demo_credentials: 'Credenziali Demo:',
    registration_success: "Registrazione completata! Attendi l'approvazione dell'amministratore prima di accedere.",
    passwords_not_match: 'Le password non coincidono',
    pending_approval: "Il tuo account è in attesa di approvazione. Attendi la verifica dell'amministratore."
  },
  pt: {
    title: 'Painel de Administração',
    signin: 'Entre na sua conta',
    username: 'Nome de usuário',
    username_placeholder: 'Digite seu nome de usuário',
    password: 'Senha',
    password_placeholder: 'Digite sua senha',
    login_error: 'Nome de usuário ou senha inválidos. Por favor, tente novamente.',
    signin_button: 'Entrar',
    fullname: 'Nome Completo',
    fullname_placeholder: 'Digite seu nome completo',
    email: 'Email',
    email_placeholder: 'Digite seu email',
    confirm_password: 'Confirmar Senha',
    confirm_password_placeholder: 'Confirme sua senha',
    register_button: 'Registrar',
    toggle_form: 'Não tem uma conta? Registre-se aqui',
    toggle_form_login: 'Já tem uma conta? Entre aqui',
    demo_credentials: 'Credenciais de Demonstração:',
    registration_success: 'Registro bem-sucedido! Aguarde a aprovação do administrador antes de fazer login.',
    passwords_not_match: 'As senhas não coincidem',
    pending_approval: 'Sua conta está pendente de aprovação. Aguarde a verificação do administrador.'
  }
};

// Get browser language
const getBrowserLanguage = () => {
  const lang = navigator.language.split('-')[0];
  return translations[lang] ? lang : 'en';
};

// Get current language from localStorage or browser
export const getCurrentLanguage = () => {
  return localStorage.getItem('language') || getBrowserLanguage();
};

// Set language
export const setLanguage = (lang) => {
  localStorage.setItem('language', lang);
  updateContent(lang);
};

// Update content with selected language
export const updateContent = (lang) => {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
};

// Get translation
export const getTranslation = (key, lang = getCurrentLanguage()) => {
  return translations[lang] && translations[lang][key] ? translations[lang][key] : translations['en'][key];
};

// Initialize language
export const initializeLanguage = () => {
  const currentLang = getCurrentLanguage();
  const languageSelector = document.getElementById('languageSelector');
  
  if (languageSelector) {
    languageSelector.value = currentLang;
  }
  
  updateContent(currentLang);
};