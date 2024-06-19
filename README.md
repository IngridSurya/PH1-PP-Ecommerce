# PH1-PP-Ecommerce

## Register Page :
1. Input Full name
2. Input Username
3. Input Password
4. Input Address
5. Input Email address
6. Input Role User (radio button seller / buyer)
7. Feature send email notification

## Login Page :
1. Input Username
2. Input Password
3. Link to Register

## Seller Page :
1. List product in card, link to Detail Product
2. Feature Create product
3. Feature Update product: description, stock, price
4. Feature Delete product

## Home Page :
1. Feature Login
2. Feature search by name
3. Filter product by category (back to Home Page)
4. ~~Link to Cart~~
5. ~~Link to Wishlist~~
6. Link to History Pembelian
7. Products (Card :name,price,imageUrl,quantity_purchased,stock; ~~Add to Wishlist, Add to Cart~~) sort by stock asc

~~## Wishlist Page :~~
~~1. Products (name,price,imgUrl,quantity_purchased,stock, Add to Cart), if last/empty stock, show last/empty stock~~

~~## Cart Page :~~
~~1. Per Item :~~
~~(~~
        ~~1. Show product information~~
        ~~2. Input quantity WTB. When 0, remove from cart~~
~~)~~
~~2. Total price~~
~~3. Link to buy (insert into BuyingHistory from cart, clear products at cart)~~


## Model
- Product: name,price,stock,description,category,imageUrl
- Category: name
- User: userProfileId,username,password,role
- BuyingHistory: productId,userId,quantity
- UserProfile: fullName,address,email
~~- Wishlist~~
~~- Cart~~
