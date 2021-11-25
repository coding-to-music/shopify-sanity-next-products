# Headless Ecommerce Tutorial with (Sanity and) the Shopify API

https://www.sanity.io/guides/headless-ecommerce-with-sanity-and-shopify-api#b6470bce4b32

By Jamie Bradley

# Quick Start


# Introduction
One of my favorite things about Jamstack is the ability to drip-feed third-party services into your website through APIs. We have seen a huge increase in "headless" content services, such as Sanity, but today I want to talk about headless commerce.

Headless commerce, much like a headless CMS, is the process of abstracting your front end away from a monolithic e-commerce system (such as Shopify). So instead of creating a Shopify Theme, you can create a website in Next, Gatsby, Nuxt, 11ty, vanilla javascript...anything that can consume an API!

## Shopify and Sanity logos
Why should you use a headless e-commerce system?

As developers, we get a better experience. We can develop websites with tools we are most comfortable with, rather than being constrained to a platform's theming standards.

With this flexibility, our user also gets a better experience. We can use the likes of Jamstack to deliver fast, secure, and scalable websites.

## What we'll be building today

In this article, we are going to create a website with Next.js. We will create a headless Shopify Store using Shopify's Storefront API and combine this with data from an instance of Sanity.

Our end product will be an online store that contains content (that is managed through Sanity) and a list of products from a "Featured" collection. Each product will contain a "Buy Now" button that will take our customers straight to a checkout that is generated by the Storefront API.

You can find the repository for the end product here and a hosted example here.

## Create project directory

```java
mkdir shopify-sanity-next-products
cd shopify-sanity-next-products
```

## create file .gitignore
```java
# Mac files
.DS_Store

# Dependency directories
/node_modules

.env.development
*.lock
.vscode/
.idea/

# lerna files
/lerna-debug.log
```

## Let's install Next.js

Before we get hands-on with code, we need to start by setting up the tools that we will use for this project. We're going to use Next.js to develop the front-end layer of our app, so we'll start there.

The quickest way to get started with Next.js is to use create-next-app. Start by creating an empty folder. Next, navigate to the new folder in your terminal and run one of the following commands:

```java
npx create-next-app
# or
yarn create next-app
```

Psst: Don't have Node or NPM installed? There are some great instructions here to help you get started with installing Node and NPM on your computer. https://www.sanity.io/help/a5f6caba-53c9-4a9f-96ef-1bd1ae8f5c10

The `create-next-app` tool will ask you to provide a name for your Next App. For the purpose of this guide, please call it `web`. Once `create-next-app` is complete, you should have a file structure similar to the screenshot below:

Example file structure 
```java
drwxrwxr-x   6 tmc tmc  4096 Nov 24 08:35 web/
drwxr-xr-x   4 tmc tmc  4096 Nov 24 08:34 ./
drwxrwxr-x   8 tmc tmc  4096 Nov 24 07:44 .git/
-rw-r--r--   1 tmc tmc   134 Nov 24 07:36 .gitignore
-rw-r--r--   1 tmc tmc 30194 Nov 24 07:27 README.md
drwxr-xr-x 173 tmc tmc 12288 Nov 24 07:00 ../
```
A screenshot showing our example file structure

## Spicing up styles with Tailwind
The examples in this guide include components that have been developed with Tailwind CSS. Please follow the latest instructions from Tailwind's website here to install Tailwind in your Next.js application. https://tailwindcss.com/docs/guides/nextjs#setting-up-tailwind-css


## Install Tailwind via npm
Install Tailwind and its peer-dependencies using npm:

```java
cd web

# If you're on Next.js v10 or newer
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```


## Create your tailwind configuration files
Next, generate your tailwind.config.js and postcss.config.js files:

```java
npx tailwindcss init -p
```

This will create a minimal tailwind.config.js file at the root of your project:

```java
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Learn more about configuring Tailwind in the configuration documentation. https://tailwindcss.com/docs/configuration

## Getting started with Sanity
With the front-end ready to go our next job is to create a local instance of Sanity's Studio. This is the application we will use to manage page content outside of Shopify.

### Installing the studio
The best way to get started with Sanity is to use Sanity's CLI tool. If you don't already have this, you can install the tool by running the following command in your terminal:

```java
cd ..

