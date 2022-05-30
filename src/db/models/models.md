## User

id int
username string
email string
password string
zipcode int

## List

id int
name string
owner int

## Member

listId int
userId int

## ListItem

id int
count int
itemId
price
inCart

## ListItemNote

userId int
listItemId int
text string

## Item

id int
brand int
style string
size string

## ItemType

id int
name string
category string
(this can be elaborated later)
