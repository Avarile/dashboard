# Problems and Solution: My development log

#### 9/Apr 2022

- React refreshment basic logical explanation:

##### IMPORTANT!!!! explaining about the basic refresh logic of REACT components

1. In one component, the child component's refresh will not effect the parent component, and most importantly the definition of child component can be any html tag, their refresh only effect themselve. only the useReducer / useState will cause the entire component to refresh.
2. explaination:
   - how to define a child component: any html tag, any React component inside another component no matter it's a class or functional component.
   - useEffect and useState refresh page logic:
     1. useEffect will be triggered by current component's refresh(one life cycle).
     2. useState will trigger the current component to refresh entirely(including all child components).
     3. if you place a debugger inside of a useEffect, and only refresh a child component, you will notice that the useEffect will not be fired. basically, it will only be triggered by a setState / useReducer / reducx-setState. and consider it's a hook that will execute any functions inside it at every render if the dependency is changed.

#### 10/Apr 2022 :

- Target

1. Selection of Warehousing forms needd to be more clear(change of type): finished

2. creationg of Abolish Form

   - Create the form : finished
   - create a specialized search bar(selection as well) and the search bar needs to be standout : ongoing
   <!-- - be able to switch from abolish to edit product info -->
   - show all the data of a product : ongoing
   - Implement the function : ongoing

3. implement 2 products variable in Deposite form, for better UI experience: ongoing

   - solution: Create a productRef to store the current product obj and use the value when submit the payload.

4. Make the async call and make notification according to the response

   - problems: how to aquire the response's header???? when I try to log(response.headers) // output is undifined

5. Implement a project scale global state to controll the loading state.
   - combine the reduxslice(isLoadingSlice) in the Request and make the change accordingly upon every apiCall.
   - Problems:
     1. through exporting a store to the Request singleton, now the dispatch is accessable to it.
     2. Then the problem is where shall I implement the Notification? or HOW???, I am thinking about abstract another layer to deal with this problem the design should look like this.
   - Solutions:
     1. export the store from the store and use store.dispatch to replace the `const dispatch = useDispatch()` cus it's not in a React component

```
// and we can create a function to access the dispatch like this

  private setIsloading(status: boolean): void {
    store.dispatch(setIsloading(status))
  }
//  then problem solved!!! :)
```

- Problems:
  1.

#### 11/April/2022:

1. Target1: implement the current stock of Mel
   - implement the route: done --- so easy just add 2 different routes.
   - implement the table layouts: ongoing
   - implement the table and logic: ongoing
     - Critical Point: Editable Table: ongoing
     - Critical Point: Nested Table: ongoing
     - Critical Point: Sort and Filter: ongping

#### 13/April/2022:

1. Target1: implement the current stock of Mel
   - implement the route: done --- so easy just add 2 different routes.
   - implement the table layouts: done, use Grid to implemented a search bar and a form --- easy.
   - implement the table and logic: Solved
     - Critical Point: Editable Table: ongoing
       1. How to acquire data from the table structure: Solved

```
{
        title: "In Stock",
        key: "inStock",
        dataIndex: "inStock",
        render: (a: any, b: any, c: any) => {
          // a: current row value, b: current column value(a obj), c: row index
          debugger

          return (
            <span>
              <Badge status={stockIndicator(a)} />
              {a}
            </span>
          )
        },
      },
  };
```

     - Critical Point: Nested Table: Solved the logic
     - Critical Point: Sort and Filter: ongping

- implement a switch to chose the mock backend address for other computer to use: half done, need a global variable to control all the env variable.
- fix the login button bug: fixed.

#### 17/Apr/2022

1. Create a different color for SubTable, so the colors of main and sub table wont be the same, easier for user.
   - use styled-components to warp the Table
   - find the class we need to alter
   - Solution: rowClassName

```

    return (
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {}, // 点击行
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {}, // 鼠标移入行
            onMouseLeave: (event) => {},
          }
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => {
          if (index / 2 === 0) {
            return "oddRow"
          } else return "evenRow"
        }}
      />
    )
  }
```

#### 18/Apr/2022

1.  Target 1

    - Order Managment: the Order is the core entity of the App --- nearly all other module is working around this component and all info is attached to it.
    - Create a tab system to navigate within the order module, we need "Create order", "edit order" and "Delete Order", 3 options
    - 1st Tast:
      - Create Order Form: ongoing
        - first Step: Create / Select Customer : Done
        - side notes: create a Debounce func: Done
        - box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        - 2nd step: implements item selection / add: ongoing
        - Problem: UI and Data not sync: working on it

2.  A MAJOR Problem:
    - Description: In a Quotation form, I used a ref to store a complex Object which represents the Entire quota. And I used a temp:[] as a tempary place to hold data. after I put data in it. I always called a setState to refresh the page. but still, I encountered the classic "one Step behind" Problem.

#### 23/Apr/2022

1. Target 1

- Order managment redesign:
  - Customer Creation / Selection: done.
  - Product Filtering :ongoing
    - Use productType / subtype / detail to filter the products,  