npm install -g @sanity/cli
```

Upon completion of the installation, you will have access to a new terminal command called sanity - you can run sanity help to see a list of available commands from this tool.

To create a new studio, run `sanity init` after running this command you should see something like this:

## A screenshot showing the options presented to you when running sanity init
A screenshot showing the options presented to you when running sanity init
Note: If you aren't already logged into your Sanity account then you will be asked to log in or create an account with Sanity before seeing these options.

Select `Create new project` from the list of options and give your project a name (this is the name that will be allocated to your project in your Sanity account dashboard).

Next, you will be asked about datasets. For the purpose of this guide, you can go ahead and use Sanity's default configuration by entering Y then pressing enter.

Sanity will now ask you for a Project Output Path. To stay in line with this guide, enter the word `studio` and hit enter. You will see that Sanity has updated the Project Output Path to use the folder name studio as per the screenshot below:

## A screenshot showing a list of Sanity Studio templates 
A screenshot showing a list of Sanity Studio templates
Finally, when presented with the Project Template options, please select the `Clean project with no predefined schemas` option.

Selected Options
```java
You are setting up a new project!
We will make sure you have an account with Sanity.io. Then we will
install an open-source JS content editor that connects to
the real-time hosted API on Sanity.io. Hang on.

Press ctrl + C at any time to quit.

Prefer web interfaces to terminals?
You can also set up best practice Sanity projects with
your favorite frontends on https://sanity.io/create

Looks like you already have a Sanity-account. Sweet!

? Select project to use Create new project
? Your project name: Shopify Sanity Next Products
Your content will be stored in a dataset that can be public or private, depending on
whether you want to query your content with or without authentication.
The default dataset configuration has a public dataset named "production".
? Use the default dataset configuration? Yes
✔ Creating dataset
? Project output path: /mnt/ap/ap/shopify-sanity-next-products/studio
? Select project template Clean project with no predefined schemas
✔ Bootstrapping files from template
✔ Resolving latest module versions
✔ Creating default project files

✔ Saved lockfile

Success! Now what?

▪ cd /mnt/ap/ap/shopify-sanity-next-products/studio, then:
▪ sanity docs to open the documentation in a browser
▪ sanity manage to open the project settings in a browser
▪ sanity help to explore the CLI manual
▪ sanity start to run your studio

```

After selecting this option, Sanity will proceed with the installation and initialisation of the studio. Once this is complete you should now have a project folder with a structure like this:

```java
sudo tree  -L 2
.
├── README.md
├── studio
│   ├── README.md
│   ├── config
│   ├── node_modules
│   ├── package.json
│   ├── plugins
│   ├── sanity.json
│   ├── schemas
│   ├── static
│   ├── tsconfig.json
│   └── yarn.lock
└── web
    ├── README.md
    ├── next.config.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── pages
    ├── postcss.config.js
    ├── public
    ├── styles
    └── tailwind.config.js
```

```java
web/
  .git
  .gitignore
  README.md
  node_modules/
  package.json
  pages/
  public/
  styles/
  yarn.lock

studio/
  README.md
  config/
  node_modules/
  package.json
  plugins/
  sanity.json
  schemas/
  static/
  tsconfig.json
  yarn.lock
```

## Let's build the Schema
Before we start working on the Next.js code we're going to dive into Sanity and set up the schema for our website. The primary focus for this tutorial is the homepage, so we're going to create a singleton document (or "one-off"). This is a great opportunity to see Sanity's flexibility with the Structure Builder. https://www.sanity.io/docs/structure-builder-typical-use-cases

First, we need to create the homepage document. Start by creating a file called `homepage.js` within your `studio/schemas` folder. Take the contents of this snippet and add it to the `homepage.js` file.

```java
// studio/schemas/homepage.js

