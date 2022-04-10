# Problems and Solution

#### 9/Apr 2022

- React refreshment basic logical explanation:

1. In one component, the child component's refresh will not effect the parent component, and most importantly the definition of child component can be any html tag, their refresh only effect themselve. only the useReducer / useState will cause the entire component to refresh.
