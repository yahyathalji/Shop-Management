I put these links with an example.

    Customers:
    1- add new Customer 
    2- get all customer
    3- get single customer by id
    4- update\edit customer by id
    5- delete customer by id 


             HTTP Methods |  URL
         1-  POST         |  http://localhost:3000/api/customer/addCustomer
         2-  GET          |  http://localhost:3000/api/customer/allCustomers
         3-  GET          |  http://localhost:3000/api/customer/getCustomer/1
         4-  PUT          |  http://localhost:3000/api/customer/editCustomer/1
         5-  DELETE       |  http://localhost:3000/api/customer/deleteCustomer/1

you can trail this for example

     {
        "firstName":"Yahia",
        "lastName":"Jaradat",
        "address":"H-sa'ir",
        "phoneNumber":"0001110000",
        "email":"yahia@test.edu",
        "dateOfBirth":"2001-3-18"
    }
------------------------------------------------------------------------------------------------------------------------------------------------------------

    Employee:
    1- add new employee 
    2- get all employee
    3- get single employee by id
    4- update\edit employee by id
    5- delete employee by id 


             HTTP Methods |  URL
         1-  POST         |  http://localhost:3000/api/employee/addEmployee
         2-  GET          |  http://localhost:3000/api/employee/allEmployees
         3-  GET          |  http://localhost:3000/api/employee/getEmployee/1
         4-  PUT          |  http://localhost:3000/api/employee/editEmployee/1
         5-  DELETE       |  http://localhost:3000/api/employee/deleteEmployee/1

you can trail this for example

          {
              "firstName":"Mohammad",
              "lastName":"Amir", 
              "gender":"male",
              "birthDate":"1992-08-08"
          }
------------------------------------------------------------------------------------------------------------------------------------------------------------
      Prouduct:
      1- add new prouduct 
      2- get all prouduct
      3- get single prouduct by id OR category
      4- update\edit prouduct by id OR category
      5- delete prouduct by id OR category


             HTTP Methods |  URL
         1-  POST         |  http://localhost:3000/api/product/addProduct
         2-  GET          |  http://localhost:3000/api/product/allProducts
         3-  GET          |  http://localhost:3000/api/product/getProduct?category=clothing
         4-  PUT          |  http://localhost:3000/api/product/editProduct?category=clothing
         5-  DELETE       |  http://localhost:3000/api/product/deleteProduct?category=clothing

you can trail this for example

    {
        "category":"clothing",
        "price":15,
        "quantity":30
    }
------------------------------------------------------------------------------------------------------------------------------------------------------------
        Orders:
        1- add new order 
        2- get all order
        3- get single order by id
        4- delete order by id


             HTTP Methods |  URL
         1-  POST         |  http://localhost:3000/api/order/addOrder
         2-  GET          |  http://localhost:3000/api/order/allorders
         3-  GET          |  http://localhost:3000/api/order/getOrder/1
         4-  DELETE       |  http://localhost:3000/api/order/deleteOrder/1

 you can trail this for example
 
      {
          "empId": 1,
          "custId": 1,
          "products": [
              {
                  "category": "electronics",
                  "quantity": 1
              },
              {
                  "category": "clothing",
                  "quantity": 1
              }
          ]
      }

------------------------------------------------------------------------------------------------------------------------------------------------------------