export default {
  name: "homepage",
  title: "Homepage",
  type: "document",

  // These actions define what users can do with this document.
  // Notice how "delete" is not available in this array.
  // This means, users can't delete this document
  // from within the studio
  __experimental_actions: ["update", "create", "publish"],

  fields: [
    {
      title: "Hero Title",
      description:
        "This title will appear in the hero unit at the top of the page",
      type: "string",
      name: "heroTitle",
    },
  ],
};
```

Next, we need to tell Sanity to include the homepage document within the Studio's schema. We can do this by importing the new object into studio/schemas/schema.js and appending it to the schemaTypes array like so:

```java
// studio/schemas/schema.js

// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import homepage from './homepage'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    homepage
  ]),
})
```

Before we look at the structure builder, let's take this opportunity to make sure everything is working. If you haven't already, run sanity start from your studio's directory in the terminal and navigate to localhost:3333 in your browser. If all is well, you should see a screen similar to the screenshot below.

 
This is great, but to give our editor the required behavior for managing a "one-off" document, we need to modify the Desk tool.

## Defining Parts

There is a fantastic Sanity guide about the parts system. https://www.sanity.io/docs/parts For now, all we need to know is that we are going to use this system to customize our Desk.

From the studio folder, open sanity.json and take a look at the parts array, it should look something like this:

```java
// studio/sanity.json

"parts": [
  {
    "name": "part:@sanity/base/schema",
    "path": "./schemas/schema"
  }
]
```

By default, the studio uses the schema part to read the schema definitions that we declare in schema.js.

We're now going to add an extra object to this array like so:

```java
// studio/sanity.json

"parts": [
  {
    "name": "part:@sanity/base/schema",
    "path": "./schemas/schema"
  },
  {
    "name": "part:@sanity/desk-tool/structure",
    "path": "./deskStructure.js"
  }
]
```

Next, we need to create the file that we will use to define our desk structure. This will be a file called deskStructure.js that is located in the root of our studio directory.

Let's create that file and include the following code:

```java
// studio/deskStructure.js

import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Menu")
    .items([
      S.listItem()
        .title("Homepage")
        .child(
          S.editor()
            .id("homepage")
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["homepage"].includes(listItem.getId())
      ),
    ]);
```

Here, we are importing the Sanity Structure Builder package. We use this package to define what we want to display in the Desk view. More specifically, we are using the listItem() method to replace the default list item for the homepage document with a custom one. For instance, we can modify the title and customize some of the editor properties for this document type.

Restart the local Sanity dev server and head back to your Studio. You should see a page similar to the one from the screenshot below.

 
Before moving on to integrating Sanity with Next, open your studio, and add a title to the homepage document.

## Building the Homepage
We're going to set up a dedicated file that will be used to handle the fetching of data from Sanity.

First, let's navigate to our `web` folder and install the next-sanity package.

## Run this command from the web/ directory! ##

```java
# NPM
npm i next-sanity

# Yarn
yarn add next-sanity
```

Create a new folder within the `web` directory called `lib/`. 

```java
mkdir web/lib

touch web/lib/sanity.js
```

Within this folder, create a file called `sanity.js` and insert the following code:



```java
// web/lib/sanity.js

import {
  groq,
  createClient,
} from "next-sanity";

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",

  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
```

Notice that we are referencing some environment variables here. You will need to create a file called .env.local that includes the following variables:

```java
# web/.env.local

NEXT_PUBLIC_SANITY_PROJECT_ID="<project-id>"
SANITY_API_TOKEN="<token>"
```

We need to replace the values with a project ID and API token. Both of these can be retrieved from your Sanity project dashboard.

For more information on next-sanity and the api.js file, take a look at the Github repository for next-sanity

## Writing the Markup & Mapping Content
Go to your web folder and open pages/index.js, replace the content with the following:

```java
// web/pages/index.js

import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity";

const homepageQuery = groq`*[_type == "homepage"]{
  heroTitle
}[0]`;

