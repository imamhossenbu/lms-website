import { LEGAL, type LegalDoc } from "./config";

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  summary: `How ${LEGAL.company} collects, uses and protects personal information on our website and platform.`,
  keyPoints: [
    "Academies own their student data — we process it on their behalf.",
    "We never sell personal information or use it for advertising.",
    "Card and mobile-wallet details are handled by the payment providers, not stored by us.",
    "You can ask for a copy of your data or for it to be deleted.",
  ],
  body: `This policy explains what personal information ${LEGAL.company} ("we", "us") collects when you visit our website or use the ${LEGAL.company} platform, why we collect it, and the choices you have.

## Who this policy covers

${LEGAL.company} is used by schools, coaching centres and training institutes ("academies") to run online courses, live classes, assessments and payments. This policy covers:

- **Visitors** to our marketing website.
- **Academy owners and staff** who sign up for and administer an ${LEGAL.company} workspace.
- **Students** who learn through an academy that uses ${LEGAL.company}.

For student data, the academy decides what is collected and why — it is the **data controller**, and ${LEGAL.company} acts as its **processor**, handling the data only to provide the service. If you are a student, contact your academy first about your information.

## Information we collect

**Information you give us**

- Account details: name, email address, phone number, password (stored only as a secure hash) and profile details you choose to add.
- Academy details: institution name, logo, address and settings.
- Content: courses, lessons, quizzes, assignments, community posts and messages that you or your academy create.
- Contact and demo requests sent through our website forms.

**Information created when you use the service**

- Learning activity: enrolments, lesson progress, quiz attempts, grades, attendance and certificates.
- Transactions: orders, amounts, payment status and receipts. Card numbers and mobile-wallet PINs are entered on the payment provider's page and never reach our servers.
- Technical data: IP address, browser and device type, sign-in times and security events (such as failed sign-in attempts), used to keep accounts safe.

## How we use information

- To provide the platform: create accounts, run courses and live classes, grade work and issue certificates.
- To process payments and send receipts and invoices.
- To keep the service secure: detect suspicious sign-ins, enforce password and two-factor rules, and prevent abuse.
- To send service messages, such as class reminders, account notices and changes to these policies.
- To answer support, sales and demo requests.
- To improve the product using aggregated, non-identifying usage statistics.

We do **not** sell personal information, and we do not use student data for advertising.

## Payments

Payments are processed by **bKash**, **SSLCommerz** and **Stripe**. When you pay, you share your payment details directly with that provider under its own privacy policy. We receive only what is needed to record the transaction, such as the amount, status, a transaction reference and, for cards, the last four digits.

## Sharing information

We share personal information only:

- **With the academy** you learn at or work for, as part of the service.
- **With service providers** that help us run ${LEGAL.company} — for example hosting, database, email delivery, file storage, video meeting (Zoom or Google Meet) and payment providers — under agreements that limit their use of the data.
- **When required by law**, or to protect the rights, safety and security of our users and the public.
- **In a business transfer**, such as a merger, where this policy continues to apply to your information.

## Cookies and local storage

We use essential cookies and browser storage to keep you signed in, remember preferences (for example, a dismissed announcement) and protect forms from spam. We do not use advertising cookies.

## How long we keep information

We keep account and academy data while the workspace is active. When an academy closes its workspace, its data is deleted or anonymised after a reasonable period, except where we must keep records — for example invoices — to meet legal or accounting obligations. Backups are overwritten on a rolling schedule.

## Security

We protect data with encrypted connections (HTTPS), hashed passwords, optional and enforceable two-factor sign-in, role-based permissions, account lockout after repeated failed sign-ins, activity logs and regular backups. No system is perfectly secure, so please use a strong password and keep it private.

## Your choices and rights

You can view and update most account details from your profile. You may also ask us to:

- give you a copy of your personal information;
- correct inaccurate information;
- delete your account and personal information, where we are not required to keep it.

Students should send requests about academy-held data to their academy; we will help the academy respond. To contact us, use our [contact form](${LEGAL.contactPath}).

## Children

Many students are under 18. Academies are responsible for obtaining any consent required from parents or guardians before enrolling a child, and for the content they share with students.

## Changes to this policy

We may update this policy as the service changes. We will post the new version here with a new "last updated" date and, for significant changes, notify account owners by email or in the admin panel.

## Contact us

Questions about this policy or your information? Send us a message through the [contact form](${LEGAL.contactPath}) and choose **Support**.`,
};
