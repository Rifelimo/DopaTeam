# Deployment and collaboration

## Public website

The first website is the standalone project explanation in `index.html`. It includes the interactive illustration and the pitch. The full application will be added in a later repository snapshot.

The deployment configuration uses Vercel’s static hosting. It needs no build command, dependency installation, database or environment variables. The `.vercelignore` file limits the upload to the public HTML and deployment configuration.

The target is a production website that can be opened without a Vercel login. Its public URL must be checked in a browser without an authenticated Vercel session before it is shared as a working deployment.

## Preview the upload

From the repository root, use an authenticated Vercel CLI:

```sh
vercel deploy --dry --format=json
```

The expected upload consists of `index.html` and `vercel.json`. Review that list before publishing.

After the project has been created in the intended Vercel account, a production deployment can be made with:

```sh
vercel deploy --prod --project statelens --scope krakras-projects
```

A prepared configuration is not a completed deployment. Record the returned production URL and verify the page and interaction after publication.

## Team access

A public website can be viewed without a team invitation. Editing the code is a separate permission: add the contributors as GitHub collaborators and have them accept their invitations.

Use a separate branch for each change and a pull request for review. A GitHub invitation does not grant access to the Vercel account or its other projects.

Vercel dashboard access is needed only for contributors who will manage deployments directly. Choose that access separately from GitHub collaboration. A Vercel Viewer role cannot configure or deploy the project. Direct deployment roles depend on the Vercel plan.

No repository integration or automated production release is established merely by adding these files. The publishing workflow should be agreed before enabling deployment triggers.
