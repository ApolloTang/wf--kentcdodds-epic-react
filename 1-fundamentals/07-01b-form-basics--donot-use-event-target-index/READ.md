[video](https://epicreact.dev/modules/react-fundamentals/forms-solution) 6:37

```
    console.log(event.target.elements.firstName)
    console.log(event.target[0])
    console.log(event.target.elements.firstName === event.target[0])  //  true
```

`event.target.elements.firstName` and `event.target[0]` points to the same form element; but `event.target[0]` depends on the order of the element so it is unreliable.  It is better to use`event.target.elements.firstName` because it is refer by name.

