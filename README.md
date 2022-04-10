# Problems and Solution

#### 9/Apr 2022

- React refreshment basic logical explanation:

1. In one component, the child component's refresh will not effect the parent component, and most importantly the definition of child component can be any html tag, their refresh only effect themselve. only the useReducer / useState will cause the entire component to refresh.

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
  1.