function HomePage({ data }) {
  const { homepageData } = data;

  return (
    <main className="bg-gray-50">
      <div className="h-96 bg-indigo-500 flex justify-center items-center">
        <h1 className="text-white font-semibold text-6xl">
          {homepageData?.heroTitle}
        </h1>
      </div>

      <section className="container mx-auto py-12">
        <h2 className="font-semibold text-4xl mb-8">Featured Products</h2>

        <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-8">
          <article className="text-center bg-white rounded-xl p-8 md:p-0 shadow-md pt-6 md:p-8 space-y-8">
            <Image
              src="https://images.pexels.com/photos/218763/pexels-photo-218763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              width="150"
              height="150"
              alt="A pair of slippers"
              className="rounded-full"
            />

            <p className="text-lg font-semibold text-2xl">A Pair of Slippers</p>

            <div className="font-medium">
              <Link href="/">
                <a className="bg-gray-100 text-gray-800 px-6 py-2 rounded block">
                  View Product
                </a>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

export async function getStaticProps() {
  const homepageData = await getClient().fetch(homepageQuery, {});

  return {
    props: {
      data: {
        homepageData,
      },
    },
  };
}
```

With this code, we are using the Next.js getStaticProps method to retrieve data from Sanity at build time. The data we retrieve is assigned to a property called homepageData. We send this property to our page component as part of a prop called data.

Since we are using Next Image, you will need to allow Next to download the placeholder image from https://images.pexels.com. Whilst we are here, we will tell Next.js to download images from Shopify, this will be useful later.

You can do this by creating a file called next.config.js and entering the following code:

```java
// web/next.config.js

module.exports = {
  images: {
		domains: ["images.pexels.com", "cdn.shopify.com"],
  },
};
```

Start your application by running next dev or the dev script in package.json (from within the web/ directory) and you should see a page that looks very similar to the screenshot below.

 
## How to retrieve data from Shopify
First, we need to get a Storefront Access Token from Shopify. If you already have a Storefront token, with the correct permissions, then feel free to skip this step.

You will need access to a Shopify store. A live store will work fine, but if you're just playing around then I would suggest creating a development store.

You can create a development store with a Shopify Partner Account. If you don't have an account then click here to register. Creating a Partners Account means that you will have access to a fully-featured store without having to sign up for a free trial.

## Getting a Shopify Storefront Access Token
Once you have access to a store, you need to log into the Shopify Admin and create a Shopify App. You can do this by visiting your store's URL (which will look like https://your-store-name.myshopify.com/admin) and clicking on the "Apps" link from the left-hand navigation bar. This will take you to the Apps page. Scroll to the bottom of this page and locate the following text "Working with a developer on your shop? Manage private apps", click "Manage private apps".

 
Note: If you have not created a Private App on this store before, you will be asked a series of questions regarding terms and conditions surrounding Private Apps on Shopify. You will have to agree to the terms before continuing.

If all is well you will be presented with the Private Apps page. Click on the button labeled "Create new private app" which is situated at the top right-hand side of the page.

 
Fill out the fields in the "App Details" section, then scroll to the bottom of the page and look for a checkbox with a label that contains the text "Allow this app to access your storefront data using the Storefront API". Then, click this checkbox.

Selecting this checkbox tells Shopify that you intend to use the Storefront API as part of your private app. Ensure the following permissions are selected:

- Read products, variants, and collections
- Read product tags
- Read inventory of products and their variants
- Read and modify checkouts
 
Once you have selected these options, click the save button located at the top right-hand side of the screen.

If all is well, the page will refresh. Scroll to the bottom of the private app page and locate the "Storefront API" section. At the bottom of this section, you will see a text field labeled "Storefront access token". We will use this access token to handle authentication with the Shopify Storefront API, so keep this page open.

## Add products to Shopify
At the moment, our homepage is returning a single product card that contains hardcoded data. In this part of the tutorial, we're going to add a product to our instance of Shopify and assign it to a collection.

In Shopify, a collection is a group of products. You can assign many products to a collection and a product can be assigned to more than one collection.

Head over to your instance of Shopify and click the "Products" link that is located in the navigation bar on the left-hand side.

If you have no products in your store, then go ahead and add some. For the purpose of this demonstration, I have created a single product with no variants.

 
Once the products have been added, we need to create a collection. Click on the "Collections" link from the sidebar.

Give your collection the name of "Homepage" and scroll down to the Collection Type section. Shopify gives you the ability to create automated collections. This is a pretty cool feature that you can read more about here. But, for the purpose of this tutorial, we are going to create a Manual collection.

Select the radio button labeled "Manual collection".

 
Once you have done this, ensure the Private App you created earlier is selected within the "Collection availability" section at the top of the page. If this option is unchecked, then you won't be able to request the collection from the API.

Save the collection and wait for the page to reload. You will now see a section called "Products". In this section, you can locate products from your store's inventory and assign them to the collection.

Go ahead and search for the products you created earlier. Add them to the collection and wait for the collection to update (this should happen asynchronously as you add products).

 
## Displaying products in Next.js
As we did with the Sanity content, we now need to map the products from Shopify into our homepage. This process is very similar to what we did earlier. However, unlike Shopify Admin's REST API, the Storefront API is a GraphQL API. This means we need to write API queries with the GraphQL syntax.

Let's start by installing some new dependencies.

We're going to install a package called graphql-request. This is a minimal GraphQL client that can be used in both Node and browser-based environments. Install the package with NPM or Yarn respectively:

## Run this from the web/ folder! ##

# NPM
npm i graphql-request graphql

# Yarn
yarn add graphql-request graphql

Before we write some GraphQL queries, it would be a good idea to store our Shopify Endpoint URL and access token as environment variables. Your URL will look something like this: https://your-store-name.myshopify.com.

Open the .env.local` file that you created earlier and include the following variables. Be sure to replace my placeholder values with your actual values.

# web/.env.local

```java
# Shopify Config
NEXT_PUBLIC_SHOPIFY_URL="replace-with-url"
NEXT_PUBLIC_TOKEN="replace-with-token"
```

Restart your dev server after making the changes and head back to the pages/index.js file to import the new dependencies.

```java
// web/pages/index.js
import { gql, GraphQLClient } from "graphql-request";
```

Now, we're going to make the following changes to getStaticProps(). This is where we will use our new environment variables.

```java
// web/pages/index.js

export async function getStaticProps() {
  const homepageData = await getClient().fetch(homepageQuery, {});
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_SHOPIFY_URL, {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN,
    },
  });

  // Shopify Request
  const query = gql`
    {
      collectionByHandle(handle: "homepage") {
        id
        title
        products(first: 12) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    altText
                    transformedSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    props: {
      data: {
        homepageData,
        collection: res.collectionByHandle,
      },
    },
  };
}
```

Let's walk through the changes we have made.

First, we are creating a new instance of the GraphQLClient class and assigning it to a variable called graphQLClient. You will see that we are assigning a header to our request client called X-Shopify-Storefront-Access-Token. This is a required header that Shopify uses to authenticate your request.

In our query, we are requesting the first twelve products from the Homepage collection. The first and after params are used for pagination. These numbers can be adjusted accordingly, but twelve is the maximum number of products I want to show on the homepage. As part of our request for products, we are also requesting the first product image and product variant.

## A quick note on variants
There are a number of mutations in the Storefront API that require the use of a product's variant ID. For example, checkoutCreate, is something we will look at later. For simplicity, the product cards we create will display the first available variant. There may be occasions where a vendor stocks products with a single variant. For example, a vendor who sells artwork. In this case, you still have to present a variant ID to these mutations. Shopify will give you a variant ID (even if the product does not have any variants). This is something that has confused me in the past, so I wanted to share this with you to avoid making the mistakes I made when learning these APIs!

Now, using graphql-request we can perform our request to the Storefront API and pass the response into the data object that will be passed to the page as a prop.

If all is well, you will see that your page has rebuilt successfully. However, we still need to update the UI to use present the data from Shopify.

Now let's make some changes to the homepage template.

```java
// web/pages/index.js

function HomePage({ data }) {
  const { homepageData, collection } = data;

  return (
    <main className="bg-gray-50">
      <div className="h-96 bg-indigo-500 flex justify-center items-center">
        <h1 className="text-white font-semibold text-6xl">
          {homepageData.heroTitle}
        </h1>
      </div>

      {collection?.products?.edges.length > 0 && (
        <section className="container mx-auto py-12">
          <h2 className="font-semibold text-4xl mb-8">Featured Products</h2>
          <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-8">
            {collection.products.edges.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </section>
      )}
    </main>
  );
}
```

You should see an error regarding the <ProductCard> component. That's because we haven't created it yet so let's do that!

Create a folder in the root of your project called components/, then create a file called ProductCard.jsx and place the following code within the file.

```java
// web/components/ProductCard.jsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <article
      className="text-center bg-white rounded-xl p-8 shadow-md pt-6 md:p-8 space-y-8"
      key={product.node.id}
    >
      {product.node.images && (
        <Image
          src={product.node.images.edges[0].node.transformedSrc}
          width="125"
          height="125"
          alt={product.node.images.edges[0].node.altText}
          className="rounded-full"
          objectFit="cover"
        />
      )}

      <p className="font-semibold text-2xl">{product.node.title}</p>

      <div className="font-medium">
        <Link href="/">
          <a className="bg-gray-100 text-gray-800 px-6 py-2 rounded block">
            View Product
          </a>
        </Link>
      </div>
    </article>
  );
}
```

Remember to import the <ProductCard /> component into /pages/index.js. With this imported, you should now see that the collection section contains products from your Shopify instance!

## How will users navigate to the checkout?
To wrap things up, we're going to make some changes to our product card. We're going to introduce a function that will generate a Shopify checkout via the API. To accomplish this, we'll use a Storefront GraphQL Mutation called checkoutCreate.

First, let's add a button above the "View Product" link:

```java
// web/components/ProductCard.jsx

<div className="font-medium">
  <button
		onClick={() => createCheckout(product.node.variants.edges[0].node.id)}
    disabled={loading}
    className={`bg-indigo-500 text-white px-6 py-2 rounded block mb-4 w-full ${
      loading && "opacity-70 cursor-not-allowed"
    }`}
  >
    {loading ? "Please Wait..." : "Buy Now"}
  </button>

  <Link href="/">
    <a className="bg-gray-100 text-gray-800 px-6 py-2 rounded block">
      View Product
    </a>
  </Link>
</div>
```

Next, we're going to write our function that will call the storefront mutation. Insert the following function within your ProductCard.jsx file.

```java
// web/components/ProductCard.jsx

/**
 * Create Checkout Function
 * Creates a shopify checkout url and redirects customer
 * to the Shopify checkout page.
 * @param {string} variantId
 */
async function createCheckout(variantId) {
  setLoading(true);

  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_SHOPIFY_URL, {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN,
    },
  });

  const mutation = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [
        {
          variantId,
          quantity: 1,
        },
      ],
    },
  };

  const res = await graphQLClient.request(mutation, variables);

  if (res.checkoutCreate.checkoutUserErrors.length > 0) {
    setLoading(false);
    alert("There was a problem processing the request.");
  } else {
    router.push(res.checkoutCreate.checkout.webUrl);
  }
}
```

The function we have created is posting a GraphQL Mutation to the Storefront API. The mutation we are using is called checkoutCreate. If you take a closer look at the mutation string, you can see that we are defining a variable called $input:

```java
// web/components/ProductCard.jsx

const mutation = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      ...
```

With the GraphQL Request package, we can pass variables through to the request as an object. You will notice that we have created a variable called variables which contains the input object that Shopify needs in order to generate the checkout.

Finally, we specify that the mutation returns a property called webUrl. This is the checkout URL that we can redirect customers to in order to purchase a product.

## Conclusion
Well done! Now you have a headless cms/commerce solution that you can build on or use as a foundation for future projects. There are various ways that you can build on this, why not try some of these extras?

Create product landing pages with Next dynamic routes and the Shopify API.
Use React context to create a basket that customers can add products to. Then, using the basket data, you can create a with the from the basket.
Consider ways you can make use of Sanity for powerful marketing material on your sites such as carousels, feature sections, or landing pages.
Perhaps you can try upselling products as part of the blog on your website. I created a Sanity plugin to help with scenarios such as this.
Thank you for taking the opportunity to read through this tutorial. If you have any questions then please feel free to find me on Twitter (I use the handle @jamiebradley234) or amongst the Sanity Slack!