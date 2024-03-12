// emailHelpers.js
export default function welcomeEmail(token) {
  const accountCreationLink = `https://www.yourapplication.com/create-account?token=${token}`;

  return {
    subject: `Welcome to GoGain! Let's Get Started`,
    text: `We're thrilled to have you join us at GoGain! You’re just one step further to a healthy life.

**Create Your Account**
To get started, simply click the link below to set up your account. This link will guide you through our quick and easy account creation process.

${accountCreationLink}

Please note: For security concerns, the above link will expire in 24 hours.

**Need Assistance?**
If you have any questions or need a hand getting started, our support team is here for you. Just reach out to us at support@gogain.pro, and we'll be happy to help.

Welcome aboard, and we can't wait to see what you achieve with GoGain on your journey to a healthier life!

Warmest regards,

GoGain
`,
    html: `
<p>We're thrilled to have you join us at <strong>GoGain</strong>! You’re just one step further to a healthy life.</p>

<h3>Create Your Account</h3>
<p>To get started, simply click the link below to set up your account. This link will guide you through our quick and easy account creation process.</p>
<p><a href="${accountCreationLink}">${accountCreationLink}</a></p>
<p>Please note: For security concerns, the above link will expire in 24 hours.</p>

<h3>Need Assistance?</h3>
<p>If you have any questions or need a hand getting started, our support team is here for you. Just reach out to us at <a href="mailto:support@gogain.pro">support@gogain.pro</a>, and we'll be happy to help.</p>

<p>Welcome aboard, and we can't wait to see what you achieve with <strong>GoGain</strong> on your journey to a healthier life!</p>

<p>Warmest regards,</p>
<p>GoGain</p>
`,
  };
}
