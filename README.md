# MyStore Project Overview

MyStore is Angular application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process. 

## Setup Instructions
1. Download this git to your local machine.
2. Use your own IDE (eg. Visual Studio Code) and run `npm install` and `npm start` in the terminual to launch the application.

## Testing Instruction
1. Product viewing & add to cart workflow
   - The home page is the product list page. View, change quantity, and add any product to the cart.
   - Go to product detail page and view, change quantity and add product to the cart.
   - When adding item to the cart, the total quantity is reflected next to the cart link in the header.
2. Cart view & check out workflow
   = In the cart page, you can change quantity, or remove the product by changing quantity to 0. 
   - The total price should reflect the changes.
   - You can check out the cart if you are signed in.
   - The payment form should display any error message as you type.
   - The confirmation page shows the overview of your order. 
3. Sign in/up workflow
   - Sign in/up using the Sign In/Up link in the header
   - Once signed in, you should be able to view the profile page.
   - The cart content should be carried over if there is any before you signed in.

