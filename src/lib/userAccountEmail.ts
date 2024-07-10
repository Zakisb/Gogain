// emailHelpers.js
export default function userAccountEmail(email, password) {
  const accountCreationLink = `https://www.gogain.pro/login`;

  return {
    subject: `Bienvenue sur GoGain ! Commençons`,
    text: `
      Bonjour,

      Nous sommes ravis de vous accueillir sur notre plateforme. Voici vos informations de connexion :

      Adresse e-mail : ${email}
      Mot de passe : ${password}

      Veuillez vous connecter avec ces informations à l'adresse suivante : ${accountCreationLink}

      Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe après votre première connexion. 

      Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.

      Bien cordialement,
      L'équipe de GoGain
    `,
    html: `
<p>Bonjour,</p>

<p>Nous sommes ravis de vous accueillir sur notre plateforme. Voici vos informations de connexion :</p>

<p>Adresse e-mail : ${email}<br>
Mot de passe : ${password}</p>

<p>Veuillez vous connecter avec ces informations à l'adresse suivante : <a href="${accountCreationLink}">${accountCreationLink}</a></p>

<p>Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe après votre première connexion.</p>

<p>Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.</p>

<p>Bien cordialement,<br>
L'équipe de GoGain</p>
`,
  };
}
