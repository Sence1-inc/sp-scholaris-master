import { PROVIDER_TYPE, STUDENT_TYPE } from "../constants/constants";

export const STUDENT_NEWSLETTER_DATA = {
  subject: "Thank you for subscribing!",
  content: `
    <h1>Thank You for Subscribing to the Scholaris Newsletter!</h1>
    <p>
      Stay ahead of the competition with exclusive access to the latest scholarships, application tips, and other exciting news delivered straight to your inbox.
    </p>
  
    <p>
      Scholaris will revolutionize how students discover life-changing scholarships. Stay tuned for the following features in store for aspiring scholars like you:
    </p>
  
    <ul>
      <li>A search portal for different kinds of scholarship opportunities:</li>
      <ul>
        <li>Academic</li>
        <li>Sports</li>
        <li>Creative</li>
        <li>Grants</li>
        <li>Financial</li>
      </ul>
      <li>
        Search for scholarships using advanced filters such as benefits, courses, locations, application dates, schools, and providers to find scholarships that align with your academic and personal interests.
      </li>
      <li>Learn more about the Scholarship Granting Organization (SGO) you're applying to by viewing their profiles.</li>
    </ul>
  
    <p>
      Stay tuned for what's ahead in the next few months for Scholaris. We look forward to being part of your academic success story. Welcome to the Scholaris community!
    </p> 
  `,
  user_type: STUDENT_TYPE
}

export const PROVIDER_NEWSLETTER_DATA = {
  subject: "Thank you for subscribing!",
  content: `
    <h1>Thank You for Signing Up for Scholaris!</h1>

    <p>
      Scholaris is a service that will revolutionize the way scholarship programs are implemented. This service will aid you in finding the best candidate for your scholarships, matching their inclinations, aptitudes, and competencies that suit your organization’s vision.
    </p>

    <p>
      As a Scholarship Granting Organization, we have the following features in store for the future:
    </p>

    <ul>
      <li>List scholarships open for applications</li>
      <li>Manage scholarship applications</li>
      <li>Search for your next scholar</li>
      <li>Invite students to apply for your scholarship</li>
    </ul>

    <p>
      There are also plans to streamline the experience of supervising scholarships through a management system where you will have more control in managing scholars, providing them with support, and disbursing scholarship grants.
    </p>

    <p>
      Stay tuned for what’s ahead in the next few months for Scholaris. We are proud that you will become part of something revolutionary for the education scene!
  </p>
  `,
  user_type: PROVIDER_TYPE
}