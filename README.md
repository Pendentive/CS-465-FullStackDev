## Introduction
The meanPhoto application is a three-tier MEAN stack solution that manages customer-facing pages and a dynamic admin system. It leverages an Express front-end, an API server, and an Angular admin interface to unify content creation and distribution. MongoDB, accessed through Mongoose, stores data in a schema-free manner, easing the integration of new features as the project grows.

## Architecture
meanPhoto relies on the MEAN stack (MongoDB, Express, Angular, Node.js). It is divided into three major parts:

1. Customer-Facing Express Front-End 
   • Built with Express and Express-Handlebars, serving routes and layouts dynamically.  
   • Uses front-end components (FEC) to unify how pages (e.g., landing, personal portfolio) are constructed.  
   • Renders each page by retrieving a page object from the API, parsing a list of FECs and mapping them to partial templates.

2. API Server (Express)  
   • Consumes and delivers data through RESTful routes, returning JSON objects containing pages, components, and image references.  
   • Allows updates for both the Express front-end and Angular admin, providing a shared structure, a page object, that includes FECs, such as text blocks, galleries, and repeaters.  

3. Angular Admin Front-End  
   • A single-page application (SPA) that loads page objects and dynamically sets up form-based editors.  
   • The PageEditorComponent reads a page’s array of components and renders individual edit components, such as EditGalleryHeroVertComponent.  
   • Submissions from these edit components are packaged into JSON and sent back to the API for storage.

## Data Flow
1. A customer visits the Express site and is routed to a page (e.g., “Landing Page” or “Portfolio Personal”).  
2. Express fetches the corresponding page object from the API.  
3. The API returns metadata (FEC arrays, images, and layout configurations), which Express uses to construct a final page with partial templates for each component type.  
4. Simultaneously, admin users log into the Angular app, select a page through a top-bar navigation, and retrieve the page object from the API.  
5. Each included FEC is displayed in a dedicated edit component, allowing quick edits (e.g., swapping images or adjusting text).  
6. Upon saving, the updated data is posted back to the API, which modifies MongoDB.  
7. The site updates automatically, reflecting changes in the FEC structure or its content.

## Functionality
• FEC (Front-End Components):  
  Modular objects that function as deployable page elements with unified interfaces, composed of anything from galleries to text blocks. Unique Identifiers let you reuse or swap out components easily across multiple pages.  

• Angular-based Edit System:  
  Within the PageEditorComponent, each FEC is represented by a form. This approach keeps the component logic centralized and allows for direct, item-by-item updates without confusing abstraction.  

• Page Publishing:  
  Once edits are saved, the API updates relevant FECs (e.g., GalleryHeroVert, RepeaterMenu). Express site refreshes reflect immediate changes without rebuilding the entire codebase.  

• Security:  
  Authentication and role checks ensure that unauthorized users cannot access, modify or remove existing data. User rolers also define available editable page access in the angular front-end. Guarded routes ensure data access and manipulation is confined behind authentication. 

## Testing
• Postman Tests  
  Ensures that CRUD operations work properly for pages, images, and special component fields such as repeating menus.  

• UI Smoke Tests  
  Verifies that the Angular admin app renders correct forms for each component (gallery, text blocks, etc.), sends data back properly, and that data is both accepeted by the API and updated in the database. 

• Security Checks  
  Confirm that routes require valid authentication tokens and that editors only modify allowed pages where permitted.

## Future Plans
In upcoming versions, "Dynamic pages" will be generated automatically based on a customers chosen FEC array, particular photos, and chose hbs template. As each template will know how to position each chosen FEC, each FEC will now how to display a given content, a user will be able to select what photos they enjoy, which FECs, display them, and what template for the FECs they enjoy most without touching the source code. The Angular admin interface will evolve to have a single, generalized function for editing any FEC, vastly simplifying how new components are added and manipulated. Pages in the top-bar selector will also be populated dynamically based on user role, removing the need for manual button creation. Additional search tools will let you find and modify FECs by image usage or component type, making large-scale updates (e.g., removing photos for legal reasons or batch-updating multiple galleries) more efficient.

By decoupling page structure from the rendered layout, meanPhoto aims to enable non-technical users to craft unique experiences while retaining a robust architecture for further expansions.