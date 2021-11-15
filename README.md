Source: [Medium](https://zonito.medium.com/all-about-my-personal-website-zonito-com-f997b7ea7cfd?source=user_profile---------0-------------------------------)

We all have a lot to share, and for that, we use blogs, vlogs, and on many other different platforms, we share additional content. Then why Personal Website? To aggregate these content in one place, with extra organizable creative skills. That's the intention of my website, i.e., [zonito.com](https://zonito.com)

Before I start with `README.md`, A special shoutout about [Brian](https://brianlovin.com/) for allowing us to use his [Personal Website source code](https://github.com/brianlovin/briOS).

**Tech Stacks**

Bring your friends,

| **Tech** | **Why?** |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org/) | TypeScript is a superset of JavaScript that has optional typing and compiles to plain JavaScript. |
| [NextJS](https://nextjs.org/) | One stop shop for all a developer need to build a dynamic website |
| [Cypress](https://www.cypress.io/) | For integration testing |
| [Jwt](https://jwt.io/) | To sign and verify access token |
| [Prisma](https://www.prisma.io/) | A wonderful framework to communicate with the database and great addon with nextjs and typescript. |

![Brief about Personal Website](https://cdn-images-1.medium.com/max/1200/1*KsVQ19G5zPI4U5zGaHQl-w@2x.png)

**External Integrated Services**

1.  **[Auth0](https://auth0.com/)**: Outsource your login feature to Auth0 and integrate it within 15 mins. It supports most social providers to integrate. And it's Free for a small set of users.
    
2.  **[ImgBB](https://imgbb.com/)**:To upload your image files programmatically. Used in adding new Stack in the website. Free up to 32 MB, enough for your stack icons.
    
    ```typescript
    async function uploadFile({ file }) {
      const data = new FormData()
      data.append('image', file)
      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`
      const upload = await fetch(url, {
        method: 'POST',
        body: data,
      }).then((r) => r.json())
      return upload?.data?.url
    }
    ```
    
3.  **[GraphCDN](https://graphcdn.io/)**: To reduce your graphql API production traffic. GraphCDN caches your API request and serves it from different edge servers. Again, Free to use for limited traffic.
    
4.  **[Planet scale](https://planetscale.com/)**: Setup your Serverless Relational Database in a few minutes. Free to use up to 10 GB storage/month. A great gift to a community that wants to build a small POC without setting up an account in GCP / AWS / Azure and paying anything for the same.
    
5.  **[Revue](https://www.getrevue.co)**: Another excellent service to manage your subscribers for sending newsletters to them. 
    
6.  **[Vercel](https://vercel.com/)**: An excellent platform to host your nextjs application.
    
7.  **[PostMark](https://postmarkapp.com/)**: To send verification email to registered users.
    
8.  **[Git Workflow / Action](https://github.com/features/actions)**: To automate vercel deployment, graphcdn schema push, cypress integration test, and code analysis.
    

**Total Cost: 0**: Power of open source project and competition. All of these tools are very easy to scale with a few extra bucks.
