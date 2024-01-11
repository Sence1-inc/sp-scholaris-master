<!--
@@ This is the readme.md of Sence1 Inc - Scholarship Pooling Service Idea
-->
<a name="back"></a>

<!-- SP: Scholaris Logo -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SP: Scholaris</h3>

  <p align="center">
    A Scholarship Pooling Service Idea, a service product of Sence1 Inc.
    <br />
    <a href=""><strong>SP Documentation</strong></a>
    <br />
    <br />
    <a href="">SP Notion Notes</a>
    ·
    <a href="">SP Slack Channel</a>
  </p>
</div>

---

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#guides">Guides</a></li>
      </ul>
    </li>
    <li>
      <a href="#about-the-service-idea">About The Service Idea</a>
      <ul>
        <li><a href="#architecture-for-scholarship-pooling">Architecture For Scholarship Pooling</a></li>
      </ul>
    </li>
  </ul>
</details>

---

<!-- GETTING STARTED -->
## Getting Started

To start with the handling the project, make sure that you check the prerequisites and install necessary development tools. 
Once setup is complete, check the guides to start with the development. 

### Prerequisites

1. Download Docker via https://www.docker.com/products/docker-desktop/
2. Download MySQL Workbench via https://www.mysql.com/products/workbench/
3. Download Visual Studio Code via https://code.visualstudio.com/
   - Configure according to your desired settings (themes, fonts, linters, etc)
4. Install Git on your terminal

### Guides

_here are some guides when starting with the project_
_make sure that your github global details are set to avoid any roadblocks_

#### Installation
1. Clone the SP Repository
   ```
   git clone https://github.com/sence1-sp/sp-scholaris-master.git
   ```
2. Download all packages (npm node). Make sure your are in the correct folder.
   ```
   // run in the frontend folder
   npm install
   ```
3. Open Docker, build the docker, and up the containers
   ```
   // make sure to run this in the root folder
   docker compose build 
   docker compose up
   ```
4. Run migration files
   ```
   docker compose run backend rake db:migrate
   ```
5. Check if there are no errors on both http://localhost:5001 and http://localhost:3000
6. Happy coding!

#### Migration
1. Create migration file
   ```
   docker compose run backend rails generate migration YourMigrationName
   ```
2. Run migration file
   ```
   docker compose run backend rake db:migrate
   ```

<p align="right">(<a href="#back">back to top</a>)</p>

---

<!-- About the Service Idea -->
## About The Service Idea

The Scholarship Pooling Service Idea is created by Sence1 Inc. 

Scholarship Pooling Service Idea serves as a centralized platform where students can discover a comprehensive range of scholarships tailored to their academic achievements, talents, and personal circumstances. By pooling together various scholarships from different sources, we maximize accessibility and ensure that no deserving student is left behind.

Objectives:
1. Increase Accessibility: Provide a centralized platform that allows students from diverse backgrounds to easily access a wide range of scholarships, eliminating barriers and ensuring equal opportunities for all.
2. Streamline Scholarship Search and Application: Simplify the scholarship search process by offering a user-friendly interface, intelligent algorithms, and personalized recommendations based on each student's profile, increasing efficiency and saving time for applicants.
3. Maximize Scholarship Matchmaking: Connect students with scholarships that align with their unique qualifications, interests, and career goals, improving the chances of successful matches and increasing the overall number of awarded scholarships.
4. Enhance Transparency and Credibility: Partner with reputable scholarship providers, educational institutions, and organizations to ensure the authenticity and credibility of the scholarships listed on the app, fostering trust among students and stakeholders.
5. Provide Valuable Resources and Support: Offer comprehensive resources, such as essay writing tips, interview preparation guidance, and mentorship opportunities, to help students present themselves effectively and increase their competitiveness in the scholarship application process.
6. Foster a Community of Support: Create a supportive community within the app where students can connect with peers, mentors, and scholarship experts, facilitating knowledge sharing, networking, and mentorship opportunities.
7. Improve Application Success Rates: Provide guidance and support throughout the scholarship application process to increase the quality of applications and improve the success rates of applicants, leading to more students receiving scholarships.
8. Facilitate Collaboration with Educational Institutions: Establish partnerships with educational institutions to promote the app's usage and enable seamless integration with existing educational platforms, ensuring a wider reach and increasing engagement among students.
9. Track Impact and Measure Success: Implement analytics and reporting features to track the impact of the app, monitor scholarship awards, and gather feedback from users to continuously improve the app's functionality and effectiveness.
10. Empower Students' Educational Journey: Ultimately, empower students to pursue their educational aspirations by breaking down financial barriers, fostering a sense of community, and providing them with the necessary tools and resources to succeed academically and professionally.

These objectives can serve as a foundation for developing a scholarship pooling app that effectively connects students with scholarships, supports their application process, and creates a positive impact on their educational journeys.

<p align="right">(<a href="#back">back to top</a>)</p>

---

<!-- Architecture and Tech Stacks -->
### Architecture For Scholarship Pooling

Here are the technologies architecture of the Scholarhip Pooling Service Idea

#### Core
* [![Ruby][Ruby]][Ruby-url]
* [![React][React.js]][React-url]
* [![Rails][Rails]][Rails-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Typescript][Typescript]][Typescript-url]
#### DevOps
* [![Docker][Docker]][Docker-url]
* [![Kubernetes][Kubernetes]][Kubernetes-url]
* [![GithubActions][GithubActions]][GithubActions-url]
#### Testing 
* [![Jest][Jest]][Jest-url]
* [![RSpec][RSpec]][RSpec-url]

<p align="right">(<a href="#back">back to top</a>)</p>


---

<p align="center">All Rights Reserved | Sence1 Inc - Scholarship Pooling Service Idea</p>



<!-- Links, Images, Logos -->
[Scholaris Logo]: images/logo.png
[Ruby]: https://img.shields.io/badge/ruby-DD0031?style=for-the-badge&logo=ruby&logoColor=white
[Ruby-url]: https://www.ruby-lang.org/en/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Rails]: https://img.shields.io/badge/rubyonrails-D30001?style=for-the-badge&logo=rubyonrails&logoColor=white
[Rails-url]: https://rubyonrails.org/
[MySQL]: https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://mysql.com/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Kubernetes]: https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white
[Kubernetes-url]: https://kubernetes.io/
[GithubActions]: https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white
[GithubActions-url]: https://github.com/features/actions
[Jest]: https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[RSpec]: https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[RSpec-url]: https://rspec.info/
