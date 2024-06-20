# PH1-PP-Ecommerce

## Register Page : (Route#1)
1. Input full name
2. Input username
3. Input password
4. Input address
5. Input email address
6. Input role user (radio button seller / buyer)
7. Button cancel
8. Feature send email notification

## Login Page : (Route#2)
1. Input username
2. Input password
3. Button cancel
4. Link to register (Route#3)

## Seller Page : (Route#4)
1. List product in card, link to detail product (Route#5 perlu??)
2. Feature create product (Route#6)
3. Feature update product: description, stock, price (Route#6)
4. Feature delete product (Route#7)
5. Button back to home page (Route#8)

## Home Page : (Route#8)
1. Feature logout (Route#8)
2. Feature login (Route#2)
3. Feature search by name (Route#8) ==done==
4. Filter product by category (back to Home Page) (Route#8) ==done==
5. ~~Link to Cart~~
6. ~~Link to Wishlist~~
7. Link to user profile (Route#9)
8. Products (Card :name,price,imageUrl,quantity_purchased,stock; ~~Add to Wishlist, Add to Cart~~) sort by stock asc, show only products with stock > 0

~~## Wishlist Page :~~
~~1. Products (name,price,imgUrl,quantity_purchased,stock, Add to Cart), if last/empty stock, show last/empty stock~~

~~## Cart Page :~~
~~1. Per Item :~~
~~(~~
        ~~1. Show product information~~
        ~~2. Input quantity WTB. When 0, remove from cart~~
~~)~~
~~2. Total price~~
~~3. Link to buy (insert into PurchaseHistory from cart, clear products at cart)~~

## User Profile Page: (Route#9)
1. User profile (username, password, role, full name, address, email)
2. List Purchase History in card, all (product name, qty, price) and total price
3. Button back to home page (Route#8)



## Model
- Product: name,price,stock,description,category,imageUrl
- Category: name
- User: userProfileId,username,password,role
- PurchaseHistory: productId,userId,quantity
- UserProfile: fullName,address,email
~~- Wishlist~~
~~- Cart~~
